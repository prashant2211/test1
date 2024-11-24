import React, { useEffect, useState } from 'react'

const Eye = ({active}) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
      setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())      
    }, [active])
    
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9999 9.50474C14.209 9.50474 15.9999 11.2956 15.9999 13.5047C15.9999 15.7139 14.209 17.5047 11.9999 17.5047C9.79073 17.5047 7.99987 15.7139 7.99987 13.5047C7.99987 11.2956 9.79073 9.50474 11.9999 9.50474ZM11.9999 11.0047C10.6192 11.0047 9.49987 12.124 9.49987 13.5047C9.49987 14.8854 10.6192 16.0047 11.9999 16.0047C13.3806 16.0047 14.4999 14.8854 14.4999 13.5047C14.4999 12.124 13.3806 11.0047 11.9999 11.0047ZM11.9999 6.00012C16.6134 6.00012 20.596 9.15013 21.701 13.5645C21.8016 13.9663 21.5574 14.3736 21.1556 14.4742C20.7537 14.5747 20.3465 14.3306 20.2459 13.9287C19.307 10.1781 15.9212 7.50012 11.9999 7.50012C8.07681 7.50012 4.68997 10.1804 3.75273 13.9333C3.65237 14.3351 3.24523 14.5795 2.84336 14.4792C2.44149 14.3788 2.19707 13.9717 2.29743 13.5698C3.40052 9.15284 7.38436 6.00012 11.9999 6.00012Z" fill={primaryColor} />
        </svg>
    )
}

export default Eye