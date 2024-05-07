import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const PriceCardItem = ({
  selectedPlan,
  setSelectedOption,
  selectedPlanPeriod,
}) => {
  const color = selectedPlan.color;
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <div
        className={`border border-[${color}] w-100% shadow-lg rounded-2xl dark:bg-gray-800 mb-5 mt-5`}
      >
        <label htmlFor={selectedPlan.key + selectedPlan.period}>
          <div
            style={{ backgroundColor: color }}
            className="rounded-t-2xl text-white p-4"
          >
            <div className="">
              <p className=" text-center mb-4 text-xl font-medium text-gray-800 dark:text-gray-50">
                {selectedPlan.title}
              </p>
              {selectedPlan.recommended === true && (
                <div className="bg-black p-1 flex items-center justify-center -mt-4 rounded-b-md">
                  <p>Recommended</p>
                </div>
              )}
            </div>

            <p className="text-center text-3xl font-bold text-gray-900 dark:text-white">
              from{" "}
              {selectedPlanPeriod === "monthly"
                ? selectedPlan.monthly_price
                : selectedPlan.annualy_price}
              GBP{" "}
              <span className="text-xl font-medium text-gray-900">
                {selectedPlanPeriod === "monthly" ? "Monthly" : "Annually"}
              </span>
            </p>
            <p className="text-center mt-2 text-xl font-medium text-gray-900">
              with {selectedPlanPeriod === "monthly" ? "monthly" : "annualy"}{" "}
              payment
            </p>
          </div>
          <div style={{ borderColor: color }} className={`border p-4`}>
            <ul className="w-full mt-6 mb-6 text-sm text-gray-600 dark:text-gray-100">
              {selectedPlan.priceBody.map((item, index) => (
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
          <div style={{ borderColor: color }} className={`border p-4`}></div>
          <div
            style={{ backgroundColor: color }}
            className={`border border-[${color}] rounded-b-2xl p-4 flex flex-1 items-center justify-between`}
          >
            <p>
              {selectedPlanPeriod === "monthly" ? "Monthly" : "Annually"} price
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedPlanPeriod === "monthly"
                ? selectedPlan.monthly_price
                : selectedPlan.annualy_price}
              GBP
            </p>
          </div>
          <input
            type="radio"
            name="select-plan"
            className="select-plan hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default PriceCardItem;
