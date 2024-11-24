import React, { useEffect, useState } from 'react';
import { Avatar, Input, Switch } from 'antd';
import { useSelector } from 'react-redux';
import { MaintenanceOff, MaintenanceOn } from '../../api/request/header/maintenance';
import toast from 'react-hot-toast';


export default function Profile() {

    const { userDetails } = useSelector(state => state.user);

    const [checked, setChecked] = useState(false);

    const handleChange = async (checked) => {
        setChecked(checked);
        try {
            if (checked) {
                const { data } = await MaintenanceOn();
                if (data?.success) {
                    toast.success(data?.message);
                }
            } else {
                const { data } = await MaintenanceOff();
                toast.success(data?.message);
            }
        } catch (error) { }
    };

    useEffect(() => { }, [checked]);

    return (
        <div>
            <div className='border rounded-lg flex justify-between items-start p-5'>
                <div className='flex items-center'>
                    <Avatar round size={60} src='/assets/images/user.png' />
                    <div className='ml-4'>
                        <p className='font-medium text-lg'>{userDetails?.fullName}</p>
                        <p className='text-[#848484] text-lg mt-1'>{userDetails?.address}</p>
                    </div>
                </div>
            </div>
            <div className='border rounded-lg p-4 mt-4'>
                <p className='font-medium text-xl '>Personal Information</p>
                <div className='grid sm:grid-cols-2 grid-cols-1 mt-5 items-center gap-5'>
                    <div>
                        <p className='text-[#848484] font-normal text-base '>First Name</p>
                        <p className='text-[#848484] font-semibold text-base mt-1'>{userDetails?.firstName}</p>
                    </div>
                    <div className=''>
                        <p className='text-[#848484] font-normal text-base '>Lat Name</p>
                        <p className='text-[#848484] font-semibold text-base mt-1'>{userDetails?.lastName}</p>
                    </div>
                    <div>
                        <p className='text-[#848484] font-normal text-base '>Email Address</p>
                        <p className='text-[#848484] font-semibold text-base mt-1'>{userDetails?.email}</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center border rounded-lg p-4 mt-4'>
                <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    checked={checked}
                    onChange={handleChange}
                />
                <p className='text-[#848484] font-semibold text-base ms-2'>Maintenance Mode</p>
            </div>
        </div>
    )
}