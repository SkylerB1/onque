import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavProfile from "../drop-down/navProfile";
import { AppLogo } from "../common/Images";
import DropdownClientList from "../drop-down/DropdownClientList";
import AddModal from "../modal/addClientModal";
import { useAppContext } from "../../context/AuthContext";

export default function Header({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { subscription } = useAppContext();
  const isSubscribed = Boolean(subscription) || false;
  const [openNav, setOpenNav] = React.useState(false);
  const [opens, setOpen] = useState(false);

  const navList = (
    <ul className="mb-4 mt-2 mr-24 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold  text-base rounded-lg `}
      >
        {/* <Link to="/analytics/social-graph-data/summary">   Analytics
        </Link>*/}
        <div className="group relative flex justify-center">
          <Link className="text-white hover:text-white p-2 px-3">
            Analytics
          </Link>
          <span className="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
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
          className="flex p-2 px-3 items-center text-white hover:text-white"
        >
          Planning
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`p-1 font-bold  text-base rounded-lg hover:bg-[#fde8ef] hover:text-[#ec407a] ${pathname === "/planner/history"
          ? "text-black bg-gray-200 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
          : ""
          }`}
      >
        <Link to="/planner/history" className="flex items-center">
          History
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold  text-base rounded-lg`}
      >
        {/* <Link to="/smart-link" className="flex items-center">
          SmartLinks
        </Link> */}
        <div className="group relative flex justify-center">
          <Link className="text-white hover:text-white p-2 px-3">
            SmartLinks
          </Link>
          <span className="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
            Coming Soon
          </span>
        </div>
      </Typography>
      {/* <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`p-1 font-bold  text-base rounded-lg hover:bg-[#fde8ef] hover:text-[#ec407a]`}
      > */}
      {/* <Link to="/setting/Settings?tab=price" className="flex items-center">
          Pricing
        </Link> */}
      {/* <div className="group relative flex justify-center">
          <Link>Pricing</Link>
          <span className="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">Coming Soon</span>
        </div> */}
      {/* </Typography> */}
    </ul>
  );

  return (
    <div className="flex min-h-screen z-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-black">
          <div className="flex items-center justify-between text-blue-gray-900">
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
                  className="hidden lg:inline-block gradient-button-solid normal-case text-sm md:text-base mr-16"
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
              {/* <Typography
              as="li"
              variant="h6"
              onClick={() => handlerLogOut()}
              className={`p-1 mr-4 cursor-pointer py-1.5 font-medium rounded-md shadow-sm hover:bg-gray-200 hover:text-black`}
            >
              Logout
            </Typography> */}
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      fill="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="#fff"
                    strokeWidth={2}
                  >
                    <path
                      fill="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={openNav}>
            {navList}
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Buy Now</span>
            </Button>
          </Collapse>
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
    </div>
  );
};