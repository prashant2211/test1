import React from 'react';

export default function AccountCard({ account, handleSubmit, type }) {
    return (
        <div className='border border-primary rounded-lg w-[365px]'>
            <p className='uppercase primary font-semibold text-3xl p-4 border-b border-light'>{account?.planName}</p>
            <div>
                <div className='flex justify-between items-center mt-8 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Minimum Deposit</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>$ {account?.minimumDeposit}</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Instruments</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.instruments} +</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Spread From</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.spread} Pips</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Commission</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.commission} $</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Swap free/Islamic</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2 uppercase'>{account?.swapFree ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Margin Call</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.marginCall} %</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Stop Out</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.stopOut} %</p>
                </div>
                <div className='flex justify-between items-center mt-2 border-b pb-2 px-4'>
                    <div className='flex items-center'><img src='/assets/icons/checkmark-green.svg' width={22} alt='icon' /><p className='text-lg font-medium text-[#413079] ml-3'>Platform</p></div>
                    <p className='text-lg font-medium text-[#413079] ml-2'>{account?.platform}</p>
                </div>
            </div>
            <div className='flex justify-center my-8'>
                <button onClick={() => handleSubmit(account)} className='bg-primary text-sm text-white font-semibold px-9 py-2 capitalize rounded-lg themeHover duration-500'>{`Open ${type} Account`}</button>
            </div>
        </div>
    )
}