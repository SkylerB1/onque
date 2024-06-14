import React from "react";

const InstaReel = ({ width, height, fill = "#000000" }) => {
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
          d="M27 4H5C3.346 4 2 5.346 2 7v18c0 1.654 1.346 3 3 3h22c1.654 0 3-1.346 3-3V7c0-1.654-1.346-3-3-3zm0 22H5c-.551 0-1-.448-1-1V11h24v14c0 .552-.449 1-1 1zM5 6h2.491l1.715 3H4V7c0-.552.449-1 1-1zm23 1v2h-3.491l-1.715-3H27c.551 0 1 .448 1 1zM13.991 6l1.715 3h-4.197L9.794 6zm6.5 0 1.715 3h-4.197l-1.715-3z"
          fill={fill}
          data-original="#000000"
        ></path>
        <path
          d="m21.353 16.768-6.706-3.872a1.98 1.98 0 0 0-2 0c-.626.363-1 1.01-1 1.733v7.742c0 .723.374 1.37 1 1.733.314.18.657.27 1 .27.344 0 .687-.09 1-.27l6.706-3.872c.626-.36 1-1.008 1-1.732s-.374-1.371-1-1.732zm-7.706 5.603V14.63l6.706 3.871z"
          fill={fill}
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
};

export default InstaReel;
