import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import Cross from "../../assets/Cross";
import { axiosInstance } from "../../utils/Interceptor";
import LoadingButton from "../button/LoadingButton";
import { getDateFromUnix } from "../../utils/dateUtils";
import {
  toastrSuccess,
  toastrError,
  capitalizeFirstLetter,
  toFixedNumber,
} from "../../utils/index";
import toast, { Toaster } from "react-hot-toast";

const ChangePlanStep2 = ({
  open,
  close,
  toggleModal,
  subscription,
  reloadSubscription,
  invoiceData,
  selectedPlanName,
  selectedPlanPeriod,
  selectedPlanPrice,
  selectedPlanDetails,
  handleSubmit,
  loading,
  setLoading,
}) => {
  const [text, setText] = useState("");

  const isDisabled = useMemo(() => text.length < 10, [text]);

  let stripeCurrentPlanPrice = 0;
  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/payments/subscription/cancel", {
        comments: text,
      });

      let response = res?.data;
      if (response.status === true) {
        toastrSuccess(response?.message);
      } else {
        toastrError(response?.message);
      }
      toggleModal();
      reloadSubscription();
      setLoading(false);
      close(false);
    } catch (err) {
      let message = err?.response?.data?.message;
      message && toastrError(message);
      toggleModal();
      setLoading(false);
    }
  };

  return (
    <Dialog size="sm" open={open} onClose={toggleModal}>
      <DialogBody className="max-h-[700px] overflow-auto">
        <Toaster />
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src={selectedPlanDetails?.icon} className="w-10 h-auto" />
              <span className="font-semibold text-xl ml-4 text-black">
                {selectedPlanName?.toUpperCase()}{" "}
                {selectedPlanPeriod?.toUpperCase()}
              </span>
            </div>
          </div>
          <hr className="h-px my-4 bg-black border-0 dark:bg-black"></hr>
          <div></div>
        </div>
        <div className="container mx-auto p-4">
          <div className=" shadow-md rounded-md p-6">
            <div className="flex justify-between mb-4">
              <div className="flex-2 pr-4">
                <p className="text-gray-600 mb-2">
                  {" "}
                  {capitalizeFirstLetter(selectedPlanName)}{" "}
                  {capitalizeFirstLetter(selectedPlanPeriod)} Price:
                </p>
              </div>
              <div className="flex-2 pl-4">
                <p className="font-bold">{selectedPlanPrice} GBP</p>
              </div>
            </div>
            <hr className="mb-5" />
            {subscription?.status == "active" && (
              <>
                {invoiceData &&
                  invoiceData?.invoiceDetailsObject?.map((value, key) => {
                    // if (key == invoiceData.invoiceDetailsObject.length - 1) {
                    //   return null;
                    // }
                    return (
                      <>
                        <div className="flex justify-between mb-4">
                          <div className="flex-2 pr-4">
                            <p className="text-gray-600 mb-2">
                              {value.description}:
                            </p>
                          </div>
                          <div className="flex-2 pl-4">
                            <p className="font-bold">{value.amount} GBP</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div className="flex justify-between mb-4">
                  <div className="flex-2 pr-4">
                    <p className="text-gray-600 mb-2">Subtotal</p>
                  </div>
                  <div className="flex-2 pl-4">
                    <p className="font-bold">
                      {/* {invoiceData?.subtotal}
                  <br />
                  {selectedPlanPrice} */}
                      <br />
                      {toFixedNumber(invoiceData?.subtotal)} GBP
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="flex-2 pr-4">
                    <p className="text-gray-600 mb-2">Total</p>
                  </div>
                  <div className="flex-2 pl-4">
                    <p className="font-bold">
                      {toFixedNumber(invoiceData?.total)} GBP
                    </p>
                  </div>
                </div>
              </>
            )}
            {subscription?.status == "trialing" && (
              <>
                <div className="text-bold">
                  <strong>Note:</strong> You are on free trail. The Plan price
                  will be charged after the trail period.
                </div>
              </>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <Button variant="outlined" onClick={toggleModal}>
          Cancel
        </Button>
        <LoadingButton
          title={"Change Plan"}
          loading={loading}
          className="w-36 h-10"
          onClick={handleSubmit}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePlanStep2;
