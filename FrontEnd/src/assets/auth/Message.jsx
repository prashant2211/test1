import React, { useEffect, useState } from 'react'

const Message = ({ active }) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
        setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())

    }, [active])
    return (
        <svg width="24" height="22" viewBox="0 0 24 22" fill='none' xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5.5" width="16" height="11" rx="2" stroke={primaryColor} stroke-width="1.5" />
            <path d="M4 8.25L11.1667 11.5347C11.6958 11.7772 12.3042 11.7772 12.8333 11.5347L20 8.25" stroke={primaryColor} stroke-width="1.5" />
        </svg>

    )
}

export default Message