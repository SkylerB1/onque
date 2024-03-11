import React from 'react'

const ShareFilled = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      x="0"
      y="0"
      width={width}
      height={height}
      viewBox="0 0 512 511"
      xml:space="preserve"
    >
      <g>
        <path
          d="M512 233.82 299.223.5v139.203h-45.239C113.711 139.703 0 253.414 0 393.687v73.77l20.094-22.02a360.573 360.573 0 0 1 266.324-117.5h12.805v139.204zm0 0"
          fill={fill}
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
};

export default ShareFilled