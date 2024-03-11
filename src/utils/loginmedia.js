import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Loginmedia = ({ title }) => {
  const avatarLetter = title ? title.charAt(0).toUpperCase() : "";
  const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  const isBackgroundColorLight = () => {
    const r = parseInt(randomColor.slice(1, 3), 16);
    const g = parseInt(randomColor.slice(3, 5), 16);
    const b = parseInt(randomColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };
  const textColor = isBackgroundColorLight() ? "#000000" : "#FFFFFF";

  return (
    <>
      <div className="bg-[#FFFFFF] border-2 rounded-md p-3 items-center justify-between flex mt-4 cursor-auto">
        <div className="flex items-center justify-start">
          <div
            className="relative w-7 h-7 overflow-hidden rounded-full"
            style={{ backgroundColor: randomColor }}
          >
            <div
              className="w-7 h-7 flex items-center justify-center text-lg font-semibold"
              style={{ color: textColor }}
            >
              {avatarLetter}
            </div>
          </div>
          <p className="ml-2 text-lg text-[#65502B] font-semibold">{title}</p>
        </div>
        <div>
          <AiOutlineClose />
        </div>
      </div>
    </>
  );
};

export default Loginmedia;
