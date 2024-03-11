import React, { useState } from "react";
import { Radio, Typography } from "@material-tailwind/react";
import ChangePlanModel from "./ChangePlanModel";

const PriceCard = ({ selectedPlanList, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const color = selectedPlanList.color;

  const handleOpen = () => {
    // alert("test");
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="w-96 shadow-lg rounded-2xl dark:bg-gray-800">
        <div
          style={{ backgroundColor: color }} className="rounded-t-2xl text-white p-4"
        >
          <div className="flex flex-1 justify-between items-start">
            <p className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-50">
              {selectedPlanList.title}
            </p>
            {selectedPlanList.recommended === true && (
              <div className="bg-black p-1 flex items-center justify-center -mt-4 rounded-b-md">
                <p>Recommended</p>
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            from{" "}
            {selectedOption === "Monthly"
              ? selectedPlanList.monthly_price
              : selectedPlanList.annualy_price}{" "}
            GBP/
            <span className="text-xl font-medium text-gray-900">
              {" "}
              {selectedOption === "Monthly" ? "Monthly" : "Annualy"}
            </span>
          </p>
          <p className="mt-2 text-xl font-medium text-gray-900">
            with {selectedOption === "Monthly" ? "monthly" : "annualy"} payment
          </p>
        </div>
        <div style={{ borderColor: color }} className={`border p-4`}>
          <ul className="w-full mt-6 mb-6 text-sm text-gray-600 dark:text-gray-100">
            {selectedPlanList.priceBody.map((item, index) => (
              <li className="mb-3 flex items-center" key={index}>
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  fill="#10b981"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ borderColor: color }} className={`border p-4`}>
          {/* Radio buttons here */}
        </div>
        <div
          style={{ backgroundColor: color }}
          className={`border border-[${color}] rounded-b-2xl p-4 flex flex-1 items-center justify-between`}
        >
          <p>{selectedOption === "Monthly" ? "Monthly" : "Annualy"} price</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {" "}
            {selectedOption === "Monthly"
              ? selectedPlanList.monthly_price
              : selectedPlanList.annualy_price}{" "}
            GBP
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleOpen}
        className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-green-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Upgrade plan
      </button>

      <ChangePlanModel
        open={isOpen}
        handleClose={handleClose}
        listData={selectedPlanList}
        selectedOption={selectedOption}
      />
    </div>
  );
};

export default PriceCard;
