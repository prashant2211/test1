import React from 'react';
import { Modal, Input } from 'antd';
import LoadableButton from '../../buttons/LoadableButton';
const { TextArea } = Input;

export default function ConfirmationModal({ isOpen = false, setIsOpen, width, type, message, onConfirm, isLoading, loadingLabel = 'Loading...', textArea, placeholder, textAreaValue, setTextAreaValue }) {

    return (
        <Modal
            open={isOpen}
            closeIcon={false}
            footer={false}
            maskClosable={false}
            keyboard={false}
            width={width}
        >
            <div className='lg:pb-1'>
                <div className='p-6'>
                    <div className="flex justify-center mt-4">
                        {type == 'success' ? (<img src="/assets/icons/Accept-icon.svg" alt="icon" width={100} />) : (<img src="/assets/icons/Reject-icon.svg" alt="icon" width={100} />)}
                    </div>
                    <p className={`text-xl text-[#2F2B3D] font-semibold text-center ${textArea ? 'mt-8 mb-4' : 'my-8'}`}>{message}</p>
                    {textArea &&
                        <div>
                            <TextArea
                                className="my-3"
                                placeholder={placeholder}
                                value={textAreaValue}
                                onChange={(e) => setTextAreaValue(e.target.value)}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </div>
                    }
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <button onClick={() => setIsOpen(false)} disabled={isLoading} className='bg-[#D91819] text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-[#aa0001] duration-500'>No</button>
                        <LoadableButton
                            className='bg-[#2D9B63] text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-[#096034] duration-500'
                            onClick={() => onConfirm()}
                            disabled={isLoading}
                            lable='Yes'
                            isLoading={isLoading}
                            loadingLable={loadingLabel}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
