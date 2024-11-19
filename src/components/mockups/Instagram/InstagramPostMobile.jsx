import React, { useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Save from "../../../assets/save.svg?react";
import Camera from "../../../assets/insta-camera.svg?react";
import RightArrow from "../../../assets/insta-right-arrow.svg?react";
import LeftArrow from "../../../assets/insta-left-arrow.svg?react";
import AudioMuted from "../../svg/AudioMuted";
import Audio from "../../svg/soundFilled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { getSource, isContainVideo } from "../../../utils";
import UserIcon from "../../../assets/userIcon";
import HeartOutline from "../../../assets/HeartOutline";
import InstaShareOutline from "../../../assets/InstaShareOutline";
import CommentOutline from "../../../assets/CommentOutline";
import HorizontalDots from "../../../assets/HorizontalDots";

function InstagramPostMobile({ files, captions, viewMode, screenName }) {
  const [muted, setMuted] = useState(false);
  const memoizedSources = useMemo(() => {
    return Array.isArray(files) && files.map((file) => getSource(file));
  }, [files]);

  const toggleAudio = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  return (
    <>
      <div className="mt-10 flex flex-row justify-between items-center px-2 border-b pb-2">
        <div className="flex flex-row items-center  ">
          <UserIcon fill="#000000" width={30} height={30} />
          <p className="ml-2 font-semibold text-sm">{screenName}</p>
        </div>
        <HorizontalDots width={20} height={20} />
      </div>
      <div
        className={`relative w-full ${
          viewMode ? "h-[450px]" : "h-80"
        } flex flex-col justify-center`}
      >
        {files?.length > 0 ? (
          files?.length == 1 ? (
            Array.isArray(files) && files?.map((file, key) => {
              const type = file.type || file.mimetype;
              if (type?.includes("video")) {
                const src = memoizedSources[key];
                return (
                  <>
                    <video
                      key={key}
                      className=" w-full h-full object-contain"
                      loop={true}
                      autoPlay={true}
                      muted={muted}
                      controls={false}
                      src={src}
                      draggable="false"
                    />

                    <div
                      onClick={toggleAudio}
                      className="bg-black absolute rounded-full p-1 bottom-3 right-3"
                    >
                      {muted ? (
                        <AudioMuted width={12} height={12} fill={"#ffffff"} />
                      ) : (
                        <Audio width={12} height={12} fill={"#ffffff"} />
                      )}
                    </div>
                  </>
                );
              } else {
                const src = memoizedSources[key];
                return (
                  <img
                    key={key}
                    alt=""
                    className="w-full h-full object-contain"
                    width={16}
                    height={16}
                    src={src}
                    draggable="false"
                  />
                );
              }
            })
          ) : (
            <Swiper
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ el: ".swiper-pagination" }}
              slidesPerView={1}
              loop={true}
              modules={[Navigation, Pagination]}
              style={{ width: "100%", height: "100%" }}
            >
              {Array.isArray(files) && files.map((file, key) => {
                if (isContainVideo(file)) {
                  const src = memoizedSources[key];
                  return (
                    <SwiperSlide key={key}>
                      <video
                        key={key}
                        className="w-full h-full object-contain"
                        loop={true}
                        autoPlay={true}
                        muted={muted}
                        controls={false}
                        src={src}
                        draggable="false"
                      />

                      <div
                        onClick={toggleAudio}
                        className="bg-black absolute rounded-full p-1 bottom-3 right-3"
                      >
                        {muted ? (
                          <AudioMuted width={12} height={12} fill={"#ffffff"} />
                        ) : (
                          <Audio width={12} height={12} fill={"#ffffff"} />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                } else {
                  const src = memoizedSources[key];
                  return (
                    <SwiperSlide key={key}>
                      <img
                        key={key}
                        alt=""
                        className="w-full h-full"
                        width={16}
                        height={16}
                        src={src}
                        draggable="false"
                      />
                    </SwiperSlide>
                  );
                }
              })}
              <div className="swiper-button-prev">
                <LeftArrow width={30} height={30} />{" "}
              </div>
              <div className="swiper-button-next">
                <RightArrow width={30} height={30} />{" "}
              </div>
              <div className="swiper-pagination"></div>
            </Swiper>
          )
        ) : (
          <div className="flex flex-col items-center">
            <Camera width={70} height={70} />
            <p className="mt-5 text-center text-xl tracking-tight font-bold">
              Select photos
            </p>
            <p className="text-center text-xs tracking-tight mt-5">
              When you select photos,
            </p>
            <p className="text-center text-xs tracking-tight">
              they will appear on your post.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between border-t pt-2">
        <div className="flex flex-row w-24 justify-evenly">
          <HeartOutline width={20} height={20} />
          <CommentOutline width={20} height={20} />
          <InstaShareOutline width={20} height={20} />
        </div>
        <span className="mr-2">
          <Save width={20} height={20} />
        </span>
      </div>
      <div className="mt-3">
        <div className="ml-2 font-semibold text-xs">{screenName}</div>
        <div className="text-xs ml-2 whitespace-pre-line">{captions}</div>
      </div>
    </>
  );
}

export default InstagramPostMobile;
