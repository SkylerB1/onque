import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import React from "react";
import { AddUserColored } from "../../../components/common/Images";
import LoadingButton from "../../../components/button/LoadingButton";
import ToasterCustomConatiner from "../../../components/ToasterCustomConatiner";

const EmailNotificationDialog = ({
  data,
  loading,
  onChange,
  selectedUser,
  handleCustomEmail,
}) => {
  const {
    open,
    title,
    description,
    radioBtnLabels,
    imgSrc = AddUserColored,
    onSubmit,
    onBack,
  } = data;
  const { sendCustomEmail, resendInvite, customEmailMessage } = selectedUser;
  return (
    <Dialog size="lg" open={open}>
      <ToasterCustomConatiner />
      <DialogBody className="max-h-[584px] overflow-auto">
        <div>
          <div className="flex justify-center mb-6">
            <img src={imgSrc} alt="add-user-img" />
          </div>
          <div className="text-center flex items-center flex-col">
            <p className="mb-6 text-2xl text-black">{title}</p>
            <div className="w-full mb-6" style={{ maxWidth: "648px" }}>
              <p className="leading-6 mb-4 text-black">{description}</p>
            </div>
            <div className="flex w-full justify-evenly">
              {radioBtnLabels.map((item) => {
                const { name, label, value } = item;
                return (
                  <Radio
                    name={name}
                    label={label}
                    defaultChecked={sendCustomEmail === value}
                    onChange={(e) => {
                      onChange(e.target.name, value);
                    }}
                  />
                );
              })}
            </div>
            {sendCustomEmail && (
              <div className="mt-4 text-left flex flex-col w-full max-w-[648px]">
                <label className="text-sm inline-block text-black">
                  Custom message for the invitation e-mail
                </label>
                <textarea
                  className="w-full border border-black rounded-lg p-4 text-black"
                  value={customEmailMessage}
                  onChange={(e) => handleCustomEmail(e.target.value)}
                  rows="3"
                />
              </div>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="px-8 py-4 w-full">
          <div className="flex justify-between">
            <Button variant="outlined" onClick={onBack} size="lg">
              Back
            </Button>
            <LoadingButton
              title={resendInvite ? "Send Email" : "Add user"}
              onClick={() => onSubmit(selectedUser)}
              className="w-32"
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default EmailNotificationDialog;
