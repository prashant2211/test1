import React, { useEffect, useState } from 'react'

const Task = ({ active }) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
        setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    }, [active])
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={primaryColor} className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>


    )
}

export default Task