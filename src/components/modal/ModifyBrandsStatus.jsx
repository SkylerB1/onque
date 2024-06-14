import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import Cross from "../../assets/Cross";
import { axiosInstance } from "../../utils/Interceptor";
import LoadingButton from "../button/LoadingButton";
import { getDateFromUnix } from "../../utils/dateUtils";
import { toastrSuccess, toastrError } from "../../utils/index";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import CustomSwitch from "../../components/Input/CustomSwitch";

const tableHead = ["Brands", "Status"];

const ModifyBrandsStatus = ({
  isOpen,
  onClose,
  toggleModal,
  brands,
  setBrands,
  newBrands,
  setNewBrands,
  selectedPlanDetails,
  existingClientCount,
  handleSaveBrandAction,
  selectAllBrand,
  setSelectAllBrand,
}) => {
  const [text, setText] = useState("");
  const [activeBrandCount, setActiveBrandCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const checkActiveBrandsCount = () => {
    let activeBrandCount = 0;
    newBrands &&
      newBrands.map((brand) => brand.is_active == true && activeBrandCount++);
    setActiveBrandCount(activeBrandCount);
  };
  const isDisabled = useMemo(
    () => activeBrandCount != selectedPlanDetails?.totalClients,
    [activeBrandCount]
  );
  const user = useSelector((state) => state.user.value);
  const FirstLetter = user?.firstName?.charAt(0).toUpperCase();
  const SecondLetter = user?.firstName?.charAt(1).toUpperCase();

  const handleSelectBrand = (brandId, event) => {
    setNewBrands((prev) =>
      prev.map((item) => {
        if (item.id == brandId) {
          return {
            ...item,
            is_active: event,
          };
        } else {
          return item;
        }
      })
    );
  };
  const handleSelectAllBrand = (brandId, event) => {
    setNewBrands((prev) =>
      prev.map((item) => {
        return {
          ...item,
          is_active: event == true,
        };
      })
    );
    setSelectAllBrand(event);
  };
  useEffect(() => {
    checkActiveBrandsCount();
  }, [newBrands]);

  return (
    <Dialog size="md" className="dialogIndex" open={isOpen} onClose={onClose}>
      <DialogHeader className="justify-between">
        <div className="flex flex-row items-center">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-md ">
            <span className="text-sm font-normal  dark:text-gray-300">
              {FirstLetter && SecondLetter ? (
                FirstLetter + SecondLetter
              ) : (
                <ClockIcon color="grey" className="w-6 h-6" />
              )}
            </span>
          </div>

          <div className="flex flex-col justify-center text-md ml-3">
            <p className="text-base">
              {user?.firstName + " " + user?.lastName}
            </p>
            <span className="text-tertiary text-sm text-[#7e878c]">
              {user?.email}
            </span>
          </div>
        </div>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="black"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="max-h-[700px] overflow-auto">
        <Toaster />
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Downgrading Plan : </span>You are
            downgrading the your subscription. Kindly select any{" "}
            {selectedPlanDetails?.totalClients} brands to make active out of{" "}
            {existingClientCount}.
          </div>
        </div>
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">Total Selected Brands : </span>
          {activeBrandCount}
        </div>
        <div className="max-h-96 overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 z-10">
              <tr>
                {tableHead.map((item, index) => (
                  <th
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    key={index}
                  >
                    {" "}
                    <div className="flex items-center gap-3">
                      {index == 0 && (
                        <CustomSwitch
                          checked={selectAllBrand}
                          onChange={handleSelectAllBrand}
                        />
                      )}
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {item}
                      </Typography>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newBrands.length &&
                newBrands?.map((brand, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        newBrands[index]?.is_active == true && `opacity-50`
                      }
                    >
                      <td className="p-4 w-30">
                        <div className="flex items-center gap-3">
                          <CustomSwitch
                            identifier={brand.id}
                            checked={
                              newBrands[index]?.is_active == true ? true : false
                            }
                            defaultValue={false}
                            onChange={handleSelectBrand}
                          />
                          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                            <span className="font-normal text-gray-600 dark:text-gray-300">
                              {brand?.brand_name.charAt(0)}
                            </span>
                          </div>
                          <Typography variant="body" color="blue-gray">
                            {brand?.brand_name}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <div className=" flex flex-row justify-between ml-5">
                          {brands[index]?.is_active == true
                            ? "Active"
                            : "In Active"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row items-end">
        <Button variant="outlined" onClick={toggleModal}>
          Cancel
        </Button>{" "}
        &nbsp;
        <LoadingButton
          title={"Save Brands"}
          loading={loading}
          disabled={isDisabled}
          className="w-45 h-10"
          onClick={handleSaveBrandAction}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default ModifyBrandsStatus;
