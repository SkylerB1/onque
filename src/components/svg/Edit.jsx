import React from "react";

const Edit = ({ width, height, fill = "#000000" }) => {
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
      viewBox="0 0 512 512"
      xml:space="preserve"
      className=""
    >
      <g>
        <g data-name="Layer 2">
          <path
            d="M192 268.17a160 160 0 0 0-46.47 98.26 160 160 0 0 0 98.3-46.43l65.52-65.53-51.78-51.78zM330.57 144.83a36.51 36.51 0 0 0-25.9 10.71l-25.89 25.89 51.79 51.79 25.89-25.89a36.61 36.61 0 0 0-25.89-62.5z"
            fill={fill}
            data-original="#000000"
            className=""
          ></path>
          <path
            d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm121.67 228.54L341.18 265 265 341.17a191.22 191.22 0 0 1-135.23 56 15 15 0 0 1-15-15 191.22 191.22 0 0 1 56-135.23l112.69-112.61a66.62 66.62 0 0 1 94.21 94.21z"
            fill={fill}
            data-original="#000000"
            className=""
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default Edit;
