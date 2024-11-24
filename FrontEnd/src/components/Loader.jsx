import { Spin } from 'antd';
import React from 'react';

const Loader = () => {
    return (
        <div className='w-full h-[100vh]'>
            <div className='h-full w-full flex items-center justify-center flex-col'>
                <Spin size='large' />
                <h2 className='mt-3 text-lg'>Loading...</h2>
            </div>
        </div>
    )
}

export default Loader