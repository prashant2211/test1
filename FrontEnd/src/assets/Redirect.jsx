import React from 'react'

export default function Redirect() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--theme')?.trim()

    return (
        <svg className='size-5' viewBox="0 0 30 30" fill={"none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M25 3.75V2.75H26V3.75H25ZM13.2071 16.9571C12.8166 17.3476 12.1834 17.3476 11.7929 16.9571C11.4024 16.5666 11.4024 15.9334 11.7929 15.5429L13.2071 16.9571ZM24 13.75V3.75H26V13.75H24ZM25 4.75H15V2.75H25V4.75ZM25.7071 4.45711L13.2071 16.9571L11.7929 15.5429L24.2929 3.04289L25.7071 4.45711Z" fill={primaryColor} />
            <path d="M23.75 18.75V19C23.75 21.8284 23.75 23.2426 22.8713 24.1213C21.9926 25 20.5784 25 17.75 25H9.75C6.92157 25 5.50736 25 4.62868 24.1213C3.75 23.2426 3.75 21.8284 3.75 19V11C3.75 8.17157 3.75 6.75736 4.62868 5.87868C5.50736 5 6.92157 5 9.75 5H10" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
        </svg>
    )
}
