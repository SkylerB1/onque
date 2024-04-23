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

const EmailNotificationDialog = ({
  open,
  handler,
  loading,
  email,
  onChange,
  handleSubmit,
  handleBack,
}) => {
  return (
    <Dialog size="lg" open={open} handler={handler}>
      <DialogBody>
        <div>
          <div className="flex justify-center mb-6">
            <img src={AddUserColored} alt="add-user-img" />
          </div>
          <div className="text-center flex items-center flex-col">
            <p className="mb-6 text-2xl">
              We are going to add the new collaborator
            </p>
            <div className="w-full mb-6" style={{ maxWidth: "648px" }}>
              <p className="leading-6 mb-4">
                Do you want us to send a notification email to{" "}
                <strong>{email}</strong> once the user is added as collaborator?
              </p>
            </div>
            <div className="flex w-full justify-evenly">
              <Radio
                name="sendEmail"
                label="Yes, send a notification email."
                onChange={() => onChange(true)}
              />
              <Radio
                name="sendEmail"
                checked={true}
                label="Do not send any email."
                onChange={() => onChange(false)}
              />
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="px-8 py-4 w-full">
          <div className="flex justify-between">
            <Button variant="outlined" onClick={handleBack} size="lg">
              Back
            </Button>
            <LoadingButton
              title={"Add user"}
              onClick={handleSubmit}
              className="w-32"
              loading={loading}
            />
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default EmailNotificationDialog;
