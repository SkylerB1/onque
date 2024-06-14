import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IllustrationPremium } from "../common/Images";

const UpgradeSubscription = ({ open, toggleModal, body }) => {
  const navigate = useNavigate();

  const redirectToPlans = () => {
    navigate("/setting/price");
    toggleModal();
  };

  return (
    <Dialog open={open} onClose={toggleModal}>
      <DialogBody>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img
              src={IllustrationPremium}
              alt
              style={{ maxWidth: "190px" }}
            ></img>
          </div>
          <div className="text-center flex items-center flex-col">
            <p className="mb-6 text-2xl text-black">Update your subscription</p>
            <div className="text-base">
              <p className="mb-0 text-black">{body}</p>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-end">
        <Button
          className=" bg-gradient-to-r from-purple-500 to-pink-500 "
          onClick={redirectToPlans}
        >
          Get Premium
        </Button>{" "}
        <Button className="ml-2" onClick={toggleModal}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpgradeSubscription;
