import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const CustomAccountSelect = ({
  open,
  handleClose,
  data,
  title,
  subTitle,
  handleSelect,
}) => {
  return (
    <Dialog size="md" className="bg-[#efefef]" open={open}>
      <ToasterCustomConatiner />
      <DialogHeader className="">{title}</DialogHeader>
      <p className="ml-5 mb-5 text-sm font-black">{subTitle}</p>
      <DialogBody
        divider={false}
        className="bg-white mx-4 rounded-md shadow-md"
      >
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className={`flex flex-row items-center ${index > 0 && "mt-2"}`}
            >
              <div>
                <span className="text-base text-black font-semibold ml-4 flex flex-1">
                  {item.title}
                </span>
                <span className="text-base text-black ml-4 flex flex-1">
                  {item.body}
                </span>
              </div>
              <Radio id="html" name="type" />
            </div>
          );
        })}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CustomAccountSelect;
