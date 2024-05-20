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
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import UpgradeSubscription from "./UpgradeSubscription";
import LoadingButton from "../button/LoadingButton";
import { addBrand } from "../../redux/features/brandsSlice";
import { initialiseConnections } from "../../redux/features/connectionSlice";

const initial = {
  brand_name: "",
};

export default function AddModal({ open, Close }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [formData, setFormData] = useState(initial);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/brands/create`,
        formData
      );
      const brand = response?.data?.brand;
      setFormData({ brand_name: "" });
      toast.success("Client added successfully");
      setLoading(false);
      Close();
      const user = useLocalStorage("user", "get");
      const data = { ...user, brand: brand };
      dispatch(setUser(data));
      dispatch(addBrand(brand));
      dispatch(initialiseConnections([]));
    } catch (error) {
      setLoading(false);
      Close();
      if (error?.response?.status === 403) {
        setOpenSubscriptionModal(true);
      }

      console.log(error);
    }
  };

  const toggleSubscriptionModal = () => {
    setOpenSubscriptionModal(!openSubscriptionModal);
  };

  const handleClose = () => {
    setFormData(initial);
    Close()
  }

  return (
    <>
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
          <LoadingButton
            loading={loading}
            title={"Accept"}
            className="w-24 h-9"
            size="sm"
            onClick={handleSubmit}
          />
          <Button
            size="sm"
            variant="outlined"
            onClick={handleClose}
            className="ml-2"
          >
            CANCEL
          </Button>
        </DialogFooter>
      </Dialog>
      <UpgradeSubscription
        open={openSubscriptionModal}
        toggleModal={toggleSubscriptionModal}
        body={
          "Your current plan does not allow the management of more clients. In order to add other clients, you either need a PREMIUM account or upgrade subscription."
        }
      />
    </>
  );
};