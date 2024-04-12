import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Button,
  Typography,
  Card,
  CardBody,
  Checkbox,
} from "@material-tailwind/react";
import TikTok from "../../assets/tiktok.svg?react";
import Instagram from "../../assets/instagram.svg?react";
import { useLocalStorage } from "../../utils/LocalStorage";
import { InstagramPlatform } from "./commonString";

const AutoPublishPompt = ({
  isOpen,
  onClose,
  setAdditionalPresets,
  platform,
  brandId,
}) => {
  const [instaDontShowAgain, setInstaDontShowAgain] = useState(false);
  const [tiktokDontShowAgain, setTiktokDontShowAgain] = useState(false);

  const handleClick = (identifier, value) => {
    debugger;
    setAdditionalPresets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [identifier]: value },
    }));
    onClose();
  };

  const handleCheckboxChange = (platform) => {
    if (platform == InstagramPlatform) {
      setInstaDontShowAgain(!instaDontShowAgain);
      useLocalStorage(
        `brand.${brandId}.planner.instaPrompt`,
        "add",
        !instaDontShowAgain
      );
    } else {
      setTiktokDontShowAgain(!tiktokDontShowAgain);
      useLocalStorage(
        `brand.${brandId}.planner.tiktokPrompt`,
        "add",
        !tiktokDontShowAgain
      );
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} size="md">
      <DialogHeader className="justify-between my-2">
        <div className="flex items-center gap-3">
          {platform === InstagramPlatform ? (
            <>
              <Instagram width={18} height={18} />
              <Typography variant="h5">{platform} auto publish</Typography>
            </>
          ) : (
            <>
              <TikTok width={18} height={18} />
              <Typography variant="h5">{platform} auto publish</Typography>
            </>
          )}
        </div>

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
      <hr />
      <DialogBody>
        <Card className="mx-3 my-2">
          <CardBody className="p-8">
            This post can be automatically published but the auto publish button
            is off. Are you sure that you want to manually publish this post?
          </CardBody>
        </Card>
      </DialogBody>

      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-3">
          <Button
            color="blue-gray"
            size="sm"
            onClick={() => handleClick("autoPublish", false)}
          >
            Save as manual publish
          </Button>
          <Button size="sm" onClick={() => handleClick("autoPublish", true)}>
            Save as auto publish
          </Button>
        </div>
        <div className="my-3">
          <Checkbox
            label="Don't show this anymore"
            checked={
              platform === InstagramPlatform
                ? instaDontShowAgain
                : tiktokDontShowAgain
            }
            onChange={() => handleCheckboxChange(platform)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AutoPublishPompt;
