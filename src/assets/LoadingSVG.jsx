import React from "react";

const LoadingSVG = ({ fill = "currentColor" }) => {
  return (
    <>
      <svg
        className="animate-spin h-10 w-10 text-white mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={fill}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={fill}
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
    </>
  );
};
export default LoadingSVG;
