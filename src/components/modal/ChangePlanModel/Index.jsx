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
import ModifyBrandsStatus from "../../modal/ModifyBrandsStatus";
import UserService from "../../../services/UserServices";
import BrandServices from "../../../services/BrandServices";
import SubscriptionServices from "../../../services/SubscriptionServices";
import ToasterCustomConatiner from "../../ToasterCustomConatiner";
import { useSelector } from "react-redux";

export function ChangePlanModel({
  openChangePlanModel,
  setOpenChangePlanModel,
}) {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const { subscription, getSubscriptions, getCounter } = useAppContext();
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpenChangePlanModel(!openChangePlanModel);
  const handleClose = () => setOpenChangePlanModel(false);

  // Brand Status model variables
  const [openBrandStatusModal, setOpenBrandStatusModal] = useState(false);
  const [isUpgarding, setUpgrading] = useState(null);
  const [brands, setBrands] = useState([]);
  const [newBrands, setNewBrands] = useState([]);
  const [existingClientCount, setExistingClientCount] = useState(0);
  const [selectAllBrand, setSelectAllBrand] = useState(false);

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
      let newPlanAllowedClients = selectedPlanDetails.totalClients;
      let lookup_key = lookupKeys[selectedPlanName][selectedPlanPeriod];
      setLoading(true);
      const response =
        await SubscriptionServices.calculateInvoiceDetailsForChangePlan({
          lookup_key: lookup_key,
        });

      if (response?.status === 200) {
        let userInfo = await UserService.getUserInfo();
        setExistingClientCount(userInfo.data.clientsCount);
        if (response?.data?.data?.isPlanUpgrade === false) {
          setUpgrading(0);
          // Downgrading the plan
          if (userInfo.data.clientsCount > newPlanAllowedClients) {
            // Open step 2 model
            openBrandModel();
          } else {
            // Brand status manage model
            // Plan downgrading ,Open step 2 model
            setChangePlanStep2Modal(true);
          }
        } else if (response?.data?.data?.isPlanUpgrade === true) {
          setUpgrading(1);
          if (userInfo.data.clientsCount > newPlanAllowedClients) {
            // Open step 2 model
            openBrandModel();
          } else {
            // Brand status manage model
            // Plan downgrading ,Open step 2 model
            setChangePlanStep2Modal(true);
          }
        } else {
          // Plan upgrading ,Open step 2 model
          setChangePlanStep2Modal(true);
        }
        setUpcomingInvoiceData(response.data.data);
        handleClose();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      let message = err?.response?.data?.msg;
      message && toastrError(message);
      setLoading(false);
    }
  };

  const handleSaveBrandAction = () => {
    setOpenBrandStatusModal(false);
    setChangePlanStep2Modal(true);
  };
  const handleSubmit = async () => {
    try {
      let lookup_key = lookupKeys[selectedPlanName][selectedPlanPeriod];

      let brands =
        newBrands.length > 0
          ? Array.isArray(newBrands) && newBrands.map((brand) => {
              return {
                id: brand.id,
                is_active: brand.is_active,
              };
            })
          : [];

      setstep2Loading(true);
      let data = {
        lookup_key: lookup_key,
        brands: brands,
      };

      const response = await SubscriptionServices.upgradeDegradeSubscription(
        data
      );

      if (response.status === 200) {
        console.log(response.data, response.data.message);
        toastrSuccess(response.data.message);
        handleStep2ModelClose();
        setTimeout(async () => {
          // update the subscription as well
          await getSubscriptions();
          // update the counter as well
          brandId && (await getCounter(brandId));
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

  const toggleBrandStatusModal = () => {
    setOpenBrandStatusModal(!openBrandStatusModal);
  };
  // Test comment
  const openBrandModel = async () => {
    await getBrands();
    setOpenBrandStatusModal(true);
  };
  const getBrands = async () => {
    try {
      const res = await BrandServices.getMyBrandsList();
      let brands = res.data.brands;
      setBrands(brands);
      // setting is_active = false for default value when opening brand model
      setNewBrands(Array.isArray(brands) && brands?.map((brand) => ({ ...brand, is_active: false })));
    } catch (err) {
      console.log(err);
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
      <Dialog size="lg" open={openChangePlanModel} handler={handleOpen}>
        <ToasterCustomConatiner />
        <DialogHeader>Change Plan</DialogHeader>
        <hr />

        <ToasterCustomConatiner />
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
            onClick={openChangePlanStep2Model}
            disabled={loading}
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
      {openBrandStatusModal && (
        <>
          <ModifyBrandsStatus
            isOpen={openBrandStatusModal}
            close={setOpenBrandStatusModal}
            toggleModal={toggleBrandStatusModal}
            onClose={() => {
              setOpenBrandStatusModal(false);
            }}
            brands={brands}
            setBrands={setBrands}
            newBrands={newBrands}
            setNewBrands={setNewBrands}
            selectedPlanDetails={selectedPlanDetails}
            existingClientCount={existingClientCount}
            handleSaveBrandAction={handleSaveBrandAction}
            selectAllBrand={selectAllBrand}
            setSelectAllBrand={setSelectAllBrand}
            isUpgarding={isUpgarding}
          />
        </>
      )}
    </>
  );
}
