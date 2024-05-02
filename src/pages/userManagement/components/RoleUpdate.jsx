import React, { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const RoleUpdate = ({ brand, selectedRole, handleRoleChange, isEnabled }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { value: roles } = useSelector((state) => state.roles);
  const [open, setOpen] = useState(false);

  const rolesData = useMemo(
    () =>
      roles?.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [searchQuery, roles]
  );

  const isBrandSelected = (role) => {
    return selectedRole === role;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handler = () => {
    setOpen(!open);
  };

  return (
    <Menu
      open={open}
      dismiss={{ itemPress: false }}
      handler={handler}
      placement="bottom"
    >
      <MenuHandler>
        {isEnabled ? (
          <div className={`w-[14rem] rounded-md bg-white cursor-pointer h-10`}>
            <div className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 items-center justify-between flex whitespace-nowrap">
              {selectedRole ?? "Select a role"}
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
          </div>
        ) : (
          <Tooltip content="Please select the brand first">
            <div
              className={`w-[14rem] rounded-md bg-white cursor-pointer h-10 pointer-events-auto`}
            >
              <div className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 items-center justify-between flex whitespace-nowrap">
                {selectedRole ?? "Select a role"}
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
            </div>
          </Tooltip>
        )}
      </MenuHandler>
      <MenuList className="w-80 max-h-[70vh]">
        {!roles?.loading && (
          <input
            type="text"
            role="menuitem"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="my-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        )}
        {roles?.loading ? (
          <Spinner size="sm" color="blue" className="mx-auto" />
        ) : (
          <>
            <div className="black p">Roles</div>
            <div className="grid gap-4 py-4">
              {rolesData?.map((role) => (
                <MenuItem
                  variant="outlined"
                  key={role}
                  className={`border ${
                    isBrandSelected(role.name)
                      ? "border-blue-500"
                      : "border-gray-300"
                  } py-1 flex items-center justify-between`}
                  onClick={() => {
                    handler(), handleRoleChange(brand, role);
                  }}
                >
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-6 w-6 mr-2" color="black" />
                    {role?.name}
                  </div>
                  {isBrandSelected(role?.name) ? (
                    <Checkbox defaultChecked />
                  ) : (
                    <Checkbox />
                  )}
                </MenuItem>
              ))}
              {rolesData.length === 0 && (
                <p className="text-center mb-0 pt-4">
                  we haven't found any roles matching your search filters
                </p>
              )}
            </div>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default RoleUpdate;
