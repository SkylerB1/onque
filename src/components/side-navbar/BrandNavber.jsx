import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FaNetworkWired, FaWifi } from "react-icons/fa";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { BsPersonBoundingBox, BsPersonCheckFill } from "react-icons/bs";
import { MdAutoDelete } from "react-icons/md";
import { axiosInstance } from "../../utils/Interceptor";
import CustomMenu from "../common/customMenu";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../modal/customModal";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/features/userSlice";

const BrandNavber = () => {
  const { pathname } = useLocation();
  const [clientData, setClientData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const url = pathname;
  const user = useSelector((state) => state.user.value);
  const { id: brandId, brand_name: brandName } = user?.brand;
  const dispatch = useDispatch();
  const [opens, setOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event);
  };

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const handleGetClients = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/brands`
      );
      let responseData = response?.data?.rows;
      setClientData(responseData);
      setSelectedValue(responseData[0].brand_name);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBrand = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/brand`
      );
      const { data } = response;
      if (data) {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        const userBrand = { ...user, brand: data };
        dispatch(setUser(userBrand));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/user/delete/client/${id}`
      );
      if (response.status === 200) {
        setOpen(false);
        getUserBrand();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <div>
      <div className="ml-2">
        {/* <>
          <div className="flex flex-1 items-center justify-between mt-8 mr-8">
            <p>
              <span className="text-black text-lg">Client</span>
              <span className="ml-2 text-sm text-gray-400">1 of 1</span>
            </p>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <span className="flex flex-1 items-center justify-center">
                <AiOutlinePlus className="mr-3" />
                ADD
              </span>
            </button>
          </div>
          <div className="w-64 mt-6 mr-2 focus:outline-none hover:outline-none">
            <Select
              value={selectedValue}
              defaultValue={clientDatas && clientDatas[0]?.brand_name}
              onChange={handleSelectChange}
              className="p-4 focus:outline-none hover:outline-none"
            >
              {clientDatas.map((client, index) => (
                <Option key={index} value={client.brand_name}>
                  <div className="flex flex-1 items-center gap-1">
                    <div className="avatar-initial bg-blue-gray-200 px-2 py-1 rounded-full flex items-center justify-center">
                      {getFirstLetter(client.brand_name)}
                    </div>
                    {client.brand_name}{" "}
                  </div>
                </Option>
              ))}
            </Select>

            <CustomMenu clientDatas={clientDatas} />

            <select class="py-3 px-4 pe-9 block w-full sm:w-16  md:w-32 lg:w-64  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
              {clientDatas?.map((client, index) => (
                <option key={index}>{client.brand_name} </option>
              ))}
            </select>
          </div>
          <button
            className="text-gray-900 bg-white border-gray-300  hover:bg-gray-100 rounded-lg text-xs px-5 py-1 mt-2"
            onClick={handleOpen}
          >
            VIEW AS TABLE
          </button>

          <hr className="mt-5 mr-8 h-px bg-gray-200 border-0 dark:bg-gray-300"></hr>
        </> */}
        <ListItem
          // className="mt-8"
          className={
            url === "/brand/connection"
              ? "w-[260px] text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a]"
              : " w-[260px] mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
          }
        >
          <ListItemPrefix>
            <FaNetworkWired className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full text-base" to={"/brand/connection"}>
            Connection
          </Link>
        </ListItem>
        <ListItem
          className={
            url === "/brand/name"
              ? "w-[260px] text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a]"
              : " w-[260px] mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
          }
        >
          <ListItemPrefix>
            <BsPersonBoundingBox className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full text-base" to={"/brand/name"}>
            Name and Picture
          </Link>
        </ListItem>
        <ListItem
          // className="mt-8 mb-8"
          className={
            url === "/brand/team/access"
              ? " w-[260px] hover:w-[260px] mt-8 mb-8 text-black bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a]"
              : " w-[260px] mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
          }
        >
          <ListItemPrefix>
            <BsPersonCheckFill className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full text-base" to={"/brand/team/access"}>
            Team access
          </Link>
        </ListItem>
        {clientData && clientData.length > 1 && (
          <ListItem
            className=" w-[260px] mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
            onClick={() => setOpen(true)}
          >
            <ListItemPrefix>
              <MdAutoDelete className="h-5 w-5" />
            </ListItemPrefix>
            <p className="w-full text-base text-[#646BFE]">Delete client</p>
          </ListItem>
        )}
      </div>
      <CustomModal
        open={opens}
        Close={() => setOpen(false)}
        title={`Are you sure that you want to delete ${brandName}?`}
        handleDelete={handleDeleteClient}
        id={brandId}
        brandName={brandName}
      />
    </div>
  );
};

export default BrandNavber;