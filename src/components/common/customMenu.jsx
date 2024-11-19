import React, { useEffect, useRef, useState } from 'react';
import useConnections from '../customHooks/useConnections';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../utils/LocalStorage';
import { setUser } from '../../redux/features/userSlice';
import FacebookFilled from "../svg/FacebookFilled";
import Instagram from "../svg/Instagram";
import Youtube from "../svg/Youtube";
import Twitter from "../svg/Twitter";
import Tiktok from "../svg/Tiktok";
import LinkedIn from "../svg/LinkedIn";
import GoogleBusiness from "../svg/GoogleBusiness";

const CustomMenu = ({ clientDatas }) => {
  const ref = useRef();
  const [selectedData, setSelectedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { getConnections } = useConnections();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && clientDatas.length === 0) {
      handleGetClients()
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])

  const handleItemClick = (item) => {
    setSelectedData(item);
    setIsOpen(false);
    const user = useLocalStorage("user", "get");
    const data = { ...user, brand: item }
    dispatch(setUser(data))
    getConnections(item.id)
  };


  useEffect(() => {
    const user = useLocalStorage("user", "get");
    const brand = user?.brand;
    setSelectedData(brand)
  }, [user])

  return (
    <div>
      <div className="relative inline-block text-left" ref={ref}>
        <div className="w-[14rem] border-2 rounded-md bg-white">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full px-4 py-2 text-lg border-none font-medium text-gray-700 focus:outline-none active:bg-gray-200"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"

          >
            <div className="flex flex-1 items-center justify-start gap-3 ">
              <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {selectedData?.brand_name.charAt(0)}
                </span>
              </div>
              {selectedData?.brand_name}
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
          </button>

          {isOpen && (
            <div className="origin-top-left absolute left-1 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {Array.isArray(clientDatas) && clientDatas?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className=" w-full text-start text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                    role="menuitem"
                  >
                    <div className="flex flex-1 items-center justify-start gap-3" key={index}>
                      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                          {item.brand_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        {item.brand_name}
                        <div className="flex flex-1 items-center justify-start gap-2 mt-1">
                          {
                            Array.isArray(item.socialTokens) && item.socialTokens.map((item, index) => (
                              <SocialIcon key={item.id} platform={item.platform} />
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomMenu;

export const SocialIcon = ({ platform }) => {
  return (
    <div>
      {platform === 'Facebook_Page' && <FacebookFilled fill={"#828487"} width={14} height={14} />}
      {platform === 'Twitter' && <Twitter fill={""} width={14} height={14} />}
      {platform === 'Instagram' && <Instagram fill={"#828487"} width={14} height={14} />}
      {platform === 'YouTube' && <Youtube fill={"#828487"} width={14} height={14} />}
      {platform === 'TikTok_Personal' && <Tiktok fill={"#828487"} width={14} height={14} />}
      {platform === 'TikTok_Business' && <Tiktok fill={"#828487"} width={14} height={14} />}
      {platform === 'LinkedIn' && <LinkedIn fill={"#828487"} width={14} height={14} />}
      {platform === 'LinkedIn_Page' && <LinkedIn fill={"#828487"} width={14} height={14} />}
      {platform === 'google_business' && <GoogleBusiness fill={"#828487"} width={14} height={14} />}
      {/* Add more conditions for other social platforms */}
    </div>
  );
}
