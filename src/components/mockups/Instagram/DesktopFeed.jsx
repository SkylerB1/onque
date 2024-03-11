import React from 'react'
import LeftArrow from "../../../assets/left-arrow.svg?react";
import AddUser from "../../../assets/add-user.svg?react";
import User from "../../../assets/user.svg?react";
import Grid from "../../../assets/grid.svg?react";
import Reels from "../../../assets/insta-reels.svg?react";
import Tags from "../../../assets/tag-user.svg?react";
import { DownArrow } from '../../common/Images';
import HorizontalDots from '../../../assets/HorizontalDots';

function DesktopFeed() {
  return (
    <div>
      <div className="mt-5 border-b p-1 px-3 flex flex-row items-center justify-between">
        <LeftArrow width={15} height={15} />
        <div className="flex flex-row items-center">
          <p className="font-semibold tracking-tight">Skyler B</p>
          <DownArrow width={15} height={15} />
        </div>
        <AddUser width={15} height={15} fill="#000000" />{" "}
      </div>
      <div className="flex flex-row p-6">
        <User width={100} height={100} />
        <div className="ml-6">
          <div className="flex flex-row items-center">
            <div>
              <p>skyler_b12</p>
            </div>
            <div className="flex flex-row ml-4">
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
            <span className='ml-2'>
              <HorizontalDots width={15} height={15} fill={'#ffffff'} />
            </span>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row items-center">
              <p className="font-semibold">0</p>
              <p className="text-sm text-black ml-2 text-opacity-60">posts</p>
            </div>
            <div className="flex flex-row items-center">
              <p className="font-semibold">0</p>
              <p className="text-sm text-black ml-2  text-opacity-60">
                followers
              </p>
            </div>
            <div className="flex flex-row items-center">
              <p className="font-semibold">0</p>
              <p className="text-sm text-black ml-2 text-opacity-60">
                following
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold tracking-tight">Skyler B</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-evenly border-t mt-6">
        <div className="border-t border-black flex flex-1 justify-center items-center py-3">
          <img alt="" className="w-3 h-3" src={Grid} />
          <p className="ml-2 text-sm tracking-wide">POSTS</p>
        </div>
        <div className="flex flex-1 justify-center items-center py-3">
          <img alt="" className="w-3 h-3" src={Reels} />
          <p className="ml-2 text-sm tracking-wide">REELS</p>
        </div>
        <div className="flex flex-1 justify-center items-center py-3">
          <img alt="" className="w-4 h-4" src={Tags} />
          <p className="ml-2 text-sm tracking-wide">TAGGED</p>
        </div>
      </div>
    </div>
  );
}

export default DesktopFeed