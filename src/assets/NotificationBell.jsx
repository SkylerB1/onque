import React from "react";

const NotificationBell = ({ width = 25, height = 25, fill = "#000000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z"
        fill={fill}
      />
    </svg>
  );
};

export default NotificationBell;
