import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { MdLink } from "react-icons/md";

import defaultPrrofile from "../../assets/defaultProfile.jpg";
import advanture from "../../assets/advanture.jpg";
import advantureRiver from "../../assets/advantureRiver.jpg";
import Instagram from "../../components/svg/Instagram";
import Twitter from "../../components/svg/Twitter";
import FacebookFilled from "../../components/svg/FacebookFilled";
import LinkedIn from "../../components/svg/LinkedIn";
import Youtube from "../../components/svg/Youtube";
import Email from "../../components/svg/Email";

const SmartView = () => {
  return (
    <div>
      <div className="flex-none p-4">
        <div className="m-10 flex flex-wrap gap-3  justify-center">
          <div className="flex items-center w-full justify-center">
            <Button
              size="sm"
              variant="outlined"
              className="flex items-center gap-2"
            >
              <MdLink size={16} />
              View Live
            </Button>
          </div>
          <div className="min-w-[80%] min-h-screen  border-gray-900 border-8 border-y-[36px] rounded-2xl ">
            <div className="p-5 flex justify-center flex-col items-center">
              <div className="">
                <img
                  className="w-36 h-36 mt-5 rounded-lg"
                  src={defaultPrrofile}
                />
              </div>
              <div className="mt-5 font-semibold text-2xl">Aston+k</div>
              <div className="mt-10 w-[80%] space-y-5">
                <div>
                  <Button variant="outlined" className="" fullWidth>
                    Website Link
                  </Button>
                </div>
                <div>
                  <Button variant="outlined" className="" fullWidth>
                    Button Text
                  </Button>
                </div>
                <div>
                  <Button variant="outlined" className="" fullWidth>
                    Button Text
                  </Button>
                </div>
                <div>
                  <Button variant="outlined" className="" fullWidth>
                    Button Text
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <IconButton variant="outlined" className="rounded-full">
                    <Twitter width={18} height={18} />
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full">
                    <FacebookFilled fill="#0095f6" width={18} height={18} />
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full">
                    <Instagram width={18} height={18} />
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full">
                    <LinkedIn fill="#0077B5" width={18} height={18} />
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full">
                    <Youtube width={18} height={18} fill="#FF0000" />
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full">
                    <Email width={18} height={18} />
                  </IconButton>
                </div>
                <div className="imageBlock flex flex-row flex-wrap gap-4 justify-center cursor-pointer">
                  <div className="">
                    <img
                      className="w-24 h-24 mt-5 rounded-lg"
                      src={advanture}
                    />
                  </div>
                  <div className="">
                    <img
                      className="w-24 h-24 mt-5 rounded-lg"
                      src={advantureRiver}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartView;
