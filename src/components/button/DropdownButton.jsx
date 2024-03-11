import React from "react";
import { DownArrow } from "../common/Images";

function DropdownButton({title,onClick}) {
  return (
    <button onClick={onClick} className="bg-gray-200 hover:bg-gray-300 rounded-xl flex flex-row items-center px-3 py-1 cursor-pointer ml-2">
      <p className="text-[9px] tracking-wider">{title}</p>
      <span className="ml-1">
        <DownArrow width={10} height={10} />
      </span>
    </button>
  );
}

export default DropdownButton;
