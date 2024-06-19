import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Card,
  Typography,
  IconButton,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";
import React from "react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const PublishPostModal = ({ open, onClose, platform }) => {
  <ToasterCustomConatiner />;
  return (
    <Dialog size="sm" open={open} onClose={onClose} className="bg-gray-100">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          {"Auto publish on " + platform}
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
      <DialogBody className="justifyCenter">
        <Card className="items-center mr-auto px-8 py-8">
          <Timeline>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Step 1.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  We will send you a e-mail so you can publish your post.
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Step 2.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  Once you access the e-mail, you can copy the text and will
                  save photos and videos in your library or photo album.
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Step 3.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  {`At the time of publication, you  can add filters, sounds ot edit the cover on ${platform} to finish customization your publication`}
                  .
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </Card>
      </DialogBody>
    </Dialog>
  );
};

export default PublishPostModal;
