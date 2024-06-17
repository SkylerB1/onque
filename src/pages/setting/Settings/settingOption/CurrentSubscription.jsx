import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { planLabel, toastrError, toastrSuccess } from "../../../../utils";
import { getDateFromUnix } from "../../../../utils/dateUtils";
import CancelSubscription from "../../../../components/modal/CancelSubscription";

import ResumeSubscription from "../../../../components/modal/ResumeSubscription";

import { useAppContext } from "../../../../context/AuthContext";
import {
  capitalizeFirstLetter,
  paymentFailedStatuses,
} from "../../../../utils/index";
import LoadingButton from "../../../../components/button/LoadingButton";
import { ChangePlanModel } from "../../../../components/modal/ChangePlanModel/Index";

const CurrentSubscription = ({
  subscription,
  getSubscriptions,
  handleResumeSubscription,
  loadingReactivate,
  handleKeepCurrentPlan,
  loadingKeepCurrentPlan,
}) => {
  const [openCancelModal, setCancelModal] = useState(false);
  const [openResumeModal, setResumeModal] = useState(false);
  const { validations } = useAppContext();
  const [openChangePlanModel, setOpenChangePlanModel] = React.useState(false);

  const toggleCancelModal = () => {
    setCancelModal(!openCancelModal);
  };
  const toggleResumeModal = () => {
    setResumeModal(!openResumeModal);
  };

  const reloadSubscription = () => {
    getSubscriptions();
  };
  useEffect(() => {
    reloadSubscription();
  }, []);

  const handleChangePlan = () => {
    setOpenChangePlanModel(!openChangePlanModel);
  };

  return (
    <>
      <div className="flex flex-1 flex-wrap justify-evenly mb-14">
        <div
          style={{ maxWidth: "500px" }}
          className="border-solid rounded-xl border-[#1e2326] bg-[#1e2326] flex flex-col flex-grow p-6 text-md "
        >
          <div className="flex flex-1 flex-row justify-between">
            <div className="flex items-center">
              <span className="pr-2 text-white text-sm">Current plan</span>

              {subscription.cancel_at_period_end == true ? (
                <>
                  <span className="font-bold text-[10px] text-[#1e2326] v-chip bg-yellow-600 rounded-xl h-4">
                    Cancelled
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-[10px] text-[#1e2326] v-chip bg-[#52c79f] rounded-xl h-4">
                    {capitalizeFirstLetter(subscription?.status)}
                  </span>
                </>
              )}
            </div>
            <div>
              {subscription?.status &&
                subscription.cancel_at_period_end != true &&
                subscription.status == "active" && (
                  <Button
                    variant="outlined"
                    className="text-white text-xs py-1 px-2 gradient-button-dark normal-case"
                    onClick={handleChangePlan}
                  >
                    Change plan
                  </Button>
                )}
              {/* <Button
                variant="outlined"
                className="text-white text-xs py-1 px-2 gradient-button-dark normal-case"
                onClick={openBrandModel}
              >
                Manage Brands
              </Button> */}

              {subscription?.status &&
                (subscription.status == "trialing" ||
                  subscription.status == "active") && (
                  <>
                    {subscription?.subscriptionScheduledId != null ? (
                      <>
                        <LoadingButton
                          title={"Reactivate Plan"}
                          loading={loadingKeepCurrentPlan}
                          className="normal-case ml-5 w-30 whitespace-nowrap"
                          onClick={handleKeepCurrentPlan}
                        />
                      </>
                    ) : (
                      <>
                        {subscription.cancel_at_period_end == true ? (
                          <>
                            <LoadingButton
                              title={"Reactivate Plan"}
                              loading={loadingReactivate}
                              className="normal-case ml-5 w-30 whitespace-nowrap"
                              onClick={handleResumeSubscription}
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              variant="text"
                              onClick={toggleCancelModal}
                              className="ml-2 text-white text-xs py-1 px-2 normal-case"
                            >
                              Cancel Plan
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
            </div>
          </div>
          <strong className="text-3xl py-6 text-white">
            {planLabel[subscription.plan.name]}
          </strong>
          <div className="flex justify-between">
            <span className="text-sm text-white">
              Clients: {validations?.clients_count} of{" "}
              {validations?.max_clients}
            </span>
            <span className="text-sm text-white">
              Posts: {validations?.posts_count_monthly} of{" "}
              {validations?.max_posts_monthly}
            </span>
          </div>
        </div>
        <div
          style={{ maxWidth: "500px" }}
          className="flex flex-1 p-6 text-md justify-between flex-col border border-solid border-whitty rounded-xl bg-white"
        >
          <div className="gap-3 flex justify-between flex-grow-0 items-center mb-10">
            <span className="text-black text-base">
              {subscription?.subscriptionScheduledId != null ? (
                <>New Plan Active At</>
              ) : (
                <>
                  {subscription.cancel_at_period_end == true ? (
                    <>Expiration</>
                  ) : paymentFailedStatuses.includes(subscription.status) ? (
                    <>Payment Date</>
                  ) : (
                    <>Next Payment Date</>
                  )}
                </>
              )}
            </span>
            <span className="text-black text-base">
              {subscription?.subscriptionScheduledId != null ? (
                <>{getDateFromUnix(subscription.scheduleActivationDate)}</>
              ) : (
                <>
                  {subscription.cancel_at_period_end == false
                    ? getDateFromUnix(subscription.next_payment_attempt)
                    : getDateFromUnix(subscription.end_date)}
                </>
              )}
            </span>
          </div>
          <div className="flex justify-end">
            <strong className="text-black text-3xl leading-none font-bold">
              {subscription?.subscriptionScheduledId != null ? (
                <>{subscription?.scheduledPlanInfo?.price}</>
              ) : (
                <>{subscription?.plan?.price}</>
              )}{" "}
              GBP
            </strong>
          </div>
        </div>
        <CancelSubscription
          open={openCancelModal}
          close={setCancelModal}
          toggleModal={toggleCancelModal}
          reloadSubscription={reloadSubscription}
          subscription={subscription}
        />

        <ResumeSubscription
          open={openResumeModal}
          close={setResumeModal}
          toggleModal={toggleResumeModal}
          reloadSubscription={reloadSubscription}
          subscription={subscription}
        />
        <ChangePlanModel
          openChangePlanModel={openChangePlanModel}
          setOpenChangePlanModel={setOpenChangePlanModel}
        />
      </div>
    </>
  );
};

export default CurrentSubscription;
