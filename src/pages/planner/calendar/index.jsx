import React, { useEffect, useMemo, useState } from "react";
import InstaSvg from "../../../assets/instagram.svg?react";
import Facebook from "../../../assets/facebook-filled.svg?react";
import Twitter from "../../../assets/twitter.svg?react";
import PlanningNavbar from "../../../components/side-navbar/PlanningNavbar";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import { axiosInstance } from "../../../utils/Interceptor";
import useConnections from "../../../components/customHooks/useConnections";
import SocialLinkPostCalendar from "../../../components/post-planner/SocialLinkPostCalendar";
import PostCalendar from "../../../components/post-planner/PostCalendar";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useAppContext } from "../../../context/AuthContext";

dayjs.extend(UTC);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { broadcastConnection } = useAppContext();
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const { connections, getConnections } = useConnections();

  const getPostData = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/getPostData/${brandId}`
      );
      if (response.status === 200) {
        const data = response.data?.map((item) => {
          return {
            rowId: item.id,
            userId: item.userId,
            title: item.text,
            status: item.status,
            files:
              typeof item.files === "string"
                ? JSON.parse(item.files)
                : item.files,
            start:
              item.scheduledDate ?? dayjs.utc().format("YYYY-MM-DDTHH:mm:ssZ"),
            postdate: item.scheduledDate ?? dayjs.utc(),
            platform: item.platform,
            contentType: "post",
          };
        });
        setEvents(data);
      } else {
        console.log("Error fetching Twitter data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (brandId) {
      getPostData();
    }
  }, [brandId]);

  useEffect(() => {
    const handleConnection = () => {
      if (brandId) {
        getConnections(brandId);
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
    return () => {
      broadcastConnection.removeEventListener("message", handleConnection);
    };
  }, [broadcastConnection]);

  if (!connections) {
    return (
      <>
        <div className="p-4 mt-10 sm:ml-64 bg-[#F1F2F4]">
          <div className="flex justify-center items-center h-screen">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              // colors={['#A7C7ED', '#337FE2', '#A7C7ED', '#337FE2', '#A7C7ED']}
              colors={["black"]}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:ml-64 bg-[#F1F2F4]">
        {connections.length === 0 ? (
          <SocialLinkPostCalendar getPostData={getPostData} />
        ) : (
          <PostCalendar
            connections={connections}
            getPostData={getPostData}
            events={events}
          />
        )}
        <PlanningNavbar />
      </div>
    </>
  );
};

export default Calendar;
