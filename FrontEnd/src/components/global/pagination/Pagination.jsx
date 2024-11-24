import React from 'react';
import { Pagination, Select } from 'antd';

export default function MyPagination({ total, pageSize, setPageSize, page, setPage, onPageChage }) {

    const pageOptions = [{ value: 10, label: '10 / Page' }, { value: 20, label: '20 / Page' }, { value: 50, label: '50 / Page' }, { value: 100, label: '100 / Page' }];

    const handleChange = (value) => {
        setPageSize(value);
        setPage(1);
    }

    return (
        <div className='w-full flex sm:justify-between items-center justify-end px-4 pt-6'>
            <div className='ant-select-selector-white hidden sm:block pb-2'>
                <Select className="w-[140px]" defaultValue={pageSize} options={pageOptions} onChange={handleChange} />
            </div>
            <Pagination current={page} total={total} showSizeChanger={false} pageSize={pageSize} onChange={(value) => setPage(value)} />
        </div>
    )
}
