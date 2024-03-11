import React from 'react'
import LeftArrow from '../../../assets/left-arrow.svg?react'
import AddUser from "../../../assets/add-user.svg?react";
import User from "../../../assets/user.svg?react";
import Grid from "../../../assets/grid.svg?react";
import Tags from "../../../assets/tag-user.svg?react";
import { DownArrow, ReelsSvg } from '../../common/Images';
import HorizontalDots from '../../../assets/HorizontalDots';

function InstagramFeedMobile() {
  return (
    <div>
      <div className="mt-5 border-b p-1 px-3 flex flex-row items-center justify-between">
        <LeftArrow width={15} height={15} />
        <div className="flex flex-row items-center">
          <p className="font-semibold tracking-tight">Skyler B</p>
          <span className="ml-1">
            <DownArrow width={15} height={15} />
          </span>
        </div>
        <AddUser width={15} height={15} />
      </div>
      <div className="flex flex-row p-4 items-center">
        <User width={70} height={70} />
        <div className="ml-4">
          <div className="flex flex-row items-center">
            <div>
              <p>Skyler B</p>
            </div>
            <span className="ml-4">
              <HorizontalDots width={20} height={20} />
            </span>
          </div>
          <div className="flex flex-row mt-4">
            <div
              style={{ backgroundColor: "#0095F6" }}
              className="rounded-md px-4 py-1"
            >
              <p className="text-white text-sm">Follow</p>
            </div>
            <div
              style={{ backgroundColor: "#EFEFEF" }}
              className="rounded-md px-4 py-1 ml-1"
            >
              <p className="text-sm">Message</p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <p className="font-semibold tracking-tight">Skyler B</p>
      </div>
      <div className="border-t border-b py-2 flex flex-row justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">0</p>
          <p className="text-sm text-black text-opacity-60">posts</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">0</p>
          <p className="text-sm text-black text-opacity-60">followers</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">0</p>
          <p className="text-sm text-black text-opacity-60">following</p>
        </div>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="border-t border-black flex flex-1 justify-center py-2">
          <Grid width={15} height={15} fill="#0095f6" />
        </div>
        <div className="flex flex-1 justify-center py-2">
          <ReelsSvg width={20} height={20} fill="#737373" />
        </div>
        <div className="flex flex-1 justify-center py-2">
          <Tags width={20} height={20} fill="#737373" />
        </div>
      </div>
    </div>
  );
}

export default InstagramFeedMobile