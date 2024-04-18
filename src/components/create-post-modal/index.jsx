import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import TextGeneratorModal from "../text-generator-modal";

import VideoUploadModal from "../upload-modal/VideoUploadModal";
import SocialPlatform from "../social-platform-selection/SocialPlatform";
import GetFacebookComponent from "../mockups/facebook/GetFacebookComponent";
import GetInstagramComponent from "../mockups/Instagram/GetInstagramComponent";
import GetYoutubeComponent from "../mockups/youtube/GetYoutubeComponent";
import GetTikTokComponent from "../mockups/tiktok/GetTikTokComponent";
import GetTwitterComponent from "../mockups/twitter/GetTwitterComponent";
import LinkedInPost from "../mockups/linkedin/LinkedInPost";
import GoogleBusinessPost from "../mockups/google-business/GoogleBusinessPost";
import SocialMediaConnection from "../SocialMediaConnection/SocialMediaConnection";
import { axiosInstance } from "../../utils/Interceptor";
import {
  API_URL,
  SocialPlatforms,
  isContainImage,
  isContainVideo,
} from "../../utils";
import PostPreview from "./PostPreview";
import ModalInput from "./ModalInput";
import {
  Button,
  Dialog,
  DialogBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  FacebookPagePlatform,
  GoogleBusinessPlatform,
  InstagramPlatform,
  LinkedInPages,
  LinkedInPlatform,
  LinkedInProfile,
  TikTokPersonal,
  TikTokPlatform,
  TwitterPlatform,
  YoutubePlatform,
} from "../common/commonString";
import ImgUploadModal from "../upload-modal/ImageUploadModal.jsx";
import ImageEditorModal from "../upload-modal/ImageEditorModal.jsx";
import Add from "../svg/Add.jsx";
import DownArrow from "../svg/DownArrow.jsx";
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/AuthContext.jsx";
import GetLinkedinComponent from "../mockups/linkedin/GetLinkedinComponent.jsx";
import DeleteIconFilled from "../../assets/DeleteIconFilled.jsx";
import AlertModal from "../modal/AlertModal.jsx";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import { useLocalStorage } from "../../utils/LocalStorage.js";
import UpgradeSubscription from "../modal/UpgradeSubscription.jsx";

