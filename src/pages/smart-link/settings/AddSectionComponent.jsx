import React, { useRef, useState } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

const AddSectionComponent = ({
  id,
  deleteButton, // This is deleteSection passed from the parent
  values = {},
  updateButtonValues,
}) => {
  const urlInputRef = useRef(null);
  const [lastCopied, setLastCopied] = useState(null);

  const handleChange = (e, identifier) => {
    let value = e.target.value;
    updateButtonValues(id, { [identifier]: value }); // Use updateButtonValues to update section
  };

  const copyToClipboard = (ref, identifier) => {
    if (ref.current) {
      const inputValue = ref.current.value;
      navigator.clipboard
        .writeText(inputValue)
        .then(() => {
          setLastCopied(identifier + "-" + id);
          setTimeout(() => setLastCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
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
              onChange={(e) => handleChange(e, "text")}
              icon={
                <FaRegCopy
                  size={16}
                  className={`cursor-pointer ${
                    lastCopied === `text-${id}` ? "text-green-500 border-2" : ""
                  }`}
                  onClick={() => copyToClipboard(urlInputRef, "text")}
                />
              }
              value={values.text || ""}
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
