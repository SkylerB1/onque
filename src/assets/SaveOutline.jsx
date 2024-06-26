import React from "react";

const SaveOutline = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 32 32"
      xml:space="preserve"
      className=""
    >
      <g>
        <path
          d="M21 2H11a5.006 5.006 0 0 0-5 5v22a1 1 0 0 0 1.614.789L16 23.266l8.386 6.523A1 1 0 0 0 26 29V7a5.006 5.006 0 0 0-5-5zm3 24.955-7.386-5.744a1 1 0 0 0-1.228 0L8 26.955V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"
          fill={fill}
        ></path>
      </g>
    </svg>
  );
};

export default SaveOutline;
