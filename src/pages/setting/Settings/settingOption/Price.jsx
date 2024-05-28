import React, { useState, useEffect } from "react";
import PaymentHistoryTable from "./Premium/PaymentHistoryTable";
import { useAppContext } from "../../../../context/AuthContext";
import Loader from "../../../../components/loader/Loader";
import SubscriptionPlans from "./SubscriptionPlans";
import CurrentSubscription from "./CurrentSubscription";
import LoadingButton from "../../../../components/button/LoadingButton";
import { toastrSuccess, toastrError } from "../../../../utils/index";
import { axiosInstance } from "../../../../utils/Interceptor";
import { getDateFromUnix } from "../../../../utils/dateUtils";
import { planLabel } from "../../../../utils";

const Price = () => {
  const {
    subscription,
    getSubscriptions,
    loadingSub: loading,
  } = useAppContext();
  const subscriptionId = subscription?.subscriptionId || null;

  const [loadingReactivate, setLoadingReactivate] = useState(false);
  const [loadingKeepCurrentPlan, setLoadingKeepCurrentPlan] = useState(false);

  // useEffect(() => {
  //   getSubscriptions();
  // }, []);

  const handleResumeSubscription = async () => {
    try {
      setLoadingReactivate(true);
      const res = await axiosInstance.post(
        "/payments/resume-canceled-subscription"
      );
      let response = res?.data;
      if (response.status === true) {
        toastrSuccess(response?.message);
      } else {
        toastrError(response?.message);
      }
      getSubscriptions();
      setLoadingReactivate(false);
    } catch (err) {
      let message = err?.response?.data?.message;
      message && toastrError(message);
      setLoadingReactivate(false);
    }
  };

  const handleKeepCurrentPlan = async () => {
    try {
      setLoadingKeepCurrentPlan(true);
      const res = await axiosInstance.post("/payments/cancel-schedule");
      let response = res?.data;
      if (response.status === true) {
        toastrSuccess(response?.message);
      } else {
        toastrError(response?.message);
      }
      getSubscriptions();
      setLoadingKeepCurrentPlan(false);
    } catch (err) {
      let message = err?.response?.data?.message;
      message && toastrError(message);
      setLoadingKeepCurrentPlan(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      {subscription?.subscriptionScheduledId != null ? (
        <div
          role="alert"
          className="mb-5 relative flex w-full px-4 py-4 text-base text-white bg-gray-900 rounded-lg font-regular"
        >
          <div className="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              ></path>
            </svg>
          </div>
          <div className="ml-3 mr-12 flex flex-row">
            <div>
              Subscription updated - The plan{" "}
              {planLabel[subscription?.scheduledPlanInfo?.name]} will go into
              effect at the next renewal.
            </div>
            <LoadingButton
              title={"Keep Current Plan"}
              loading={loadingKeepCurrentPlan}
              className="normal-case ml-5 w-30 whitespace-nowrap"
              onClick={handleKeepCurrentPlan}
            />
          </div>
        </div>
      ) : (
        subscription?.cancel_at_period_end && (
          <div
            role="alert"
            className="mb-5 relative flex w-full px-4 py-4 text-base text-white bg-gray-900 rounded-lg font-regular"
          >
            <div className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                ></path>
              </svg>
            </div>
            <div className="ml-3 mr-12 flex flex-row">
              <div>
                You have cancelled your current plan. You will be able to
                continue using all its functionalities until{" "}
                {getDateFromUnix(subscription.end_date)}. After that date, your
                plan will become Free. To continue using it and keep all your
                data and brands, click on reactivate.
              </div>
              <LoadingButton
                title={"Reactivate Plan"}
                loading={loadingReactivate}
                className="normal-case ml-5 w-30 whitespace-nowrap"
                onClick={handleResumeSubscription}
              />
            </div>
          </div>
        )
      )}
      {subscriptionId ? (
        <CurrentSubscription
          subscription={subscription}
          getSubscriptions={getSubscriptions}
          handleResumeSubscription={handleResumeSubscription}
          loadingReactivate={loadingReactivate}
          setLoadingReactivate={setLoadingReactivate}
          handleKeepCurrentPlan={handleKeepCurrentPlan}
          loadingKeepCurrentPlan={loadingKeepCurrentPlan}
        />
      ) : (
        <SubscriptionPlans />
      )}
      <PaymentHistoryTable />
    </>
  );
};

export default Price;
