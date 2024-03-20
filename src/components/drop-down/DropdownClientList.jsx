import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/Interceptor";
import { GoPlus } from "react-icons/go";
import useConnections from "../customHooks/useConnections";
import FacebookFilled from "../svg/FacebookFilled";
import Instagram from "../svg/Instagram";
import Youtube from "../svg/Youtube";
import Twitter from "../svg/Twitter";
import Tiktok from "../svg/Tiktok";
import LinkedIn from "../svg/LinkedIn";
import GoogleBusiness from "../svg/GoogleBusiness";
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

const DropdownClientList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientData, setClientsData] = useState([]);
  const { getConnections } = useConnections();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const brandName = user?.brand?.brand_name;
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      handleGetClients();
    }
  };

  const handleItemClick = (item) => {
    setIsOpen(false);
    const user = useLocalStorage("user", "get");
    const data = { ...user, brand: item };
    dispatch(setUser(data));
    getConnections(item.id);
  };

  const handleGetClients = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/brands`
      );
      setClientsData(response?.data?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserBrand = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/brand`
      );
      const { data } = response;
      if (data) {
        if (!user?.brand) {
          const userBrand = { ...user, brand: data };
          dispatch(setUser(userBrand));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBrand();
  }, []);

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
            <div className="w-[14rem] border-2 rounded-md bg-white cursor-pointer">
              <div className="inline-flex justify-center w-full px-4 py-2 text-lg border-none font-medium text-gray-700 focus:outline-none active:bg-gray-200">
                <div className="flex flex-1 items-center justify-start gap-3 ">
                  <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {brandName.charAt(0)}
                    </span>
                  </div>
                  {brandName}
                </div>
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
              {clientData
                ?.filter((item) =>
                  item.brand_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                ?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className=" w-full my-2 text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200 "
                    role="menuitem"
                  >
                    <div
                      className="flex flex-1 items-center justify-start gap-3"
                      key={index}
                    >
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                          {item.brand_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <Typography className="text-base">
                          {item.brand_name}
                        </Typography>
                        <div className="flex flex-1 items-center justify-start gap-2 mt-1">
                          {item.socialTokens.map((item) => {
                            const { platform } = item;
                            if (platform) {
                              const { coloredIcon } = SocialPlatforms[platform];
                              return coloredIcon(13, 13);
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
