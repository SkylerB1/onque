import React, { useCallback, useMemo } from "react";
import User from "../../../assets/user-filled-colored.svg?react";
import Globe from "../../../assets/facebook-globe.svg?react";
import Dots from "../../../assets/vertical-dots.svg?react";
import Verified from "../../../assets/verified.svg?react";
import Share from "../../../assets/google-share.svg?react";
import Offer from "../../../assets/offer.svg?react";
import DownArrow from "../../../assets/google-down-filled.svg?react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getSource, isContainVideo } from "../../../utils";
import { GoogleBusinessPlatform } from "../../common/commonString";
dayjs.extend(customParseFormat);

function GoogleBusinessPost({
  files,
  captions,
  mediaType,
  viewMode,
  data,
  connections,
}) {
  const { screenName = "" } = Array.isArray(connections) && connections.find((item) =>
    item.platform.includes(GoogleBusinessPlatform)
  );
  const src = useMemo(() => getSource(files[0]), [files]); 
  const GetDate = useCallback(
    (StartDate, EndDate, StartTime, EndTime) => {
      return (
        dayjs(StartDate).format("DD MMM") +
        (StartTime != "" ? ", " + dayjs(StartTime).format("HH:mm") : "") +
        (StartDate == EndDate && EndTime == ""
          ? ""
          : " - " +
            dayjs(EndDate).format("DD MMM") +
            (EndTime != "" ? ", " + dayjs(EndTime).format("HH:mm") : ""))
      );
    },
    [data?.startDate, data?.endDate, data.startTime, data.endTime]
  );
  return (
    <>
      <div className="flex flex-row justify-between items-center px-3 mt-7 mb-2">
        <div className="flex flex-row items-center">
          <span className="relative rounded-full ">
            <User width={35} height={35} />
            <span className="absolute -right-2 -bottom-1">
              <Verified width={18} height={18} fill="#1A73E8" />
            </span>
          </span>
          <div className="flex flex-col ml-4 justify-between">
            <h1 className="text-sm font-bold leading-none">{screenName}</h1>
            <div className="flex flex-row items-center">
              <h3 className="text-xs text-[#0000008a] mr-1"> 15 min ago </h3>
            </div>
          </div>
        </div>
        <span>
          <Dots width={20} height={20} fill="#737373" />
        </span>
      </div>
      {files?.length > 0 ? (
        <div
          className={`${
            viewMode ? "h-[280px]" : "h-56"
          } w-full flex flex-1 flex-wrap justify-center bg-white`}
        >
          {isContainVideo(files[0]) ? (
            <video
              className="w-full h-full object-contain"
              loop={true}
              autoPlay={true}
              muted={false}
              controls={false}
              src={src}
              draggable="false"
            />
          ) : (
            <img
              alt=""
              className="w-full h-full object-contain"
              width={16}
              height={16}
              src={src}
              draggable="false"
            />
          )}
        </div>
      ) : (
        <div
          className={`${
            viewMode ? "h-[280px]" : "h-48"
          } w-full flex items-center justify-center bg-black`}
        >
          <p className="font-bold text-sm text-white">
            Video/img not available
          </p>
        </div>
      )}
      {mediaType != "POST" && (
        <div className="flex flex-row px-3 mt-4">
          <div className="flex flex-col flex-1">
            <h1 className="text-xl font-medium">
              {mediaType == "OFFER" ? data.offerTitle : data?.eventTitle}
            </h1>
            {data.startDate != "" && data.endDate != "" && (
              <p className="text-xs mb-2 text-[#5f6368]">
                {GetDate(
                  data?.startDate,
                  data?.endDate,
                  data?.startTime,
                  data?.endTime
                )}
              </p>
            )}
          </div>
          {mediaType == "OFFER" && data.offerTitle != "" && (
            <div>
              <Offer width={20} height={20} fill="#f4b400" />
            </div>
          )}
        </div>
      )}
      {captions && (
        <p className="px-3 text-md my-2 whitespace-pre-line"> {captions} </p>
      )}

      <div className="flex flex-row justify-between px-3 mt-4">
        {data?.buttonLink || data?.offerLink ? (
          <p
            className={`text-sm font-semibold ${
              mediaType == "OFFER" ? "" : "underline"
            } text-[#1A73E8]`}
          >
            {data?.button && mediaType != "OFFER"
              ? data?.button
              : "REDEEM ONLINE"}
          </p>
        ) : (
          <div />
        )}
        <Share width={20} height={20} fill="#0000008a" />
      </div>
      {data?.OFFER.couponCode && (
        <div className="border-dashed border-2 my-2 bg-[#f8f9fa] rounded-md border-[#dadce0] flex flex-col justify-center items-center py-5 mx-2">
          <p className="text-xs text-[#5f6368]">Show this code at the shop</p>
          <p className="text-lg font-bold py-2">{data?.OFFER.couponCode}</p>
          <p className="text-xs text-[#5f6368]">
            Valid{" "}
            {dayjs(data?.startDate).format("DD MMM YYYY") +
              (data?.startDate == data?.endDate
                ? ""
                : " - " + dayjs(data?.endDate).format("DD MMM YYYY"))}
          </p>
        </div>
      )}
      {data?.OFFER.termsCondition && (
        <div className="mx-2 flex flex-row items-center justify-between">
          <p className="text-[11px] text-[#5f6368]">Terms & Conditions</p>
          <DownArrow width={20} height={20} />
        </div>
      )}
    </>
  );
}

export default GoogleBusinessPost;
