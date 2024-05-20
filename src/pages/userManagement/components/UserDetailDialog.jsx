import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  IconButton,
  DialogFooter,
  Button,
  Input,
  Avatar,
  DialogBody,
} from "@material-tailwind/react";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CustomSwitch from "../../../components/Input/CustomSwitch";
import Filters from "./filters";
import UpdateRoleDialog from "./UpdateRoleDialog";
import RoleUpdate from "./RoleUpdate";
import { SocialPlatforms } from "../../../utils";
import LoadingButton from "../../../components/button/LoadingButton";
import { useSelector } from "react-redux";

const tableHead = ["Brands", "Role", "Connection"];

const UserDetailDialog = ({
  isOpen,
  onClose,
  selectedUser,
  setSelectedUser,
  brands,
  handleSelectBrand,
  emailDialogHandler,
  isEditing,
  updateCollaborator,
}) => {
  const isSubmitDisabled = useMemo(
    () =>
      selectedUser.brands.length === 0 ||
      !selectedUser.brands.every(
        (item) =>
          item.brandRole?.roleId &&
          item.brandRole?.roleId !== null &&
          item.brandRole?.roleName &&
          item.brandRole?.roleName !== null
      ),
    [selectedUser]
  );

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openRoleMenu, setOpenRoleMenu] = useState(false);
  const FirstLetter = selectedUser?.firstName?.charAt(0).toUpperCase();
  const SecondLetter = selectedUser?.firstName?.charAt(1).toUpperCase();

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handleRoleChange = (brand, role) => {
    const { id: roleId, name: roleName } = role;
    const user = { ...selectedUser };
    const updatedBrands = user.brands.map((item) => {
      if (item.id === brand.id) {
        return {
          ...item,
          brandRole: { ...item.brandRole, roleId, roleName },
        };
      }
      return item;
    });
    user.brands = updatedBrands;
    setSelectedUser(user);
    roleMenuHandler();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const roleMenuHandler = () => {
    setOpenRoleMenu(!openRoleMenu);
  };

  return (
    <>
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
              <p class="text-base">
                {selectedUser?.firstName + " " + selectedUser?.lastName}
              </p>
              <span class="text-tertiary text-sm text-[#7e878c]">
                {selectedUser?.email}
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
        <DialogBody>
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="w-2/5">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}
              />
            </div>
            <div className="flex w-full gap-2 md:w-5/6">
              <Filters
                options={brands}
                selectedOptions={selectedBrands}
                onChange={handleBrandChange}
                title={"States"}
              />
              <Filters
                options={brands}
                selectedOptions={selectedBrands}
                onChange={handleBrandChange}
                title={"Any Brand"}
              />
              <Filters
                options={brands}
                selectedOptions={selectedBrands}
                onChange={handleBrandChange}
                title={"Any Role"}
              />
            </div>
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
                {brands?.map((brand, index) => {
                  const isSelected = selectedUser?.brands?.find(
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
                        <RoleUpdate
                          open={openRoleMenu}
                          handler={roleMenuHandler}
                          brand={brand}
                          selectedRole={roleName}
                          handleRoleChange={handleRoleChange}
                          isEnabled={Boolean(isSelected)}
                        />
                      </td>
                      <td className="p-4">
                        <div className=" flex flex-row justify-between">
                          {Object.keys(SocialPlatforms).map((key) => {
                            const { coloredIcon, nonColoredIcon } =
                              SocialPlatforms[key];
                            const isConnected = brand.platforms.some(
                              (item) => item.platform === key
                            );

                            if (isConnected) {
                              return coloredIcon(20, 20);
                            }
                            return nonColoredIcon(20, 20);
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <LoadingButton
            disabled={isSubmitDisabled}
            variant="gradient"
            title="Save"
            className="w-24"
            onClick={() => {
              isEditing
                ? updateCollaborator()
                : (onClose(), emailDialogHandler());
            }}
          />
        </DialogFooter>
      </Dialog>
      <UpdateRoleDialog
        isOpen={dialogOpen}
        onClose={handleDialogToggle}
        brands={brands}
        selectedBrands={selectedBrands}
      />
    </>
  );
};

export default UserDetailDialog;
