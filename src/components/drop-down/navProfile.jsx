;

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import Twitter from "../../assets/twitter.svg?react";
import YoutubeFilled from "../../assets/youtube-filled.svg?react";
import Instagram from "../../assets/instagram.svg?react";
import TikTok from "../../assets/tiktok.svg?react";
import LinkedIn from "../../assets/linkedin.svg?react";
import GoogleBusiness from "../../assets/google-business.svg?react";
import FacebookFilled from "../../assets/facebook-filled.svg?react";
import { showSuccessMessage } from "../../utils/notificatuon";
import { Link } from "react-router-dom";
import ClientList from "../../utils/clientList";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../../redux/features/userSlice";
import AddClientModal from "../modal/addClientModal";
import { toast } from "react-hot-toast";
import { Cookies, useCookies } from "react-cookie";
const cookie = new Cookies()

const NavProfile = ({ clientData, setOpen }) => {
  const ref = useRef()
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [platformes, setPlatformes] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [cookies, setCookie, removeCookie] = useCookies();


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handlerLogOut = () => {
    localStorage.removeItem("user");
    removeCookie('access_token')
    navigate("/login");
    const message = "User logout successfully";
    toast.success(message);
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

  return (
    <div className=" relative inline-block text-left" ref={ref}>
      <div
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        onClick={toggleDropdown}
        className="text-gray-600 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        type="button"
      >
        {isDropdownOpen === false ? (
          <IoIosMenu className="text-2xl font-medium" />
        ) : (
          <IoMdClose className="text-2xl font-medium" />
        )}
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownDelay"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 absolute right-0"
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
            {/* <Link to="/brand/name" className="py-2 hover:bg-[#fde8ef] pl-8 block hover:text-blue-600" onClick={() => { setOpen(true); closeDropdown }}> */}
            <Link
              className="py-2 hover:bg-[#fde8ef] pl-8 block hover:text-blue-600"
              onClick={() => {
                setOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              <li className=" flex flex-1 items-center gap-2 justify-start  dark:hover:bg-gray-600 dark:hover:text-white hover:text-blue-600">
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
                className={`gap-2 flex flex-1 items-center justify-start  hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white  ${
                  pathname === "/brand/connection" ? `bg-[#fde8ef] ` : ""
                }`}
              >
                <PiPlugsConnectedBold className="text-lg " />
                Connection
              </li>
            </Link>
            <Link
              to="/setting/Settings/account"
              onClick={closeDropdown}
              className={`py-2 hover:bg-[#fde8ef] pl-8 block px-4  hover:text-[#a202f2]  ${
                pathname.includes("/setting") ? `bg-[#fde8ef] ` : ""
              }`}
            >
              <li className="gap-2 flex flex-1 items-center justify-start  hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white hover:text-[#a202f2]">
                <BsPersonFillGear className="text-lg" />
                Settings
              </li>
            </Link>
            <li className="pl-4 flex flex-1 items-center justify-start text-[#646BFE]  hover:bg-[#fde8ef] dark:hover:bg-gray-600 dark:hover:text-white hover:text-red-600">
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

const NavIcon = ({ platformes }) => {
  return (
    <div className="flex items-center gap-1 justify-start">
      {platformes.map((item) => {
        return (
          <div key={item}>
            {item === "twitter" && (
              <Twitter fill="#03A9F4" width={16} height={16} />
            )}
            {item === "youtube" && (
              <YoutubeFilled fill="red" width={20} height={18} />
            )}
            {item === "facebook" && (
              <FacebookFilled fill="red" width={20} height={18} />
            )}
            {item === "instagram" && (
              <Instagram fill="red" width={20} height={18} />
            )}
            {item === "tiktok" && <TikTok fill="red" width={20} height={18} />}
            {item === "linkedin" && (
              <LinkedIn fill="blue" width={20} height={18} />
            )}
            {item === "google-business" && (
              <GoogleBusiness fill="blue" width={20} height={18} />
            )}
          </div>
        );
      })}
    </div>
  );
};
