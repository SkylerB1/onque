import React, { useMemo, useState } from "react";
import RightArrow from "../../../assets/insta-right-arrow.svg?react";
import LeftArrow from "../../../assets/insta-left-arrow.svg?react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { getSource, isContainVideo } from "../../../utils";
import HeartOutline from "../../../assets/HeartOutline";
import InstaShareOutline from "../../../assets/InstaShareOutline";
import UserIcon from "../../../assets/userIcon";
const StoryMobile = ({ viewMode, files, screenName }) => {
  const memoizedSources = useMemo(() => {
    return files.map((file) => getSource(file));
  }, [files]);
  const [swiperIndex, setIndex] = useState(0);
  return (
    <div className="w-full h-full bg-black">
      <div className="absolute top-8 flex z-50 flex-1 w-full flex-row px-2">
        {files.length > 0 &&
          files.map((item, index) => {
            return (
              <div
                key={index}
                className={`border flex flex-1 ${index > 0 && "ml-1"} ${
                  index !== swiperIndex && "border-gray-500"
                } `}
              />
            );
          })}
      </div>
      <div className=" absolute top-10 z-50 flex flex-row items-center px-2">
        <UserIcon width={35} height={35} fill={"#eee"} />
        <p className="ml-2 text-gray-800 text-sm font-semibold">{screenName}</p>
        <p className="ml-2 text-xs text-gray-500">10m</p>
      </div>
      <div
        className={`flex w-full ${
          viewMode ? "h-[600px]" : "h-[525px]"
        } bg-black items-center`}
      >
        {files.length > 0 ? (
          files.length == 1 ? (
            files.map((file, key) => {
              const src = memoizedSources[key];
              if (isContainVideo(file)) {
                return (
                  <video
                    key={key}
                    className="w-full h-full object-contain rounded-b-md"
                    loop={true}
                    autoPlay={true}
                    muted={false}
                    controls={false}
                    src={src}
                    draggable="false"
                  />
                );
              } else {
                const src = memoizedSources[key];

                return (
                  <img
                    key={key}
                    alt=""
                    className="w-full h-full object-contain rounded-b-md"
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
              pagination={false}
              slidesPerView={1}
              loop={true}
              modules={[Navigation]}
              onRealIndexChange={(s) => setIndex(s.realIndex)}
            >
              {files.map((file, key) => {
                if (isContainVideo(file)) {
                  const src = memoizedSources[key];

                  return (
                    <SwiperSlide key={key}>
                      <video
                        className="w-full h-full object-cover rounded-b-md"
                        loop={true}
                        autoPlay={true}
                        muted={false}
                        controls={false}
                        src={src}
                      />
                    </SwiperSlide>
                  );
                } else {
                  const src = memoizedSources[key];

                  return (
                    <SwiperSlide key={key}>
                      <img
                        key={key}
                        alt=""
                        className="w-full h-full object-cover rounded-b-md"
                        width={16}
                        height={16}
                        src={src}
                      />
                    </SwiperSlide>
                  );
                }
              })}
              <div className="swiper-button-prev">
                <LeftArrow width={30} height={30} />
              </div>
              <div className="swiper-button-next">
                <RightArrow width={30} height={30} />
              </div>
            </Swiper>
          )
        ) : (
          <div className=" w-full">
            <p className="text-white text-sm text-center">
              Video/img not available
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center p-2">
        <div className="border flex flex-1 rounded-2xl">
          <h1 className="text-white text-sm font-light py-1 ml-2 tracking-tighter">
            Send message{" "}
          </h1>
        </div>
        <div className="ml-2">
          <HeartOutline fill="#ffffff" width={20} height={20} />
        </div>
        <div className="mx-2">
          <InstaShareOutline fill="#ffffff" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default StoryMobile;
