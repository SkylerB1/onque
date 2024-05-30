import React, { useEffect, useMemo, useState } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";

import PriceCardItems from "./PriceCardItems";
import PriceCardItem from "./PriceCardItem";
import { useAppContext } from "../../../context/AuthContext";
import { getCurrentPlan, plansList } from "../../../utils/index";

const PricingPlansCard = ({
  selectedPlanName,
  setSelectedPlanName,
  selectedPlanPeriod,
  setSelectedPlanPeriod,
}) => {
  const selectedPlanList = useMemo(() => plansList(), []);
  const [isPlanSelected, setIsPlanselected] = useState(false);
  const {
    subscription,
    getSubscriptions,
    loadingSub: loading,
  } = useAppContext();
  const subscriptionId = subscription?.subscriptionId || null;

  const [selectedOption, setSelectedOption] = useState("yearly");

  // The variable is created for showing the current plan badge
  const [currentPlan, setCurrentPlan] = useState(null);
  const [currentPlanDuration, setCurrentPlanDuration] = useState(null);

  if (loading) return <Loader />;

  const switchDuration = (option) => {
    setSelectedOption(option);
    setSelectedPlanPeriod(option);
  };
  const handleOptionChange = (selectedPlan) => {
    let selectedPlanName = selectedPlan.key;
    setSelectedPlanName(selectedPlanName);
    setSelectedPlanPeriod(selectedOption);
  };

  useEffect(() => {
    if (subscription && subscription?.plan) {
      let { currentPlan, planDuration } = getCurrentPlan(
        subscription?.plan?.name
      );
      setCurrentPlan(currentPlan);
      setCurrentPlanDuration(planDuration);

      setSelectedPlanName(currentPlan);
      setSelectedPlanPeriod(planDuration);

      setSelectedOption(planDuration);
    }
  }, []);

  // Function to check if the key matches a certain condition
  const renderMatchingComponent = (selectedPlan, index) => {
    if (selectedPlanName === selectedPlan.key) {
      return (
        <div className="" key={index}>
          {
            <PriceCardItem
              selectedPlan={selectedPlan}
              setSelectedOption={setSelectedOption}
              selectedPlanPeriod={selectedPlanPeriod}
            />
          }
        </div>
      );
    }
  };

  return (
    <div
      className="flex flex-row "
      style={{ overflowY: "scroll", maxHeight: "700px" }}
    >
      <div className="basis-2/3 ">
        <div className="p-4">
          <h3>Select Plan</h3>
          <div>
            {/* Duration Buttons */}
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
                  className={
                    selectedOption === "yearly" ? "bg-black text-white" : ""
                  }
                >
                  Annual
                </Button>
              </ButtonGroup> */}
            </div>
            {/* Plans Listing */}
            <div className=" ">
              {selectedPlanList.map((item, index) => (
                <div className="" key={index}>
                  <PriceCardItems
                    selectedPlan={item}
                    selectedOption={selectedOption}
                    switchDuration={switchDuration}
                    selectedPlanName={selectedPlanName}
                    setSelectedPlanName={setSelectedPlanName}
                    currentPlan={currentPlan}
                    currentPlanDuration={currentPlanDuration}
                    handleOptionChange={handleOptionChange}
                    selectedPlanPeriod={selectedPlanPeriod}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="basis-1/3 border-l-2 ">
        <div className="p-4">
          {selectedPlanList.map((item, index) =>
            renderMatchingComponent(item, index)
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPlansCard;
