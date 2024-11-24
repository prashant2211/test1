import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useLocation } from "react-router-dom";

const CustomHeader = ({ collapsed, setCollapsed, isDrawerOpen, setIsDrawerOpen, title, }) => {
  const { pathname } = useLocation();

  const replaceUnderscoreWithSpace = (str) => {
    return str.replace(/_/g, " ");
  };

  return (
    <div className="header flex justify-between items-center border-b px-4 py-[17px]">
      <div className="flex items-center">
        <svg
          onClick={() => setCollapsed(!collapsed)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer hidden lg:block"
        >
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer lg:hidden"
        >
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
        {/* <p className="ml-4 text-lg font-bold text-[#2F2B3D] uppercase">{replaceUnderscoreWithSpace(pathname?.substring(1))}</p> */}
        <p className="ml-4 text-lg font-bold text-[#2F2B3D] uppercase hidden md:block">
          {title}
        </p>
      </div>
    </div>
  );
};

export default CustomHeader;
