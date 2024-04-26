import React, { useEffect, useMemo, useState } from "react";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Input, Button } from "@material-tailwind/react";
import { axiosInstance } from "../../../utils/Interceptor";
import BrandNavber from "../../../components/side-navbar/BrandNavber";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../../utils/LocalStorage";
import useConnections from "../../../components/customHooks/useConnections";
import { setUser } from "../../../redux/features/userSlice";
import { useAppContext } from "../../../context/AuthContext";

const ClientDetails = () => {
  const [premium, setPremium] = useState(true);
  const { getConnections } = useConnections();
  const { subscription, validations } = useAppContext();
  const role = useMemo(() => validations?.brandRole?.role, [validations]);
  const brandAccess = useMemo(() => validations && (!role || role?.editBrand), [role]);
  const isSubscribed = Boolean(subscription) || false;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const [brandData, setBrandData] = useState({
    name: "",
    profile: "",
  });

  const handleBrandName = (e) => {
    const { name, value } = e.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/brands/${brandId}`,
        { data: brandData }
      );
      handleGetClients();
      toast.success("Client name updated seccessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetClients = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/brands/${brandId}`
      );
      const brand = response?.data?.data;
      const user = useLocalStorage("user", "get");
      const data = { ...user, brand: brand };
      dispatch(setUser(data));
      getConnections(brand.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const brandName = user?.brand?.brand_name;
    if (brandName) {
      setBrandData((prev) => ({ ...prev, name: brandName }));
    }
  }, [user]);

  return (
    <div className="p-2 sm:ml-10">
      <div>
        <div className="min-h-[50rem] mt-24 flex mb-2 bg-white rounded-lg shadow-2xl">
          {/* <div className="w-1/6 border-r-2 ml-2 hidden  lg:block"> */}
          <div className="w-1/6 border-r-2 ml-2">
            <BrandNavber />
          </div>
          <div className="w-5/6 pb-40">
            <div className="bg-[#EBEBEB] mr-8 ml-8 mt-8 rounded-lg">
              {premium === true ? (
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-[#5E5E5E]">
                      Onboarding a client to OnQue.
                    </p>
                    <AiFillCloseCircle onClick={() => setPremium(false)} />
                  </div>
                  <p className="text-base text-[#5E5E5E]">
                    In this area you can quickly connect each of your clients
                    social media accounts to OnQue. Each client area allows you
                    to manage one X account, a Facebook page, Instagram account,
                    Youtube channel, TikTok profile, LinkedIn page and Google my
                    business profile.
                  </p>
                  <p className="text-base text-[#5E5E5E] mt-2 mb-2">
                    If you manage multiple clients within your business please
                    be mindful to not cross connect accounts. Check that, at the
                    time of onboarding to OnQue, you are logged in to the
                    TikTok, X, Youtube and LinkedIn account that matches the
                    Facebook & Instagram account you connect.
                  </p>
                  <p className="text-base text-[#5E5E5E] mt-2 mb-2">
                    Struggling to connect? Get in touch with the Helpdesk.
                  </p>
                  {!isSubscribed && (
                    <button className="bg-[#d7dfeb] hover:bg-[#d7dfeb] text-white font-semibold text-sm py-2 px-4 rounded">
                      <Link to="/setting/price">GET PREMIUM</Link>
                    </button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="ml-8">
              <p className="text-lg mt-8">Name and picture</p>
              <div>
                <form className="mt-6 mb-2" onSubmit={handleSubmit}>
                  <div className="">
                    <div className="items-start justify-between">
                      <div className="mt-4 w-[300px]">
                        <label>Change your client name:</label>
                        <div className="mt-4">
                          <Input
                            color="purple"
                            type="text"
                            size="lg"
                            label="Client Name"
                            name="name"
                            disabled={!brandAccess}
                            value={brandData.name}
                            onChange={handleBrandName}
                            className="focus:shadow-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 w-52">
                    <Button
                      type="submit"
                      disabled={!brandAccess}
                      className="mt-6 bg-black text-white"
                      fullWidth
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
