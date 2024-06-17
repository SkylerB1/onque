import { axiosInstance } from "../utils/Interceptor";
const SubscriptionServices = {};

// Upgrade and Degrade the subscription
SubscriptionServices.upgradeDegradeSubscription = async function (data) {
  return await axiosInstance.post(
    "/payments/upgrade-degrade-subscription",
    data
  );
};

// Calculate the invoice details for plan change
SubscriptionServices.calculateInvoiceDetailsForChangePlan = async function (
  data
) {
  return await axiosInstance.post(
    "/payments/calculate-invoice-details-for-change-plan",
    data
  );
};

// Cancel the subscription at the end of peroid
SubscriptionServices.cancelSubscription = async function (data) {
  return await axiosInstance.post("/payments/subscription/cancel", data);
};

//
// Get the subscription details
SubscriptionServices.getSubscriptionsDetails = async function () {
  return await axiosInstance.get("/user/subscription");
};
export default SubscriptionServices;
