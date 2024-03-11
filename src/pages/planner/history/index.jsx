;

import React, { useEffect, useState } from "react";
import ToggleButton from "../../../components/button/ToggleButton";
import PlanningNavbar from "../../../components/side-navbar/PlanningNavbar";
import PostHistory from "../../../components/post-history/PostHistory";
import axios from "axios";
// import { useUserContext } from "../../context/userContext";
import Datepicker from "react-tailwindcss-datepicker";
import { axiosInstance } from "../../../utils/Interceptor";
import { useSelector } from "react-redux";

const History = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lowercaseSelectedValues, setLowercaseSelectedValues] = useState("");
  const user = useSelector((state) => state.user.value);
  const brand = user?.brand;
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  const handleButtonClick = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  useEffect(() => {
    const lowercaseValues = selectedValues.map((value) => value);
    setLowercaseSelectedValues(lowercaseValues);
  }, [selectedValues]);


  const getPostData = async () => {
    try {

      const platformParams = selectedValues.length > 0
        ? selectedValues.map((value) => `platform=${value.toLowerCase()}`).join('&')
        : '';


      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/getPostData/${brand?.id}?date=startDate=${value.startDate}&endDate=${value.endDate}`
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
        setIsLoading(false); // Set loading state to false when data is loaded
      } else {
        console.log("Error fetching Twitter data");
        setIsLoading(false); // Set loading state to false on error
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Set loading state to false on error
    }
  };

  useEffect(() => {
    getPostData();
  }, [value]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex flex-1 items-start justify-between mb-2 mt-20">
        <p className="text-lg ml-2">History</p>
        <div className="w-96">
          <Datepicker
            primaryColor={"purple"}
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
          />
        </div>
      </div>
      <div className="mt-2 mb-2 bg-white p-4 rounded-md shadowhttps://www.google.com/url?url=https://support.google.com/websearch?p%3Dfeatured_snippets%26hl%3Den-IN&rct=j&q=&esrc=s&opi=89978449&usg=AOvVaw0fVOAOwBnwZqnh5FCRplER&hl=en-IN&sa=X&ved=2ahUKEwifvoGYn4SCAxVJslYBHXokCt8QrpwBegQIDhAC-md">
        <div className="grid grid-cols-3 mt-2 mb-2 bg-white p-4 rounded-md shadow-md">
          <div>
            <p className="text-base text-blue-gray-400">Network</p>
            <div>
              <ToggleButton value="TWITTER" onClick={handleButtonClick} />
              <ToggleButton value="FACEBOOK" onClick={handleButtonClick} />
              <ToggleButton value="INSTAGRAM" onClick={handleButtonClick} />
              <ToggleButton value="LINKEDIN" onClick={handleButtonClick} />
              <ToggleButton
                value="GOOGLE BUSINESS PROFILE"
                onClick={handleButtonClick}
              />
              <ToggleButton value="TIKTOK" onClick={handleButtonClick} />
              <ToggleButton value="YOUTUBE" onClick={handleButtonClick} />

              {/* {selectedValues.length > 0 && (
                <div>
                  <p>Selected Values:</p>
                  <ul>
                    {selectedValues.map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          </div>
          <div>
            <p className="text-base text-blue-gray-400">Status</p>
            <div>
              <ToggleButton value="PUBLISHED" onClick={handleButtonClick} />
              <ToggleButton value="PENDING" onClick={handleButtonClick} />
              <ToggleButton value="DRAFT" onClick={handleButtonClick} />
              <ToggleButton value="ERROR" onClick={handleButtonClick} />
            </div>
          </div>
          <div>
            <p className="text-base text-blue-gray-400">Notes</p>
            <div>
              <ToggleButton value="WITHOUT NOTES" onClick={handleButtonClick} />
              <ToggleButton value="WITH NOTES" onClick={handleButtonClick} />
              <ToggleButton value="ALL READ" onClick={handleButtonClick} />
              <ToggleButton value="SOME UNREAD" onClick={handleButtonClick} />
            </div>
          </div>
        </div>
        <div className="w-full relative">
          {/* {isLoading && <Spinner />} */}
          <PostHistory events={events} />
        </div>
      </div>
      <PlanningNavbar />
    </div>
  );
};

export default History;
