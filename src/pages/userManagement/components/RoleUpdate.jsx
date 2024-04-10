import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const RoleUpdate = ({ roles, selectedRoles, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleBrandSelect = (brand) => {
    setSelectedRole(brand);
  };

  const isBrandSelected = (brand) => {
    return selectedRole.includes(brand);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Menu
      placement="bottom-end"
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        {title ? (
          <div className="w-[14rem] rounded-md bg-white cursor-pointer h-10">
            <div className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 items-center justify-between flex whitespace-nowrap">
              {title}
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
          <Spinner />
        )}
      </MenuHandler>
      <MenuList className="w-80 max-h-[70vh]">
        {!loading && (
          <input
            type="text"
            role="menuitem"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="my-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        )}
        {loading ? (
          <Spinner size="sm" color="blue" className="mx-auto" />
        ) : (
          <>
            <div className="black p">Roles</div>
            <div className="grid gap-4 py-4">
              {roles
                .filter((item) =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((role) => (
                  <Button
                    variant="outlined"
                    key={role}
                    className={`border ${
                      isBrandSelected(role)
                        ? "border-blue-500"
                        : "border-gray-300"
                    } py-1 flex items-center justify-between`}
                    onClick={() => handleBrandSelect(role)}
                  >
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-6 w-6 mr-2" color="black" />
                      {role}
                    </div>
                    {isBrandSelected(role) ? (
                      <Checkbox defaultChecked />
                    ) : (
                      <Checkbox />
                    )}
                  </Button>
                ))}
            </div>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default RoleUpdate;
