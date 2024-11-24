import React, { useState } from 'react';
import './Sidebar.scss';
import { SidebarData } from './sidebarData/SideabrData.js';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { Sidebar, Menu, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ConfirmationModal from "../modal/ConfirmationModal.jsx";
import { removeCookies } from "../../../services/Cookies.js";
import { setloggedIn } from "../../../store/Slices/userSlice.js";
import { LogoutApi } from "../../../api/request/users";
import Notification from '../../../assets/Notification.jsx';
import { Drawer } from 'antd';
import Profile from '../../../pages/profile/Profile.jsx';


export default function UserSidebar() {
    const dispatch = useDispatch();
    const { broker } = useSelector(state => state.broker);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

    const handleMenuClick = (index) => { setOpenSubMenuIndex(index); };

    function getFirstPath(path) {
        const parts = path.split('/');
        return parts.length > 1 ? '/' + parts[1] : path;
    }

    const isActivePath = (path) => {
        let active = false;
        path?.map((item) => {
            if (item == getFirstPath(pathname)) {
                active = true;
            }
        })
        return active;
    }

    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            const { data } = await LogoutApi(userDetails?._id);
            if (data?.success) {
                toast.success(data?.message);
            }
            localStorage.clear();
            dispatch(setloggedIn(false));
            removeCookies('token');
            navigate('/');
            setIsLoading(false);
        } catch (error) {
            if (error?.response?.data?.error?.message) {
                toast.error(error?.response?.data?.error?.message);
            }
            localStorage.clear();
            dispatch(setloggedIn(false));
            removeCookies('token');
            navigate('/');
            setIsLoading(false);
        }
    }

    return (
        <div className='sidebar-container w-[250px] py-3 fixed'>
            <div className='h-[70px] px-4'>
                <div className='flex items-center justify-between pt-4 pb-6 header'>
                    <img src='/assets/logo/logo.png' alt='logo' className='h-[30px] object-contain' />
                    {/* <img className='h-[30px]' src={broker?.logoFilePath} alt='logo' /> */}
                    {/* <img className='h-[22px] cursor-pointer' src='assets/icons/notification.svg' alt='icon' /> */}
                    <Notification />
                </div>
                <hr className='border-[#8D5AE226] mx-2 pb-2' />
            </div>

            <div className='h-[calc(100vh-172px)] overflow-y-auto pl-4'>
                {
                    SidebarData.map((item, index) => {
                        const iconWithProps = React.cloneElement(item?.icon, { active: isActivePath(item?.activeUrl) })
                        return item?.children ? (
                            <Sidebar>
                                <Menu>
                                    <SubMenu key={index} open={openSubMenuIndex == index} onOpenChange={() => handleMenuClick(index == openSubMenuIndex ? null : index)} label={
                                        <div key={index} className={`flex items-center text-[#2F2B3DB2] font-medium cursor-pointer py-2 px-6 header`}>
                                            {item?.icon}
                                            <p className='text-base ms-3'>{item?.title}</p>
                                        </div>
                                    }>
                                        <div className='pt-1'>
                                            {
                                                item?.children?.map((childItem, index) => {
                                                    const childIconWithProps = React.cloneElement(childItem?.icon, { active: isActivePath(childItem?.activeUrl) })
                                                    return <div key={index} onClick={() => navigate(childItem?.url)} className={` submenu child flex items-center text-[#2F2B3DB2] cursor-pointer font-medium py-2 ms-5 ps-4 pe-6 mr-4 duration-200 ${index != 0 ? 'mt-1' : null} ${isActivePath(childItem?.activeUrl) ? 'active_icon primary text-white rounded-lg font-semibold' : null}`}>
                                                        {childIconWithProps}
                                                        <p className='ms-2'>{childItem?.title}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </SubMenu>
                                </Menu>
                            </Sidebar>
                        ) : (
                            <div key={index} onClick={() => { navigate(item?.url); handleMenuClick(index) }} className={` header flex items-center text-[#2F2B3DB2] font-medium cursor-pointer my-3 py-2 px-6 mr-4 duration-200 ${isActivePath(item?.activeUrl) ? 'active_icon bg-primary text-white rounded-lg font-semibold' : null}`}>
                                {/* <img src={item?.icon} alt='icon' className='mr-4 h-[24px] w-[24px]' /> */}
                                {iconWithProps}
                                <p className='text-base ms-2'>{item?.title}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className='px-4 mt-6'>
                <div className='flex items-center justify-between cursor-pointer' onClick={e => setIsDrawerOpen(true)}>
                    <div className='flex items-center'>
                        <Avatar size={46} src='/assets/images/user.png' />
                        <div className='ml-2'>
                            <p className='font-semibold text-base line-clamp-1'>{userDetails.fullName}</p>
                            <p className='text-sm primary'>{userDetails.roleName}</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                {/* <button className='w-full bg-primary text-sm text-white font-semibold px-6 py-2 rounded-lg themeHover  duration-500 flex items-center gap-5' onClick={() => setIsModalOpen(true)}>
                    <img src='assets/icons/logout.svg' alt='icon' />
                    <p>Logout</p>
                </button> */}
            </div>

            {/* --- Loguot confirmation modal --- */}
            <ConfirmationModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                message='Are you sure you want to logout?'
                onConfirm={logoutHandler}
                isLoading={isLoading}
                loadingLabel='Loging out...'
            />
            {/* --- admin profile drawer --- */}
            <Drawer title={
                <div className='flex justify-between items-center'>
                    <p>Profile</p>
                    <button className='text-sm text-red-600 font-semibold px-6 py-2 flex items-center gap-3' onClick={() => setIsModalOpen(true)}>
                        <img src='/assets/icons/_logout.svg' className='h-5' alt='icon' />
                        <p>Logout</p>
                    </button>
                </div>
            } onClose={e => setIsDrawerOpen(false)} width={600} open={isDrawerOpen}>
                <Profile />
            </Drawer>
        </div>
    )
}
