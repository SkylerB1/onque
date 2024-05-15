import React, { useState, useEffect } from "react";
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
import { plansList, findPlan } from "../../../utils/index";
import toast, { Toaster } from "react-hot-toast";
import ChangePlanStep2 from "../../modal/ChangePlanStep2";

export function ChangePlanModel({
  openChangePlanModel,
  setOpenChangePlanModel,
}) {
  const { subscription, getSubscriptions } = useAppContext();
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpenChangePlanModel(!openChangePlanModel);
  const handleClose = () => setOpenChangePlanModel(false);

  const [selectedPlanName, setSelectedPlanName] = useState(null);
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(null);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);

  const [openChangePlanStep2Modal, setChangePlanStep2Modal] = useState(false);
  const [upcomingInvoiceData, setUpcomingInvoiceData] = useState(null);
  const [step2loading, setstep2Loading] = useState(false);

  const handleStep2ModelClose = () => setChangePlanStep2Modal(false);

  const toggleChangePlanStep2Modal = () => {
    setChangePlanStep2Modal(!openChangePlanStep2Modal);
  };

  const openChangePlanStep2Model = async () => {
    try {
      let lookup_key = lookupKeys[selectedPlanName][selectedPlanPeriod];
      setLoading(true);
      const response = await axiosInstance.post(
        "/payments/calculate-invoice-details-for-change-plan",
        {
          lookup_key: lookup_key,
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setUpcomingInvoiceData(response.data.data);
        handleClose();
        setChangePlanStep2Modal(true);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      let message = err?.response?.data?.msg;
      message && toastrError(message);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      let lookup_key = lookupKeys[selectedPlanName][selectedPlanPeriod];

      setstep2Loading(true);
      const response = await axiosInstance.post(
        "/payments/upgrade-degrade-subscription",
        {
          lookup_key: lookup_key,
        }
      );

      if (response.status === 200) {
        console.log(response.data, response.data.message);
        toastrSuccess(response.data.message);
        handleStep2ModelClose();
        setTimeout(async () => {
          await getSubscriptions();
        }, 5000); //give time for the server to update the subscription before refreshing
      }
      setstep2Loading(false);
    } catch (err) {
      console.log(err);
      let message = err?.response?.data?.message;
      message && toastrError(message);
      setstep2Loading(false);
    }
  };
  useEffect(() => {
    if (!selectedPlanName) return;
    let plan = findPlan(selectedPlanName);
    if (plan) {
      setSelectedPlanDetails(plan);
      let planPrice =
        selectedPlanPeriod?.toLocaleLowerCase() ==
        plan.period?.toLocaleLowerCase()
          ? plan.monthly_price
          : plan.annualy_price;
      setSelectedPlanPrice(planPrice);
    }
  }, [selectedPlanName, selectedPlanPeriod]);

  return (
    <>
      <Dialog size="xl" open={openChangePlanModel} handler={handleOpen}>
        <DialogHeader>Change Plan</DialogHeader>
        <hr />
        <Toaster />
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
          {/* <div className="text-black-800 mx-4 justify-start ml-auto flex items-center">
            <span>Final Price</span>:{" "}
            <span className="font-bold">{selectedPlanPrice} GBP</span>
          </div> */}
          <LoadingButton
            loading={loading}
            title={"Continue"}
            className="w-24 h-10"
            size="md"
            onClick={openChangePlanStep2Model}
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
      <ChangePlanStep2
        open={openChangePlanStep2Modal}
        close={setChangePlanStep2Modal}
        toggleModal={toggleChangePlanStep2Modal}
        subscription={subscription}
        reloadSubscription={getSubscriptions}
        invoiceData={upcomingInvoiceData}
        selectedPlanName={selectedPlanName}
        selectedPlanPeriod={selectedPlanPeriod}
        selectedPlanPrice={selectedPlanPrice}
        selectedPlanDetails={selectedPlanDetails}
        handleSubmit={handleSubmit}
        loading={step2loading}
        setLoading={setstep2Loading}
      />
    </>
  );
}
