import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import BrandNavber from "../../../components/side-navbar/BrandNavber";

const TeamAccess = () => {
  const searchParams = useSearchParams();
  const [premium, setPremium] = useState(true);
  const [hidden, setHidden] = useState(true);
  const role = ["Admin", "Analytics", "User"];
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-2 sm:ml-10">
      <div>
        <div className="min-h-[50rem] mt-24 flex mb-2 bg-white rounded-lg shadow-2xl">
          <div className="xl:w-1/6 xl:border-r-2 xl:ml-8 md:w-2/6 md:ml-2">
            <BrandNavber />
          </div>
          <div className="xl:w-5/6 pb-40 md:w-4/6">
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
                  <button className="bg-[#d7dfeb] hover:bg-[#d7dfeb] text-white font-semibold text-sm py-2 px-4 rounded">
                    <Link to="/setting/Settings?tab=price">GET PREMIUM</Link>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="ml-8">
              <div className="flex flex-1 items-start justify-between">
                <div>
                  <p className="text-lg mt-8">User access</p>
                </div>
                <div className="mr-8 mt-8">
                  <button
                    className="text-[#FDFDFD] bg-[#5F5F5F] border border-gray-300 focus:outline-none hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-1 "
                    onClick={() => setHidden(false)}
                  >
                    <span className="flex flex-1 items-center justify-center">
                      <AiOutlinePlus className="mr-3" />
                      ADD
                    </span>
                  </button>
                </div>
              </div>
              {hidden === false && (
                <div>
                  <form className="mt-6 mb-2" onSubmit={handleSubmit}>
                    <div className="flex flex-1 items-start justify-between">
                      <div className="w-1/2 mr-8">
                        <Input
                          color="purple"
                          // type="text"
                          size="lg"
                          label="E-mail"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-1/2 mr-8">
                        <select
                          aria-label="Role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full bg-[#EFEFEF] p-2 border rounded-lg"
                        >
                          <option value=""></option>
                          {role.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-8 w-52 flex gap-2">
                      <Button
                        type="submit"
                        className="mt-6 px-5 py-3 bg-black text-white hover:bg-green-500"
                        fullWidth
                      >
                        SAVE
                      </Button>
                      <Button
                        type="submit"
                        className="mt-6 bg-black text-white hover:bg-red-500"
                        fullWidth
                        onClick={() => {
                          setHidden(true);
                        }}
                      >
                        CANCEL
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <SocialTabmeModal open={isOpen} handleClose={handleClose} /> */}
      </div>
    </div>
  );
};

export default TeamAccess;
