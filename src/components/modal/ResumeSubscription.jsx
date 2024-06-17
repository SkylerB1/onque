import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import Cross from "../../assets/Cross";
import AcceptIcon from "../../assets/AcceptIcon";
import { axiosInstance } from "../../utils/Interceptor";
import LoadingButton from "../button/LoadingButton";
import { getDateFromUnix } from "../../utils/dateUtils";
import { toastrSuccess, toastrError } from "../../utils/index";
import toast, { Toaster } from "react-hot-toast";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const ResumeSubscription = ({
  open,
  close,
  toggleModal,
  reloadSubscription,
  subscription,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = useMemo(() => text.length < 10, [text]);

  const handleResumeSubscription = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/payments/resume-canceled-subscription"
      );

      let response = res?.data;
      if (response.status === true) {
        toastrSuccess(response?.message);
      } else {
        toastrError(response?.message);
      }
      toggleModal();
      reloadSubscription();
      setLoading(false);
      close(false);
    } catch (err) {
      let message = err?.response?.data?.message;
      message && toastrError(message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={toggleModal}>
      <DialogBody className="max-h-[700px] overflow-auto">
        <ToasterCustomConatiner />
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <AcceptIcon width={100} height={100} />
          </div>
          <div className="text-center flex items-center flex-col">
            <p className="mb-6 text-2xl text-black">Resume Subscription</p>
            <div className="text-base">
              <p className="mb-0 text-black">
                Are you certain you wish to reinstate the subscription that was
                previously canceled? Upon doing so, your benefits will be
                restored.
              </p>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <Button variant="outlined" onClick={toggleModal}>
          Cancel
        </Button>
        <LoadingButton
          title={"Resume plan"}
          loading={loading}
          className="w-36 h-10"
          onClick={handleResumeSubscription}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default ResumeSubscription;
