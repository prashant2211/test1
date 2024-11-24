import React from 'react'

const DepositWallet = () => {
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim()
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill='none' xmlns="http://www.w3.org/2000/svg">
            <path d="M25 25L1 25" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
            <path d="M22.333 25L3.66634 25L3.66634 5.09941C3.66634 5.06272 3.66634 5.04438 3.67049 5.02712C3.67416 5.01181 3.68022 4.99718 3.68844 4.98376C3.69772 4.96862 3.71069 4.95565 3.73663 4.92971L7.59605 1.07029C7.62199 1.04435 7.63496 1.03138 7.6501 1.0221C7.66352 1.01388 7.67815 1.00782 7.69346 1.00415C7.71072 1 7.72906 1 7.76575 1L19.133 1C20.2531 0.999999 20.8132 0.999999 21.241 1.21799C21.6173 1.40973 21.9233 1.71569 22.115 2.09202C22.333 2.51984 22.333 3.07989 22.333 4.2L22.333 25Z" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
            <path d="M10.333 1L10.333 7.51667C10.333 7.59951 10.2659 7.66667 10.183 7.66667L3.66634 7.66667" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
            <path d="M13 11.6667L13 19.6667" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
            <path d="M17 15.6667L13.1061 19.5606C13.0475 19.6192 12.9525 19.6192 12.8939 19.5606L9 15.6667" stroke={primaryColor} stroke-width="2" stroke-linecap="round" />
        </svg>

    )
}

export default DepositWallet