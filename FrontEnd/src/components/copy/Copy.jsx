import React, { useState } from 'react'
import copy from 'clipboard-copy';
import { Tooltip } from 'antd';

const Copy = ({ text }) => {
    const [copyState, setCopyState] = useState(false)

    const copyText = () => {
        setCopyState(true)
        copy(text)
        setTimeout(() => setCopyState(false), 1500)
    }
    return (
        <>
            {
                copyState ? <div>
                    <Tooltip title="Copied" open>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-5 m-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Tooltip>
                </div> :
                    <div onClick={copyText} className='cursor-pointer size-5 flex justify-center items-center'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4.00012V4.00012C11 3.06824 11 2.6023 10.8478 2.23476C10.6448 1.7447 10.2554 1.35535 9.76537 1.15236C9.39782 1.00012 8.93188 1.00012 8 1.00012H5C3.11438 1.00012 2.17157 1.00012 1.58579 1.58591C1 2.17169 1 3.1145 1 5.00012V8.00012C1 8.93201 1 9.39795 1.15224 9.76549C1.35523 10.2555 1.74458 10.6449 2.23463 10.8479C2.60218 11.0001 3.06812 11.0001 4 11.0001V11.0001" stroke="#2F2B3D" stroke-opacity="0.78" stroke-width="1.5" />
                            <rect x="4" y="4.00012" width="10" height="10" rx="2" stroke="#2F2B3D" stroke-opacity="0.78" stroke-width="1.5" />
                        </svg>
                    </div>
            }
        </>
    )
}

export default Copy