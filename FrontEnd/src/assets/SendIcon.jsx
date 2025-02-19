import React, { useEffect, useState } from "react";

const SendIcon = ({ active }) => {
  const [primaryColor, setPrimaryColor] = useState(
    active
      ? "#fff"
      : getComputedStyle(document.documentElement)
          .getPropertyValue("--theme")
          ?.trim()
  );
  useEffect(() => {
    setPrimaryColor(
      active
        ? "#fff"
        : getComputedStyle(document.documentElement)
            .getPropertyValue("--theme")
            ?.trim()
    );
  }, [active]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill='none'
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={primaryColor}
      className="w-6 h-6 cursor-pointer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"    
      />
    </svg>
  );
};

export default SendIcon;
