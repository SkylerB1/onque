import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import useConnections from "../customHooks/useConnections";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { useLocalStorage } from "../../utils/LocalStorage";

import {
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { SocialPlatforms } from "../../utils";
import { useAppContext } from "../../context/AuthContext";

const DropdownClientList = ({ setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getConnections } = useConnections();
  const { getCounter } = useAppContext();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { value: brands, loading } = useSelector((state) => state.brands);
  const brandName = user?.brand?.brand_name || "Loading...";
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setIsOpen(false);
    const user = useLocalStorage("user", "get");
    const data = { ...user, brand: item };
    dispatch(setUser(data));
    getCounter(item.id);
    getConnections(item.id);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu
        open={isOpen}
        handler={toggleDropdown}
        placement="bottom-end"
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          {brandName ? (
            <div className="w-[14rem] rounded-md cursor-pointer">
              <div className="inline-flex justify-center w-full px-4 py-2 text-lg border-none font-medium text-gray-700 focus:outline-none active:bg-gray-200">
                <div className="flex flex-1 items-center justify-start gap-3 ">
                  <div className="relative inline-flex items-center justify-center py-2 px-4 overflow-hidden bg-gray-300 rounded-md dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {brandName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white  whitespace-nowrap">
                    {brandName}
                  </span>
                  <svg
                    className="-mr-1 ml-2 mt-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M10 12a1 1 0 0 1-.707-.293L5.414 7.707a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-.707.293z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </MenuHandler>
        <MenuList className="w-96 max-h-[70vh]">
          {!loading && (
            <input
              type="text"
              role="menuitem"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mx-4 my-5 p-3 w-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          )}
          <button
            onClick={() => setOpen(true)}
            className=" w-full text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            <div className="flex flex-1 items-center justify-start gap-3">
              <div className="border border-black rounded-lg p-1">
                <GoPlus className="w-7 h-7" />
              </div>
              <div>Add Client</div>
            </div>
          </button>
          {loading ? (
            <div className="justifyCenter py-4">
              <Spinner />
            </div>
          ) : (
            <>
              {brands
                ?.filter((item) =>
                  item.brand_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                ?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className=" w-full my-2 text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200 "
                    role="menuitem"
                  >
                    <div className="flex flex-1 items-center justify-start gap-3">
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                          {item?.brand_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <Typography className="text-base">
                          {item?.brand_name}
                        </Typography>
                        <div className="flex flex-1 items-center justify-start gap-2 mt-1">
                          {item.platforms.length === 0 && (
                            <span class="text-muted text-sm italic">
                              No networks connected
                            </span>
                          )}
                          {item.platforms.map((item) => {
                            console.log(item)
                            const { platform } = item;
                            if (platform) {
                              const { coloredIcon } = SocialPlatforms[platform];
                              return (
                                <span key={item.id}>{coloredIcon(13, 13)}</span>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default DropdownClientList;
