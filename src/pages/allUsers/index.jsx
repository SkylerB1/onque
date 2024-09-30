import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FaNetworkWired, FaLock } from "react-icons/fa";
import { AllUserTable } from "./AllUserTable";
import AdminPasswordModal from "../adminPassword";

const AllUsers = () => {
  const { pathname } = useLocation();
  const url = pathname;
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true); // Set to modalOpen
  };

  const handleClose = () => {
    setModalOpen(!modalOpen); // Set to modalOpen
  };

  return (
    <div>
      <div className="min-h-[50rem] flex mb-2 bg-white rounded-lg shadow-2xl">
        <div className="xl:w-1/6 xl:border-r-2 xl:ml-8 md:w-2/6 md:ml-2 ">
          <div className="mt-24 ">
            <div className="ml-2 mr-2">
              <Link
                className="w-full text-base text-black hover:text-black"
                to={"/allUsers"}
              >
                <ListItem
                  className={
                    url === "/allUsers"
                      ? "w-full text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a]"
                      : "w-full mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
                  }
                >
                  <ListItemPrefix>
                    <FaNetworkWired className="h-5 w-5" />
                  </ListItemPrefix>
                  All Users
                </ListItem>
              </Link>
            </div>
            <div className="ml-2 mr-2">
              <ListItem
                className="w-full mt-8 hover:bg-[#fde8ef] hover:text-[#ec407a]"
                onClick={handleClickOpen}
              >
                <ListItemPrefix>
                  <FaLock className="h-5 w-5" />
                </ListItemPrefix>
                Admin Password
              </ListItem>
            </div>
          </div>
        </div>

        <div className="xl:w-5/6 pb-40 md:w-4/6">
          <div className="mt-24">
            <AllUserTable />
          </div>
        </div>
      </div>

      {/* Modal for Admin Password update */}
      <AdminPasswordModal
        open={modalOpen} // Use modalOpen here
        onClose={handleClose} // Use onClose to manage the modal state
      />
    </div>
  );
};

export default AllUsers;

