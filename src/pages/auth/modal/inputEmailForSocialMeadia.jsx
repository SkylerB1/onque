import React from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "/src/components/button/LoadingButton";
import {
  Input,
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

export default function InputEmailForSocialMeadia({
  open,
  Close,
  onSubmit,
  loading,
}) {
  const { register, handleSubmit, reset } = useForm();

  const handleclose = async () => {
    Close();
    reset();
  };

  return (
    <Dialog className="border-none" open={open} onClose={handleclose} size="md">
      <Toaster />
      <DialogHeader>Confirm your email address</DialogHeader>
      <DialogBody>
        <Typography
          variant="paragraph"
          component="h2"
          sx={{ marginBottom: "16px", fontWeight: "bold" }}
          className="mb-5"
        >
          To continue with the registration process using your Twitter account,
          we need to confirm your email address.
          {/* We will send you an email to validate the address. */}
        </Typography>

        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          // label={
          //   <div style={{ backgroundColor: "white", height: "0px" }}>Email</div>
          // }
          className="focus:shadow-none"
          color="purple"
        />
        <br />
        <div className="text-red">Note: The page will expire in 5 minutes.</div>
        <DialogFooter className="flex justify-center">
          <LoadingButton
            title={"Submit"}
            color="blue"
            rounded="true"
            ripple="light"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            className="w-25"
          />

          <Button
            rounded="true"
            ripple="light"
            onClick={handleclose}
            variant="outlined"
            className="ml-2"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogBody>
    </Dialog>
  );
}
