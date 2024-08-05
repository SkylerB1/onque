import React, { useState, useEffect, useId, useRef } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";

const IconComponent = ({ id, deleteButton, values, updateButtonValues }) => {
  const uniqueId = useId();
  const textInputRef = useRef(null);
  const urlInputRef = useRef(null);
  const [lastCopied, setLastCopied] = useState(null);

  const handleChange = (e, identifier) => {
    let value = e.target.value;
    updateButtonValues(id, identifier, value);
  };

  return (
    <div className="border border-gray-900 rounded-lg flex xl:flex-col">
      <div className="flex items-center justify-center xl:border-b   border-r  border-gray-900 cursor-move">
        <BsThreeDots size={24} className="xl:block hidden" />
        <BsThreeDotsVertical size={24} className=" xl:hidden" />
      </div>
      <div class=" pb-5 px-5">
        <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-5">
          <div class="w-full xl:w-1/2 ">
            <Input
              inputRef={textInputRef}
              inputType={"text"}
              label={"Text"}
              onChange={(e) => handleChange(e, "text")}
              value={values.text}
            />
          </div>
          <div class="w-full xl:w-1/2 flex items-center gap-1 ">
            <Input
              inputRef={urlInputRef}
              inputType={"text"}
              label={"URL"}
              onChange={(e) => handleChange(e, "url")}
              icon={
                <FaRegCopy
                  size={16}
                  className={`cursor-pointer ${
                    lastCopied === `urlInput-${id}`
                      ? "text-green-500  border-2"
                      : ""
                  }`}
                  onClick={() => copyToClipboard(urlInputRef, "urlInput")}
                />
              }
              value={values.url}
            />
            <IconButton variant="outlined" onClick={() => deleteButton(id)}>
              <MdDelete size={24} className="cursor-pointer " />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconComponent;
