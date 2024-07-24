import React, { useState, useEffect, useId, useRef } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import InputColor from "react-input-color";
import { FaRegClone } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";

const ButtonComponent = ({
  id,
  deleteButton,
  values,
  updateButtonValues,
  handleClone,
}) => {
  const uniqueId = useId();
  const textInputRef = useRef(null);
  const urlInputRef = useRef(null);
  const [lastCopied, setLastCopied] = useState(null);

  const handleChange = (e, identifier) => {
    let value = e.target.value;
    updateButtonValues(id, identifier, value);
  };
  const handleColorChange = (identifier, value) => {
    updateButtonValues(id, identifier, value);
  };
  const handleDisabledSwitch = (event) => {
    updateButtonValues(id, "isDisabled", event.target.checked);
  };

  const copyToClipboard = (ref, identifier) => {
    const inputValue = ref.current.value;
    let key = identifier + "-" + id;
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setLastCopied(key);
        setTimeout(() => setLastCopied(false), 2000); // Reset the copied status after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
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
              icon={
                <FaRegCopy
                  size={16}
                  className={`cursor-pointer ${
                    lastCopied === `textInput-${id}`
                      ? "text-green-500 border-2"
                      : ""
                  }`}
                  onClick={() => copyToClipboard(textInputRef, "textInput")}
                />
              }
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
        <div className="flex xl:justify-between flex-wrap xs:flex-nowrap">
          <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-2 ">
            <div class="flex items-center justify-center gap-1 py-1 px-2  bg-gray-100 rounded-lg  border  h-[36px] border-gray-900 hover:border-gray-500">
              <InputColor
                initialValue={values.textColor.hex}
                onChange={(value) => handleColorChange("textColor", value)}
                placement="right"
                className=""
              />

              <label className="text-sm font-bold hover:font-semibold text-gray-900">
                Text
              </label>
            </div>
            <div class="flex items-center justify-center gap-1 py-1 px-2  bg-gray-100 rounded-lg  border shadow-sm h-[36px] border-gray-900 hover:border-gray-500">
              <InputColor
                initialValue={values.bgColor.hex}
                onChange={(value) => handleColorChange("bgColor", value)}
                placement="right"
              />
              <label className="text-sm font-bold hover:font-semibold text-gray-900">
                Background
              </label>
            </div>
            <div class="flex items-center justify-center  h-[36px] gap-1 py-1 px-2  bg-gray-100 rounded-lg  border shadow-sm hover:border-gray-500 border-gray-900">
              <InputColor
                initialValue={values.borderColor.hex}
                onChange={(value) => handleColorChange("borderColor", value)}
                placement="right"
              />
              <label className="text-sm font-bold hover:font-semibold text-gray-900">
                Border
              </label>
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-2 ">
            <div className="">
              <div class=" flex items-center justify-center  gap-1 py-1 px-2  bg-gray-100 rounded-lg  border shadow-sm h-[36px] border-gray-900 hover:border-gray-500">
                <div class="inline-flex items-center">
                  <div class="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                    <input
                      id={uniqueId}
                      type="checkbox"
                      class="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                      defaultChecked={values.isDisabled}
                      onChange={handleDisabledSwitch}
                    />
                    <label
                      htmlFor={uniqueId}
                      class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                    >
                      <div
                        class="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                        data-ripple-dark="true"
                      ></div>
                    </label>
                  </div>
                  <label
                    htmlFor={uniqueId}
                    class="mt-px mb-0 ml-3 font-bold hover:font-semibold text-sm text-gray-900 cursor-pointer select-none"
                  >
                    Disable
                  </label>
                </div>
              </div>
            </div>
            <div className=" ">
              <Button
                variant="outlined"
                className="flex items-center gap-3"
                size="sm"
                onClick={() => handleClone(id)}
              >
                <FaRegClone size={12} />
                Clone
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponent;
