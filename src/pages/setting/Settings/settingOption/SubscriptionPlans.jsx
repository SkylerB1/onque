import React, { useMemo, useState } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";
import PriceCard from "./Premium/PriceCard";
import {
  AdvancedPlanPng,
  EnterpisePlanPng,
  StarterPlanPng,
} from "../../../../components/common/Images";

const SubscriptionPlans = () => {
  const selectedPlanList = useMemo(
    () => [
      {
        key: "starter",
        icon: StarterPlanPng,
        title: "Starter Plan",
        color: "#95C1D5",
        bgClass: "bg_starter_plan",
        monthly_price: 85,
        annualy_price: 850,
        savingWithAnnualPlan: 170,
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
        key: "advanced",
        icon: AdvancedPlanPng,
        title: "Advanced Plan",
        color: "#F9DC77",
        bgClass: "bg_advance_plan",
        monthly_price: 145,
        annualy_price: 1450,
        savingWithAnnualPlan: 290,
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
        key: "enterprise",
        icon: EnterpisePlanPng,
        title: "Entrepreneur Plan",
        color: "#ED94B6",
        bgClass: "bg_enterprise_plan",
        monthly_price: 225,
        annualy_price: 2250,
        savingWithAnnualPlan: 450,
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
    ],
    []
  );
  const [selectedOption, setSelectedOption] = useState("monthly");

  const switchDuration = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex flex-1 items-end justify-end mb-14">
        {/* <ButtonGroup variant="outlined">
          <Button
            onClick={() => switchDuration("monthly")}
            className={
              selectedOption === "monthly" ? "bg-black text-white" : ""
            }
          >
            Monthly
          </Button>
          <Button
            onClick={() => switchDuration("yearly")}
            className={selectedOption === "yearly" ? "bg-black text-white" : ""}
          >
            Annual
          </Button>
        </ButtonGroup> */}
      </div>
      <div className="flex flex-1 items-center justify-between overflow-auto xs:overflow-scroll gap-4">
        {selectedPlanList.map((item, index) => (
          <div className="" key={index}>
            <PriceCard
              selectedPlan={item}
              selectedOption={selectedOption}
              switchDuration={switchDuration}
            />
          </div>
        ))}
      </div>
      <div className="mt-10 mb-20">
        <p className="text-[#839DBF] mb-10">*Taxes not included</p>
        <div className="w-max bg-white dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-start justify-between p-4">
            <p className="mt-2 font-normals">Current plan</p>
          </div>
          <h2 className="p-4 text-3xl font-bold">Free</h2>
          <div className="flex items-start justify-between p-4">
            <p className="text-[#839DBF] text-base">Max clients: 1</p>
            <p className="text-[#839DBF] text-base">Max 50 monthly posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
