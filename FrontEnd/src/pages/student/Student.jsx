import React, { useState, useEffect } from "react";
import { Select, Input, Form, DatePicker, Spin,Switch } from "antd";
import columns from "../../columns/Student.js";
import Pagination from "../../components/global/pagination/Pagination.jsx";
import LoadableButton from "../../components/buttons/LoadableButton.jsx";
import ModalComponent from "../../components/global/modal/ModalComponent.jsx";
import TableWithSkeleton from "../../components/global/table/TableWithSkeleton.jsx";
import { GetAllStudentApi, GetAllStudentByIdApi, AddStudentApi, UpdateStudentApi,UpdateUserStatusApi } from "../../api/request/Student.js";
import moment from "moment";
import toast from "react-hot-toast";
import Edit from "../../assets/Edit.jsx";
import Eye from "../../assets/Eye.jsx";
import stateDistricts from '../../assets/data/stateDistricts.jsx';
import Segmented from "../../components/segmented/Segmented.jsx";
import ConfirmationModal from "../../components/global/modal/ConfirmationModal.jsx";
import dayjs from 'dayjs';



const { TextArea } = Input;
const { Option } = Select;

export default function Student() {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState("Active Student");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPlanModal, setIsOpenPlanModal] = useState(false);
  const [selectedStudentId, setSelectedStudent] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [activeStudentDetails, setActiveStudentDetails] = useState({});
  const [initialValues, setInitialValues] = useState({ First_Name: '', Last_Name: '', Contact_Number: '', Mother_Name: '', Father_Name: '', Class: '', Class_Code: '', State: '', District: '', Secondary_Contact: '', });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);
  const [isStudentDetailsLoading, setisStudentDetailsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [isStatusConfirmLoading, setIsStatusConfirmLoading] = useState(false);

  const handleFieldsChange = (_, allFields) => {
    const isChanged = allFields.some(field => field.touched);
    setIsFormChanged(isChanged);
  };

  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };

  const filterOption = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const handleStateChange = (value) => {
    setSelectedState(value);
    setDistrictOptions(stateDistricts[value] || []);
  };

  const statusHandler = async (user) => {
    setSelectedUser(user);
    setIsStatusConfirmOpen(true);
  }

  const getAllStudent = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        status: value === "Inactive Student"
        ? "Inactive"
        : value === "Active Student"
          ? "Active"
          : value === "All Student"
            ? " "
            : value,
        SearchText: searchText
      }
      setIsLoading(true);
      const { data } = await GetAllStudentApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              name: `${item?.First_Name} ${item?.Last_Name}`,
              actions: (
                <div className="flex">
                  <button onClick={() => { setSelectedStudent(item?._id); updatePlanHandler(item) }}><Edit /></button>
                  <button type="button" onClick={() => { setIsOpenModal(true); setSelectedStudent(item?._id); }} className="mx-3"><Eye /></button>
                </div>
              ),
              status: (<Switch onChange={() => statusHandler(item)} checkedChildren="Active" unCheckedChildren="Inactive" checked={item?.Status} />),
              Class_Code: (item?.Class_Code ? (<p>Yes</p>) : (<p>No</p>)),
              createdDate: item?.createdDate ? moment(item?.createdDate).format('DD-MM-YYYY, hh:mm A') : null,

            };
          })
        );
        setTotalRecord(data?.totalRecords);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const statusChangeConfirm = async () => {
    try {
      setIsStatusConfirmLoading(true);
      let params = {
        studentId: selectedUser?._id,
        status: !selectedUser?.Status,
      }

      const { data } = await UpdateUserStatusApi(params);
      if (data?.success) {
        getAllStudent();
        toast.success(data?.message);
      }

      setIsStatusConfirmLoading(false);
      setIsStatusConfirmOpen(false);
    } catch (error) {
      setIsStatusConfirmLoading(false);
    }
  }

  const getActiveStudent = async () => {
    try {
      setisStudentDetailsLoading(true);
      const { data } = await GetAllStudentByIdApi(selectedStudentId);
      setActiveStudentDetails(data?.data);
      setisStudentDetailsLoading(false);
    } catch (error) {
      setisStudentDetailsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedStudentId) {
      getActiveStudent();
    }
  }, [selectedStudentId]);

  useEffect(() => {
    getAllStudent();
  }, [page, pageSize,value,searchText]);

  useEffect(() => {
    if (!isOpenPlanModal) {
      form.resetFields();
      setInitialValues({ First_Name: '', Last_Name: '', Contact_Number: '', Mother_Name: '', Father_Name: '', Class: '', Class_Code: '', State: '', District: '', Secondary_Contact: '', });
      setIsEdit(false);
    }
  }, [isOpenPlanModal]);

  const updatePlanHandler = (plan) => {
    form.setFieldsValue({
      First_Name: plan?.First_Name,
      Class: plan?.Class,
      Father_Name: plan?.Father_Name,
      Contact_Number: plan?.Contact_Number,
      State: plan?.State,
      Last_Name: plan?.Last_Name,
      Mother_Name: plan?.Mother_Name,
      District: plan?.District,
      Address: plan?.Address,
      groupId: plan?.groupId,
      Class_Code: plan?.Class_Code,
      Secondary_Contact: plan?.Secondary_Contact,
      Registration_Number: plan?.Registration_Number,
      Password: plan.Password,
      DOB: plan.DOB && moment(moment(data?.data?.dob).format('MM/DD/YYYY'), 'MM/DD/YYYY'),
      Adhar: plan.Adhar

    });
    setIsEdit(true);
    setIsFormChanged(false);
    setIsOpenPlanModal(true);
  }

  const handleSubmit = async (values) => {
    setIsSubmitLoading(true);
    let params = {
      ...values,
    };
    try {
      if (isEdit) {
        const { data } = await UpdateStudentApi({ studentId: selectedStudentId, ...params });
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllStudent();
          setIsEdit(false);
          form.resetFields();
        }
      } else {
        const { data } = await AddStudentApi(params);
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllStudent();
          form.resetFields();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'An error occurred');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const openAddPlanModal = () => {
    form.resetFields();
    setInitialValues({ First_Name: '', Last_Name: '', Contact_Number: '', Mother_Name: '', Father_Name: '', Class: '', Class_Code: '', State: '', District: '', Secondary_Contact: '', });
    setIsFormChanged(true);
    setIsOpenPlanModal(true);
    setIsEdit(false);
  }

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format('MM-DD-YYYY');
      form.setFieldsValue({
        DOB: moment(formattedDate, 'MM-DD-YYYY'),
      });
    } else {
      form.setFieldsValue({
        DOB: '',
      });
    }
  };


  return (
    <div>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="ant-select-selector-white ant-multi-select-selector">
          <Segmented
            options={[
              "Active Student",
              "Inactive Student",
              "All Student",
            ]}
            value={value}
            setValue={setValue}
          />
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <Input
            size="large"
            style={{ width: 220 }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => setSearchText(search)}
            prefix={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            }
            suffix={
              search && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setSearchText("");
                    setSearch("");
                  }}
                  viewBox="0 0 24 24"
                  fill="#bebebe"
                  className="size-5 cursor-pointer duration-300 hover:fill-[#969595]"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clip-rule="evenodd"
                  />
                </svg>
              )
            }
          />
          <button onClick={openAddPlanModal} className="flex items-center bg-primary text-sm text-white font-semibold px-6 py-2 rounded-lg themeHover  duration-500">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85714 9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286H9.14286V16H6.85714V9.14286Z" fill="white" />
            </svg>
            Add Student
          </button>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">All Student</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        {/* ---- add Account-request ---- */}
        <ModalComponent isOpen={isOpenPlanModal} setIsOpen={setIsOpenPlanModal} title={isEdit ? 'Update Student' : 'Add Student'} width={1300}>
          <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">First Name</label>
                <Form.Item name="First_Name" rules={[{ required: true, message: 'Please enter First Name.' }]}>
                  <Input placeholder="First name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Last Name</label>
                <Form.Item name="Last_Name" rules={[{ required: true, message: 'Please enter Last Name.' }]}>
                  <Input placeholder="Last name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Phone No</label>
                <Form.Item name="Contact_Number" rules={[{ required: true, message: 'Please enter phone number.' }]}>
                  <Input type="number" placeholder="Phone no" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className='date-picker-white'>
                <label className='text-base text-[#2F2B3DCC] font-medium'>DOB</label>
                <Form.Item name="DOB" rules={[{ required: true, message: 'Please select a DOB.' }]}>
                  <DatePicker
                    className='w-full mt-1 py-2'
                    disabledDate={disabledDate}
                    placeholder='MM-DD-YYYY'
                    format='MM-DD-YYYY'
                    defaultValue={form.getFieldValue('DOB') && dayjs(moment(form.getFieldValue('DOB')).format('MM/DD/YYYY'), 'MM/DD/YYYY')} onChange={handleDateChange}
                  />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Father Name</label>
                <Form.Item name="Father_Name" rules={[{ required: true, message: 'Please enter father name.' }]}>
                  <Input placeholder="Father name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Mother Name</label>
                <Form.Item name="Mother_Name" rules={[{ required: true, message: 'Please enter mother name.' }]}>
                  <Input placeholder="Mother name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Adhar No</label>
                <Form.Item name="Adhar" rules={[{ required: true, message: 'Please enter adhar number.' }]}>
                  <Input type="number" placeholder="Adhar number" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Class Name</label>
                <Form.Item name="Class" rules={[{ required: true, message: 'Please enter class name.' }]}>
                  <Input placeholder="Class name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Class Code</label>
                <Form.Item name="Class_Code" rules={[{ required: true, message: 'Please enter class Code.' }]}>
                  <Input placeholder="Class Code" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Registration no (Roll no)</label>
                <Form.Item name="Registration_Number" rules={[{ required: true, message: 'Please enter Registration no (Roll no).' }]}>
                  <Input placeholder="Registration no (Roll no)" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">
                  State
                </label>
                <Form.Item
                  name="State"
                  rules={[
                    { required: true, message: "Please select a state." },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a state"
                    className="w-full mt-1"
                    filterOption={filterOption}
                    onChange={handleStateChange}
                  >
                    {Object.keys(stateDistricts).map((state) => (
                      <Option key={state} value={state}>
                        {state}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">
                  District
                </label>
                <Form.Item
                  name="District"
                  rules={[
                    { required: true, message: "Please select a district." },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a district"
                    className="w-full mt-1"
                    filterOption={filterOption}
                    disabled={!selectedState}
                  >
                    {districtOptions.map((district) => (
                      <Option key={district} value={district}>
                        {district}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Password</label>
                <Form.Item name="Password"
                  rules={[
                    { required: true, message: "Please enter password." },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="border rounded-lg w-full ps-4 py-2"
                  />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Other Phone No(option)</label>
                <Form.Item name="Secondary_Contact" >
                  <Input type="number" placeholder="Phone no" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
            </div>
            <div className='input-white mt-3'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Address</label>
              <Form.Item name="Address" rules={[{ required: true, message: 'Please enter address.' }]}>
                <TextArea className="mt-1" placeholder="address" autoSize={{ minRows: 4, maxRows: 100 }} value={initialValues.BannerCaption} />
              </Form.Item>
            </div>
            <div className="flex justify-between items-center mt-7 gap-5">
              <button type="button" onClick={() => setIsOpenPlanModal(false)} className="bg-primary text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-primary duration-500">Back</button>
              <LoadableButton type='submit' className='bg-primary text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-primary duration-500' lable='Submit' disabled={!isFormChanged || isSubmitLoading} isLoading={isSubmitLoading} loadingLable='Submitting...' />
            </div>
          </Form>
        </ModalComponent>

        {/* ---- Account Information ---- */}
        <ModalComponent
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          onCancel={() => setIsOpenModal(false)}
          title="Student Information"
          width={1200}
        >

          {
            isStudentDetailsLoading ? (
              <div className="flex justify-center flex-col my-[10%]">
                <Spin size="large" />
                <p className="primary text-center mt-2">Loading...</p>
              </div>
            ) : (
              <div className='p-5'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 '>
                  <div>
                    <p className='text-base font-normal '>First Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.First_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Last Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Last_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Mother Name </p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Mother_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Father Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Father_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>DOB</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeStudentDetails?.DOB ? moment(activeStudentDetails?.requestDate).format("DD-MM-YYYY")
                      : "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Mobile No.</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Contact_Number || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Class Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Class || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Adhar Number</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Adhar || '--'}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Registration Number</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Registration_Number || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>State</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeStudentDetails?.State || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>District</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeStudentDetails?.District || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Secondary Contact</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeStudentDetails?.Secondary_Contact || "--"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className='text-base font-normal '>Address</p>
                  <p className='text-xl primary font-semibold  mt-2'>{activeStudentDetails?.Address || "--"}</p>
                </div>
              </div>
            )
          }

        </ModalComponent>
      </div>

      <ConfirmationModal
        isOpen={isStatusConfirmOpen}
        setIsOpen={setIsStatusConfirmOpen}
        message='Are you sure to change the Student status?'
        onConfirm={statusChangeConfirm}
        isLoading={isStatusConfirmLoading}
        loadingLabel='Changing status...'
      />
    </div>
  );
}
