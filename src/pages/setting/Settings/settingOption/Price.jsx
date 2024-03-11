import React, { useState } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { Radio, Typography } from "@material-tailwind/react";
import PaymentHistoryTable from "./Premium/PaymentHistoryTable";
import BillingInformation from "./Premium/BillingInformation";
import ChangePlanModel from "./Premium/ChangePlanModel";
import PriceCard from "./Premium/PriceCard";
const Price = () => {
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const [displayText, setDisplayText] = useState([
    {
      stater: {
        price: 85,
        period: "Monthly",
      },
      advance: {
        price: 145,
        period: "Monthly",
      },
      entrepreneur: {
        price: 225,
        period: "Monthly",
      },
    },
  ]);
  const selectedPlanList = [
    {
      key: "starter",
      title: "Stater Plan",
      color: "#95C1D5",
      monthly_price: 85,
      annualy_price: 850,
      period: "Monthly",
      priceBody: [
        "Up to 15 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: false,
    },
    {
      key: "advance",
      title: "Advanced Plan",
      color: "#F9DC77",
      monthly_price: 145,
      annualy_price: 1450,
      period: "Monthly",
      priceBody: [
        "Up to 30 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: true,
    },
    {
      key: "entrepreneur",
      title: "Entrepreneur Plan",
      color: "#ED94B6",
      monthly_price: 225,
      annualy_price: 2250,
      period: "Monthly",
      priceBody: [
        "Up to 50 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: false,
    },
  ];

  const handleButtonClick = (option) => {
    setSelectedOption(option);

    // Here, you can update the text based on the selected option
    if (option === "Monthly") {
      setDisplayText([
        {
          stater: {
            price: 85,
            period: "Monthly",
          },
          advance: {
            price: 145,
            period: "Monthly",
          },
          entrepreneur: {
            price: 225,
            period: "Monthly",
          },
        },
      ]);
    } else if (option === "Annual") {
      setDisplayText([
        {
          stater: {
            price: 850,
            period: "Annual",
          },
          advance: {
            price: 1450,
            period: "Annual",
          },
          entrepreneur: {
            price: 2250,
            period: "Annual",
          },
        },
      ]);
    }
  };

  return (
    <div className="mr-52 mb-32">
      <div className="flex flex-1 items-end justify-end mb-14">
        <ButtonGroup variant="outlined">
          <Button
            onClick={() => handleButtonClick("Monthly")}
            className={
              selectedOption === "Monthly" ? "bg-black text-white" : ""
            }
          >
            Monthly
          </Button>
          <Button
            onClick={() => handleButtonClick("Annual")}
            className={selectedOption === "Annual" ? "bg-black text-white" : ""}
          >
            Annual
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-1 items-center justify-between ">
        {selectedPlanList.map((item, index) => (
          <div className="" key={index}>
          <PriceCard selectedPlanList={item} selectedOption={selectedOption} />
          </div>
        ))}
      </div>
      <div className="mt-10 mb-20">
        <p className="text-[#839DBF] mb-10">*Taxes not included</p>
        <div className="w-2/5 bg-white dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-start justify-between p-4">
            <p className="mt-2 font-normals">Current plan</p>
            <button
              type="button"
              className="py-2 px-2  bg-indigo-600 hover:bg-green-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Upgrade plan
            </button>
          </div>
          <h2 className="p-4 text-3xl font-bold">Free</h2>
          <div className="flex items-start justify-between p-4">
            <p className="text-[#839DBF] text-base">Max brands: 1</p>
            <p className="text-[#839DBF] text-base">Max 50 monthly posts</p>
          </div>
        </div>
        <p className="text-black text-xl font-semibold mt-10 mb-10">
          Payments history
        </p>
        <PaymentHistoryTable />
        <p className="text-black text-xl font-semibold mt-10 mb-10">
          Billing information
        </p>
      </div>
      <BillingInformation />
    </div>
  );
};

export default Price;

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full scale-105"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
