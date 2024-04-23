import Accordion from "../../accordion/Accordion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputComponent from "../../Input/InputComponent";
import Youtube from "../../svg/Youtube";
import { axiosInstance } from "../../../utils/Interceptor";
import { API_URL } from "../../../utils";
import { useSelector } from "react-redux";
import CustomInput from "../../Input/CustomInput";
import SelectInput from "../../Input/SelectInput";

function YoutubePresets({ setAdditionalPresets, additionalPresets }) {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.userBrandId;
  const CATEGORIES_URL =
    API_URL + "/auth/youtube/categories?brandId=" + brandId;
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const visibilityOptions = useMemo(
    () => [
      { label: "Unlisted", value: "unlisted" },
      { label: "Public", value: "public" },
      { label: "Private", value: "private" },
    ],
    []
  );
  const audience_configuraitons = useMemo(
    () => [
      { label: "Yes, it's a video made for kids", value: true },
      { label: "No, it's a video made for kids", value: false },
    ],
    []
  );
  const handleChange = (identifier, value, type) => {
    setAdditionalPresets((prevState) => ({
      ...prevState,
      YouTube: {
        ...prevState.YouTube,
        [identifier]: value,
      },
    }));
  };

  const toggleAccordion = () => {
    setOpen(!open);
  };

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosInstance.get(CATEGORIES_URL);
      setCategories(res.data);
    } catch (err) {
      setCategories([]);
    }
  }, [open]);

  useEffect(() => {
    open && getCategories();
  }, [open]);

  return (
    <div className="my-2 youtubeBox">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<Youtube width={18} height={18} fill="#FF0000" />}
        title={"YouTube presets"}
      >
        <div>
          <CustomInput
            label={"Title"}
            required={true}
            placeholder={"Video or short title"}
            identifier={"title"}
            helperText={`${additionalPresets?.title?.length}/100`}
            helperTextColor="#0009"
            value={additionalPresets?.title}
            onChange={handleChange}
            helperTextClass="justify-end mr-3"
            maxLength={100}
          />

          <div className="flex flex-1 flex-row my-2">
            <span className="flex flex-1">
              <SelectInput
                label={"Category"}
                identifier={"category"}
                value={additionalPresets.category}
                onChange={handleChange}
                options={categories}
              />
            </span>
            <span className="ml-2 flex flex-1">
              <SelectInput
                label={"Visibility"}
                identifier={"visibility"}
                value={additionalPresets.visibility}
                onChange={handleChange}
                options={visibilityOptions}
              />
            </span>
            <span className="ml-2 flex flex-1">
              <SelectInput
                label={"Audience  configuration"}
                identifier={"madeForKids"}
                value={additionalPresets.madeForKids}
                onChange={handleChange}
                options={audience_configuraitons}
              />
            </span>
          </div>
        </div>
      </Accordion>
    </div>
  );
}

export default YoutubePresets;
