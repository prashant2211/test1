import React, { useEffect, useState } from 'react';
import './Task.scss';
import { Form, Select, Input, DatePicker } from "antd";
import ModalComponent from '../../components/global/modal/ModalComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Board from 'react-trello';
import { GetAllTasksApi, GetAllTaskCategoryApi, AddUpdateTaskApi, UpdateTasksStatusApi, DeleteTaskApi, GetAllTeamApi, GetAllTaskPriorityApi } from '../../api/request/task';
import moment from 'moment/moment';
import LoadableButton from '../../components/buttons/LoadableButton';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../components/global/modal/ConfirmationModal';

const { TextArea } = Input;

export default function Task() {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [teams, setTeams] = useState([]);
    const [isDelTaskLoading, setIsDelTaskLoading] = useState(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [taskPriorities, setTaskPriorities] = useState([]);
    const [taskCategories, setTaskCategories] = useState([]);
    const [isAddTaskLoading, setIsAddTaskLoading] = useState(false);
    const [taskSelectorOptions, setTaskSelectorOption] = useState([{ value: '0', label: 'All' }, { value: '1', label: 'Today' }, { value: '2', label: 'Select Date' }]);
    const [tasks, setTasks] = useState();
    const [initialValues, setInitialValues] = useState({ taskCId: null, taskTitle: '', description: '', toAssign: null, dueDate: '', taskPId: null });


    const filterOption = (input, option) => {
        return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    };

    const getAllTasks = async () => {
        try {
            let params = {
                SearchText: searchText,
            }
            const { data } = await GetAllTasksApi(new URLSearchParams(params).toString());
            if (data?.success) {
                setTasks({
                    lanes: [
                        { id: 'todo', title: 'To do Tasks', cards: (data?.data?.toDoTaskList) },
                        { id: 'progress', title: 'In Progress', cards: (data?.data?.inProcessList) },
                        { id: 'done', title: 'Done', cards: (data?.data?.doneList) }
                    ]
                })
            }
        } catch (err) { }
    }

    const getTeams = async () => {
        try {
            let params = {
                UserType: 'support'
            }
            const { data } = await GetAllTeamApi(new URLSearchParams(params));
            if (data?.success) {
                setTeams(data?.data?.map((item) => ({ value: item?.userId, label: item?.name })));
            }
        } catch (err) { }
    }

    const getAllTaskCategoryApi = async () => {
        try {
            const { data } = await GetAllTaskCategoryApi();
            if (data?.success) {
                setTaskCategories(data?.data?.map((item) => ({ ...item, value: item?.taskCId, label: item?.taskCategoryName })));
            }
        } catch (error) { }
    }

    const getTaskPriorities = async () => {
        try {
            const { data } = await GetAllTaskPriorityApi();
            if (data?.success) {
                setTaskPriorities(data?.data?.map((item) => ({ ...item, value: item?.taskPId, label: item?.taskPriorityName })));
            }
        } catch (error) { }
    }

    const filterHandler = (value) => {
        setFilter(value);
        setSearchParams(`filter=${value.toString()}`);
    }

    useEffect(() => {
        getAllTasks();
    }, [searchText, filter]);

    useEffect(() => {
        form.resetFields();
    }, [isOpenModal]);

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    const handleSubmit = async (value) => {
        try {
            setIsAddTaskLoading(true);
            let params = {
                ...value,
                dueDate: moment(value?.dueDate).format('YYYY-MM-DD'),
                toAssign: [value?.toAssign]
                // PlatformId: 1,
                // taskStatus: 1,
            };
            const { data } = await AddUpdateTaskApi(params);
            if (data?.success) {
                form.resetFields();
                toast.success(data?.message);
            }
            setIsAddTaskLoading(false);
            getAllTasks();
            setIsOpenModal(false);
        } catch (error) {
            toast.error(error?.response?.data?.error?.message);
            setIsAddTaskLoading(false);
        }
    }

    const deleteTaskHandler = async () => {
        try {
            setIsDelTaskLoading(true);
            const { data } = await DeleteTaskApi(selectedTask?.id);
            if (data?.success) {
                toast.success(data?.message);
                getAllTasks();
            }
            setIsDelTaskLoading(false);
            setDeleteTaskModal(false);
        } catch (err) {
            setIsDelTaskLoading(false);
        }
    }

    const fetchColor = (count) => {
        let colors = ['#FB5879', '#17DB7E', '#F8BE09', '#FF7512', '#17DB7E', '#FF7512', '#F8BE09', '#FB5879', '#17DB7E', '#FB5879'];
        const colorIndex = (count - 1) % colors.length;
        let color
        if (count == 0) {
            color = '#FB5879'
        } else {
            color = colors[colorIndex];
        }
        return color;
    }

    const findCardDifference = (current, updated) => {
        const addedCards = [];
        const removedCards = [];

        // Iterate through the lanes in the updated array
        for (const updatedLane of updated) {
            const currentLane = current?.find((cl) => cl.id === updatedLane?.id);

            // If the lane is not in the current array, all cards in the updated lane are added
            if (!currentLane) {
                addedCards.push(...updatedLane?.cards);
                continue;
            }

            // Compare cards in the current and updated lanes
            for (const updatedCard of updatedLane?.cards) {
                const currentCard = currentLane.cards.find((cc) => cc.id === updatedCard.id);

                // If the card is not in the current lane, it is added
                if (!currentCard) {
                    addedCards.push(updatedCard);
                }
            }

            // Compare cards in the current and updated lanes
            for (const currentCard of currentLane.cards) {
                const updatedCard = updatedLane.cards.find((uc) => uc.id === currentCard.id);

                // If the card is not in the updated lane, it is removed
                if (!updatedCard) {
                    removedCards.push(currentCard);
                }
            }
        }

        return { addedCards, removedCards };
    };

    const updateTaskStatus = async (taskId, laneId) => {
        let taskStatus;
        if (taskId && laneId) {
            if (laneId == 'progress') {
                taskStatus = 2;
            } else if (laneId == 'done') {
                taskStatus = 3;
            } else {
                taskStatus = 1;
            }

            // let params = {
            //     Id: taskId,
            //     TaskStatus: taskStatus
            // }
            // try {
            //     const { data } = await UpdateTasksStatusApi(params);
            //     if (data?.success) {
            //         toast.success(data?.message);
            //     }
            // } catch (error) { }
        }
    }

    const handleDataChange = (updatedTasks) => {
        const { addedCards } = findCardDifference(tasks?.lanes || [], updatedTasks?.lanes || []);
        updateTaskStatus(addedCards[0]?.id, addedCards[0]?.laneId);
        setTasks(updatedTasks);
    }

    const CustomLaneHeader = (props) => (
        <div className="w-[382px] bg-primary-light border border-primary rounded-lg flex justify-between items-center px-4 py-2">
            <p className="primary font-semibold">{props?.title}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8D5AE2" className="w-5 h-5 cursor-pointer">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
            </svg>
        </div>
    );

    const TaskCard = (props) => {
        return (
            <div className='bg-white border border-primary rounded-xl w-[382px] my-2 cursor-pointer'>
                <div className='flex justify-between items-center border-b-2 border-[#8D5AE233] border-dashed p-4'>
                    <div className='flex items-center'>
                        <div className='h-[34px] w-[34px] bg-[#8D5AE24D] rounded flex justify-center items-center'>
                            <img className='h-5 w-5' src='/assets/icons/task.svg' alt='title-icon' />
                        </div>
                        <div className='ml-2'>
                            <p className='primary text-sm font-semibold leading-4 mb-1 capitalize'>{props?.taskTitle}</p>
                            <p className='text-[#8D5AE2B2] text-xs font-medium'>{props?.taskPriorityName} Priority</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8D5AE2" className="w-6 h-6 cursor-pointer hover:stroke-[#452678] duration-500" onClick={() => navigate(`/task_details`)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div className='p-4'>
                    <div className='flex items-center flex-wrap gap-4'>
                        <div className='flex items-center px-4 py-1 rounded-full' style={{ backgroundColor: fetchColor(props?.taskCId) }}>
                            <img src='assets/icons/client-info.svg' className='h-4 w-4' alt='info-icon' />
                            <p className='font-medium ml-2'>{props?.taskCategoryName}</p>
                        </div>
                        <div className='flex items-center bg-[#9F46E4] px-4 py-1 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            <p className='text-white ml-2'>{moment(props?.dueDate).format('DD-MM-YYYY')}</p>
                        </div>
                    </div>
                    <div className='flex items-center flex-wrap mt-4'>
                        <p className='font-medium bg-[#F5F5F5] px-3 py-1 rounded-md'>{props?.assignedName}</p>
                    </div>
                    <div className='flex justify-between items-center flex-wrap mt-4'>
                        <div className='flex items-center px-4 py-1 rounded-full bg-[#F8EDC8]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className='font-medium ml-2'>{moment(props?.createdDate).format('LL')}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D91819" className="w-6 h-6 cursor-pointer hover:stroke-[#aa0001] duration-500" onClick={() => { setSelectedTask(props); setDeleteTaskModal(true) }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    const taskModalOpenHandler = () => {
        setIsOpenModal(true);
        getAllTaskCategoryApi();
        getTaskPriorities();
        getTeams();
    }

    return (
        <div>
            <div className="flex justify-between flex-wrap gap-5">
                <div className='ant-select-selector-white ant-multi-select-selector'>
                    <Select
                        mode="multiple"
                        className="w-[320px]"
                        placeholder="Select options"
                        value={filter}
                        options={taskSelectorOptions}
                        onChange={(value) => filterHandler(value)}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <div className="mr-3">
                        <Input
                            size="large"
                            style={{ width: 220 }}
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={() => setSearchText(search)}
                            prefix={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                </svg>
                            }
                            suffix={search &&
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setSearchText(''); setSearch('') }} viewBox="0 0 24 24" fill="#bebebe" className="size-5 cursor-pointer duration-300 hover:fill-[#969595]">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                </svg>
                            }
                        />
                    </div>
                    <div>
                        <button className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500" onClick={taskModalOpenHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            </svg>
                            Create Task
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='mt-4 overflow-x-auto'>
                    {
                        tasks ? (
                            <Board
                                data={tasks}
                                components={{
                                    Card: TaskCard,
                                    LaneHeader: CustomLaneHeader,
                                }}
                                onDataChange={(updatedTasks) => handleDataChange(updatedTasks)}
                            />
                        ) : (
                            <p className='text-gray-500 my-9'>No Task</p>
                        )
                    }
                </div>
            </div>

            {/* --- Create task modal --- */}
            <ModalComponent isOpen={isOpenModal} setIsOpen={setIsOpenModal} title='Create Task' width={900}>
                <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className='ant-select-selector-white'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>Category</label>
                            <Form.Item name="taskCId" rules={[{ required: true, message: 'Please select a category Id.' }]}>
                                <Select
                                    placeholder='Select category'
                                    className='w-full mt-1'
                                    options={taskCategories}
                                />
                            </Form.Item>
                        </div>
                        <div className='date-picker-white'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>Duo Date</label>
                            <Form.Item name="dueDate" rules={[{ required: true, message: 'Please select a due date.' }]}>
                                <DatePicker
                                    className='w-full mt-1 py-2'
                                    disabledDate={disabledDate}
                                    placeholder='DD-MM-YYYY'
                                    format='DD-MM-YYYY'
                                />
                            </Form.Item>
                        </div>
                        <div className='ant-select-selector-white'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>Priority Level</label>
                            <Form.Item name="taskPId" rules={[{ required: true, message: 'Please select a priority level.' }]}>
                                <Select
                                    placeholder='Select priority level'
                                    className='w-full mt-1'
                                    options={taskPriorities}
                                />
                            </Form.Item>
                        </div>
                        <div className='input-white'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>Title</label>
                            <Form.Item name="taskTitle" rules={[{ required: true, message: 'Please enter task title.' }]}>
                                <Input placeholder="Enter new title" className="mt-1 w-full ps-4 py-2" />
                            </Form.Item>
                        </div>
                        <div className='ant-select-selector-white sm:col-span-2'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>To Assign</label>
                            <Form.Item name="toAssign" rules={[{ required: true, message: 'Please select a user.' }]}>
                                <Select
                                    showSearch
                                    placeholder="Select users"
                                    className='w-full mt-1'
                                    filterOption={filterOption}
                                    options={teams}
                                />
                            </Form.Item>
                        </div>
                        <div className='input-white sm:col-span-2 lg:col-span-3'>
                            <label className='text-base text-[#2F2B3DCC] font-medium'>Description</label>
                            <Form.Item name="description" rules={[{ required: true, message: 'Please enter task description.' }]}>
                                <TextArea
                                    className="mt-1"
                                    placeholder="Description"
                                    autoSize={{ minRows: 5, maxRows: 8 }}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='flex justify-center item-center gap-5 mt-6'>
                        <LoadableButton
                            className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover  duration-500'
                            disabled={isAddTaskLoading}
                            type="Submit"
                            lable='Save'
                            isLoading={isAddTaskLoading}
                            loadingLable='Saving task...'
                        />
                        <button type='button' disabled={isAddTaskLoading} onClick={() => setIsOpenModal(false)} className='bg-white border border-primary text-sm primary font-semibold rounded-lg px-8 py-2 uppercase hover:border-[#452678] hover:text-[#452678] duration-500'>Cancel</button>
                    </div>
                </Form>
            </ModalComponent>

            {/* ---- Delete task modal ---- */}
            <ConfirmationModal
                isOpen={deleteTaskModal}
                setIsOpen={setDeleteTaskModal}
                message='Are you sure you want to remove this task?'
                onConfirm={deleteTaskHandler}
                isLoading={isDelTaskLoading}
                loadingLabel='Deleting task...'
            />
        </div>
    )
}
