;

import React, { useEffect, useState } from "react";
import GrowthPage from "../../chart/growth-chart/chart";
import BalancePage from "../../chart/balance-chart/chart";
import PostsPage from "../../chart/posts-chart/chart";

import PostHistory from "../../post-history/PostHistory";
import axios from "axios";
import { useUserContext } from "@/app/context/userContext";
import TwitterPostData from "./twitter-data-Table/twitterPostData";

const TwitterConnect = ({ tab }) => {
  const [events, setEvents] = useState([]);
  const mediaType = tab === "twitter" ? "Twitter" : null;
  const { userId } = useUserContext();
  const twitterLocalData = JSON.parse(localStorage.getItem("twitterToken"));

  const getPostData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getPostData/${userId}`
      );
      if (response.status === 200) {
        let twitterPostData = [];
        response.data.data.map((item) => {
          let dataObj = {
            rowId: item.id,
            userId: item.userId,
            title: item.text,
            status: item.status,
            files: item.files != "" ? JSON.parse(item.files) : [],
            start: item.scheduledDate,
            postdate: item.scheduledDate,
            platform: item.platform,
            contentType: "post",
          };
          twitterPostData.push(dataObj);
        });
        setEvents(twitterPostData);
      } else {
        console.log("Error fetching Twitter data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllTweeData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/social-media/getAllTweeData`, { headers: { accessToken: twitterLocalData.accessToken, user_id: twitterLocalData.userId, max_number: 100 } });
  }

  useEffect(() => {
    getPostData();
    getAllTweeData();
  }, []);

  return (
    <div className=" mt-10">
      <div className="">
        <p className="text-2xl text-black">Community</p>
        <div className="w-full h-full bg-white rounded-lg">
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <div className=" flex flex-1 items-start justify-start">
              <div className="w-1/2">
                <p className="text-xl text-black mt-8 mb-8 font-semibold">
                  Growth
                </p>
              </div>
              <div className="w-1/2 flex flex-1  mt-8 mb-8">
                <div className="w-40 mr-5  bg-[#5C90A9] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Followers</p>
                </div>
                <div className="w-40 mr-5  bg-[#64C89F] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Following</p>
                </div>
                <div className="w-40 mr-5  bg-[#C65880] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">2nd level</p>
                </div>
                <div className="w-40 mr-5  bg-[#E6A735] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Posts</p>
                </div>
              </div>
            </div>
            <GrowthPage />
            <div className=" flex flex-1 items-start justify-start">
              <div className="w-1/2 flex flex-1  mt-8 mb-8">
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Followers</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Daily followers</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">
                    Followers per post
                  </p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Following</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Daily posts</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-sm text-[#6B6C6F] mb-2">Weekly posts</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px mt-8 mb-8 bg-gray-300 border-0  dark:bg-gray-400"></hr>
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <div className=" flex flex-1 items-start justify-start">
              <div className="w-1/2">
                <p className="text-xl text-black mt-8 mb-8 font-semibold">
                  Balance of Followers
                </p>
              </div>
              <div className="w-1/2 flex flex-1  mt-8 mb-8 items-end justify-end">
                <div className="w-40 mr-5  bg-[#5C90A9] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Followers</p>
                </div>
                <div className="w-40 mr-5  bg-[#C65880] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Following</p>
                </div>
                <div className="w-40 mr-5  bg-[#E6A735] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">2nd level</p>
                </div>
              </div>
            </div>
            <BalancePage />
          </div>
          <hr className="h-px mt-8 mb-8 bg-gray-300 border-0  dark:bg-gray-400"></hr>
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <div className=" flex flex-1 items-start justify-start">
              <div className="w-1/2">
                <p className="text-xl text-black mt-8 mb-8 font-semibold">
                  Mentions
                </p>
              </div>
              <div className="w-1/2 flex flex-1 items-end justify-end  mt-8 mb-8">
                <div className="w-40 mr-5  bg-[#5C90A9] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Mentions</p>
                </div>
                <div className="w-40 mr-5  bg-[#E6A735] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">2nd level</p>
                </div>
              </div>
            </div>
            <GrowthPage />
            <div className=" flex flex-1">
              <div className="w-1/2 flex flex-1  mt-8 mb-8 items-end justify-end">
                <div className="w-40 mr-5 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Daily Mentions</p>
                </div>
                <div className="w-40 mr-5 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">
                    Mentions per posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-2xl text-black mt-8">Posts published in period</p>
        <div className="w-full h-full bg-white rounded-lg">
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <div className=" flex flex-1 items-start justify-start">
              <div className="w-1/2">
                <p className="text-xl text-black mt-8 mb-8 font-semibold">
                  Summary
                </p>
              </div>
              <div className="w-1/2 flex flex-1  mt-8 mb-8">
                <div className="w-40 mr-5  bg-[#5C90A9] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Likes</p>
                </div>
                <div className="w-40 mr-5  bg-[#64C89F] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Reports</p>
                </div>
                <div className="w-40 mr-5  bg-[#C65880] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Interactions</p>
                </div>
                <div className="w-40 mr-5  bg-[#E6A735] text-center justify-center rounded-lg">
                  <p className="text-3xl text-white">0</p>
                  <p className="text-white mb-5">Posts</p>
                </div>
              </div>
            </div>
            <GrowthPage />
            <div className=" flex flex-1 items-end justify-end">
              <div className="w-1/2 flex flex-1  mt-8 mb-8 items-end justify-end">
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Daily likes</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Likes per post</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">Daily reposts</p>
                </div>
                <div className="w-52 mr-8 text-center bg-[#E7EAEF] justify-center rounded-lg">
                  <p className="text-2xl text-[#6B6C6F]">0</p>
                  <p className="text-[#6B6C6F] text-sm mb-2">
                    Reposts per post
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px mt-8 mb-8 bg-gray-300 border-0  dark:bg-gray-400"></hr>
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <div className=" flex flex-1 items-start justify-start">
              <div className="flex flex-1 items-center justify-center">
                <div className="w-3/6 mr-5">
                  <p className="text-xl text-black mt-8 mb-8 font-semibold">
                    Type of posts
                  </p>
                  <PostsPage />
                </div>
                <div className="w-3/6 mr-5">
                  <p className="text-xl text-black mt-8 mb-8 font-semibold">
                    Type of posts
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px mt-8 mb-8 bg-gray-300 border-0  dark:bg-gray-400"></hr>
          <div className="ml-12 mt-6 items-center justify-center text-black">
            <p className="text-xl text-black mt-8 mb-8 font-medium">
              List of posts
            </p>
            <TwitterPostData events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterConnect;
