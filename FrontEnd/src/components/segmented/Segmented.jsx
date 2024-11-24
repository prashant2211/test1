import React from 'react';
import { Segmented } from 'antd';

export default function MySegmented({ options, value, setValue }) {
    return (
        <Segmented options={options} value={value} onChange={setValue} />
    )
}
