import React, { useMemo } from "react";
import UserIcon from "../../../assets/userIcon";
import HeartFilled from "../../../assets/HeartFilled";
import TikokComment from "../../../assets/TikokComment";
import SaveFilled from "../../../assets/SaveFilled";
import ShareFilled from "../../../assets/ShareFilled";
import MusicIcon from "../../../assets/MusicIcon";
import AddFilled from "../../../assets/AddFilled";
import Search from "../../../assets/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../swiper/swiper.css";
import { getSource, isContainVideo } from "../../../utils";

function TiktokMobile({ files, captions, viewMode, screenName }) {
  const src = useMemo(() => getSource(files[0]), [files]);
  return (
    <>
      <div className="absolute top-10 flex flex-row justify-between w-full px-4 z-10">
        <div />
        <div className="flex flex-row text-white text-sm font-semibold">
          <span className="drop-shadow-2xl shadow-black">Following</span>
          <span className="ml-4 drop-shadow-2xl shadow-black">For You</span>
        </div>
        <div>
          <Search width={25} height={25} fill="#ffffff" />
        </div>
      </div>
      <div
        className={`p-1 w-full h-full bg-black flex justify-center items-center`}
      >
        {files.length > 0 ? (
          isContainVideo(files[0]) ? (
            <>
              <video
                draggable="false"
                className=" w-full h-full object-cover"
                loop={true}
                autoPlay={true}
                controls={true}
                src={src}
              />
            </>
          ) : (
            <h1 className="text-sm text-white text-center">
              No video available
            </h1>
          )
        ) : (
          <h1 className="text-sm text-white text-center">No video available</h1>
        )}
        {/* {files?.length > 0 ? (
          files?.length == 1 ? (
            files?.map((file, key) => {
              if (file.type == "video/mp4") {
                return (
                  <>
                    <video draggable="false"
                      key={key}
                      className=" w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      controls={false}
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  </>
                );
              }
              // else {
              //   return (
              //     <img
              //       key={key}
              //       alt="img"
              //       className="w-full h-full object-contain"
              //       width={16}
              //       height={16}
              //       src={URL.createObjectURL(file)}
              //     />
              //   );
              // }
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
              {files.map((file, key) => {
                if (file.type.includes("image")) {
                  return (
                    <SwiperSlide style={{ backgroundColor: "black" }} key={key}>
                      <img
                        key={key}
                        alt=""
                        className="w-full h-full object-cover"
                        width={16}
                        height={16}
                        src={URL.createObjectURL(file)}
                      />
                    </SwiperSlide>
                  );
                }
              })}

              <div className="swiper-pagination"></div>
            </Swiper>
          )
        ) : (
          <h1 className="text-sm text-white text-center">No media available</h1>
        )} */}
      </div>
      <div className="absolute top-56 z-10 flex flex-col justify-between right-2">
        <div className="relative rounded-full w-10 h-10 flex flex-col bg-white items-center mb-6">
          <UserIcon fill={"#D5D5D5"} width={40} height={40} />
          <span className="absolute -bottom-2 left-3 ">
            <AddFilled width={18} height={18} fill="#FF714D" />
          </span>
        </div>
        <span className="flex flex-col items-center">
          <HeartFilled width={25} height={25} fill="#ffffff" />
          <p className="font-xs text-white font-bold">0</p>
        </span>
        <span className="flex flex-col items-center">
          <TikokComment width={25} height={25} fill="#ffffff" />
          <p className="font-xs text-white font-bold">0</p>
        </span>
        <span className="flex flex-col items-center">
          <SaveFilled width={25} height={25} fill="#ffffff" />
          <p className="font-xs text-white font-bold">0</p>
        </span>
        <span className="flex flex-col items-center">
          <ShareFilled width={25} height={25} fill="#ffffff" />
          <p className="font-xs text-white font-bold">0</p>
        </span>
        <span className="flex flex-col items-center custom-spin rounded-full mt-2">
          <UserIcon fill={"#D5D5D5"} width={28} height={28} />
        </span>
      </div>
      <div className="absolute bottom-8 z-10 left-1 flex flex-col flex-wrap px-2 w-48">
        <h1 className="text-white text-xs font-bold">{screenName}</h1>
        <div className="relative">
          <p className="text-white text-xs my-2 w-48 overflow-hidden whitespace-pre-line">
            {captions}
          </p>
        </div>
        <span className="flex flex-row items-center">
          <span className="">
            <MusicIcon width={12} height={12} fill="#ffffff" />
          </span>
          <div className="w-48 ml-2 overflow-hidden">
            <p className="text-white ml-2 text-xs animate-marquee">
              Original Sound
            </p>
          </div>
        </span>
      </div>
    </>
  );
}

export default TiktokMobile;
