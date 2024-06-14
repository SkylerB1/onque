import React from "react";

const InfoIcon = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 48 48"
      xml:space="preserve"
      className=""
    >
      <g>
        <circle
          cx="24"
          cy="24"
          r="18"
          fill={fill}
          opacity="1"
          data-original="#2196f3"
          className=""
        ></circle>
        <g fill="#fff">
          <circle
            cx="24"
            cy="15.5"
            r="2.5"
            fill="#ffffff"
            opacity="1"
            data-original="#ffffff"
          ></circle>
          <path
            d="M22 21h4v14h-4z"
            fill="#ffffff"
            opacity="1"
            data-original="#ffffff"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default InfoIcon;
