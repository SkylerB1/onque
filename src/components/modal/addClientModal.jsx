import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { axiosInstance } from "../../utils/Interceptor";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../utils/LocalStorage";
import useConnections from "../customHooks/useConnections";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function AddModal({ open, Close }) {
  const { getConnections } = useConnections();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    brand_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/brands/create`,
        { data: formData }
      );
      const brand = response?.data?.brand;
      setFormData({ brand_name: "" });
      toast.success("Client added successfully");
      Close();
      const user = useLocalStorage("user", "get");
      const data = { ...user, brand: brand };
      dispatch(setUser(data));
      const brandId = user?.brand.id;
      getConnections(brandId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog className="border-none" open={open} onClose={Close}>
      <DialogBody>
        <div className="mt-4 mb-6 flex flex-1 gap-4 justify-center items-center">
          <div className="w-72">
            <Input
              color="purple"
              label="Client name"
              type="text"
              size="lg"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleInputChange}
              autoFocus
              className="focus:shadow-none"
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-center">
        <Button size="sm" onClick={handleSubmit}>
          ACCEPT
        </Button>
        <Button size="sm" variant="outlined" onClick={Close} className="ml-2">
          CANCEL
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
