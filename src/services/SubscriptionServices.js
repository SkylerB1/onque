import { axiosInstance } from "../utils/Interceptor";
const SubscriptionServices = {};

SubscriptionServices.upgradeDegradeSubscription = async function (data) {
  return await axiosInstance.post(
    "/payments/upgrade-degrade-subscription",
    data
  );
};

SubscriptionServices.calculateInvoiceDetailsForChangePlan = async function (
  data
) {
  return await axiosInstance.post(
    "/payments/calculate-invoice-details-for-change-plan",
    data
  );
};
export default SubscriptionServices;
