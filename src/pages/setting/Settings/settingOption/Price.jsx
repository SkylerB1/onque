import React, { Suspense, lazy } from "react";
import PaymentHistoryTable from "./Premium/PaymentHistoryTable";
const CurrentSubscription = lazy(() => import("./CurrentSubscription"));
const SubscriptionPlans = lazy(() => import("./SubscriptionPlans"));
import { ColorRing } from "react-loader-spinner";
import { useAppContext } from "../../../../context/AuthContext";
import Loader from "../../../../components/loader/Loader";

const Price = () => {
  const {
    subscription,
    getSubscriptions,
    loadingSub: loading,
  } = useAppContext();
  const subscriptionId = subscription?.subscriptionId || null;

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      {subscriptionId ? (
        <CurrentSubscription
          subscription={subscription}
          getSubscriptions={getSubscriptions}
        />
      ) : (
        <SubscriptionPlans />
      )}

      <PaymentHistoryTable />
    </Suspense>
  );
};

export default Price;
