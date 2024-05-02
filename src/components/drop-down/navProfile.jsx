import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import { HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import { FaDollarSign } from "react-icons/fa";

import { Link } from "react-router-dom";
import ClientList from "../../utils/clientList";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../../redux/features/userSlice";
import AddClientModal from "../modal/addClientModal";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import UserIcon from "../../assets/userIcon";

const NavProfile = ({ clientData, setOpen }) => {
  const ref = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handlerLogOut = () => {
    localStorage.removeItem("user");
    removeCookie("access_token");
    navigate("/login");
    const message = "User logout successfully";
    toast.success(message);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

  return (
    <div className="inline-block text-left" ref={ref}>
      <div
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        onClick={toggleDropdown}
        className="text-gray-600 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer mt-[5.5px]"
        type="button"
      >
        {isDropdownOpen === false ? (
          <IoIosMenu className="text-3xl font-medium text-white" />
        ) : (
          <IoMdClose className="text-3xl font-medium text-white" />
        )}
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownDelay"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700 absolute right-16 top-16"
        >
          {clientData.length > 0 && (
            <div className="w-80">
              <ClientList clientData={clientData} />
            </div>
          )}
          <ul
            className="py-2 text-base text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            {/* <Link to="/brand/name" className="py-2 hover:bg-[#fde8ef] pl-8 block" onClick={() => { setOpen(true); closeDropdown }}> */}
            <Link
              className="py-2 hover:bg-[#fde8ef] pl-8 block"
              onClick={() => {
                setOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              <li className="flex flex-1 items-center text-black gap-2 justify-start  dark:hover:bg-gray-600 dark:hover:text-white">
                <MdPersonAddAlt1 className="text-lg " />
                Add Client
              </li>
            </Link>
            <Link
              to="/brand/connection"
              className={` py-2 hover:bg-[#fde8ef] pl-8  block px-4 ${
                pathname === "/brand/connection" ? "bg-[#fde8ef]" : ""
              }`}
              onClick={closeDropdown}
            >
              <li
                className={`gap-2 flex flex-1 items-center justify-start text-black hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white  ${
                  pathname === "/brand/connection" ? `bg-[#fde8ef] ` : ""
                }`}
              >
                <PiPlugsConnectedBold className="text-lg " />
                Connection
              </li>
            </Link>
            <Link
              to="/setting/price"
              className={` py-2 hover:bg-[#fde8ef] pl-8  block px-4 ${
                pathname === "/setting/price" ? "bg-[#fde8ef]" : ""
              }`}
              onClick={closeDropdown}
            >
              <li
                className={`gap-2 flex flex-1 items-center justify-start text-black hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white  ${
                  pathname === "/setting/price" ? `bg-[#fde8ef] ` : ""
                }`}
              >
                <FaDollarSign className="text-lg" />
                Billing
              </li>
            </Link>
            <Link
              to="/setting/account"
              onClick={closeDropdown}
              className={`py-2 hover:bg-[#fde8ef] pl-8 block px-4  hover:text-[#a202f2]  ${
                pathname.includes("/setting/account") ? `bg-[#fde8ef] ` : ""
              }`}
            >
              <li className="gap-2 flex flex-1 items-center justify-start text-black hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white ">
                <BsPersonFillGear className="text-lg" />
                Account Settings
              </li>
            </Link>
            <Link
              to="/userManagement/users"
              onClick={closeDropdown}
              className={`py-2 hover:bg-[#fde8ef] pl-8 block px-4 text-black hover:text-black  ${
                pathname.includes("/userManagement") ? `bg-[#fde8ef] ` : ""
              }`}
            >
              <li className="gap-2 flex flex-1 items-center justify-start  hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white">
                <HiUserCircle className="text-lg" />
                User Management
              </li>
            </Link>
            <li className="pl-4 flex flex-1 items-center justify-start text-black  hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white hover:text-red-600">
              <HiOutlineLogout className="text-lg ml-4" />
              <div
                className="block px-4 py-2 cursor-pointer"
                onClick={() => handlerLogOut()}
              >
                Logout
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavProfile;
