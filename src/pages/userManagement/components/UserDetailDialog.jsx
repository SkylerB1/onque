import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  IconButton,
  DialogFooter,
  Button,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CustomSwitch from "../../../components/Input/CustomSwitch";
import Filters from "./filters";
import UpdateRoleDialog from "./UpdateRoleDialog";
import RoleUpdate from "./RoleUpdate";

const UserDetailDialog = ({ isOpen, onClose, user }) => {
  const tableHead = ["Brands", "Role", "Connection"];
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const userDetails = [
    {
      brand: "It sector",
      role: "Admin",
      connections: [
        { name: "Facebook", count: 1000 },
        { name: "Twitter", count: 500 },
        { name: "Facebook", count: 1000 },
        { name: "Twitter", count: 500 },
        { name: "Facebook", count: 1000 },
        { name: "Twitter", count: 500 },
      ],
    },
    {
      brand: "ABC Corp",
      role: "Admin",
      connections: [
        { name: "Facebook", count: 1000 },
        { name: "Twitter", count: 500 },
      ],
    },
    {
      brand: "Brand1",
      role: "Admin",
      connections: [
        { name: "Facebook", count: 1000 },
        { name: "Twitter", count: 500 },
      ],
    },
  ];
  const brands = ["Brand1", "Brand2", "Brand3"];

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const filteredUserDetails = userDetails.filter((user) => {
    if (
      (selectedRoles.length === 0 || selectedRoles.includes(user.role)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(user.brand)) &&
      (searchQuery === "" ||
        user.connections.some((connection) =>
          connection.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Dialog size="lg" className="dialogIndex" open={isOpen} onClose={onClose}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            {user && user.name}
          </Typography>
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
        <Dialog.Body>
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
              {/* <Select
                label="Any Role"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              >
                <Option value="admin">Admin</Option>
                <Option value="moderator">Moderator</Option>
                <Option value="user">User</Option>
              </Select> */}
            </div>
          </div>
          <div className="sm:overflow-x-scroll">
            <table className="w-full table-auto text-left">
              <thead>
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
                {filteredUserDetails.map((currentUser, index) => (
                  <tr key={index}>
                    <td className="p-4 w-30  ">
                      <div className="flex items-center gap-3 md:mr-4 md:w-52">
                        parentTableData{" "}
                        <Avatar
                          src={
                            "https://docs.material-tailwind.com/img/logos/logo-google.svg"
                          }
                          alt={currentUser.brand}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="body" color="blue-gray">
                          {currentUser.brand}
                        </Typography>
                      </div>
                    </td>
                    {/* <td className=" ">
                    <div
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-1 rounded-[7px] border-blue-gray-200 items-center justify-between flex whitespace-nowrap"
                      onClick={handleDialogToggle}
                    >
                      {currentUser.brand}
                      <svg
                        className="-mr-1 ml-2 mt-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 0 1-.707-.293L5.414 7.707a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-.707.293z"
                        />
                      </svg>
                    </div>
                  </td> */}
                    <td className="p-4 w-30">
                      <RoleUpdate
                        roles={["HR", "manager", "content creator"]}
                        title="Select Role"
                      />
                    </td>
                    <td className="p-4 w-30">
                      <Typography
                        variant="body"
                        color="blue-gray"
                        className="whitespace-nowrap"
                      >
                        {currentUser.connections
                          .map((connection) => connection.name)
                          .join(", ")}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Dialog.Body>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            className="whitespace-nowrap"
          >
            <span>Save</span>
          </Button>
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
