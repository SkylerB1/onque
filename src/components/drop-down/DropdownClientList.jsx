import React, { useEffect, useState, useMemo } from "react";
import { GoPlus } from "react-icons/go";
import { IoDiamondSharp } from "react-icons/io5";
import useConnections from "../customHooks/useConnections";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { useLocalStorage } from "../../utils/LocalStorage";
import { Link } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { getHighestPlanName, SocialPlatforms } from "../../utils";
import { useAppContext } from "../../context/AuthContext";
import { abbreviateString } from "../../utils/commonUtils";
import InfoIcon from "../svg/infoIcon";
import Close from "../svg/Close";
import useUserInfo from "../customHooks/useUserInfo";

const DropdownClientList = ({
  setOpen,
  isSubscribed,
  openBrandModel,
  subscription,
  activeBrands,
  getActiveBrands,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getConnections } = useConnections();
  const { getCounter } = useAppContext();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [userInfo, setUserInfo] = useState(user);
  const { getUserRefreshedData } = useUserInfo();
  const heighrestPlanName = getHighestPlanName();

  const { clients_count = 0, max_clients = 0 } =
    useSelector((state) => state.user.value) || {};
  const { value: brands, loading } = useSelector((state) => state.brands);
  const brandName = user?.brand?.brand_name || "Loading...";
  const [searchTerm, setSearchTerm] = useState("");

  const allowedBrands = useMemo(
    () => max_clients - activeBrands.length,
    [max_clients, activeBrands.length]
  );

  const toggleDropdown = () => {
    if (isOpen == false) {
      let adminEmail = user?.adminEmail;
      let adminToken = user?.adminToken;
      let params = {
        adminEmail,
        adminToken,
      };
      getUserRefreshedData(params).then((response) => {
        if (response) {
          setUserInfo(response);
        }
      });
      getActiveBrands();
    }
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

  const handleOpenBrandModel = () => {
    toggleDropdown();
    openBrandModel();
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
                  <span
                    className="text-white  whitespace-nowrap"
                    title={brandName}
                  >
                    {abbreviateString(brandName)}
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
            <>
              <Spinner />
            </>
          )}
        </MenuHandler>
        <MenuList className="w-96 max-h-[70vh]">
          {(!loading || brands) && (
            <input
              type="text"
              role="menuitem"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mx-4 my-5 p-3 w-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          )}

          {!(userInfo?.adminRole === "admin" || isSubscribed) && (
            <>
              <div
                id="alert-4"
                className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                role="alert"
              >
                <InfoIcon />
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                  You need an upgraded plan to add more brands to your account.
                  <Link
                    to="/setting/price"
                    className="font-semibold underline hover:no-underline"
                  >
                    Upgrade
                  </Link>
                </div>
              </div>
            </>
          )}
          {userInfo?.adminRole === "admin" || isSubscribed && userInfo?.clients_count < userInfo?.max_clients ? (
            <>
              <div
                id="alert-1"
                className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <InfoIcon />
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                  {userInfo?.adminRole === "admin"
                    ? `You have ${clients_count} clients.`
                    : `You have ${clients_count} ${userInfo?.adminRole !== "admin" && "brands out"} ${max_clients}.`
                  }
                </div>

              </div>
            </>
          ) : (
            <>
              {isSubscribed && (
                <>
                  {allowedBrands > 0 ? (
                    <>
                      <div
                        id="alert-2"
                        className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <InfoIcon />
                        <span className="sr-only">Info</span>
                        <div className="ms-3 text-sm font-medium">
                          You have a limit of {max_clients} active brands. You
                          can activate {allowedBrands} more.
                          <a
                            onClick={handleOpenBrandModel}
                            class="underline font-semibold cursor-pointer"
                          >
                            {" "}
                            Make Active
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {userInfo?.clients_count >= userInfo?.max_clients &&
                        subscription?.plan?.name != heighrestPlanName && (
                          <div
                            id="alert-2"
                            className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                          >
                            <InfoIcon />
                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm font-medium">
                              You have reached the maximum numbers of brand
                              limit. To create the more brand
                              <Link
                                to="/setting/price"
                                className="font-semibold underline hover:no-underline"
                              >
                                {" "}
                                Upgrade
                              </Link>
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </>
              )}
            </>
          )}

          <button
            onClick={() => setOpen(true)}
            className=" w-full text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            <div className="flex flex-1 items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className=" border border-black rounded-lg p-1">
                  <GoPlus className="w-7 h-7" />
                </div>
                <div className="">Add Client</div>
              </div>
              {(!isSubscribed ||
                userInfo?.clients_count > userInfo?.max_clients) && (
                <>
                  <div className="">
                    <IoDiamondSharp className="w-5 h-5 rounded" />
                  </div>
                </>
              )}
            </div>
          </button>

          {loading && !brands ? (
            <div className="justifyCenter py-4">
              <Spinner />
            </div>
          ) : (
            <>
              {Array.isArray(brands) && brands
                ?.filter((item) =>
                  item.brand_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                ?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      item.is_active == true ? handleItemClick(item) : null
                    }
                    className={` ${
                      item.is_active !== true && " opacity-20 "
                    } flex w-full my-2 text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200 `}
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
                          {item?.brand_name}{" "}
                        </Typography>
                        <div className="flex flex-1 items-center justify-start gap-2 mt-1">
                          {item.platforms.length === 0 && (
                            <span className="text-muted text-sm italic">
                              No networks connected
                            </span>
                          )}
                          {Array.isArray(item?.platforms) && item.platforms.map((item) => {
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
