import React from "react";

const Menu = ({ width, height, fill = "#000000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 32 32"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M29 8H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 28H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 18H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4z"
          fill={fill}
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
};

export default Menu;
