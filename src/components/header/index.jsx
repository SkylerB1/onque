import React, { useState, useEffect } from "react";
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

import BrandServices from "../../services/BrandServices";
import { toastrError, toastrSuccess } from "../../utils/index";

import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import BlockUIComponent from "../BlockUIComponent";
import EnableBrands from "../modal/EnableBrands";
import AlertModal from "../modal/AlertModal";
import BrandService from "../../services/BrandServices";

export default function Header({ children }) {
  const { pathname } = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const { subscription, dropdownClientListKey } = useAppContext();
  const isSubscribed = Boolean(subscription) || false;
  const [openNav, setOpenNav] = React.useState(false);
  const [opens, setOpen] = useState(false);

  // Brand Status model variables
  const [openBrandStatusModal, setOpenBrandStatusModal] = useState(false);
  const [newBrands, setNewBrands] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);

  const [selectAllBrand, setSelectAllBrand] = useState(false);
  const [showAlertModal, setAlertModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleBrandStatusModal = () => {
    setOpenBrandStatusModal(!openBrandStatusModal);
  };
  const closeBrandStatusModal = () => {
    setOpenBrandStatusModal(false);
  };
  const toggleAlertModal = () => {
    setAlertModal(!showAlertModal);
  };

  const openBrandModel = async () => {
    await getInactiveBrands();
    await getActiveBrands();
    setOpenBrandStatusModal(true);
  };

  // Fetch the user inactive brands from db
  const getInactiveBrands = async () => {
    try {
      const status = 0;
      const res = await BrandServices.getMyBrands(status);
      let brands = res.data.brands;
      setNewBrands(brands);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch the user active brands from db
  const getActiveBrands = async () => {
    try {
      const status = 1;
      const res = await BrandServices.getMyBrands(status);
      let brands = res.data.brands;
      setActiveBrands(brands);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveBrandAction = () => {
    let brands = newBrands.filter((brand) => {
      return brand.is_active == true;
    });
    if (brands.length == 0) {
      toastrError("Kindly select atleast one brand.");
      return false;
    }
    toggleAlertModal();
    const data = {
      header:
        "Are you sure you want to activate this? This action cannot be undone.",
      onAccept: handleBrandStatusChangeAction,
    };

    setAlertData(data);
    toggleAlertModal();
  };
  const handleBrandStatusChangeAction = async () => {
    try {
      // get the active brands
      setAlertModal(false);
      let brands = newBrands.filter((brand) => {
        return brand.is_active == true;
      });
      setLoading(true);
      let data = { brands: brands };
      let result = await BrandService.updateBrands(data);
      if (result?.status == 200) {
        let message = result.data.message;
        toastrSuccess(message);
        setLoading(false);
        closeBrandStatusModal();
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const [alertData, setAlertData] = useState({
    header: "",
    onAccept: handleBrandStatusChangeAction,
  });

  const user = useSelector((state) => state.user.value);
  let fullName = "";
  if (user) {
    const { firstName, lastName } = user;
    fullName = firstName + " " + lastName;
  }

  // if (user == null) {
  //   localStorage.clear();
  //   removeCookie("access_token");
  //   navigate("/login");
  // }
  const navList = (
    <ul className="mb-4 mt-2 mr-40 flex flex-col gap-1 md:flex-row md:mt-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className={`font-bold text-base rounded-lg `}
      >
        <div className="group relative flex justify-center">
          <Link className="flex flex-col items-center gap-1 text-white hover:text-white p-2 px-3 cursor-default">
            <TbDeviceDesktopAnalytics className="w-5 h-5" />
            Analytics
          </Link>
          <span className="absolute top-16 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
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
        <div className="group relative flex justify-center">
          <Link className="flex flex-col items-center gap-1 text-white hover:text-white p-2 px-3 cursor-default">
            <FaLink className="w-5 h-5" />
            SmartLinks
          </Link>
          <span className="absolute top-16 scale-0 transition-all w-[150px] text-center rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
            Coming Soon
          </span>
        </div>
      </Typography>
    </ul>
  );

  return (
    <div className="flex min-h-screen z-50">
      <BlockUIComponent />
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
            {/* Header section */}
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              {!(user?.adminRole === "admin" || isSubscribed) && (
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
                {/* Client List */}
                <DropdownClientList
                  setOpen={setOpen}
                  key={dropdownClientListKey}
                  isSubscribed={isSubscribed}
                  openBrandModel={openBrandModel}
                  subscription={subscription}
                  activeBrands={activeBrands}
                  getActiveBrands={getActiveBrands}
                />
              </div>
              <div className="ml-8 flex justify-center gap-2">
                <div className=" capitalize mt-2 font-semibold text-white text-wrap  overflow-hidden md:overflow-visible break-words">
                  Hello {fullName}
                </div>
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

      {openBrandStatusModal && (
        <>
          <EnableBrands
            isOpen={openBrandStatusModal}
            close={setOpenBrandStatusModal}
            toggleModal={toggleBrandStatusModal}
            onClose={() => {
              setOpenBrandStatusModal(false);
            }}
            newBrands={newBrands}
            setNewBrands={setNewBrands}
            selectAllBrand={selectAllBrand}
            setSelectAllBrand={setSelectAllBrand}
            activeBrands={activeBrands}
            handleSaveBrandAction={handleSaveBrandAction}
            loading={loading}
          />
          {showAlertModal && (
            <>
              <AlertModal
                show={showAlertModal}
                alertData={alertData}
                toggleModal={toggleAlertModal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
