import React, { useState, useRef, useId } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import InputColor from "react-input-color";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

const AddSectionComponent = ({
  id,
  deleteButton,  // This is actually deleteSection passed from the parent
  values = {},
  updateButtonValues,
}) => {
  const uniqueId = useId();
  const urlInputRef = useRef(null);
  const [lastCopied, setLastCopied] = useState(null);

  const handleChange = (e, identifier) => {
    let value = e.target.value;
    if (updateButtonValues) {
      updateButtonValues(id, identifier, value);
    } else {
      console.warn("updateButtonValues function is not provided");
    }
  };

  const copyToClipboard = (ref, identifier) => {
    if (ref.current) {
      const inputValue = ref.current.value;
      let key = identifier + "-" + id;
      navigator.clipboard
        .writeText(inputValue)
        .then(() => {
          setLastCopied(key);
          setTimeout(() => setLastCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      console.warn("Reference is not defined in copyToClipboard");
    }
  };

  return (
    <div className="border border-gray-900 rounded-lg flex xl:flex-col">
      <div className="flex items-center justify-center xl:border-b border-r border-gray-900 cursor-move">
        <BsThreeDots size={24} className="xl:block hidden" />
        <BsThreeDotsVertical size={24} className="xl:hidden" />
      </div>
      <div className="pb-5 px-5">
        <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-5">
          <div className="w-full flex items-center gap-1">
            <Input
              inputRef={urlInputRef}
              inputType={"text"}
              label={"Section Text"}
              onChange={(e) => handleChange(e, "url")}
              icon={
                <FaRegCopy
                  size={16}
                  className={`cursor-pointer ${
                    lastCopied === `urlInput-${id}`
                      ? "text-green-500 border-2"
                      : ""
                  }`}
                  onClick={() => copyToClipboard(urlInputRef, "urlInput")}
                />
              }
              value={values.url || ""}
            />
            <IconButton variant="outlined" onClick={() => deleteButton(id)}>
              <MdDelete size={24} className="cursor-pointer" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSectionComponent;
