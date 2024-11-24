import React from 'react';

export default function ActualPNLCard({ amount }) {
    return (
        <div className='bg-primary-light rounded-[10px] p-3 px-6 cursor-pointer h-full'>
            <div className='flex justify-between items-center h-full'>
                <div>
                    <div className='flex justify-center items-center bg-primary w-[45px] h-[45px] rounded-lg '>
                        <img src='/assets/icons/today-earning.svg' alt='icon' width={24} />
                    </div>
                    <div>
                        <p className='text-md font-semibold uppercase mt-6'>Actual P/L</p>
                        <p className='text-2xl font-bold primary mt-2'>$ {amount}</p>
                    </div>
                </div>
                <img src='/assets/images/wallet.svg' alt='wallet-img' />
            </div>
        </div>
    )
}