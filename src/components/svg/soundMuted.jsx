import React from "react";

const soundMuted = ({ width, height, fill }) => {
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
          d="M17.85 30.8c.25.19.56.28.87.28.23 0 .47-.05.68-.16.5-.26.82-.78.82-1.34V2.42c0-.56-.32-1.08-.82-1.34-.49-.25-1.1-.21-1.55.12L7.29 8.73H2c-.83 0-1.5.68-1.5 1.5v11.54c0 .82.67 1.5 1.5 1.5h5.29zM31.06 12.057a1.5 1.5 0 0 0-2.12 0l-1.822 1.822-1.822-1.822a1.5 1.5 0 1 0-2.121 2.121L24.997 16l-1.822 1.821a1.5 1.5 0 1 0 2.12 2.121l1.823-1.821 1.821 1.821c.293.293.677.44 1.061.44s.768-.147 1.06-.44a1.5 1.5 0 0 0 0-2.12L29.24 16l1.822-1.822a1.5 1.5 0 0 0 0-2.12z"
          fill={fill}
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
};

export default soundMuted;
