import Accordion from "../../../components/accordion/Accordion";
import TikTok from "../../../assets/tiktok.svg?react";

import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../utils/Interceptor";
import { API_URL } from "../../../utils";
import CustomSwitch from "../../Input/CustomSwitch";
import SelectInput from "../../Input/SelectInput";
import { Alert, Spinner, Typography } from "@material-tailwind/react";
import CustomCheckbox from "../../Input/CustomCheckbox";
import InfoIcon from "../../../assets/InfoIcon";
import CustomLabel from "../../Input/CustomLabel";
import PublishPostModal from "../../modal/publishPostModal";
import QuestionMark from "../../../assets/QuestionMark";
import { TikTokPlatform } from "../../common/commonString";
import AutoPublishPompt from "../../common/AutoPublishPompt";
import { useLocalStorage } from "../../../utils/LocalStorage";

const getPrivacyLabel = {
  PUBLIC_TO_EVERYONE: (
    <CustomLabel title={"Public"} body={"Anyone can view this post"} />
  ),
  FOLLOWER_OF_CREATOR: (
    <CustomLabel
      title={"Followers"}
      body={"Only your followers can view this post"}
    />
  ),
  MUTUAL_FOLLOW_FRIENDS: (
    <CustomLabel
      title={"Friends"}
      body={"Only followers you follow can view this post"}
    />
  ),
  SELF_ONLY: (
    <CustomLabel title={"Private"} body={"Only you can see this post"} />
  ),
};

function TikTokPresets({
  user,
  setAdditionalPresets,
  additionalPresets,
  platform,
}) {
  const isCommercialContent = additionalPresets?.commercialContent;
  const isContentThirdParty = additionalPresets?.commercialContentThirdParty;
  const isContentOwnBrand = additionalPresets?.commercialContentOwnBrand;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const brandId = user?.brand?.id;
  const [privacyOptions, setPrivacyOptions] = useState([]);
  const [disabled, setDisabled] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openTiktokPrompt, setOpenTiktokPrompt] = useState(false);

  const memoizedPrivacyOptions = useMemo(
    () => privacyOptions,
    [privacyOptions]
  );
  const CREATOR_INFO_URL =
    API_URL +
    `/user/tiktok/creator-info?brandId=${brandId}&platform=${platform}`;

  const toggleAccordion = () => {
    if (additionalPresets?.autoPublish) {
      setOpen(!open);
    }
  };

  const generatePrivacyOptions = (options = []) => {
    const newOptions = options.map((item) => {
      if (getPrivacyLabel[item]) {
        return {
          label: getPrivacyLabel[item],
          value: item,
        };
      }
    });
    setPrivacyOptions(newOptions);
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
      setOpenTiktokPrompt(!openInstagramPrompt);
    }
  };

  const getCreatorInfo = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(CREATOR_INFO_URL);
      const { data } = res.data;
      const {
        comment_disabled,
        duet_disabled,
        stitch_disabled,
        max_video_post_duration_sec,
      } = data;
      setAdditionalPresets((prev) => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          commentDisabled: comment_disabled,
          duetDisabled: duet_disabled,
          stitchDisabled: stitch_disabled,
          maxVideoPostDuration: max_video_post_duration_sec,
        },
      }));
      setDisabled(data);
      generatePrivacyOptions(data?.privacy_level_options);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getCreatorInfo();
  }, []);
  return (
    <div className="my-1">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<TikTok width={18} height={18} />}
        title={"TikTok presets"}
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
        {loading ? (
          <div className="flex flex-row justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-row">
              <SelectInput
                identifier="privacyLevel"
                selected={(e) => (e ? e.props.name.title : "")}
                label={"Who can view your post?"}
                options={memoizedPrivacyOptions}
                value={additionalPresets?.privacyLevel}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row justify-evenly my-4">
              <CustomSwitch
                identifier="commentDisabled"
                label={"Disable comments"}
                disabled={disabled?.commentDisabled}
                value={additionalPresets?.commentDisabled}
                onChange={handleChange}
              />
              <CustomSwitch
                identifier="duetDisabled"
                label={"Disable duet"}
                disabled={disabled?.duetDisabled}
                value={additionalPresets?.duetDisabled}
                onChange={handleChange}
              />
              <CustomSwitch
                identifier="stitchDisabled"
                label={"Disable stitch"}
                disabled={disabled?.stitchDisabled}
                value={additionalPresets?.stitchDisabled}
                onChange={handleChange}
              />
            </div>
            <div className="border w-full" />
            <div className="mt-4">
              <CustomSwitch
                identifier="commercialContent"
                label={
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      Commercial content
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal text-xs"
                    >
                      Turn on to disclose that this post promotes goods or
                      services in exchange for something of value
                    </Typography>
                  </div>
                }
                value={additionalPresets?.commercialContent}
                onChange={handleChange}
              />
              {isCommercialContent && (
                <div className="flex flex-row mt-4">
                  <CustomCheckbox
                    identifier="commercialContentOwnBrand"
                    label={
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          Your brand
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal text-xs"
                        >
                          You are promoting yourself or your own business. This
                          post will be classified as "Brand Organic".
                        </Typography>
                      </div>
                    }
                    value={additionalPresets?.commercialContentOwnBrand}
                    onChange={handleChange}
                  />
                  <CustomCheckbox
                    identifier="commercialContentThirdParty"
                    label={
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          Branded content
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal text-xs"
                        >
                          You are promoting another brand or a third party. This
                          post will be classified as "Branded Content".
                        </Typography>
                      </div>
                    }
                    value={additionalPresets?.commercialContentThirdParty}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            {(isContentOwnBrand || isContentThirdParty) && (
              <div className="text-sm my-3">
                <Alert
                  className="bg-[#3b82f61a] flex items-center"
                  icon={<InfoIcon width={20} height={20} fill={"#2196f3"} />}
                >
                  <Typography className="text-xs text-[#3b82f6cc]">
                    Your post will be labeled{" "}
                    {isContentThirdParty ? (
                      <span>"Paid partnership"</span>
                    ) : (
                      <span>"Promotional content"</span>
                    )}
                    . This cannot be changed once it is posted on TikTok.
                  </Typography>
                  <div className="text-xs text-[#3b82f6cc]">
                    By posting, you agree to TikTok's{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en"
                    >
                      Music Usage Confirmation
                    </a>
                    {isContentThirdParty ? (
                      <span className="text-inherit">
                        {" "}
                        and{" "}
                        <a
                          className="underline"
                          target="_blank"
                          href="https://www.tiktok.com/legal/page/global/bc-policy/en"
                        >
                          Branded Content Policy
                        </a>
                        .
                      </span>
                    ) : (
                      <span>.</span>
                    )}
                  </div>
                </Alert>
              </div>
            )}
          </>
        )}
      </Accordion>
      <PublishPostModal
        open={modalOpen}
        onClose={handleModalClose}
        platform={TikTokPlatform}
      />
      <AutoPublishPompt
        isOpen={openTiktokPrompt}
        brandId={brandId}
        onClose={() => setOpenTiktokPrompt(!openTiktokPrompt)}
        additionalPresets={additionalPresets?.autoPublish}
        setAdditionalPresets={setAdditionalPresets}
        platform={TikTokPlatform}
      />
    </div>
  );
}

export default TikTokPresets;
