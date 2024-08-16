import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Dropdown from "../drop-down/Dropdown";
import RenderFiles from "./RenderFiles";
import GbusinessPresets from "../mockups/google-business/GbusinessPresets";
import YoutubePresets from "../mockups/youtube/YoutubePresets";
import TikTokPresets from "../mockups/tiktok/TikTokPresets";
import InstagramPresets from "../mockups/Instagram/InstagramPresets";
import Robot from "../../assets/robot.svg?react";
import CameraOutline from "../../assets/camera-outline.svg?react";
import VideoCamera from "../../assets/video-camera.svg?react";
import {
  GoogleBusinessPlatform,
  InstagramPlatform,
  TikTokPlatform,
  YoutubePlatform,
} from "../common/commonString";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { Textarea } from "@material-tailwind/react";
import NotificationPreset from "../mockups/notification/NotificationPreset";
import Cross from "../svg/Cross";

// Debounce function to limit the rate at which a function can fire.
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const ModalInput = ({
  selectedPreview,
  setCaption,
  toggleimgUploadModal,
  toggleVideoUploadModal,
  toggleEmojiModal,
  showEmoji,
  closeEmoji,
  toggleAiModal,
  handleCaption,
  files,
  setFiles,
  handleimgError,
  handleVideoError,
  removeimg,
  handleEdit,
  caption,
  OpenEditor,
  selectedPlaforms,
  additionalPresets,
  setAdditionalPresets,
  isDuplicating,
  brandId,
  setShowEmoji,
}) => {
  const user = useSelector((state) => state.user.value);
  const inputRef = useRef(null);
  const emojiWrapperRef = useRef(null);

  const [showNotificationPreset, setShowNotificationPreset] = useState(false);

  const handleNotificationPresets = () => {
    const isSelected = selectedPlaforms.some(
      (item) =>
        item.platform === InstagramPlatform ||
        item.platform.includes(TikTokPlatform)
    );

    const isManualPublish =
      !additionalPresets.Instagram.autoPublish ||
      !additionalPresets.TikTok_Personal.autoPublish ||
      !additionalPresets.TikTok_Business.autoPublish;

    if (isSelected && isManualPublish) {
      setShowNotificationPreset(true);
    } else {
      setShowNotificationPreset(false);
    }
  };

  useEffect(() => {
    handleNotificationPresets();
  }, [additionalPresets, selectedPlaforms]);

  const uploadimgOptions = useMemo(
    () => [
      {
        icon: <CameraOutline width={18} height={18} fill="#000000" />,
        label: "Add image",
        value: "image",
        onClick: () => toggleimgUploadModal(),
      },
      {
        icon: <VideoCamera width={20} height={20} fill="#000000" />,
        label: "Add video",
        value: "video",
        onClick: () => toggleVideoUploadModal(),
      },
    ],
    []
  );

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    const textarea =
      inputRef.current && inputRef.current.querySelector("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    // console.log(input, text);

    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    // console.log(before + emoji + after);
    setCaption((prev) => before + emoji + after);
    // Move the cursor to the right position after inserting the emoji
    setTimeout(() => {
      textarea.focus();
      textarea.selectionEnd = start + emoji.length;
    }, 0);

    // setCaption((prevCaption) => prevCaption + emojiData.emoji);
  };
  const closeEmojiPicker = () => {
    setShowEmoji(false);
  };

  return (
    <div className="bg-white flex flex-col flex-1 w-65 rounded-l-md p-2 overflow-y-auto">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-grow overflow-y-auto relative border border-gray-300 rounded-lg my-2">
          <div className=" flex flex-1 flex-col w-full mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center  justify-between px-3 py-2  dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex items-center space-x-1 sm:pr-4">
                  <Dropdown options={uploadimgOptions}>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="#000000"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                  </Dropdown>
                  <button
                    type="button"
                    onClick={toggleEmojiModal}
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="#000000"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Add emoji</span>
                  </button>
                  {/* <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="#000000"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Embed map</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleAiModal}
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <Robot width={20} height={20} />
                  </button> */}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <div className="" ref={emojiWrapperRef}>
                {showEmoji && (
                  <div className="absolute left-20 z-50">
                    <div className="emoji-picker-container relative">
                      <EmojiPicker
                        autoFocusSearch={true}
                        onEmojiClick={handleEmojiClick}
                        skinTonesDisabled={true}
                      />
                      <button
                        onClick={closeEmojiPicker}
                        className="close-button absolute top-0 right-0  h-16 w-16 cursor-pointer"
                      >
                        <Cross width={22} height={22} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Textarea
                ref={inputRef}
                rows={1}
                resize={true}
                placeholder="Write your captions here..."
                className="min-h-full !border-0 focus:border-transparent"
                containerProps={{
                  className: "grid h-full",
                }}
                value={caption}
                onInput={(e) => handleCaption(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <RenderFiles
                files={files}
                setFiles={setFiles}
                handleimgError={handleimgError}
                handleVideoError={handleVideoError}
                removeimg={removeimg}
                handleEdit={handleEdit}
                OpenEditor={OpenEditor}
                isDuplicating={isDuplicating}
              />
            </div>
          </div>
        </div>
        {selectedPlaforms.map((item, index) => {
          const { platform } = item;
          if (platform == GoogleBusinessPlatform) {
            return (
              <GbusinessPresets
                key={index}
                mediaType={selectedPreview?.mediaType}
                additionalPresets={additionalPresets.Google_Business}
                setAdditionalPresets={setAdditionalPresets}
              />
            );
          }
          if (platform === YoutubePlatform) {
            return (
              <YoutubePresets
                key={index}
                user={user}
                mediaType={selectedPreview?.mediaType}
                additionalPresets={additionalPresets.YouTube}
                setAdditionalPresets={setAdditionalPresets}
              />
            );
          }
          if (platform.includes(TikTokPlatform)) {
            return (
              <TikTokPresets
                key={index}
                user={user}
                platform={platform}
                additionalPresets={additionalPresets[platform]}
                setAdditionalPresets={setAdditionalPresets}
              />
            );
          }
          if (platform.includes(InstagramPlatform)) {
            return (
              <InstagramPresets
                key={index}
                platform={platform}
                additionalPresets={additionalPresets[platform]}
                setAdditionalPresets={setAdditionalPresets}
                brandId={brandId}
                mediaType={item.mediaType}
                files={files}
              />
            );
          }
          if (platform === InstagramPlatform && item.mediaType === "REEL") {
            return (
              <InstagramPresets
                key={index}
                additionalPresets={additionalPresets.Instagram}
                setAdditionalPresets={setAdditionalPresets}
                mediaType={item.mediaType}
                files={files}
              />
            );
          }
        })}
        {showNotificationPreset && <NotificationPreset />}
      </div>
    </div>
  );
};

export default ModalInput;
