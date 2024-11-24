import React from 'react';

export default function GroupButton({ radioSelect, setRadioSelect, buttons }) {

    return (
        <div className='bg-white rounded-[40px] flex items-center p-2 w-auto text-[#2F2B3DCC]'>
            {
                buttons?.map((button, index) => (
                    <div key={index} onClick={() => setRadioSelect(button?.id)} className={`p-1 font-bold cursor-pointer px-5 rounded-[40px] ${radioSelect == button?.id ? 'bg-[#8D5AE240] primary shadow-inner duration-500' : null}`}>{button?.value}</div>
                ))
            }
        </div>
    )
}