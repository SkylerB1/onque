import React, { useState } from "react";
import SelectionModal from "../dialog/SelectDialog";
import useConnections from "../customHooks/useConnections";
import { API_URL, ConnectUrl } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import { socialMediaList } from "../common/index.jsx";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../../utils/LocalStorage";

const initialHeader = {
  title: "",
  subTitle: "",
  icon: null,
};

const SocialLinkPostCalendar = () => {
  const { getConnections } = useConnections();
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(initialHeader);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMenuItemClick = (item) => {
    setSelected(item);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeSelected = () => {
    setSelected(null);
  };

  const handleShowModal = (header) => {
    setModalHeader(header);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
    setSelected(null);
  };

  const handleSelected = async (data) => {
    try {
      const URL = ConnectUrl[selected];

      const response = await axiosInstance.post(URL, data);
      if (response.status === 200) {
        getConnections(brandId);
        removeSelected();
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-20 flex mb-2">
        <div className="flex flex-1 items-start justify-between bg-white rounded-lg">
          <div>
            <div className="mt-10 ml-8 w-full text-[#4A5568]">
              <div className="text-3xl w-full">Calendar</div>
              <div className=" mt-8 text-lg w-full pr-10">
                Start today to visually plan and automate your social media
                content and save time to focus on other tasks: upload your posts
                in bulk, share content on several social networks
                simultaneously, discover your best hours to publish. Now connect
                the social networks you want to plan with a simple click.
              </div>
            </div>
            <div className="flex flex-1 ml-8">
              <div className=" xl:w-2/6 md:w-full mb-10">
                {socialMediaList.map((item, index) => {
                  return (
                    <div
                      className="mt-6 cursor-pointer"
                      onClick={() => handleMenuItemClick(item.key)}
                      key={index}
                    >
                      <item.component
                        label={item.label}
                        icon={item.icon()}
                        backgroundColor={item.color}
                        modalData={modalData}
                        setModalData={setModalData}
                        setLoading={setLoading}
                        handleShowModal={handleShowModal}
                        selected={selected}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="xl:w-4/6 lg:block md:hidden flex justify-center mb-18">
                <img
                  src="https://i.pinimg.com/564x/6d/0f/40/6d0f4000a162c6152bb30c7e8873fe1c.jpg"
                  width={650}
                  height={1000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SelectionModal
        open={showModal}
        data={modalData}
        title={modalHeader.title}
        loading={loading}
        subTitle={modalHeader.subTitle}
        platformIcon={modalHeader.icon}
        handleClose={handleCloseModal}
        handleSelect={handleSelected}
      />
    </>
  );
};

export default SocialLinkPostCalendar;
