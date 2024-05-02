import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import LoadingButton from "../../button/LoadingButton";

import PricingPlansCard from "./PricingPlansCard";
import { axiosInstance } from "../../../utils/Interceptor";
import { lookupKeys, toastrSuccess, toastrError } from "../../../utils";
import { useAppContext } from "../../../context/AuthContext";

import toast, { Toaster } from "react-hot-toast";

export function ChangePlanModel({
  openChangePlanModel,
  setOpenChangePlanModel,
}) {
  const { getSubscriptions } = useAppContext();
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpenChangePlanModel(!openChangePlanModel);
  const handleClose = () => setOpenChangePlanModel(false);

  const [selectedPlanName, setSelectedPlanName] = useState(null);
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState(null);

  const handleSubmit = async () => {
    try {
      let lookup_key = lookupKeys[selectedPlanName][selectedPlanPeriod];

      setLoading(true);
      const response = await axiosInstance.post(
        "/payments/upgrade-degrade-subscription",
        {
          lookup_key: lookup_key,
        }
      );

      if (response.status === 200) {
        console.log(response.data, response.data.message);
        toastrSuccess(response.data.message);
        handleClose();
        setTimeout(async () => {
          await getSubscriptions();
        }, 5000); //give time for the server to update the subscription before refreshing
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      let message = err?.response?.data?.message;
      message && toastrError(message);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog size="xl" open={openChangePlanModel} handler={handleOpen}>
        <DialogHeader>Change Plan</DialogHeader>
        <hr />
        <DialogBody className="p-0">
          <PricingPlansCard
            selectedPlanName={selectedPlanName}
            setSelectedPlanName={setSelectedPlanName}
            selectedPlanPeriod={selectedPlanPeriod}
            setSelectedPlanPeriod={setSelectedPlanPeriod}
          />
        </DialogBody>
        <hr />
        <DialogFooter>
          <LoadingButton
            loading={loading}
            title={"Continue"}
            className="w-24 h-10"
            size="md"
            onClick={handleSubmit}
          />
          <Button
            size="sm"
            variant="outlined"
            onClick={handleClose}
            className="ml-2 w-24 h-10"
          >
            CANCEL
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
