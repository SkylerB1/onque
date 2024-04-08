import React, { useEffect, useState } from "react";
import PaymentHistoryTable from "./Premium/PaymentHistoryTable";
import { axiosInstance } from "../../../../utils/Interceptor";
import CurrentSubscription from "./CurrentSubscription";
import SubscriptionPlans from "./SubscriptionPlans";
import { Spinner } from "@material-tailwind/react";
import { ColorRing } from "react-loader-spinner";

const Price = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSubscriptions = async () => {
    try {
      const res = await axiosInstance.get("/user/subscription");
      setSubscription(res.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false);

    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["black"]}
        />
      </div>
    );

  return (
    <>
      {subscription ? (
        <CurrentSubscription
          subscription={subscription}
          getSubscriptions={getSubscriptions}
        />
      ) : (
        <SubscriptionPlans />
      )}

      <PaymentHistoryTable />
    </>
  );
};

export default Price;
