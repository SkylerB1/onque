import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import Cross from "../../assets/Cross";
import { axiosInstance } from "../../utils/Interceptor";
import LoadingButton from "../button/LoadingButton";

const CancelSubscription = ({ open, toggleModal, reloadSubscription }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = useMemo(() => text.length < 10, [text]);

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/subscription/cancel", {
        comments: text,
      });
      if (res.status === 200) {
        toggleModal();
        reloadSubscription();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={toggleModal}>
      <DialogBody className="max-h-[700px] overflow-auto">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Cross width={100} height={100} fill="red" />
          </div>
          <div class="text-center flex items-center flex-col">
            <p class="mb-6 text-2xl text-black">
              Uh-oh! It looks like you're about to unsubscribe...
            </p>
            <div class="text-base">
              <p class="mb-0 text-black">
                Are you sure you want to cancel the current subscription? You
                can enjoy all its benefits until 02/05/2024, then your plan will
                become Free.
              </p>
            </div>

            <textarea
              name="message"
              className="w-full border border-black mt-10 rounded-lg p-6"
              placeholder="Can you tell us the reason to cancel your subscription? Your feedback will help us to improve our product"
              rows="3"
              onChange={(e) => setText(e.target.value)}
              style={{ height: "150px" }}
            />
            <div className="w-full text-xs flex justify-start pl-7">
              Enter at least 10 characters to cancel your current subscription.
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <Button variant="outlined" onClick={toggleModal}>Cancel</Button>
        <LoadingButton
          title={"Cancel plan"}
          loading={loading}
          disabled={isDisabled}
          className="w-36 h-10"
          onClick={handleCancelSubscription}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default CancelSubscription;
