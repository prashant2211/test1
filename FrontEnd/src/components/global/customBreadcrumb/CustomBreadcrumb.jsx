import React from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function CustomBreadcrumb({ title, parent }) {

    const navigate = useNavigate();
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim();
    const createItems = (items) => {
        return items?.map((item, index) => {
            console.log(item)
                return ({
                    title: (
                        <p key={index} className='cursor-pointer' onClick={() => navigate(item.path)}>
                            {item.title}
                        </p>
                    )
                })
        });
    };

    let items = [
        {
            title: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={primaryColor} onClick={() => navigate('/dashboard')} class="size-5 cursor-pointer opacity-65">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>,
        },
        ...createItems(parent ? parent : []),
        {
            title: title,
        },
    ]

    const separator = <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mt-1">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
        </svg>

    </>

    return (<Breadcrumb separator={separator} items={items} />)
}