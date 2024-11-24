import React from 'react';
import { Spin } from "antd";

export default function LoadableButton({ lable, img, type = 'button', isLoading = false, loadingLable = 'Loading...', className, onClick, disabled }) {

    return (
        <button type={type} disabled={disabled || isLoading} className={`${className} duration-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : null} `} onClick={onClick}>
            {
                isLoading ? (
                    <div className='flex justify-center items-center'>
                        <div className="ant-white-spin">
                            <Spin />
                        </div>
                        <p className='ml-4'>{loadingLable}</p>
                    </div>
                ) : (<div className='flex items-center justify-center gap-3'> {img} <p>{lable}</p></div>)
            }
        </button>
    )
}