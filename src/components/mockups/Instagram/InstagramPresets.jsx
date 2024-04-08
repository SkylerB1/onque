import InputComponent from "../../Input/InputComponent";
import Accordion from "../../accordion/Accordion";
import Instagram from "../../../assets/instagram.svg?react";
import QuestionMark from "../../../assets/QuestionMark";
import React, { useState } from "react";
import CustomSwitch from "../../Input/CustomSwitch";
import { Typography, IconButton } from "@material-tailwind/react";
import PublishPostModal from "../../modal/publishPostModal";
import { InstagramPlatform } from "../../common/commonString";

function InstagramPresets({
  setAdditionalPresets,
  additionalPresets,
  platform,
}) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  const handleChange = (identifier, value) => {
    setAdditionalPresets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [identifier]: value },
    }));
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="my-2">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<Instagram width={18} height={18} />}
        title={"Instagram presets"}
        headerItems={
          <div className="absolute right-20 bottom-5 flex gap-2  items-center">
            <CustomSwitch
              identifier="autoPublish"
              color="green"
              label={
                <Typography variant="small" className="font-normal text-s">
                  Auto Publishing
                </Typography>
              }
              checked={additionalPresets?.autoPublish}
              onChange={handleChange}
            />
            <div onClick={(e) => handleModalOpen(e)}>
              <QuestionMark width={17} height={17} />
            </div>
          </div>
        }
      >
        <div className="flex flex-row justify-evenly">
          <InputComponent
            inputType={"switch"}
            label={"Show Reel on feed"}
            onChange={(text) => console.log(text)}
          />
        </div>
      </Accordion>
      <PublishPostModal
        open={modalOpen}
        onClose={handleModalClose}
        platform={InstagramPlatform}
      />
    </div>
  );
}

export default InstagramPresets;
