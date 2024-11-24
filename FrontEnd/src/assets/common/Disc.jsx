import React, { useEffect, useState } from 'react'

const Disc = ({active}) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
      setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())      
    }, [active])
    return (
        <svg width="15" height="15" viewBox="0 0 32 32" fill={"#2F2B3DB2"}   id="icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
            <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Z" />
        </svg>
    )
}

export default Disc