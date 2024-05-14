import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavProfile from "../drop-down/navProfile";
import { AppLogo } from "../common/Images";
import DropdownClientList from "../drop-down/DropdownClientList";
import AddModal from "../modal/addClientModal";
import { useAppContext } from "../../context/AuthContext";
import { ChangePlanModel } from "../modal/ChangePlanModel/Index";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function Header({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    subscription,
    getSubscriptions,
    openChangePlanModel,
    setOpenChangePlanModel,
  } = useAppContext();
  const isSubscribed = Boolean(subscription) || false;
  const [openNav, setOpenNav] = React.useState(false);
  const [opens, setOpen] = useState(false);

  const navList = (
    <ul className="mb-4 mt-2 mr-40 flex flex-col gap-1 md:flex-row md:mt-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold text-base rounded-lg `}
      >
        <div class="group relative flex justify-center">
          <Link className="flex flex-col items-center gap-1 text-white hover:text-white p-2 px-3 cursor-default">
            <TbDeviceDesktopAnalytics className="w-5 h-5" />
            Analytics
          </Link>
          <span class="absolute top-16 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
            Coming Soon
          </span>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold text-base rounded-lg ${
          pathname === "/planner/calendar"
            ? "font-semibold bg-white bg-opacity-10 rounded-lg shadow-sm"
            : ""
        }`}
      >
        <Link
          to="/planner/calendar"
          className="flex flex-col gap-1 p-2 px-3 items-center text-white hover:text-white"
        >
          <CalendarDaysIcon color="white" className="w-5 h-5" />
          Planning
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold  text-base rounded-lg`}
      >
        <div class="group relative flex justify-center">
          <Link className="flex flex-col items-center gap-1 text-white hover:text-white p-2 px-3 cursor-default">
            <FaLink className="w-5 h-5" />
            SmartLinks
          </Link>
          <span class="absolute top-16 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
            Coming Soon
          </span>
        </div>
      </Typography>
    </ul>
  );

  return (
    <div className="flex min-h-screen z-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none py-2 px-16 bg-black flex flex-row items-center ju">
          <div className="flex flex-1 items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              to="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              <img
                src={AppLogo} // Path relative to the "public" directory
                alt="On Que Logo"
                width={80}
                height={80}
              />
            </Typography>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              {!isSubscribed && (
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block gradient-button-solid normal-case whitespace-nowrap text-sm md:text-base mr-16"
                  onClick={() => navigate("/setting/price")}
                >
                  Upgrade to Premium
                </Button>
              )}
              <div className="ml-8">
                <DropdownClientList setOpen={setOpen} />
              </div>
              <div className="ml-8">
                <NavProfile clientData={[]} setOpen={setOpen} />
              </div>

              <IconButton
                variant="text"
                className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <IoMdArrowDropupCircle className="text-2xl font-medium" />
                ) : (
                  <IoMdArrowDropdownCircle className="text-2xl font-medium" />
                )}
              </IconButton>
            </div>
            <Collapse
              open={openNav}
              className="flex items-center justify-center mt-3 lg:hidden"
            >
              {navList}
              {!isSubscribed && (
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block gradient-button-solid normal-case text-sm md:text-base mr-16"
                  onClick={() => navigate("/setting/price")}
                >
                  Upgrade to Premium
                </Button>
              )}
            </Collapse>
          </div>
        </Navbar>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>

      <AddModal
        open={opens}
        Close={() => setOpen(false)}
        title={`Add Client`}
      />
      <ChangePlanModel
        openChangePlanModel={openChangePlanModel}
        setOpenChangePlanModel={setOpenChangePlanModel}
      />
    </div>
  );
}
