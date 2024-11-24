import React, { useEffect, useState } from 'react'

const MyTeam = ({active}) => {
    const [primaryColor, setPrimaryColor] = useState(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
    useEffect(() => {
      setPrimaryColor(active ? "#fff" : (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim())
      
    }, [active])
    return (
        <svg width="24" height="24" viewBox="0 0 30 24" fill={primaryColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M26.182 8.00416C26.8058 7.3429 27.2282 6.50435 27.3962 5.5938C27.5641 4.68324 27.4702 3.74127 27.1261 2.88615C26.7821 2.03104 26.2033 1.3009 25.4623 0.787422C24.7214 0.273939 23.8514 0 22.9616 0C22.0718 0 21.2018 0.273939 20.4608 0.787422C19.7199 1.3009 19.1411 2.03104 18.7971 2.88615C18.453 3.74127 18.3591 4.68324 18.527 5.5938C18.695 6.50435 19.1174 7.3429 19.7412 8.00416C19.4416 8.16535 19.1535 8.34851 18.8788 8.55227C18.481 7.85119 17.9147 7.27025 17.2358 6.86669C16.5569 6.46313 15.7888 6.2509 15.0072 6.2509C14.2255 6.2509 13.4574 6.46313 12.7785 6.86669C12.0996 7.27025 11.5333 7.85119 11.1355 8.55227C10.8609 8.34851 10.5727 8.16535 10.2731 8.00416C10.8969 7.3429 11.3193 6.50435 11.4873 5.5938C11.6553 4.68324 11.5613 3.74127 11.2173 2.88615C10.8732 2.03104 10.2944 1.3009 9.55347 0.787422C8.81254 0.273939 7.94255 0 7.05272 0C6.16289 0 5.2929 0.273939 4.55197 0.787422C3.81105 1.3009 3.23222 2.03104 2.88818 2.88615C2.54413 3.74127 2.45019 4.68324 2.61816 5.5938C2.78613 6.50435 3.20852 7.3429 3.8323 8.00416C2.68075 8.61909 1.71396 9.55259 1.03795 10.7023C0.361938 11.852 0.00282771 13.1735 0 14.5218V16.0133C-1.01248e-06 16.4754 0.17594 16.9187 0.489219 17.2458C0.802497 17.573 1.22752 17.7573 1.67104 17.7583H5.7395V15.5211H2.16126V14.5218C2.1622 13.1719 2.67626 11.8773 3.59096 10.9214C4.50566 9.96543 5.74651 9.42597 7.04199 9.42104C7.68248 9.41976 8.31684 9.55093 8.90834 9.80695C9.49983 10.063 10.0367 10.4387 10.4878 10.9125C10.4878 10.9125 10.4878 10.9423 10.4878 10.9572C10.4881 12.11 10.8957 13.2223 11.6329 14.0818C10.5372 14.6247 9.61104 15.479 8.9609 16.5463C8.31076 17.6136 7.96312 18.8506 7.95802 20.1148V22.3221C7.95896 22.7668 8.12891 23.193 8.43068 23.5075C8.73245 23.8219 9.14146 23.999 9.56823 24H20.4318C20.8585 23.999 21.2676 23.8219 21.5693 23.5075C21.8711 23.193 22.041 22.7668 22.042 22.3221V20.1148C22.0379 18.8504 21.6911 17.6129 21.0416 16.5449C20.392 15.4769 19.4662 14.6218 18.3707 14.0781C19.1079 13.2186 19.5155 12.1063 19.5157 10.9535C19.5157 10.9535 19.5157 10.9237 19.5157 10.9088C19.9669 10.435 20.5037 10.0592 21.0952 9.80322C21.6867 9.5472 22.3211 9.41604 22.9616 9.41731C24.2595 9.41928 25.5037 9.95795 26.4208 10.915C27.3379 11.8721 27.8531 13.1693 27.8531 14.5218V15.5248H24.2748V17.762H28.329C28.7725 17.761 29.1975 17.5767 29.5108 17.2496C29.8241 16.9224 30 16.4792 30 16.017V14.5255C29.9992 13.1781 29.6425 11.8569 28.9691 10.7066C28.2957 9.55638 27.3314 8.62141 26.182 8.00416ZM4.67319 4.7155C4.67319 4.2273 4.81211 3.75007 5.0724 3.34415C5.33269 2.93824 5.70264 2.62186 6.13549 2.43504C6.56833 2.24821 7.04461 2.19933 7.50411 2.29457C7.96362 2.38981 8.3857 2.6249 8.71698 2.97011C9.04826 3.31531 9.27387 3.75513 9.36527 4.23395C9.45667 4.71276 9.40976 5.20907 9.23047 5.6601C9.05118 6.11113 8.74757 6.49664 8.35802 6.76786C7.96847 7.03909 7.51049 7.18386 7.04199 7.18386C6.41403 7.18287 5.81207 6.92249 5.36804 6.4598C4.92401 5.99711 4.67413 5.36985 4.67319 4.7155ZM15 8.48515C15.4685 8.48515 15.9265 8.62992 16.316 8.90114C16.7056 9.17237 17.0092 9.55787 17.1885 10.0089C17.3678 10.4599 17.4147 10.9562 17.3233 11.4351C17.2319 11.9139 17.0063 12.3537 16.675 12.6989C16.3437 13.0441 15.9216 13.2792 15.4621 13.3744C15.0026 13.4697 14.5263 13.4208 14.0935 13.234C13.6607 13.0471 13.2907 12.7308 13.0304 12.3249C12.7701 11.9189 12.6312 11.4417 12.6312 10.9535C12.6322 10.2992 12.882 9.6719 13.3261 9.2092C13.7701 8.74651 14.372 8.48614 15 8.48515ZM19.895 20.1148V21.7628H10.105V20.1148C10.105 18.9281 10.5574 17.79 11.3626 16.9509C12.1679 16.1118 13.26 15.6404 14.3989 15.6404H15.6369C16.7695 15.6502 17.8525 16.126 18.6501 16.964C19.4476 17.8021 19.8951 18.9345 19.895 20.1148ZM20.5892 4.7155C20.5892 4.2273 20.7281 3.75007 20.9884 3.34415C21.2487 2.93824 21.6187 2.62186 22.0515 2.43504C22.4844 2.24821 22.9606 2.19933 23.4201 2.29457C23.8796 2.38981 24.3017 2.6249 24.633 2.97011C24.9643 3.31531 25.1899 3.75513 25.2813 4.23395C25.3727 4.71276 25.3258 5.20907 25.1465 5.6601C24.9672 6.11113 24.6636 6.49664 24.274 6.76786C23.8845 7.03909 23.4265 7.18386 22.958 7.18386C22.3301 7.18287 21.7281 6.92249 21.2841 6.4598C20.84 5.99711 20.5902 5.36985 20.5892 4.7155Z" />
        </svg>

    )
}

export default MyTeam
