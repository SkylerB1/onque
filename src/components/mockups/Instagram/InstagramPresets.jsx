import InputComponent from "../../Input/InputComponent";
import Accordion from "../../accordion/Accordion";
import Instagram from "../../../assets/instagram.svg?react";
import QuestionMark from "../../../assets/QuestionMark";
import React, { useEffect, useState, useMemo } from "react";
import CustomSwitch from "../../Input/CustomSwitch";
import {
  Typography,
  IconButton,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import PublishPostModal from "../../modal/publishPostModal";
import { InstagramPlatform } from "../../common/commonString";
import { useLocalStorage } from "../../../utils/LocalStorage";
import AutoPublishPompt from "../../common/AutoPublishPompt";
import Cross from "../../svg/Cross";

import { IoIosMan } from "react-icons/io";
import AddInstagramCollaboratorDialog from "../../modal/addInstagramCollaboratorDialog";
import { isContainImage, isContainVideo } from "../../../utils";

function InstagramPresets({
  setAdditionalPresets,
  additionalPresets,
  platform,
  brandId,
  mediaType,
  files,
  showReelOnFeedChecked,
  setShowReelOnFeedChecked,
}) {
  const [open, setOpen] = useState(true);

  const isContainMediaFile = useMemo(() => {
    const videosCount = files?.filter((item) => isContainVideo(item)).length;
    const imagesCount = files?.filter((item) => isContainImage(item)).length;
    return videosCount > 0 || imagesCount > 0;
  }, [files]);

  const [collaborators, setCollabortors] = useState(
    additionalPresets.collaborators || []
  );
  const [openAddInstagramCollaborator, setOpenAddInstagramCollaborator] =
    useState(false);
  const [openInstagramPrompt, setOpenInstagramPrompt] = useState(false);

  const toggleAccordion = () => {
    if (additionalPresets?.autoPublish) {
      setOpen(!open);
    }
  };

  const handleChange = (identifier, value) => {
    setAdditionalPresets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [identifier]: value },
    }));

    const promptValue = useLocalStorage(
      `brand.${brandId}.planner.instaPrompt`,
      "get"
    );
    if (value === false && !promptValue) {
      setOpenInstagramPrompt(!openInstagramPrompt);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const AddInstagramCollaborator = () => {
    setOpenAddInstagramCollaborator(true);
  };
  const removeCollaborator = (collaboratorName) => {
    setCollabortors(
      collaborators.filter((collaborator) => collaborator !== collaboratorName)
    );
  };
  useEffect(() => {
    handleChange("collaborators", collaborators);
  }, [collaborators]);

  const handleChangeReelFeed = (event) => {
    setShowReelOnFeedChecked(event.target.checked);
    setAdditionalPresets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], showReelOnFeed: event.target.checked },
    }));
  };

  useEffect(() => {
    setShowReelOnFeedChecked(additionalPresets?.showReelOnFeed || false);
  }, []);
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
        {(mediaType == "REEL" || mediaType == "POST") && (
          <div className="mb-8 flex items-center gap-2 flex-wrap">
            <div>Collaborator :</div>
            {Array.isArray(collaborators) && 
              collaborators.map((collaborator, key) => (
                <div
                  key={key}
                  className="px-3 py-3 bg-black w-auto h-8 text-white rounded-2xl inline-flex items-center justify-between text-xs font-semibold"
                >
                  <span className="mr-2">{collaborator}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => removeCollaborator(collaborator)}
                  >
                    <Cross width={15} height={15} fill="#fff" />
                  </span>
                </div>
              ))}
            {isContainMediaFile == false ? (
              <>
                <Tooltip
                  content="Tagging Collaborators need a multimedia file. Please make sure that you have added a multimedia file."
                  className=" bg-white text-black border-gray-300  shadow-lg"
                  offset={15}
                  animation="duration-500 ease-in-out"
                  placement="top-start"
                >
                  <div className="cursor-pointer px-3 py-3  w-auto h-8  rounded-2xl border-dashed border-slate-950 border-2 inline-flex items-center justify-between text-sm font-semibold">
                    <IoIosMan />
                    <span className="mr-2 ml-1 mt-0">Add Collaborator</span>
                  </div>
                </Tooltip>
              </>
            ) : (
              <div
                onClick={AddInstagramCollaborator}
                className="cursor-pointer px-3 py-3  w-auto h-8  rounded-2xl border-dashed border-slate-950 border-2 inline-flex items-center justify-between text-sm font-semibold"
              >
                <IoIosMan />
                <span className="mr-2 ml-1 mt-0">Add Collaborator</span>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row justify-start">
          <InputComponent
            inputType={"switch"}
            label={"Show Reel on feed"}
            onChange={handleChangeReelFeed}
            checked={showReelOnFeedChecked}
          />
        </div>
      </Accordion>
      <PublishPostModal
        open={modalOpen}
        onClose={handleModalClose}
        platform={InstagramPlatform}
      />
      <AutoPublishPompt
        isOpen={openInstagramPrompt}
        onClose={() => {
          setOpenInstagramPrompt(false);
        }}
        additionalPresets={additionalPresets?.autoPublish}
        setAdditionalPresets={setAdditionalPresets}
        platform={platform}
        brandId={brandId}
      />

      <AddInstagramCollaboratorDialog
        platform={platform}
        collaborators={collaborators}
        setCollabortors={setCollabortors}
        open={openAddInstagramCollaborator}
        Close={() => setOpenAddInstagramCollaborator(false)}
      />
    </div>
  );
}

export default InstagramPresets;
