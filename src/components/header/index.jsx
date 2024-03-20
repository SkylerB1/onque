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
import { useDispatch, useSelector } from "react-redux";
import useConnections from "../customHooks/useConnections";
import AddModal from "../modal/addClientModal";

export default function Header({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { getConnections } = useConnections()
  const [openNav, setOpenNav] = React.useState(false);
  const user = useSelector((state) => state.user.value);
  const [opens, setOpen] = useState(false);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`p-1 font-bold  text-base rounded-lg hover:bg-[#fde8ef] hover:text-[#ec407a]`}
      >
        {/* <Link to="/analytics/social-graph-data/summary">   Analytics
        </Link>*/}
        <div class="group relative flex justify-center">
          <Link>Analytics</Link>
          <span class="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">Coming Soon</span>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`p-1 font-bold  text-base rounded-lg hover:bg-[#fde8ef] hover:text-[#ec407a] ${pathname === "/planner/calendar"
          ? "text-black font-semibold bg-gray-200 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
          : ""
          }`}
      >
        <Link to="/planner/calendar" className="flex items-center">
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
        className={`p-1 font-bold  text-base rounded-lg  hover:bg-[#fde8ef] hover:text-[#ec407a]`}
      >
        {/* <Link to="/smart-link" className="flex items-center">
          SmartLinks
        </Link> */}
        <div class="group relative flex justify-center">
          <Link>SmartLinks</Link>
          <span class="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">Coming Soon</span>
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
      {/* <div class="group relative flex justify-center">
          <Link>Pricing</Link>
          <span class="absolute top-10 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">Coming Soon</span>
        </div> */}
      {/* </Typography> */}
    </ul>
  );

  return (
    <div className="flex min-h-screen z-50 ">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
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
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate('/setting/Settings/price')}
              >
                <span>Buy Now</span>
              </Button>
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
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
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
      <AddModal open={opens} Close={() => setOpen(false)} title={`Add Client`} id={""} />
    </div>
  );
}
