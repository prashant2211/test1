import React from 'react';

export default function StatisticsCard({ title, value, change, secondary, active, icon }) {
    return (
        <div className={`border-2 rounded-[10px] px-4 py-3 cursor-pointer ${active ? 'border-primary' : 'border-light'}`}>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-md font-semibold text-[#2F2B3D]'>{title}</p>
                    <div className='flex items-baseline mt-1'>
                        <p className='text-2xl font-bold primary'>{value || 0}</p>
                        {change && <p className='text-xs font-semibold ml-2'>{change > 0 ? (<span className='text-green-500'>+{change}%</span>) : (<span className='text-red-500'>{change}%</span>)}</p>}
                    </div>
                </div>
                <div className={`flex justify-center ${secondary ? 'bg-secondary' : 'bg-primary'} items-center w-[45px] h-[45px] rounded-lg`}>
                    <img src='/assets/icons/today-earning.svg' width={24} alt='icon' />
                    
                </div>
            </div>
        </div>
    )
}
