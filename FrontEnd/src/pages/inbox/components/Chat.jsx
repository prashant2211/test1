import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Form, Input, Spin, Upload, Image } from 'antd';
import ModalComponent from '../../../components/global/modal/ModalComponent.jsx';
import { GetChatHistoryApi, GetMessagesApi, GetUserListWithParentAndChildApi, SendMessageApi, SendMessageWithAttachmentApi, StartNewChatApi } from '../../../api/request/inbox.js';
import Pin from '../../../assets/Pin.jsx';
import toast from 'react-hot-toast';

export default function Chat() {

    const [form] = Form.useForm();
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim();
    const { userDetails } = useSelector(state => state.user);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [isLoadingUserList, setIsLoadingUserList] = useState(false);
    const [isOpengUserList, setIsOpenUserList] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentSessionId, setCurrentSessionId] = useState('');
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [initialValues, setInitialValues] = useState({ message: '', file: null })
    const [isLoadingChatHistory, setIsLoadingChatHistory] = useState(false);
    const [isOpenAttachmentModal, setIsOpenAttachmentModal] = useState(false);
    const [isLoadingAttachmentModal, setIsLoadingAttachmentModal] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        form.setFieldsValue({ file: newFileList });
        if (newFileList?.length == 0) {
            form.setFieldsValue({ file: null });
        }
    }

    const UploadButton = (
        <button type="button">
            <div className="flex justify-center"><img src="assets/icons/Upload_Document_icon.svg" alt="icon" /></div>
            Upload
        </button>
    );

    const getChatHistory = async () => {
        try {
            setIsLoadingChatHistory(true);
            const { data } = await GetChatHistoryApi();
            if (data?.success) {
                setChatHistory(data?.data);
            }
            setIsLoadingChatHistory(false);
        } catch (error) {
            setIsLoadingChatHistory(false);
        }
    }

    useEffect(() => {
        getChatHistory();
    }, []);

    const sendMessage = async () => {
        if (!message) {
            return;
        }
        try {
            let params = {
                senderId: userDetails?._id,
                receiverId: selectedUser?.userId,
                message: message
            }
            const { data } = await SendMessageApi(params);
            if (data?.success) {
                setMessage('');
                setMessageList(previousMessage => [...previousMessage, data?.data])
            }
        } catch (error) { }
    };

    const getUserList = async () => {
        try {
            setIsLoadingUserList(true);
            let params = {
                IsIb: true
            }
            const { data } = await GetUserListWithParentAndChildApi(new URLSearchParams(params).toString());
            if (data?.success) {
                setUserList(data?.data);
            }
            setIsLoadingUserList(false);
        } catch (error) {
            setIsLoadingUserList(false);
        }
    }

    const openUserListModal = () => {
        setIsOpenUserList(true);
        getUserList();
    }

    const startNewChat = async (user) => {
        try {
            const { data } = await StartNewChatApi(user?.userId);
            if (data?.success) {
                setSelectedUser(user);
                setIsOpenUserList(false);
                setCurrentSessionId(data?.data?.sessionId);
                getMessages(data?.data?.sessionId);
            }
        } catch (error) { }
    }

    const getMessages = async (sessionId) => {
        try {
            setIsLoadingChat(true);
            const { data } = await GetMessagesApi(sessionId);
            if (data?.success) {
                setMessageList(data?.data);
            }
            setIsLoadingChat(false);
        } catch (error) {
            setIsLoadingChat(false);
        }
    }

    const openChatFromHistory = (history) => {
        setSelectedUser({ ...history, userId: userDetails?._id == history?.senderId ? history?.receiverId : history?.senderId });
        getMessages(history?.sessionId);
        setCurrentSessionId(history?.sessionId);
    }

    const getInitials = (name) => {
        const nameParts = name.trim().split(' ');
        const initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];
        return initials.toUpperCase();
    };

    const sendAttachment = async (chatId, files) => {
        const extractOriginFileObjs = (fileArray) => {
            return fileArray.map(file => file.originFileObj);
        };
        try {
            let apiHeader = { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } };
            const { data } = await SendMessageWithAttachmentApi(new URLSearchParams({ chatId: chatId }).toString(), { file: extractOriginFileObjs(files)[0] }, apiHeader);
            if (data?.success) {
                setIsOpenAttachmentModal(false);
                setPreviewOpen(false);
                setPreviewImage('');
                setFileList([]);
                form.resetFields();
            }
            setIsLoadingAttachmentModal(false);
        } catch (error) {
            toast.error(error?.response?.data?.error?.message);
            setIsLoadingAttachmentModal(false);
        }
    }

    const handleAttachmentMessage = async (values) => {
        try {
            setIsLoadingAttachmentModal(true);
            let params = {
                senderId: userDetails?._id,
                receiverId: selectedUser?.userId,
                message: values?.message
            }
            const { data } = await SendMessageApi(params);
            if (data?.success) {
                sendAttachment(data?.data?.chatId, values?.file);
                if (data?.data?.message) {
                    // setMessageList(previousMessage => [...previousMessage, data?.data]);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.error?.message);
        }
    }

    useEffect(() => {
        setPreviewOpen(false);
        setPreviewImage('');
        setFileList([]);
        form.resetFields();
    }, [isOpenAttachmentModal]);

    return (
        <div className='border-2 border-light rounded-xl flex'>
            <div className='h-[calc(100vh-136px)] border-r-2 border-light w-1/4 overflow-y-auto'>
                <div className='p-4 flex justify-between items-center'>
                    <p className='font-semibold text-lg'>Users</p>
                    <div className='bg-primary rounded-lg cursor-pointer fixed bottom-24 right-10 z-40' onClick={openUserListModal}>
                        <div className="flex px-3 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <div className='text-white mb-0 ms-1.5'>Start Chat</div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        isLoadingChatHistory ? (
                            <div className="flex justify-center flex-col my-[30%]">
                                <Spin size="large" />
                                <p className="primary text-center mt-2">Loading...</p>
                            </div>
                        ) : (
                            <div>
                                {
                                    chatHistory?.length > 0 ? (
                                        <div>
                                            {
                                                chatHistory?.map((history, index) => (
                                                    <div key={index} className='flex items-center gap-4 cursor-pointer border-b-2 border-light py-4 px-4' onClick={() => openChatFromHistory(history)}>
                                                        <div><Avatar size={40} className='bg-primary uppercase' >{getInitials(history?.name)}</Avatar></div>
                                                        <div>
                                                            <p className='font-medium text-base leading-4'>{history?.name}</p>
                                                            <p className='font-medium text-sm text-gray-400 line-clamp-1 leading-4 mt-1'>{history?.lastMessage}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p className='text-gray-400 text-center mt-5'>No previous chat available</p>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>

            <div className='h-[calc(100vh-136px)] w-3/4'>
                {
                    selectedUser !== null ? (
                        <div>
                            <div className='flex items-center justify-between py-2 px-3 gap-3 border-b-2 border-light'>
                                <div className='flex items-center gap-3'>
                                    <div><Avatar size={40} className='bg-primary uppercase'>{getInitials(selectedUser?.name)}</Avatar></div>
                                    <p className='font-medium'>{selectedUser?.name}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={primaryColor} class="size-6 cursor-pointer" onClick={() => getMessages(currentSessionId)}>
                                    <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div>
                                <div className="h-[calc(100vh-270px)] overflow-y-auto bg-light">
                                    {isLoadingChat ? (
                                        <div className="flex justify-center flex-col my-[20%]">
                                            <Spin size="large" />
                                            <p className="primary text-center mt-2">Loading...</p>
                                        </div>
                                    ) : (
                                        <div className='px-4'>
                                            {
                                                messageList?.map((item, index) => (
                                                    <div key={index}>
                                                        {(item?.senderId == userDetails?._id) ? (
                                                            // Sent message
                                                            <div>
                                                                {
                                                                    item?.documentUrl ? (
                                                                        < div className="flex justify-end w-full my-6">
                                                                            <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                                                                                <div className="flex justify-between mb-1">
                                                                                    <p className="text-sm text-[#2F2B3D] font-medium">You</p>
                                                                                    <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(item?.createdDate).format("DD-MM-YYYY LT")}</p>
                                                                                </div>
                                                                                <div className="bg-primary-light rounded-b-md rounded-tl-md font-medium m-0 px-2 pt-2 pb-1">
                                                                                    <Image className='m-0 w-full h-full' src={item?.documentUrl} />
                                                                                    {item?.message && <p className="text-[#2F2B3D] font-medium py-2">{item?.message}</p>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            {item?.message &&
                                                                                < div className="flex justify-end w-full my-6">
                                                                                    <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                                                                                        <div className="flex justify-between mb-1">
                                                                                            <p className="text-sm text-[#2F2B3D] font-medium">You</p>
                                                                                            <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(item?.createdDate).format("DD-MM-YYYY LT")}</p>
                                                                                        </div>
                                                                                        <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tl-md font-medium py-2 px-4">{item?.message}</p>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        ) : (
                                                            // Received message
                                                            <div>
                                                                {
                                                                    item?.documentUrl ? (
                                                                        <div className="flex w-full my-6">
                                                                            <div><Avatar size={35} className='bg-primary uppercase'>{getInitials(selectedUser?.name)}</Avatar></div>
                                                                            <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                                                                                <div className="flex justify-between mb-1">
                                                                                    <p className="text-sm text-[#2F2B3D] font-medium">{selectedUser?.name}</p>
                                                                                    <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(item?.createdDate).format("DD-MM-YYYY LT")}</p>
                                                                                </div>
                                                                                <div className="bg-primary-light rounded-b-md rounded-tr-md font-medium m-0 px-2 pt-2 pb-1">
                                                                                    <Image className='m-0 w-full h-full' src={item?.documentUrl} />
                                                                                    {item?.message && <p className="text-[#2F2B3D] font-medium py-2">{item?.message}</p>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            {item?.message &&
                                                                                <div className="flex w-full my-6">
                                                                                    <div><Avatar size={35} className='bg-primary uppercase'>{getInitials(selectedUser?.name)}</Avatar></div>
                                                                                    <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                                                                                        <div className="flex justify-between mb-1">
                                                                                            <p className="text-sm text-[#2F2B3D] font-medium">{selectedUser?.name}</p>
                                                                                            <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(item?.createdDate).format("DD-MM-YYYY LT")}</p>
                                                                                        </div>
                                                                                        <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tr-md py-2 px-4 font-medium">{item?.message}</p>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className='p-4'>
                                    <Input
                                        className="transperant-input py-2 rounded-lg search-bar text-base w-full"
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onPressEnter={sendMessage}
                                        prefix={<div onClick={() => setIsOpenAttachmentModal(true)} ><Pin /></div>}
                                        suffix={
                                            <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="#e5e5e5" viewBox="0 0 24 24" stroke-width="1.5" stroke={primaryColor} className="w-6 h-6 cursor-pointer duration-300" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <img className='h-16 opacity-60' src='/assets/logo/logo.png' />
                        </div>
                    )
                }
            </div>

            {/* User list modal */}
            <ModalComponent isOpen={isOpengUserList} setIsOpen={setIsOpenUserList} title='Start new chat with user' width={430}>
                <div className='max-h-96 overflow-auto'>
                    {
                        isLoadingUserList ? (
                            <div className="flex justify-center flex-col my-[35%]">
                                <Spin size="large" />
                                <p className="primary text-center mt-2">Loading...</p>
                            </div>
                        ) : (
                            <div>
                                {
                                    userList?.length > 0 ? (
                                        <div>
                                            {
                                                userList?.map((user, index) => (
                                                    <div key={index} className='flex items-center gap-4 cursor-pointer border-b-2 border-light py-3 px-4' onClick={() => startNewChat(user)}>
                                                        <div><Avatar size={40} className='bg-primary uppercase'>{getInitials(user?.name)}</Avatar></div>
                                                        <div>
                                                            <p className='font-medium text-lg leading-5'>{user?.name}</p>
                                                            <p className='font-medium text-gray-400 line-clamp-1 leading-5'>{user?.email}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p className='text-lg text-center text-gray-400 my-[25%]'>No Record Found</p>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </ModalComponent>

            {/* Attachment modal */}
            <ModalComponent isOpen={isOpenAttachmentModal} setIsOpen={setIsOpenAttachmentModal} title={`Upload attachment for ${selectedUser?.name}`} width={600}>
                <Form form={form} className='w-full' autoComplete='off' initialValues={initialValues} onFinish={handleAttachmentMessage}>
                    <Form.Item name="file" rules={[{ required: true, message: 'Please upload attachments.' }]}>
                        <Upload
                            beforeUpload={() => false}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 1 ? null : UploadButton}
                        </Upload>
                    </Form.Item>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                    <div className="inpu mt-6">
                        <Form.Item name="message">
                            <Input
                                className="transperant-input py-2 rounded-lg search-bar text-base w-full"
                                placeholder="Type a message..."
                                onPressEnter={() => form.submit()}
                                suffix={
                                    isLoadingAttachmentModal ? (
                                        <div className='flex items-center gap-2'><Spin size="small" /><p className="primary">Uploading document...</p></div>
                                    ) : (
                                        <svg onClick={() => form.submit()} xmlns="http://www.w3.org/2000/svg" fill="#e5e5e5" viewBox="0 0 24 24" stroke-width="1.5" stroke={primaryColor} className="w-6 h-6 cursor-pointer duration-300" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                        </svg>
                                    )
                                }
                            />
                        </Form.Item>
                    </div>
                </Form>
            </ModalComponent>
        </div >

        // <div className='border-2 border-light rounded-xl h-[calc(100vh-134px)] relative overflow-hidden'>
        //     <div className='flex items-center gap-3 py-2 px-3 border-b-2 border-light'>
        //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setIsUsersListOpen(true)}>
        //             <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        //         </svg>
        //         <Avatar size={40} src='https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' className='bg-primary uppercase'>WD</Avatar>
        //         <p className='font-medium'>Williams Duo</p>
        //     </div>

        //     <div>
        //         <div className="h-[424px] overflow-y-auto bg-light">
        //             <div className='px-4'>
        //                 {/* Received message */}
        //                 <div className="flex w-full my-6">
        //                     <Avatar round size={40} src='https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' />
        //                     <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
        //                         <div className="flex justify-between mb-1">
        //                             <p className="text-sm text-[#2F2B3D] font-medium">Williams Duo</p>
        //                             <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(message?.createdDate).format("DD-MM-YYYY LT")}</p>
        //                         </div>
        //                         <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tr-md py-2 px-4 font-medium">Hello, I need a help in account opening steps.</p>
        //                     </div>
        //                 </div>

        //                 {/* Sent message */}
        //                 <div className="flex justify-end w-full my-6">
        //                     <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
        //                         <div className="flex justify-between mb-1">
        //                             <p className="text-sm text-[#2F2B3D] font-medium">You</p>
        //                             <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(message?.createdDate).format("DD-MM-YYYY LT")}</p>
        //                         </div>
        //                         <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tl-md font-medium py-2 px-4">Sure, tell me how can I help you?</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className='p-4'>
        //             <Input
        //                 className="transperant-input py-2 rounded-lg search-bar text-base w-full"
        //                 placeholder="Type a message..."
        //                 value={message}
        //                 onChange={(e) => setMessage(e.target.value)}
        //                 onPressEnter={sendMessage}
        //                 suffix={
        //                     <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="#e5e5e5" viewBox="0 0 24 24" stroke-width="1.5" stroke={primaryColor} className="w-6 h-6 cursor-pointer duration-300" >
        //                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        //                     </svg>
        //                 }
        //             />
        //         </div>
        //     </div>
        // </div>
    )
}
