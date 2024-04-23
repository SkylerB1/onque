import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { planLabel } from "../../../../utils";
import { getDateFromUnix } from "../../../../utils/dateUtils";
import CancelSubscription from "../../../../components/modal/CancelSubscription";
import { useAppContext } from "../../../../context/AuthContext";

const CurrentSubscription = ({ subscription, getSubscriptions }) => {
  const [openCancelModal, setCancelModal] = useState(false);
  const { validations } = useAppContext();

  const toggleCancelModal = () => {
    setCancelModal(!openCancelModal);
  };

  const reloadSubscription = () => {
    getSubscriptions();
  };
  return (
    <div className="flex flex-1 flex-wrap justify-evenly mb-14">
      <div
        style={{ maxWidth: "500px" }}
        className="border-solid rounded-xl border-[#1e2326] bg-[#1e2326] flex flex-col flex-grow p-6 text-md "
      >
        <div className="flex flex-1 flex-row justify-between">
          <div className="flex items-center">
            <span className="pr-2 text-white text-sm">Current plan</span>
            <span className="font-bold text-[10px] text-[#1e2326] v-chip bg-[#52c79f] rounded-xl h-4">
              Active
            </span>
          </div>
          <div>
            <Button
              variant="outlined"
              className="text-white text-xs py-1 px-2 gradient-button-dark normal-case"
            >
              Change plan
            </Button>
            <Button
              variant="text"
              onClick={toggleCancelModal}
              className="ml-2 text-white text-xs py-1 px-2 normal-case"
            >
              Cancel plan
            </Button>
          </div>
        </div>
        <strong className="text-3xl py-6 text-white">
          {planLabel[subscription.plan.name]}
        </strong>
        <div className="flex justify-between">
          <span className="text-sm">
            Clients: {validations.clients_count} of {validations.max_clients}
          </span>
          <span className="text-sm">
            Posts: {validations.posts_count_monthly} of{" "}
            {validations.max_posts_monthly}
          </span>
        </div>
      </div>
      <div
        style={{ maxWidth: "500px" }}
        className="flex flex-1 p-6 text-md justify-between flex-col border border-solid border-whitty rounded-xl bg-white"
      >
        <div className="gap-3 flex justify-between flex-grow-0 items-center mb-10">
          <span className="text-black text-base">Next payment</span>
          <span className="text-black text-base">
            {getDateFromUnix(subscription.end_date)}
          </span>
        </div>
        <div className="flex justify-end">
          <strong className="text-black text-3xl leading-none font-bold">
            {subscription.plan.price} GBP
          </strong>
        </div>
      </div>
      <CancelSubscription
        open={openCancelModal}
        toggleModal={toggleCancelModal}
        reloadSubscription={reloadSubscription}
      />
    </div>
  );
};

export default CurrentSubscription;