const CreatePostModal = ({
  openModal,
  setModal,
  handleModal,
  postData,
  setCaption,
  caption,
  scheduledDate,
  setScheduledDate,
  connections,
  getPostData,
  isEdit,
  setIsEdit,
  clearPostData,
  files,
  setFiles,
}) => {
  const isDuplicating = useMemo(
    () => isEdit === "Published" ?? false,
    [isEdit]
  );
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [viewMode, setViewMode] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showimgUploadModal, setimgUploadModal] = useState(false);
  const [showimgEditorModal, setimgEditorModal] = useState(false);
  const [showVideoUploadModal, setVideoUploadModal] = useState(false);
  const [showAlertModal, setAlertModal] = useState(false);
  const [alertData, setAlertData] = useState({
    header: "",
    onAccept: function () { },
  });
  const [selectedPlaforms, setSelectedPlatforms] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [editIndex, setEditIndex] = useState(0);
  const [additionalPresets, setAdditionalPresets] = useState({
    Google_Business: {
      OFFER: {
        title: "",
        startDate: "",
        endDate: "",
        couponCode: "",
        offerLink: "",
        termsCondition: "",
      },
      EVENT: {
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        button: "",
        buttonLink: "",
      },
      POST: {
        button: "",
        buttonLink: "",
      },
    },
    TikTok_Personal: {
      privacyLevel: "",
      commentDisabled: false,
      duetDisabled: false,
      stitchDisabled: false,
      commercialContent: false,
      commercialContentOwnBrand: false,
      commercialContentThirdParty: false,
      maxVideoPostDuration: "",
      autoPublish: true,
    },
    TikTok_Business: {
      privacyLevel: "",
      commentDisabled: false,
      duetDisabled: false,
      stitchDisabled: false,
      commercialContent: false,
      commercialContentOwnBrand: false,
      commercialContentThirdParty: false,
      maxVideoPostDuration: "",
      autoPublish: true,
    },
    Instagram: {
      showReelOnFeed: true,
      autoPublish: true,
    },
    YouTube: {
      title: "",
      category: "",
      visibility: "public",
      madeForKids: "",
    },
  });
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const [dimensions, setDimensions] = useState({});
  const CREATE_POST_URL = API_URL + `/user/scheduler/posts?brandId=${brandId}`;
  const UPDATE_POST_URL =
    API_URL + `/user/update/post/${postData?.id}?brandId=${brandId}`;
  const DELETE_POST_URL =
    API_URL + `/user/delete/post/${postData?.id}?brandId=${brandId}`;
  const UPLOAD_FILE_URL = API_URL + "/files/upload";
  const [loading, setLoading] = useState(false);
  const { broadcastConnection } = useAppContext();
  const platformComponentMap = useMemo(
    () => ({
      [FacebookPagePlatform]: GetFacebookComponent,
      [InstagramPlatform]: GetInstagramComponent,
      [YoutubePlatform]: GetYoutubeComponent,
      [TikTokPersonal]: GetTikTokComponent,
      [TwitterPlatform]: GetTwitterComponent,
      [LinkedInPages]: GetLinkedinComponent,
      [LinkedInProfile]: GetLinkedinComponent,
      [GoogleBusinessPlatform]: GoogleBusinessPost,
    }),
    [selectedPreview]
  );

  const handlePlatformPreview = (platform) => {
    setSelectedPreview(platform);
  };
  const handleView = (index) => {
    setViewMode(index);
  };
  const handlePostFeed = (index) => { };

  const toggleAlertModal = () => {
    setAlertModal(!showAlertModal);
  };
  const toggleimgUploadModal = () => {
    setimgUploadModal(!showimgUploadModal);
    closeEmoji();
  };
  const toggleVideoUploadModal = () => {
    setVideoUploadModal(!showVideoUploadModal);
    closeEmoji();
  };
  const toggleImageEditorModal = () => {
    setimgEditorModal(!showimgEditorModal);
  };
  const toggleEmojiModal = () => {
    setShowEmoji(!showEmoji);
  };
  const toggleAiModal = () => {
    setShowAiModal(!showAiModal);
  };
  const closeEmoji = () => {
    setShowEmoji(false);
  };
  const handleCaption = (caption) => {
    setCaption(caption);
  };
  const OpenEditor = () => {
    setimgEditorModal(true);
  };

  const handleimgError = useCallback((image, index, size) => {
    const aspectRatio = calculateAspectRatio(
      image.target.naturalWidth,
      image.target.naturalHeight
    );
    setDimensions({
      type: "image",
      id: index,
      aspectRatio: aspectRatio,
      size: size,
    });
  }, []);

  const handleVideoError = (width, height, index, duration, size) => {
    const aspectRatio = calculateAspectRatio(width, height);
    setDimensions({
      type: "video",
      id: index,
      aspectRatio: aspectRatio,
      width: width,
      height: height,
      duration: duration,
      size: size,
    });
  };

  const calculateAspectRatio = (width, height) => {
    return width / height;
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    const media = [];
    files?.forEach((file) => {
      if (file instanceof File || file instanceof Blob) {
        formData.append("files", file);
      } else {
        media.push(file);
      }
    });
    const formDataLength = Array.from(formData.keys()).length;
    if (formDataLength > 0) {
      try {
        const response = await axiosInstance.post(UPLOAD_FILE_URL, formData);
        return [...media, ...response.data?.files];
      } catch (err) {
        return [];
      }
    } else {
      return media;
    }
  };

  const handleClose = () => {
    setFiles([]);
    setCaption("");
    setModal(false);
    setIsEdit(null);
    clearPostData();
  };

  const getAdditionalPreset = (platform, mediaType) => {
    if (platform === GoogleBusinessPlatform) {
      return additionalPresets[platform][mediaType];
    } else {
      return additionalPresets[platform] ?? {};
    }
  };

  const createPost = async (data) => {
    try {
      const response = await axiosInstance.post(CREATE_POST_URL, data);
      if (response.status === 200) {
        getPostData();
        handleClose();
        setLoading(false);
      }
    } catch (err) {
      if (err.response.status === 403) {
        setOpenSubscriptionModal(true);
      }
      setLoading(false);
    }
  };

  const updatePost = async (data) => {
    try {
      const response = await axiosInstance.put(UPDATE_POST_URL, data);
      if (response.status === 200) {
        getPostData();
        handleClose();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const toggleSubscriptionModal = () => {
    setOpenSubscriptionModal(!openSubscriptionModal);
  };

  const handlePublish = async () => {
    setLoading(true);
    let media = [];
    if (files?.length > 0) {
      media = await uploadFiles();
    }
    const data = {
      providers: selectedPlaforms.map((item) => ({
        platform: item.platform,
        mediaType: item.mediaType,
        additionalPresets: getAdditionalPreset(item.platform, item.mediaType),
      })),
      caption: caption,
      scheduledDate: scheduledDate,
      files: media,
    };
    if (isEdit && postData) {
      updatePost(data);
    } else {
      createPost(data);
    }
  };

  const handleDuplicate = () => {
    setIsEdit(null);
    setModal(false);
    setTimeout(() => {
      setModal(true);
    });
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(DELETE_POST_URL);
      if (res.status === 204) {
        toggleAlertModal();
        handleClose();
        getPostData();
      }
    } catch (err) {
      toast.error("Error deleting post");
    }
  };

  const handleDeleteAlert = () => {
    const data = {
      header: "Are you sure that you want to delete this post?",
      onAccept: handleDelete,
    };

    setAlertData(data);
    toggleAlertModal();
  };

  const handleDateChange = async (date) => {
    date = dayjs(date).startOf('minute');
    setScheduledDate(date);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleFile = (file) => {
    setimgUploadModal(false);
    setVideoUploadModal(false);
    setFiles((prevFiles) => [...prevFiles, ...file]);
  };

  const removeimg = (i) => {
    setFiles(files.filter((item, index) => index !== i));
    setErrors((prev) => prev.filter((item) => item.id !== i));
  };

  const handlePreview = useCallback(() => {
    if (selectedPreview) {
      const { platform = "", mediaType = "" } = selectedPreview;
      const Component = platformComponentMap[platform];
      const presets = additionalPresets[platform];
      const date = dayjs(scheduledDate).format("DD MMM");

      if (Component) {
        return Component({
          files,
          viewMode,
          caption,
          connections,
          date,
          data: presets,
          mediaType: mediaType,
        });
      }
    } else {
      return (
        <div className="flex w-full h-full flex-1 justify-center items-center">
          <p>Loading..</p>
        </div>
      );
    }
  }, [
    selectedPreview,
    viewMode,
    caption,
    files,
    files,
    additionalPresets,
    connections,
    scheduledDate,
  ]);

  useEffect(() => {
    if (
      selectedPlaforms.length == 0 &&
      connections &&
      connections.length > 0 &&
      !selectedPreview
    ) {
      if (postData) {
        const { platforms } = postData;
        const presets = {};
        platforms.forEach((item) => {
          const { additionalPresets, platform } = item;
          if (additionalPresets) {
            presets[platform] = additionalPresets;
          }
        });
        setAdditionalPresets((prev) => ({ ...prev, ...presets }));
        setSelectedPlatforms(platforms);
        setSelectedPreview(platforms[0]);
      } else {
        const savedPlatforms = useLocalStorage(
          `brand.${brandId}.planner.networks`,
          "get"
        );
        if (savedPlatforms && savedPlatforms.length > 0) {
          setSelectedPlatforms(savedPlatforms);
          setSelectedPreview(savedPlatforms[0]);
        } else {
          const { platform, screenName } = connections[0];
          const { mediaType } = SocialPlatforms[platform];
          const initialPlatform = {
            platform,
            screenName,
            mediaType: mediaType || "POST",
          };
          setSelectedPlatforms([initialPlatform]);
          setSelectedPreview(initialPlatform);
        }
      }
    }
  }, [connections, postData]);

  useEffect(() => {
    setErrors([]);
    const canPublish =
      dayjs(scheduledDate).isAfter(dayjs()) ||
      dayjs(scheduledDate).isSame(dayjs());
    const hasImages = files.some((item) => isContainImage(item));
    const hasVideos = files.some((item) => isContainVideo(item));
    const videosCount = files?.filter((item) => isContainVideo(item)).length;
    const imagesCount = files?.filter((item) => isContainImage(item)).length;
    const noFileSelected = files.length === 0;
    const noContent = caption.length === 0;
    errors?.forEach((element) => {
      if (!selectedPlaforms.some((item) => item.platform == element.platform)) {
        setErrors((prev) =>
          prev.filter((item) => item.platform !== element.platform)
        );
      }
    });

    if (!canPublish && !isDuplicating) {
      setErrors((prev) => [
        ...prev,
        {
          platform: "",
          error: "Publish date can't be a past date.",
        },
      ]);
    }

    selectedPlaforms.forEach((item) => {
      const { platform } = item;
      if (platform == InstagramPlatform) {
        if (noFileSelected) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error: "Instagram - Add at least 1 image or video.",
            },
          ]);
        }
        if (dimensions?.size > 8000000 && dimensions?.type.includes("image")) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error:
                "Instagram - Your image is too large. The maximum size is 8MB.",
            },
          ]);
        }
        if (
          dimensions?.size > 100000000 &&
          dimensions?.type.includes("video")
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error:
                "Instagram - Your video is too large. The maximum size is 100MB.",
            },
          ]);
        } else if (
          item.mediaType == "POST" &&
          (dimensions?.aspectRatio < 0.8 || dimensions?.aspectRatio > 1.91) &&
          dimensions?.type.includes("image")
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error:
                "Instagram - Invalid aspect ratio for image, it must be between 4:5 and 1.91:1. You can crop this in the editor.",
            },
          ]);
        }
        if (
          item.mediaType == "POST" &&
          dimensions?.type?.includes("video") &&
          dimensions?.width > 1920
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error: `Instagram - Video width can't be larger than 1920 pixels. This video don't meet the requirements (${dimensions.width}px).`,
            },
          ]);
        }
        if (
          item.mediaType == "POST" &&
          dimensions?.type?.includes("video") &&
          (dimensions?.aspectRatio < 0.8 || dimensions?.aspectRatio > 1.78)
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error: `Instagram - Invalid aspect ratio for video, it must be between 4:5 and 16:9. You can crop this in the editor.`,
            },
          ]);
        }
        if (
          (item.mediaType == "POST" || item.mediaType == "STORY") &&
          dimensions?.type?.includes("video") &&
          (dimensions?.duration < 0.3 || dimensions?.duration > 60)
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions?.id,
              platform: "instagram",
              error: `Instagram - Invalid video length, it must be 3s minimum and 60s maximum. Yours is ${dimensions?.duration.toFixed(
                1
              )}s long`,
            },
          ]);
        }
        if (item.mediaType == "REEL" && dimensions?.type?.includes("image")) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "instagram",
              error: `Instagram - Images are not supported as Reels, Please upload a 9:16 video.`,
            },
          ]);
        } else if (
          item.mediaType == "REEL" &&
          dimensions?.aspectRatio !== 0.5625
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions?.id,
              platform: "instagram",
              error: `Instagram - Invalid aspect ratio for Reels, it must be 9:16. You can crop this in the editor.`,
            },
          ]);
        }
      }
      if (platform.includes(FacebookPagePlatform)) {
        if (noFileSelected && noContent) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "facebook",
              error: "Facebook - Add at least 1 character or 1 media file.",
            },
          ]);
        }
        if (hasImages && hasVideos) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "facebook",
              error:
                "Facebook - Mixing images/gifs/videos/documents is not allowed nor selecting more than 1 gif/video/document.",
            },
          ]);
        }
      }
      if (platform.includes(TwitterPlatform)) {
        if (noFileSelected && noContent) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "twitter",
              error: "Twitter - Add at least 1 character or 1 media file.",
            },
          ]);
        }
        if (videosCount > 1) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "twitter",
              error: "Twitter - Max videos allowed 1.",
            },
          ]);
        }
        if ((hasImages && hasVideos) || videosCount > 1) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "twitter",
              error:
                "Twitter - Mixing images/gifs/videos/documents is not allowed nor selecting more than 1 gif/video/document.",
            },
          ]);
        }
        if (imagesCount > 4) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "twitter",
              error: "Twitter - Max 4 images are allowed.",
            },
          ]);
        }
        if (dimensions?.type?.includes("image") && dimensions?.size > 5000000) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "twitter",
              error:
                "Twitter - Your image is too large. The maximum size is 5MB.",
            },
          ]);
        }
        if (
          dimensions?.type?.includes("video") &&
          dimensions?.size > 536870912
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "twitter",
              error:
                "Twitter - Your video is too large. The maximum size is 512MB.",
            },
          ]);
        }
      }
      if (platform.includes(YoutubePlatform)) {
        if (noFileSelected) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "youtube",
              error: "Youtube - Add at least 1 video.",
            },
          ]);
        }
        if (videosCount > 1) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "youtube",
              error: "Youtube - Max videos allowed 1.",
            },
          ]);
        }
        if (hasImages) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "youtube",
              error: "Youtube - Images are not supported.",
            },
          ]);
        }
        if (additionalPresets.YouTube.title == "") {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "youtube",
              error:
                "Youtube - Video or short title is required and must be shorter than 100 characters. The characters < or > are not allowed.",
            },
          ]);
        }
        if (additionalPresets.YouTube.madeForKids === "") {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "youtube",
              error:
                "Youtube - It is necessary to select the audience of the video.",
            },
          ]);
        }
      }
      if (platform.includes(TikTokPlatform)) {
        if (noFileSelected) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "tiktok",
              error: "TikTok - Add at least 1 video.",
            },
          ]);
        }
        const maxVideoDuration =
          additionalPresets[platform].maxVideoPostDuration;
        if (additionalPresets[platform].privacyLevel === "") {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "tiktok",
              error:
                "TikTok - Tiktok Presets - A privacy option must be selected.",
            },
          ]);
        }
        if (hasImages) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "tiktok",
              error: "TikTok - Only 1 video is allowed.",
            },
          ]);
        }
        if (
          dimensions.duration &&
          maxVideoDuration &&
          dimensions.duration > maxVideoDuration
        ) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "tiktok",
              error: `TikTok - Video length cannot exceed ${maxVideoDuration} sec.`,
            },
          ]);
        }
        // if (item.mediaType === "PHOTO" && isContainVideo) {
        //   setErrors((prev) => [
        //     ...prev,
        //     {
        //       id: 0,
        //       type: "",
        //       platform: "tiktok",
        //       error:
        //         "TikTok - Please select images or change the media type to VIDEO.",
        //     },
        //   ]);
        // }
        // if (isContainImage && isContainVideo) {
        //   setErrors((prev) => [
        //     ...prev,
        //     {
        //       id: 0,
        //       type: "",
        //       platform: "tiktok",
        //       error:
        //         "TikTok - Mixing images/videos is not allowed nor selecting more than 1 video.",
        //     },
        //   ]);
        // } else if (isContainImage) {
        //   if (files.length > 35) {
        //     setErrors((prev) => [
        //       ...prev,
        //       {
        //         id: 0,
        //         type: "",
        //         platform: "tiktok",
        //         error: "TikTok - Max images supported 35.",
        //       },
        //     ]);
        //   }
        // } else if (isContainVideo) {
        //   if (files.length > 1) {
        //     setErrors((prev) => [
        //       ...prev,
        //       {
        //         id: 0,
        //         type: "",
        //         platform: "tiktok",
        //         error: "TikTok - Max video supported 1.",
        //       },
        //     ]);
        //   }
        // } else {
        //   if (
        //     dimensions.duration &&
        //     maxVideoDuration &&
        //     dimensions.duration > maxVideoDuration
        //   ) {
        //     setErrors((prev) => [
        //       ...prev,
        //       {
        //         id: 0,
        //         type: "",
        //         platform: "tiktok",
        //         error: `TikTok - Video length cannot exceed ${maxVideoDuration} sec.`,
        //       },
        //     ]);
        //   }
        // }
      }
      if (platform.includes(GoogleBusinessPlatform)) {
        if (noFileSelected && noContent) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "google_business",
              error:
                "Google Business - Add at least 1 character or 1 media file.",
            },
          ]);
        }
        if (hasVideos) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "google_business",
              error: "Google Business - Videos are not supported.",
            },
          ]);
        }
        if (caption == "") {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "google_business",
              error:
                "Google Business - The post content length should be longer than 1 characters.",
            },
          ]);
        }
        if (hasImages && hasVideos) {
          setErrors((prev) => [
            ...prev,
            {
              id: 0,
              type: "",
              platform: "google_business",
              error:
                "Google Business - Mixing images/gifs/videos/documents is not allowed nor selecting more than 1 gif/video/document.",
            },
          ]);
        }
      }
      if (platform.includes(LinkedInPlatform)) {
        if (noFileSelected && noContent) {
          setErrors((prev) => [
            ...prev,
            {
              id: dimensions.id,
              platform: "linkedin",
              error: "LinkedIn - Add at least 1 character or 1 media file.",
            },
          ]);
        }
      }
    });

    return () => {
      broadcastConnection.removeEventListener("message");
    };
  }, [
    selectedPlaforms,
    dimensions,
    scheduledDate,
    caption,
    additionalPresets,
    files,
    isDuplicating,
  ]);

  const handlePointerEvent = useCallback(() => {
    return isEdit === "Published" ? true : false;
  }, [isEdit]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={openModal}
        handler={handleModal}
        className="dialogIndex"
        size="xxl"
      >
        <DialogBody>
          <Dropzone
            noClick={true}
            onDrop={(file) => {
              handleFile(file);
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`${handlePointerEvent() ? "pointer-events-none" : ""
                  } fixed inset-0 py-10 px-20 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm`}
              >
                <input {...getInputProps()} />

                <div className="relative bg-white flex flex-1 h-full flex-row rounded-lg">
                  {isDragActive && (
                    <div className="absolute bg-blue-600 opacity-50 z-50 w-full h-full flex justify-center items-center">
                      <div className="border border-white border-dashed p-6 px-8 rounded-lg">
                        <Typography color="white" variant="h5">
                          Drop your files here
                        </Typography>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col ">
                    <div className="p-2">
                      <div>
                        <h1 className="text-xl text-black">
                          {isEdit ? "Edit Post" : "Create Post"}
                        </h1>
                      </div>
                      <div className="flex flex-row  justify-between items-center mt-6">
                        <div className="flex flex-row items-center">
                          <div className="relative flex items-center">
                            {connections.map((item, index) => {
                              const {
                                platform = "",
                                screenName = "",
                                id,
                              } = item;
                              return (
                                <span
                                  key={id}
                                  className={`${index > 0 ? "ml-2" : "ml-0"
                                    } flex items-center ${isDuplicating && "opacity-50"
                                    }`}
                                >
                                  <SocialPlatform
                                    id={item.id}
                                    brandId={brandId}
                                    selectedPlaforms={selectedPlaforms}
                                    screenName={screenName}
                                    setSelectedPlatforms={setSelectedPlatforms}
                                    platform={platform}
                                    selectedPreview={selectedPreview}
                                    setSelectedPreview={setSelectedPreview}
                                  />
                                </span>
                              );
                            })}
                          </div>

                          < SocialMediaConnection >
                            {selectedPlaforms?.length !== 9 &&
                              <div className="ml-4 cursor-pointer">
                                <Add width={20} height={15} fill={"#D3D3D3"} />
                              </div>
                            }
                          </SocialMediaConnection>
                        </div>

                        <DesktopDateTimePicker
                          defaultValue={
                            scheduledDate ? dayjs(scheduledDate) : dayjs()
                          }
                          disablePast
                          timeSteps={{ hours: 1, minutes: 1, seconds: 5 }}
                          onChange={handleDateChange}
                          className={`${isDuplicating && "opacity-50"}`}
                        />
                      </div>
                    </div>
                    <ModalInput
                      toggleimgUploadModal={toggleimgUploadModal}
                      toggleVideoUploadModal={toggleVideoUploadModal}
                      showEmoji={showEmoji}
                      toggleEmojiModal={toggleEmojiModal}
                      closeEmoji={closeEmoji}
                      toggleAiModal={toggleAiModal}
                      handleFile={handleFile}
                      caption={caption}
                      setCaption={setCaption}
                      handleCaption={handleCaption}
                      files={files}
                      handleimgError={handleimgError}
                      handleVideoError={handleVideoError}
                      removeimg={removeimg}
                      handleEdit={handleEdit}
                      OpenEditor={OpenEditor}
                      selectedPreview={selectedPreview}
                      selectedPlaforms={selectedPlaforms}
                      additionalPresets={additionalPresets}
                      setAdditionalPresets={setAdditionalPresets}
                      isDuplicating={isDuplicating}
                    />
                    {errors.length > 0 && (
                      <div className="border border-red-600 rounded-md p-2 mx-2 max-h-32 relative text-red">
                        <div
                          className="absolute left-0 top-0 font-bold uppercase ml-4 px-1 bg-white text-red-600"
                          style={{
                            transform: "translateY(-50%)",
                            fontSize: "0.6em",
                          }}
                        >
                          {" "}
                          Remember{" "}
                        </div>
                        <div class="overflow-auto max-h-[72px]">
                          <ol class="list-decimal pl-5 text-xs">
                            {errors.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="text-[0.7rem] text-red-600"
                                >
                                  {item.error}
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col justify-end p-4 pointer-events-auto">
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <Button
                            variant="filled"
                            size="lg"
                            className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="flex flex-row justify-end items-center">
                          {isEdit && (
                            <IconButton
                              onClick={handleDeleteAlert}
                              variant="outlined"
                            >
                              <DeleteIconFilled />
                            </IconButton>
                          )}

                          {isDuplicating ? (
                            <div className="flex flex-row">
                              <Button
                                onClick={handleDuplicate}
                                size="lg"
                                className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 ml-2 ${loading || errors.length > 0
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                                  }`}
                              >
                                {loading ? "Duplicating.." : "Duplicate"}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-row">
                              <button
                                onClick={handlePublish}
                                disabled={loading || errors.length > 0}
                                className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded-r-none ${loading || errors.length > 0
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                                  }`}
                              >
                                {loading ? "Sharing.." : "Schedule Post"}
                              </button>
                              <Menu>
                                <MenuHandler>
                                  <button className="bg-blue-600 hover:bg-blue-500 py-2 px-3 rounded-l-none ml-[1px]">
                                    <DownArrow
                                      width={18}
                                      height={18}
                                      fill="#ffffff"
                                    />
                                  </button>
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem>
                                    <Typography>Schedule Post</Typography>
                                  </MenuItem>
                                  <MenuItem>
                                    <Typography>Publish Now</Typography>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`xl:flex bg-gray-100 h-full w-full xl:w-5/12 hidden rounded-lg justify-center items-center`}
                  >
                    <PostPreview
                      selectedPlaforms={selectedPlaforms}
                      viewMode={viewMode}
                      selectedPreview={selectedPreview}
                      handlePostFeed={handlePostFeed}
                      handlePlatformPreview={handlePlatformPreview}
                      handlePreview={handlePreview}
                      handleView={handleView}
                    />
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        </DialogBody>
        <ImgUploadModal
          show={showimgUploadModal}
          onChange={handleFile}
          toggleModal={toggleimgUploadModal}
        />
        <VideoUploadModal
          show={showVideoUploadModal}
          onChange={handleFile}
          toggleModal={toggleVideoUploadModal}
        />
        <ImageEditorModal
          files={files}
          setFiles={setFiles}
          index={editIndex}
          toggleModal={toggleImageEditorModal}
          show={showimgEditorModal}
        />
        <AlertModal
          show={showAlertModal}
          alertData={alertData}
          toggleModal={toggleAlertModal}
        />
        <UpgradeSubscription
          open={openSubscriptionModal}
          toggleModal={toggleSubscriptionModal}
          body={
            "You have reached the maximum limit for your posts. In order to create more post, you either need a PREMIUM account or upgrade subscription."
          }
        />
        <TextGeneratorModal open={showAiModal} toggleModal={toggleAiModal} />
      </Dialog>
    </LocalizationProvider >
  );
};

export default CreatePostModal;