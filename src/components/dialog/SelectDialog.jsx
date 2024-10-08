import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const SelectionModal = ({
  open,
  subTitle,
  title,
  data,
  handleSelect,
  loading,
  handleClose,
  platformIcon,
}) => {
  return (
    <Dialog size="sm" className="bg-[#efefef]" open={open}>
      <ToasterCustomConatiner />
      <DialogHeader className="">{title}</DialogHeader>
      <p className="ml-4 mb-4 text-sm">{subTitle}</p>
      <DialogBody
        divider={false}
        className="bg-white mx-4 rounded-md overflow-y-auto"
      >
        {!data || loading ? (
          <div className="flex flex-row justify-center">
            <Spinner className="h-10 w-10" />
          </div>
        ) : data.length > 0 ? (
          <div className="max-h-96">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-row items-center cursor-pointer pr-4 ${
                    index > 0 && "mt-2"
                  }`}
                >
                  {item.profile ? (
                    <img
                      alt="profile"
                      width={50}
                      height={50}
                      className="rounded-md"
                      src={item.profile}
                    />
                  ) : (
                    platformIcon
                  )}
                  <div className="flex flex-col flex-1">
                    <span className="text-base text-black font-bold ml-4 ">
                      {item.name}
                    </span>
                    {item.body && (
                      <span className="text-sm text-blue-gray-800 ml-4 =">
                        {item.body}
                      </span>
                    )}
                  </div>
                  <Typography color="blue" variant="small"
                  onClick={() => handleSelect(item)}>
                    Connect
                  </Typography>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <Typography>No data available</Typography>
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="outlined"
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

export default SelectionModal;
