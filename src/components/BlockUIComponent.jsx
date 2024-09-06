import React, { useState } from "react";
import { useAppContext } from "../context/AuthContext";
import LoadingSVG from "../assets/LoadingSVG";

const BlockUIComponent = ({}) => {
  const { blockUI, setblockUI } = useAppContext();

  const handleButtonClick = () => {
    setblockUI(true);
    // Simulate an async operation
    // setTimeout(() => {
    //   setblockUI(false);
    // }, 3000);
  };

  return (
    <>
      {" "}
      {/* <div className="relative min-h-screen flex items-center justify-center"> */}
      {/* <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Start Operation
      </button> */}
      {blockUI && (
        <div className="fixed inset-0 bg-white-700 bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-64 text-black font-light  text-center   p-5 rounded-lg shadow-lg">
            <LoadingSVG fill="rgb(203 213 225)" />
            <p className="text-gray-500">Loading, please wait...</p>
          </div>
        </div>
      )}{" "}
      {/* </div> */}
    </>
  );
};

export default BlockUIComponent;
