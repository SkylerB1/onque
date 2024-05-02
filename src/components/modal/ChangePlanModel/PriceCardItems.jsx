import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const PriceCardItems = ({
  selectedPlan,
  selectedOption,

  selectedPlanName,
  selectedPlanPeriod,

  currentPlan,
  currentPlanDuration,

  handleOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const color = selectedPlan.color;
  const user = useSelector((state) => state.user.value);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`border border-[${color}] w-100% shadow-lg rounded-2xl dark:bg-gray-800 mb-5 mt-5`}
      >
        <label htmlFor={selectedPlan.key + selectedPlan.period}>
          <div
            style={
              selectedPlanName === selectedPlan.key &&
              selectedPlanPeriod === selectedOption
                ? { backgroundColor: color }
                : {}
            }
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
              {currentPlan === selectedPlan.key &&
                selectedOption === currentPlanDuration && (
                  <div className="bg-black p-1 flex items-center justify-center -mt-4 rounded-b-md">
                    <p>Current Plan</p>
                  </div>
                )}
            </div>

            <p className="text-center text-3xl font-bold text-gray-900 dark:text-white">
              from{" "}
              {selectedOption === "monthly"
                ? selectedPlan.monthly_price
                : selectedPlan.annualy_price}
              GBP{" "}
              <span className="text-xl font-medium text-gray-900">
                {selectedOption === "monthly" ? "Monthly" : "Annually"}
              </span>
            </p>
            <p className="text-center mt-2 text-xl font-medium text-gray-900">
              with {selectedOption === "monthly" ? "monthly" : "annualy"}{" "}
              payment
            </p>
          </div>
          <div
            style={
              selectedPlanName === selectedPlan.key &&
              selectedPlanPeriod === selectedOption
                ? { backgroundColor: color }
                : {}
            }
            className={`border border-[${color}] rounded-b-2xl p-4 flex flex-1 items-center justify-between`}
          >
            <input
              type="radio"
              name="select-plan"
              className="select-plan hidden"
              id={selectedPlan.key + selectedPlan.period}
              onChange={() => handleOptionChange(selectedPlan)}
              checked={
                selectedPlanName === selectedPlan.key &&
                selectedPlanPeriod === selectedOption
              }
            />

            <p>{selectedOption === "monthly" ? "Monthly" : "Annually"} price</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedOption === "monthly"
                ? selectedPlan.monthly_price
                : selectedPlan.annualy_price}
              GBP
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PriceCardItems;
