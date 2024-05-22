import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FaNetworkWired } from "react-icons/fa";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdAutoDelete } from "react-icons/md";
import { axiosInstance } from "../../utils/Interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { removeBrand } from "../../redux/features/brandsSlice";
import CustomModal from "../modal/customModal";
import { setUser } from "../../redux/features/userSlice";
import useConnections from "../customHooks/useConnections";
import { useAppContext } from "../../context/AuthContext";

const BrandNavber = () => {
  const { pathname } = useLocation();
  const url = pathname;
  const { validations } = useAppContext();
  const role = useMemo(() => validations?.brandRole?.role, [validations]);
  const brandAccess = useMemo(
    () => validations && (!role || role?.editBrand),
    [role]
  );
  const { getConnections } = useConnections();
  const { value: brands } = useSelector((state) => state.brands);
  const canDeleteBrand = useMemo(
    () => brands.filter((item) => item.brandRole?.role === null).length > 1,
    [brands]
  );
  const [opens, setOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const { id: brandId, brand_name: brandName } = user?.brand;
  const dispatch = useDispatch();

  const handleDeleteClient = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/user/delete/client/${id}`
      );
      if (response.status === 200) {
        setOpen(false);
        const newBrand = brands[0];
        const userData = { ...user };
        userData.brand = newBrand;
        dispatch(setUser(userData));
        dispatch(removeBrand(id));
        getConnections(newBrand.id);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="ml-2 mr-2">
        <Link
          className="w-full text-base text-black hover:text-black"
          to={"/brand/connection"}
        >
          <ListItem
            className={
              url === "/brand/connection"
                ? "w-full text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a] "
                : "w-full mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
            }
          >
            <ListItemPrefix>
              <FaNetworkWired className="h-5 w-5" />
            </ListItemPrefix>
            Connection
          </ListItem>
        </Link>
        {brandAccess && (
          <Link
            className="w-full text-base text-black hover:text-black"
            to={"/brand/name"}
          >
            <ListItem
              className={
                url === "/brand/name"
                  ? "w-full text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a]"
                  : " w-full mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
              }
            >
              <ListItemPrefix>
                <BsPersonBoundingBox className="h-5 w-5" />
              </ListItemPrefix>
              Name
            </ListItem>
          </Link>
        )}
        {canDeleteBrand && brandAccess && (
          <ListItem
            className=" w-full mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
            onClick={() => setOpen(true)}
          >
            <ListItemPrefix>
              <MdAutoDelete className="h-5 w-5" />
            </ListItemPrefix>
            <p className="w-full text-base text-black">Delete client</p>
          </ListItem>
        )}
      </div>
      <CustomModal
        open={opens}
        Close={() => setOpen(false)}
        title={`Are you sure that you want to delete ${brandName}?`}
        body={`If you continue you will delete this brand (${brandName}) from your account with social networks connections`}
        handleDelete={handleDeleteClient}
        data={brandId}
        brandName={brandName}
      />
    </div>
  );
};

export default BrandNavber;
