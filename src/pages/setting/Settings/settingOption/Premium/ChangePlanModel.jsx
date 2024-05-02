import React, { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { DownArrow, StarPng } from "../../../../../components/common/Images";
import DeleteIconFilled from "../../../../../assets/DeleteIconFilled";
import { axiosInstance } from "../../../../../utils/Interceptor";
import LoadingButton from "../../../../../components/button/LoadingButton";
import toast from "react-hot-toast";
import InfoIcon from "../../../../../assets/InfoIcon";
import { lookupKeys } from "../../../../../utils";
const initial = {
  code: "",
  isValid: false,
  label: "",
};
const ChangePlanModel = ({
  open,
  handler,
  listData,
  selectedOption,
  switchDuration,
}) => {
  const { key, bgClass, savingWithAnnualPlan, monthly_price, annualy_price } =
    listData;
  const isMonthly = selectedOption === "monthly" || false;
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discount, setDiscount] = useState(initial);
  const [loading, setLoading] = useState(false);

  const toggleDiscountInput = () => {
    setOpenDiscount(!openDiscount);
  };

  const removeDiscountCode = () => {
    setDiscount(initial);
  };

  const validateDiscountCode = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/payments/coupon/${discount.code}`);
      if (res.status === 200) {
        const { data } = res;
        setDiscount((prev) => ({ ...prev, isValid: true, label: data.label }));
      }
      setLoading(false);
    } catch (err) {
      setDiscount({
        code: "",
        isValid: false,
        label: err?.response?.data?.message || "Invalid code",
      });
      toast.error(err?.response?.data?.message || "Invalid code");
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          lookup_key: lookupKeys[key][selectedOption],
          code: discount.code,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Dialog size="xs" open={open} handler={handler}>
      <DialogBody>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src={listData.icon} className="w-10 h-auto" />
              <span className="font-semibold text-xl ml-4 text-black">
                {listData.title}
              </span>
            </div>
          </div>
          <hr className="h-px my-4 bg-black border-0 dark:bg-black"></hr>
          <div>
            <div className="flex flex-1 items-center">
              <div className="flex flex-col justify-center">
                <Radio
                  name="plan"
                  checked={isMonthly}
                  label={
                    <div>
                      <Typography color="blue-gray" className="font-medium">
                        Monthly Plan
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {monthly_price}
                        .00 GBP billed monthly
                      </Typography>
                    </div>
                  }
                  containerProps={{
                    className: "-mt-5",
                  }}
                  onClick={() => switchDuration("monthly")}
                />
                <div className="my-2">
                  <Radio
                    name="plan"
                    checked={!isMonthly}
                    label={
                      <div>
                        <Typography color="blue-gray" className="font-medium">
                          Annual Plan
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {annualy_price}
                          .00 GBP billed yearly
                        </Typography>
                      </div>
                    }
                    containerProps={{
                      className: "-mt-5",
                    }}
                    onClick={() => switchDuration("yearly")}
                  />
                </div>
              </div>
            </div>

            {isMonthly ? (
              <Alert
                className="bg-[#3b82f61a] flex items-center my-2"
                icon={<InfoIcon width={22} height={22} fill={"#2196f3"} />}
              >
                <Typography className="text-sm text-[#3b82f6cc]">
                  You can save{" "}
                  <strong className="font-bold">{`${savingWithAnnualPlan} GBP`}</strong>{" "}
                  with the annual plan
                </Typography>
              </Alert>
            ) : (
              <div
                className={`text-black text-center text-sm py-2 px-3 my-2 rounded-lg flex items-center justify-center ${bgClass}`}
              >
                <img
                  width={20}
                  height={20}
                  alt="star"
                  className="mr-2"
                  src={StarPng}
                />
                <span>
                  You saved
                  <strong className="font-bold">{` ${savingWithAnnualPlan} GBP `}</strong>{" "}
                  with the annual plan
                </span>
                <img
                  width={20}
                  height={20}
                  alt="star"
                  className="ml-2"
                  src={StarPng}
                />
              </div>
            )}
            <div className="flex flex-row justify-end">
              <Button
                variant="text"
                onClick={toggleDiscountInput}
                className="underline normal-case"
              >
                <div className="flex flex-row items-center">
                  Add discount code
                  <span className="ml-1">
                    <DownArrow width={15} height={15} />
                  </span>
                </div>
              </Button>
            </div>
            {openDiscount &&
              (discount.isValid ? (
                <>
                  <hr className="my-4" />
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm">Discount code:</span>
                    <span className="flex flex-row items-center">
                      <strong className="font-bold text-sm">
                        {discount.code}
                      </strong>
                      <IconButton onClick={removeDiscountCode} variant="text">
                        <DeleteIconFilled />
                      </IconButton>
                    </span>
                  </div>
                  <span className="text-sm">{discount.label}</span>
                </>
              ) : (
                <>
                  <hr className="my-4" />
                  <div className="flex flex-row">
                    <Input
                      placeholder="Enter the code"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        setDiscount((prev) => ({
                          ...prev,
                          code: e.target.value,
                        }))
                      }
                    />
                    <LoadingButton
                      onClick={validateDiscountCode}
                      title={"Apply"}
                      loading={loading}
                      disabled={discount.code === "" || false}
                      className="normal-case ml-5 w-30"
                    />
                  </div>
                  <hr className="mt-4" />
                </>
              ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex flex-1 flex-row justify-between">
          <Button variant="outlined" onClick={handler}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubscription}
            loading={loading}
            title={"Upgrade Plan"}
            className="w-40 bg-black"
          />
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePlanModel;
