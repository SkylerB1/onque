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

const tableHead = ["Brands", "Role", "Connection"];

const ModifyBrandsStatus = ({ isOpen, onClose, toggleModal, brands }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = useMemo(() => text.length < 10, [text]);
  const user = useSelector((state) => state.user.value);
  const FirstLetter = user?.firstName?.charAt(0).toUpperCase();
  const SecondLetter = user?.firstName?.charAt(1).toUpperCase();

  const handleBrandAction = () => {};

  return (
    <Dialog size="lg" className="dialogIndex" open={isOpen} onClose={onClose}>
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

          <div class="flex flex-col justify-center text-md ml-3">
            <p class="text-base">{user?.firstName + " " + user?.lastName}</p>
            <span class="text-tertiary text-sm text-[#7e878c]">
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
        <div className="max-h-96 overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 z-10">
              <tr>
                {tableHead.map((item, index) => (
                  <th
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    key={index}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {item}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.length &&
                brands?.map((brand, index) => {
                  const isSelected = user?.brands?.find(
                    (item) => item.id === brand.id
                  );
                  const roleName = isSelected?.brandRole?.roleName;
                  return (
                    <tr key={index}>
                      <td className="p-4 w-30">
                        <div className="flex items-center gap-3">
                          <CustomSwitch
                            checked={Boolean(isSelected)}
                            onChange={() =>
                              handleSelectBrand(brand, Boolean(isSelected))
                            }
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
                        {/* <RoleUpdate
                        open={openRoleMenu}
                        handler={roleMenuHandler}
                        brand={brand}
                        selectedRole={roleName}
                        handleRoleChange={handleRoleChange}
                        isEnabled={Boolean(isSelected)}
                      /> */}
                        Role
                      </td>
                      <td className="p-4">
                        <div className=" flex flex-row justify-between">
                          Connections
                          {/* {Object.keys(SocialPlatforms).map((key) => {
                          const { coloredIcon, nonColoredIcon } =
                            SocialPlatforms[key];
                          const isConnected = brand.platforms.some(
                            (item) => item.platform === key
                          );

                          if (isConnected) {
                            return coloredIcon(20, 20);
                          }
                          return nonColoredIcon(20, 20);
                        })} */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <Button variant="outlined" onClick={toggleModal}>
          Cancel
        </Button>
        <LoadingButton
          title={"Update Brands"}
          loading={loading}
          disabled={isDisabled}
          className="w-36 h-10"
          onClick={handleBrandAction}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default ModifyBrandsStatus;
