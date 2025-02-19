import React from 'react'

const AssingRule = () => {
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim()
    return (
        <svg width="22" height="26" viewBox="0 0 22 26" fill='none' xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 2.47369C14.5032 2.47369 15.0048 2.47369 15.3651 2.72205C15.5211 2.82956 15.655 2.96772 15.7592 3.12864C16 3.50033 16 4.01777 16 5.05263V12.0526C16 13.442 16 14.1367 15.5816 14.5684C15.1632 15 14.4897 15 13.1429 15H8.85714C7.51027 15 6.83684 15 6.41842 14.5684C6 14.1367 6 13.442 6 12.0526V5.05263C6 4.01777 6 3.50033 6.24076 3.12864C6.34498 2.96772 6.47891 2.82956 6.6349 2.72205C6.99522 2.47369 7.49681 2.47369 8.5 2.47369" stroke={primaryColor} stroke-width="1.4" />
            <path d="M8.85547 2.47368C8.85547 1.65979 9.49506 1 10.284 1H11.7126C12.5016 1 13.1412 1.65979 13.1412 2.47368C13.1412 3.28758 12.5016 3.94737 11.7126 3.94737H10.284C9.49506 3.94737 8.85547 3.28758 8.85547 2.47368Z" stroke={primaryColor} stroke-width="1.4" />
            <path d="M8.85547 7.63156L13.1412 7.63156" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <path d="M8.85547 10.5789L11.7126 10.5789" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <ellipse cx="4.0766" cy="18.7778" rx="1.75824" ry="1.77778" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <path d="M1.11861 23.9433C1.39993 22.6147 2.71886 21.8889 4.07692 21.8889V21.8889C5.43498 21.8889 6.75392 22.6147 7.03524 23.9433C7.06856 24.1007 7.09648 24.2622 7.11684 24.4259C7.15609 24.7414 6.89611 25 6.57819 25H1.57566C1.25773 25 0.99776 24.7414 1.03701 24.4259C1.05737 24.2622 1.08528 24.1007 1.11861 23.9433Z" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <ellipse cx="17.9223" cy="18.7778" rx="1.75824" ry="1.77778" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <path d="M14.9643 23.9433C15.2456 22.6147 16.5646 21.8889 17.9226 21.8889V21.8889C19.2807 21.8889 20.5996 22.6147 20.8809 23.9433C20.9143 24.1007 20.9422 24.2622 20.9625 24.4259C21.0018 24.7414 20.7418 25 20.4239 25H15.4214C15.1034 25 14.8435 24.7414 14.8827 24.4259C14.9031 24.2622 14.931 24.1007 14.9643 23.9433Z" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <path d="M11 15L11 19" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
            <path d="M14 19L8.35897 19" stroke={primaryColor} stroke-width="1.4" stroke-linecap="round" />
        </svg>

    )
}

export default AssingRule