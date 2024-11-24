import React from 'react'

const RuleSetting = () => {
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim()
    return (
        <svg width="20" height="26" viewBox="0 0 20 26" fill='none' xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 3.52631C16.3057 3.52631 17.2086 3.52631 17.8572 3.95207C18.138 4.13639 18.379 4.37323 18.5666 4.64908C19 5.28628 19 6.17331 19 7.94737V19.9474C19 22.3292 19 23.5201 18.2468 24.2601C17.4937 25 16.2815 25 13.8571 25H6.14286C3.71849 25 2.50631 25 1.75315 24.2601C1 23.5201 1 22.3292 1 19.9474V7.94737C1 6.17331 1 5.28628 1.43336 4.64908C1.62097 4.37323 1.86204 4.13639 2.14282 3.95207C2.79139 3.52631 3.69426 3.52631 5.5 3.52631" stroke={primaryColor} stroke-width="2" />
            <path d="M6.14258 3.52632C6.14258 2.13107 7.29385 1 8.71401 1H11.2854C12.7056 1 13.8569 2.13107 13.8569 3.52632C13.8569 4.92156 12.7056 6.05263 11.2854 6.05263H8.71401C7.29385 6.05263 6.14258 4.92156 6.14258 3.52632Z" stroke={primaryColor} stroke-width="2" />
            <path d="M6.14258 12.3684L13.8569 12.3684" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
            <path d="M6.14258 17.4211L11.2854 17.4211" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
        </svg>

    )
}

export default RuleSetting