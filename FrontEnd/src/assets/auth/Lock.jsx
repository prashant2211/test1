import React, { useEffect, useState } from 'react';

const Lock = ({ active }) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
        setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())

    }, [active])
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.66675 12.25C3.66675 10.3644 3.66675 9.42157 4.25253 8.83579C4.83832 8.25 5.78113 8.25 7.66675 8.25H14.3334C16.219 8.25 17.1618 8.25 17.7476 8.83579C18.3334 9.42157 18.3334 10.3644 18.3334 12.25V13.25C18.3334 16.0784 18.3334 17.4926 17.4547 18.3713C16.5761 19.25 15.1618 19.25 12.3334 19.25H9.66675C6.83832 19.25 5.42411 19.25 4.54543 18.3713C3.66675 17.4926 3.66675 16.0784 3.66675 13.25V12.25Z" stroke={primaryColor} stroke-width="1.5" />
            <path d="M14.6668 7.33333V6.41667C14.6668 4.39162 13.0252 2.75 11.0002 2.75V2.75C8.97512 2.75 7.3335 4.39162 7.3335 6.41667V7.33333"
                stroke={primaryColor} stroke-width="1.5" stroke-linecap="round" />
            <circle cx="11.0001" cy="13.75" r="1.83333" fill={primaryColor} />
        </svg>

    )
}

export default Lock