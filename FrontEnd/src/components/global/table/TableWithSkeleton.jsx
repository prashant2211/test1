import React, { useState, useEffect } from 'react';
import { Skeleton, Table } from 'antd';

export default function TableWithSkeleton({ rowSelection, columns, data, loading, length = 10, onChange }) {

    const [tableData, setTableData] = useState();

    useEffect(() => {
        let skeletonObj = new Object();
        columns.map((item) => {
            skeletonObj[item?.dataIndex] = <Skeleton.Input className='table-skeleton' active={true} />;
        })
        setTableData(Array.from({ length: length }, v => skeletonObj));
    }, []);

    return (
        <Table className='table-responsive' scroll={{ x: true }} rowSelection={rowSelection} sortDirections={false} columns={columns} dataSource={loading ? tableData : data} pagination={false} onChange={onChange} />
    )
}
