import React from "react";

const Instagram = ({ width = 25, height = 25 }) => {
  const svgStyle = {
    enableBackground: "new 0 0 512 512", // Update style properties as needed
    fill: "none", // Example style property
  };

  const linearGradientStyle = {
    stopColor: ["#E09B3D", "#C74C4D", "#C21975", "#7024C4"],
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlnssvgjs="http://svgjs.com/svgjs"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 551.034 551.034"
      style={svgStyle} // Use the object format for styles
      xmlSpace="preserve"
      className=""
    >
      <g>
        <linearGradient
          id="a"
          x1="275.517"
          x2="275.517"
          y1="4.57"
          y2="549.72"
          gradientTransform="matrix(1 0 0 -1 0 554)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            style={{ stopColor: linearGradientStyle.stopColor[0] }}
          />
          <stop
            offset=".3"
            style={{ stopColor: linearGradientStyle.stopColor[1] }}
          />
          <stop
            offset=".6"
            style={{ stopColor: linearGradientStyle.stopColor[2] }}
          />
          <stop
            offset="1"
            style={{ stopColor: linearGradientStyle.stopColor[3] }}
          />
        </linearGradient>
        <path
          d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"
          style={{ fill: "url(#a)" }} // Use object format for style
          fill=""
        ></path>
        <linearGradient
          id="b"
          x1="275.517"
          x2="275.517"
          y1="4.57"
          y2="549.72"
          gradientTransform="matrix(1 0 0 -1 0 554)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            style={{ stopColor: linearGradientStyle.stopColor[0] }}
          />
          <stop
            offset=".3"
            style={{ stopColor: linearGradientStyle.stopColor[1] }}
          />
          <stop
            offset=".6"
            style={{ stopColor: linearGradientStyle.stopColor[2] }}
          />
          <stop
            offset="1"
            style={{ stopColor: linearGradientStyle.stopColor[3] }}
          />
        </linearGradient>
        <path
          d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"
          style={{ fill: "url(#b)" }} // Use object format for style
          fill=""
        ></path>
        <linearGradient
          id="c"
          x1="418.31"
          x2="418.31"
          y1="4.57"
          y2="549.72"
          gradientTransform="matrix(1 0 0 -1 0 554)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            style={{ stopColor: linearGradientStyle.stopColor[0] }}
          />
          <stop
            offset=".3"
            style={{ stopColor: linearGradientStyle.stopColor[1] }}
          />
          <stop
            offset=".6"
            style={{ stopColor: linearGradientStyle.stopColor[2] }}
          />
          <stop
            offset="1"
            style={{ stopColor: linearGradientStyle.stopColor[3] }}
          />
        </linearGradient>
        <circle
          cx="418.31"
          cy="134.07"
          r="34.15"
          style={{ fill: "url(#c)" }} // Use object format for style
          fill=""
        ></circle>
      </g>
    </svg>
  );
};

export default Instagram;

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:svgjs="http://svgjs.com/svgjs"
  width="512"
  height="512"
  x="0"
  y="0"
  viewBox="0 0 551.034 551.034"
  style="enable-background:new 0 0 512 512"
  xml:space="preserve"
  className=""
>
  <g>
    <linearGradient
      id="a"
      x1="275.517"
      x2="275.517"
      y1="4.57"
      y2="549.72"
      gradientTransform="matrix(1 0 0 -1 0 554)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" style="stop-color:#E09B3D"></stop>
      <stop offset=".3" style="stop-color:#C74C4D"></stop>
      <stop offset=".6" style="stop-color:#C21975"></stop>
      <stop offset="1" style="stop-color:#7024C4"></stop>
    </linearGradient>
    <path
      d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"
      style="fill:url(#a);"
      fill=""
    ></path>
    <linearGradient
      id="b"
      x1="275.517"
      x2="275.517"
      y1="4.57"
      y2="549.72"
      gradientTransform="matrix(1 0 0 -1 0 554)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" style="stop-color:#E09B3D"></stop>
      <stop offset=".3" style="stop-color:#C74C4D"></stop>
      <stop offset=".6" style="stop-color:#C21975"></stop>
      <stop offset="1" style="stop-color:#7024C4"></stop>
    </linearGradient>
    <path
      d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"
      style="fill:url(#b);"
      fill=""
    ></path>
    <linearGradient
      id="c"
      x1="418.31"
      x2="418.31"
      y1="4.57"
      y2="549.72"
      gradientTransform="matrix(1 0 0 -1 0 554)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" style="stop-color:#E09B3D"></stop>
      <stop offset=".3" style="stop-color:#C74C4D"></stop>
      <stop offset=".6" style="stop-color:#C21975"></stop>
      <stop offset="1" style="stop-color:#7024C4"></stop>
    </linearGradient>
    <circle
      cx="418.31"
      cy="134.07"
      r="34.15"
      style="fill:url(#c);"
      fill=""
    ></circle>
  </g>
</svg>; */
}
