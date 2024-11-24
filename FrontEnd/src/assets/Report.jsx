import React, { useEffect, useState } from 'react'

const Report = ({active}) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
      setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())      
    }, [active])
    return (
        <svg width="20" height="20" viewBox="0 0 25 25" fill={primaryColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.57942 0.12999C6.28851 0.228523 6.04452 0.411514 5.87561 0.65081C5.66447 0.965179 5.61755 1.20448 5.61755 2.06313V2.8467L5.04511 2.87486C4.72605 2.88424 4.29907 2.93116 4.09262 2.97808C2.33309 3.34876 0.859774 4.64846 0.28734 6.32354C-0.529083 8.71181 0.437486 11.2643 2.63807 12.5218C3.34189 12.9253 4.3413 13.1834 5.20464 13.1834H5.61755L5.62693 18.096L5.64101 23.0133L5.73954 23.2291C5.87092 23.5106 6.1759 23.8156 6.45743 23.947L6.67326 24.0455H14.814H22.9548L23.1706 23.947C23.4522 23.8156 23.7571 23.5106 23.8885 23.2291L23.987 23.0133L24.0011 14.1452C24.0058 9.26547 24.0011 5.20213 23.987 5.11298C23.9589 4.97222 23.607 4.59685 21.58 2.56987C20.2756 1.26078 19.1354 0.15345 19.0557 0.115913C18.9243 0.0549164 18.1595 0.0455322 12.8574 0.0455322C7.25039 0.0502243 6.79526 0.0549164 6.57942 0.12999ZM18.38 3.16577V5.34758L18.5161 5.49773L18.6521 5.65257L20.8621 5.66665L23.0721 5.68072L23.0627 14.2625L23.0486 22.8491L22.9173 22.9757L22.7906 23.1071H14.814H6.83749L6.7108 22.9757L6.57942 22.8491V17.9177V12.9863L6.93133 12.8549C7.65391 12.5922 8.24511 12.2074 8.82224 11.6256C9.46505 10.9828 9.90611 10.1945 10.1595 9.24671C10.2627 8.84788 10.2768 8.70242 10.2768 8.02207C10.2768 7.34172 10.2627 7.19626 10.1595 6.79744C9.90611 5.84964 9.46505 5.06137 8.82224 4.41855C8.24511 3.83673 7.65391 3.45198 6.93133 3.18453L6.57942 3.05785V2.16635C6.57942 1.34055 6.58411 1.26547 6.67326 1.17163C6.72488 1.11533 6.80933 1.04964 6.86095 1.02618C6.91256 1.00741 9.52605 0.98864 12.6697 0.98864L18.38 0.983948V3.16577ZM20.8668 3.21269L22.3917 4.73761H20.8527H19.3184V3.21269C19.3184 2.3728 19.3231 1.68776 19.3325 1.68776C19.3372 1.68776 20.0269 2.3728 20.8668 3.21269ZM4.68851 6.02794L4.70259 8.20975L4.83397 8.33644L4.96065 8.46782L7.14247 8.4819L9.32429 8.49597V8.5992C9.32429 8.66019 9.28206 8.87134 9.23045 9.0731C8.84101 10.5558 7.69614 11.7054 6.20406 12.1089C5.66447 12.259 4.63221 12.259 4.09262 12.1089C2.62869 11.71 1.45567 10.537 1.06153 9.07779C0.925463 8.58512 0.911387 7.55286 1.03338 7.06958C1.35713 5.77925 2.21109 4.73761 3.39819 4.18864C3.76417 4.01973 4.32722 3.85081 4.54775 3.85081L4.67444 3.84612L4.68851 6.02794ZM6.20875 3.93996C7.33954 4.22618 8.39995 5.09421 8.92546 6.1687C9.12722 6.57222 9.32429 7.21034 9.32429 7.44494V7.55286H7.47092H5.61755V5.69949V3.84612H5.72546C5.78646 3.84612 6.0023 3.88835 6.20875 3.93996Z" />
            <path d="M11.8292 2.90787C11.679 2.96886 11.5289 3.1847 11.5289 3.33485C11.5289 3.4193 11.5805 3.52722 11.6649 3.62106L11.801 3.7759L14.4567 3.78998L17.1078 3.79936L17.2626 3.66329C17.3893 3.55068 17.4174 3.49438 17.4174 3.33015C17.4174 3.16593 17.3893 3.10963 17.2626 2.99702L17.1124 2.86095L14.5177 2.86564C13.096 2.86564 11.8808 2.88441 11.8292 2.90787Z" />
            <path d="M11.8292 4.78456C11.679 4.84556 11.5289 5.06139 11.5289 5.21154C11.5289 5.296 11.5805 5.40392 11.6649 5.49776L11.801 5.6526L14.4567 5.66667L17.1078 5.67606L17.2626 5.53999C17.3893 5.42738 17.4174 5.37107 17.4174 5.20685C17.4174 5.04262 17.3893 4.98632 17.2626 4.87371L17.1124 4.73764L14.5177 4.74233C13.096 4.74233 11.8808 4.7611 11.8292 4.78456Z" />
            <path d="M11.5465 7.60055C11.3965 7.66149 11.2465 7.87711 11.2465 8.02711C11.2465 8.21461 11.4621 8.43961 11.6731 8.47242C11.8184 8.49586 11.87 8.47711 12.0012 8.35992C12.1325 8.24274 12.1606 8.18649 12.1606 8.02242C12.1606 7.85836 12.1325 7.80211 12.0059 7.68961C11.8512 7.55367 11.7246 7.52555 11.5465 7.60055Z" />
            <path d="M13.4241 7.59976C13.2739 7.66076 13.1238 7.87659 13.1238 8.02674C13.1238 8.1112 13.1754 8.21912 13.2598 8.31296L13.3959 8.4678L17.1308 8.48187L20.861 8.49126L21.0159 8.35519C21.1425 8.24258 21.1707 8.18627 21.1707 8.02205C21.1707 7.85783 21.1425 7.80152 21.0159 7.68891L20.8657 7.55284L17.1918 7.55753C15.1742 7.55753 13.4757 7.5763 13.4241 7.59976Z" />
            <path d="M11.5465 9.47735C11.3965 9.53829 11.2465 9.75391 11.2465 9.90391C11.2465 10.0914 11.4621 10.3164 11.6731 10.3492C11.8184 10.3727 11.87 10.3539 12.0012 10.2367C12.1325 10.1195 12.1606 10.0633 12.1606 9.89922C12.1606 9.73516 12.1325 9.67891 12.0059 9.56641C11.8512 9.43047 11.7246 9.40235 11.5465 9.47735Z" fill="#8D5AE2" />
            <path d="M13.4241 9.47668C13.2739 9.53767 13.1238 9.75351 13.1238 9.90366C13.1238 9.98811 13.1754 10.096 13.2598 10.1899L13.3959 10.3447L17.1308 10.3588L20.861 10.3682L21.0159 10.2321C21.1425 10.1195 21.1707 10.0632 21.1707 9.89896C21.1707 9.73474 21.1425 9.67844 21.0159 9.56583L20.8657 9.42976L17.1918 9.43445C15.1742 9.43445 13.4757 9.45322 13.4241 9.47668Z" />
            <path d="M20.1381 12.6064C19.3451 12.8926 18.9744 13.7512 19.3123 14.5207L19.4061 14.7319L17.7967 16.4633L16.1826 18.19L15.8401 18.1853C15.6477 18.1806 15.4178 18.1993 15.3287 18.2181L15.1645 18.2556L14.4513 17.3641L13.7334 16.4727L13.8084 16.1771C13.9398 15.6609 13.8178 15.1917 13.4518 14.8257C12.4853 13.8592 10.8337 14.7272 11.1011 16.0598C11.134 16.2193 11.1621 16.3741 11.1668 16.4023C11.1715 16.4304 10.8008 16.8668 10.3363 17.3688L9.49642 18.2838L9.28058 18.2181C8.82545 18.0773 8.27178 18.2228 7.91518 18.5794C7.62897 18.8656 7.51636 19.1378 7.51636 19.5647C7.51636 19.9917 7.62897 20.2639 7.91518 20.5501C8.88175 21.5166 10.5334 20.6486 10.2659 19.3161C10.2331 19.1565 10.2049 19.0017 10.2002 18.9735C10.1955 18.9454 10.5662 18.509 11.0307 18.007L11.8706 17.092L12.0864 17.1577C12.2929 17.2234 12.6307 17.2187 12.9357 17.1436C13.0436 17.1202 13.1187 17.1999 13.7662 18.0117L14.4841 18.9032L14.409 19.1988C14.2354 19.8791 14.5545 20.5595 15.1832 20.8457C15.4835 20.9864 16.0184 20.9864 16.3187 20.8457C16.6002 20.719 16.9052 20.414 17.0319 20.1325C17.1727 19.8275 17.1727 19.2973 17.0319 18.9876L16.9287 18.7671L18.5381 17.0404L20.1427 15.3184H20.5416C21.0155 15.3184 21.2688 15.2199 21.5691 14.9196C21.8554 14.6334 21.968 14.3612 21.968 13.9342C21.968 13.5073 21.8554 13.2351 21.5691 12.9489C21.1938 12.5735 20.6166 12.4375 20.1381 12.6064ZM20.9123 13.6293C21.0765 13.7982 21.0718 14.075 20.8982 14.2486C20.6166 14.5348 20.1381 14.3378 20.1381 13.9389C20.1381 13.5213 20.612 13.329 20.9123 13.6293ZM12.7949 15.5061C12.9732 15.6891 12.9592 15.9659 12.7527 16.1489C12.6213 16.2662 12.5697 16.285 12.4243 16.2615C12.3164 16.2474 12.2084 16.1817 12.1193 16.0879C12.0114 15.9659 11.9926 15.9096 12.0114 15.7735C12.0771 15.37 12.5087 15.2246 12.7949 15.5061ZM9.19143 19.2316C9.5058 19.5131 9.32281 20.0105 8.90052 20.0105C8.40785 20.0105 8.28117 19.3254 8.7363 19.1378C8.90991 19.0674 9.03659 19.0955 9.19143 19.2316ZM16.0794 19.2598C16.3515 19.5366 16.1451 20.0105 15.751 20.0105C15.385 20.0105 15.1598 19.5882 15.3756 19.3161C15.5727 19.0674 15.8636 19.0439 16.0794 19.2598Z" />
            <path d="M2.1694 7.59525C2.00518 7.66563 1.90195 7.82516 1.87849 8.03631C1.84096 8.36944 1.98641 8.98411 2.22571 9.47677C2.4087 9.85683 2.50254 9.98352 2.84976 10.3307C3.18759 10.6686 3.33304 10.7718 3.69902 10.9454C4.15415 11.1659 4.69374 11.3067 5.08319 11.3067C5.26618 11.3067 5.32248 11.2832 5.45855 11.1472C5.67439 10.9313 5.67439 10.7436 5.45855 10.5278C5.32717 10.3964 5.26618 10.3683 5.09257 10.3683C4.57644 10.3683 3.91017 10.0774 3.50195 9.66915C3.09374 9.26094 2.80283 8.59466 2.80283 8.07853C2.80283 7.90493 2.77468 7.84393 2.6433 7.71255C2.48377 7.55302 2.35709 7.52018 2.1694 7.59525Z" />
        </svg>

    )
}

export default Report