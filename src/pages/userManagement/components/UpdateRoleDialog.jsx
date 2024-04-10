import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  IconButton,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UpdateRoleDialog = ({ isOpen, onClose, brands, selectedBrands }) => {
  console.log({ brands });
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const isBrandSelected = (brand) => {
    return selectedBrands.includes(brand);
  };

  return (
    <Dialog size="sm" open={isOpen} onClose={onClose}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Update role
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="black"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <Dialog.Body>
        <div className="mb-4  flex-col gap-8 md:flex-row md:items-center p-8">
          <div className="w-full mb-4">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          <div className="black p">Roles</div>
          <div className="grid gap-4 py-4">
            {brands.map((brand) => (
              <Button
                variant="outlined"
                key={brand}
                className={`border ${
                  isBrandSelected(brand) ? "border-blue-500" : "border-gray-300"
                } p-3 flex items-center justify-between`}
                onClick={() => handleBrandSelect(brand)}
              >
                {brand}
                {isBrandSelected(brand) ? (
                  <Checkbox defaultChecked />
                ) : (
                  <Checkbox />
                )}
              </Button>
            ))}
          </div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export default UpdateRoleDialog;
