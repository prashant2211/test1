import React from 'react'

const Configuration = () => {
    const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim()
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={primaryColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M9.46305 9.60245C10.7384 9.60245 11.8959 10.121 12.7352 10.9591L12.7381 10.9621C13.5772 11.8031 14.0948 12.9598 14.0948 14.2342C14.0948 15.5134 13.5763 16.6714 12.7381 17.5096L12.6932 17.5507C11.8574 18.3647 10.7174 18.8663 9.46305 18.8663C8.18393 18.8663 7.02583 18.3478 6.18767 17.5096C5.3495 16.6714 4.83097 15.5134 4.83097 14.2342C4.83097 12.9583 5.35009 11.8002 6.18913 10.9606C7.02583 10.121 8.18393 9.60245 9.46305 9.60245ZM20.228 0.0729093C21.3341 0.488784 22.279 1.22925 22.9437 2.17649C23.6075 3.12169 23.9974 4.27307 23.9974 5.51224C23.9974 6.619 23.6856 7.65606 23.1458 8.53914C22.6695 9.31752 22.0139 9.97575 21.2359 10.4564V20.9492C21.2359 21.7871 20.8926 22.5494 20.3405 23.1018L20.3376 23.1047C19.7853 23.6567 19.0229 24 18.185 24C17.3451 24 16.5819 23.6567 16.0298 23.1047L15.987 23.058C15.46 22.5094 15.1345 21.7652 15.1345 20.9492V10.4564C14.3564 9.97575 13.7005 9.31752 13.2246 8.53914C12.6848 7.65606 12.373 6.619 12.373 5.51224C12.373 4.27307 12.7629 3.12169 13.4267 2.17649C14.1056 1.20913 15.0774 0.456704 16.2144 0.0463703C16.5977 -0.0909908 17.0202 0.108781 17.1576 0.491992C17.1871 0.574234 17.2011 0.658225 17.2011 0.740759L17.204 5.74321C17.204 6.0121 17.3148 6.25737 17.4927 6.43527C17.6706 6.61317 17.9159 6.72399 18.1848 6.72399C18.4542 6.72399 18.6998 6.61317 18.8777 6.43527C19.0556 6.25737 19.1664 6.01181 19.1664 5.74321V0.740759C19.1664 0.331883 19.4983 0 19.9072 0C20.0221 0 20.1308 0.0262474 20.228 0.0729093ZM21.734 3.02749C21.4383 2.60578 21.0699 2.23919 20.6479 1.94639V5.74321C20.6479 6.42098 20.3709 7.03721 19.9252 7.48283C19.4796 7.92845 18.8634 8.20551 18.1853 8.20551C17.5067 8.20551 16.8908 7.92845 16.4451 7.48283C15.9995 7.03721 15.7225 6.42127 15.7225 5.74321V1.94639C15.3005 2.23919 14.9321 2.60578 14.6364 3.02749C14.1441 3.72887 13.8545 4.58629 13.8545 5.51224C13.8545 6.34107 14.0858 7.1142 14.4862 7.76922C14.8919 8.4324 15.4696 8.97805 16.1552 9.34231C16.4253 9.45284 16.616 9.71823 16.616 10.0282V20.9492C16.616 21.3653 16.7794 21.7451 17.045 22.0268L17.0774 22.0571C17.3617 22.3415 17.7543 22.5185 18.185 22.5185C18.6172 22.5185 19.0101 22.342 19.2944 22.0586C19.5782 21.7739 19.7543 21.3811 19.7543 20.9492V10.0282H19.7576C19.7578 9.76023 19.9045 9.50154 20.1594 9.37147C20.8696 9.00751 21.4674 8.45048 21.8842 7.76922C22.2846 7.1142 22.5159 6.34107 22.5159 5.51224C22.5159 4.58629 22.2263 3.72887 21.734 3.02749ZM12.6696 19.6572C13.021 19.4496 13.4748 19.5662 13.6825 19.9177C13.8901 20.2691 13.7734 20.7229 13.422 20.9305C13.1088 21.116 12.7801 21.2811 12.4401 21.4219L12.4004 21.4371C12.2549 21.4963 12.1062 21.5517 11.9548 21.6027V22.9565C11.9548 23.3654 11.6229 23.6973 11.214 23.6973H7.71176C7.30289 23.6973 6.97101 23.3654 6.97101 22.9565V21.6045C6.80973 21.5494 6.64933 21.4887 6.4898 21.4228C6.3259 21.356 6.16725 21.2837 6.01181 21.2067L5.05757 22.1612C4.77002 22.4502 4.30194 22.4517 4.01293 22.1641L1.53343 19.6876C1.24442 19.3985 1.24442 18.929 1.53343 18.64L2.49087 17.6858C2.41359 17.5297 2.34126 17.3711 2.27448 17.2095C2.20857 17.0503 2.14762 16.889 2.09221 16.7263H0.740759C0.331883 16.7263 0 16.3944 0 15.9855V12.4832C0 12.0744 0.331883 11.7425 0.740759 11.7425H2.09366C2.14937 11.5765 2.20974 11.415 2.27477 11.2581C2.34126 11.0971 2.41359 10.9387 2.49058 10.7833L1.53605 9.82905C1.24704 9.5415 1.24558 9.07342 1.53314 8.78441L4.00972 6.30491C4.29873 6.01589 4.76827 6.01589 5.05728 6.30491L6.01414 7.26177C6.16755 7.18594 6.32532 7.11449 6.4866 7.04771C6.64612 6.98034 6.80769 6.91939 6.97101 6.86368V5.51224C6.97101 5.10336 7.30289 4.77148 7.71176 4.77148H11.214C11.6229 4.77148 11.9548 5.10336 11.9548 5.51224V7.41546C11.9548 7.82434 11.6229 8.15622 11.214 8.15622C10.8052 8.15622 10.4733 7.82434 10.4733 7.41546V6.253H8.45252V7.41546C8.45252 7.74647 8.22942 8.04802 7.89404 8.13318C7.60153 8.20784 7.32039 8.30204 7.05325 8.41257C6.7934 8.51873 6.53997 8.64559 6.29237 8.78995C6.00452 8.9836 5.61023 8.95297 5.35592 8.69867L4.5335 7.87625L3.10302 9.30673L3.89948 10.1029C4.15496 10.3336 4.22203 10.7197 4.04005 11.0277C3.88898 11.2829 3.75483 11.5494 3.6408 11.825C3.53348 12.0834 3.44424 12.3447 3.37454 12.6043C3.3165 12.9557 3.01145 13.224 2.64369 13.224H1.48152V15.2448H2.64398C2.97499 15.2448 3.27654 15.4679 3.3617 15.8032C3.43636 16.0955 3.53027 16.3763 3.64051 16.6426C3.75483 16.9188 3.88928 17.1865 4.04034 17.4414C4.20774 17.7257 4.16896 18.0981 3.92456 18.3414L3.10331 19.1623L4.53525 20.5943L5.33142 19.7978C5.56211 19.5423 5.94823 19.4752 6.2562 19.6572C6.51109 19.8083 6.77823 19.9425 7.05383 20.0568C7.31047 20.1641 7.58461 20.2557 7.87392 20.3303C8.20492 20.4044 8.45252 20.7001 8.45252 21.0533V22.2158H10.4733V21.0533C10.4762 20.724 10.6981 20.4237 11.0318 20.3385C11.3042 20.2685 11.5742 20.1787 11.8384 20.0714L11.8731 20.0559C12.1484 19.9419 12.4153 19.8077 12.6696 19.6572ZM11.6906 12.0038C11.1228 11.4357 10.3348 11.084 9.46305 11.084C8.59309 11.084 7.80538 11.4366 7.23523 12.0067C6.6642 12.5745 6.31249 13.3625 6.31249 14.2342C6.31249 15.1042 6.66508 15.8919 7.23523 16.4621C7.80538 17.0322 8.59309 17.3848 9.46305 17.3848C10.3175 17.3848 11.0918 17.0468 11.657 16.4979L11.6906 16.4621C12.2607 15.8919 12.6133 15.1042 12.6133 14.2342C12.6133 13.3625 12.2616 12.5745 11.6935 12.0067L11.6906 12.0038Z" />
        </svg>

    )
}

export default Configuration