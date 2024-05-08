import React, { useState } from "react";
import axios from "axios";
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
import toast from "react-hot-toast";

export default function ForgotPassword({ open, Close }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/forgot-password`,
        data
      );
      // console.log(response);
      toast.success(response?.data?.msg);
      reset();
      setLoading(false);
      Close();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleclose = async () => {
    Close();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleclose} size="xs">
      <DialogHeader>Recover your account</DialogHeader>
      <DialogBody>
        <Typography
          variant="p"
          component="h2"
          sx={{ marginBottom: "16px", fontWeight: "bold" }}
          className="mb-5"
        >
          Enter your email address and you will get the instructions to recover
          your account.
        </Typography>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          label={
            <div style={{ backgroundColor: "white", height: "0px" }}>Email</div>
          }
          className="focus:shadow-none"
          color="purple"
        />
        <br />

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
