import {
  Card,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import {
  TrashIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import AddUserDialog from "./AddUserDialog";
import Filters from "./filters";
import DeletePromptDialog from "./DeletePromptDialog";
import { axiosInstance } from "../../../utils/Interceptor";
import Loader from "../../../components/loader/Loader";
import {
  getCommaSeparatedNames,
  toastrError,
  toastrSuccess,
} from "../../../utils";
import { useSelector } from "react-redux";
import EmailNotificationDialog from "./EmailNotificationDialog";
import {
  ActivationEmail,
  AddUserColored,
} from "../../../components/common/Images";
import toast from "react-hot-toast";
import UserDetailDialog from "./UserDetailDialog";
import AlertDialog from "../../../components/dialog/AlertDialog";
import GoPremiumDialog from "../../../components/dialog/GoPremiumDialog";
import { useAppContext } from "../../../context/AuthContext";

const TABLE_HEAD = ["Users", "Brands", "Action"];
const initialUserData = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  brands: [],
  isActive: false,
  sendEmail: false,
  sendCustomEmail: false,
  resendInvite: false,
  customEmailMessage:
    "Hello! I have asked for a user account in OnQue in your name so we can manage clients together. Would you mind taking a look at it and activating your user? Thank you!",
};
const intialEmailDialogData = {
  open: false,
  imgSrc: "",
  title: "",
  description: "",
  radioBtnLabels: [
    {
      name: "",
      label: "",
    },
  ],
  onSubmit: () => {},
  onBack: () => {},
};
const Users = ({
  collaborators,
  setCollaborators,
  loadingCollaborator: loading,
  setLoadingCollaborator: setLoading,
  getCollaborators,
}) => {
  const { subscription } = useAppContext();
  const isSubscribed = Boolean(subscription) || false;
  const { value: brands = [] } = useSelector((state) => state.brands);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [emailDialog, setEmailDialog] = useState(intialEmailDialogData);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUserData);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [openGoPremiumDialog, setOpenGoPremiumDialog] = useState(false);

  const handleRowClick = (data) => {
    setEditing(true);
    setEditing(true);
    setSelectedUser(data);
    setDialogOpen(true);
  };

  const handleCloseUserDetailsDialog = () => {
    setDialogOpen(false);
  };

  const toggleUserDetailsDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTrashClick = (e, user) => {
    e.stopPropagation();
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const emailDialogHandler = (
    onBack = emailDialogBackHandler,
    onSubmit = addCollaborator
  ) => {
    if (selectedUser.isActive) {
      setEmailDialog((prev) => ({
        ...prev,
        title: "We are going to add the new collaborator",
        description: `Do you want us to send a notification email to ${selectedUser.email} the user is added as collaborator?`,
        imgSrc: AddUserColored,
        open: true,
        radioBtnLabels: [
          {
            name: "sendEmail",
            label: "Yes, send a notification email",
            value: true,
            defaultChecked: false,
          },
          {
            name: "sendEmail",
            label: "Do not send any email",
            value: false,
            defaultChecked: true,
          },
        ],
        onBack,
        onSubmit,
      }));
    } else {
      setEmailDialog((prev) => ({
        ...prev,
        title: "User activation",
        description: `This e-mail address does not match any active user. We will create a user account for this e-mail address: ${selectedUser.email} and we will send them an activation link.`,
        imgSrc: ActivationEmail,
        open: true,
        radioBtnLabels: [
          {
            name: "sendCustomEmail",
            label: "Send default email",
            defaultChecked: true,
            value: false,
          },
          {
            name: "sendCustomEmail",
            label: "Send custom message",
            defaultChecked: false,
            value: true,
          },
        ],
        onBack,
        onSubmit,
      }));
    }
  };

  const closeEmailDialog = () => {
    setEmailDialog((prev) => ({ ...prev, open: false }));
    setSelectedUser(initialUserData);
  };

  const emailDialogBackHandler = () => {
    setEmailDialog((prev) => ({ ...prev, open: false }));
    toggleUserDetailsDialog();
  };

  const handleSendEmail = (name, value) => {
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomEmail = (value) => {
    setSelectedUser((prev) => ({ ...prev, customEmailMessage: value }));
  };

  const handleSelectBrand = (brand, isSelected) => {
    if (isSelected) {
      setSelectedUser((prev) => ({
        ...prev,
        brands: prev.brands.filter((item) => item.id !== brand.id),
      }));
    } else {
      setSelectedUser((prev) => ({
        ...prev,
        brands: [...prev.brands, brand],
      }));
    }
  };

  const addCollaborator = async (data) => {
    try {
      setLoading(true);
      let result = await axiosInstance.post("/user/collaborators", data);
      console.log(result);
      if (result.status == 200) {
        let message = result.data.message;
        setCollaborators((prev) => [data, ...prev]);
        setSelectedUser(initialUserData);
        setEmailDialog(intialEmailDialogData);
        toastrSuccess(message);
      } else {
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateCollaborator = async () => {
    try {
      setLoading(true);

      await axiosInstance.put(
        `/user/collaborator/${selectedUser.id}`,
        selectedUser
      );
      handleCloseUserDetailsDialog();
      setEditing(false);
      getCollaborators();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const deleteCollaborator = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/user/collaborator/${selectedUser.id}`);
      setCollaborators((prev) =>
        prev.filter((item) => item.id !== selectedUser.id)
      );
      handleCloseDeleteDialog();
      setSelectedUser(initialUserData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const sendInvitation = async (data) => {
    try {
      setLoading(true);
      await axiosInstance.post("/user/collaborator/activation-link", data);
      toast.success("Invitation sent");
      setSelectedUser(initialUserData);
      setEmailDialog(intialEmailDialogData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReInvite = (e, user) => {
    e.stopPropagation();
    setSelectedUser((prev) => ({ ...prev, ...user, resendInvite: true }));
    emailDialogHandler(closeEmailDialog, sendInvitation);
  };

  const clearSelectedUser = () => {
    setSelectedUser(initialUserData);
  };
  const openAddUserDialog = () => {
    // check user has taken the subscription or not
    if (isSubscribed == true) {
      setUserDialogOpen(true);
    } else {
      // open the go premmium dialog
      setOpenGoPremiumDialog(true);
    }
  };

  const handleCloseGoPremiumDialog = () => {
    setOpenGoPremiumDialog(false);
  };

  return (
    <div className="xl:mr-52 md:mr-0 sm:mr-0">
      <Card>
        <CardBody>
          <div className="mb-4 mt-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="w-full">
              <Input label="Search" />
            </div>

            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div>
                <Filters
                  options={brands}
                  identifier="brand_name"
                  selectedOptions={selectedBrands}
                  onChange={handleBrandChange}
                  title={"Any Brand"}
                />
              </div>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={openAddUserDialog}
              >
                <PlusIcon strokeWidth={2} className="h-5 w-4" />
                Add User
              </Button>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {collaborators?.map((item, index) => {
                  const { firstName, lastName, email, brands, isActive } = item;
                  const isLast = index === collaborators.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className={classes}>
                        <div className="flex flex-row">
                          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-md dark:bg-gray-600">
                            <span className="font-normal text-gray-600 dark:text-gray-300">
                              {isActive ? (
                                firstName?.charAt(0).toUpperCase() +
                                firstName?.charAt(1).toUpperCase()
                              ) : (
                                <ClockIcon color="grey" className="w-6 h-6" />
                              )}
                            </span>
                          </div>
                          <div class="flex flex-col justify-center text-md ml-3">
                            <p class="text-base font-medium">
                              {firstName + " " + lastName}
                            </p>
                            <span class="text-tertiary text-sm text-[#7e878c]">
                              {email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {getCommaSeparatedNames(brands, "brand_name")}
                        </Typography>
                      </td>
                      <td className={classes} align={"left"}>
                        <Tooltip content="Delete User">
                          <IconButton
                            variant="text"
                            onClick={(e) => handleTrashClick(e, item)}
                          >
                            <TrashIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                        {!isActive && (
                          <Tooltip content="Resend Invite">
                            <IconButton
                              variant="text"
                              onClick={(e) => handleReInvite(e, item)}
                            >
                              <PaperAirplaneIcon className="h-6 w-6" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <UserDetailDialog
        isOpen={dialogOpen}
        onClose={handleCloseUserDetailsDialog}
        isEditing={isEditing}
        brands={brands}
        handleSelectBrand={handleSelectBrand}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        emailDialogHandler={emailDialogHandler}
        updateCollaborator={updateCollaborator}
      />
      <GoPremiumDialog
        isOpen={openGoPremiumDialog}
        handleClose={handleCloseGoPremiumDialog}
      />
      <AddUserDialog
        isOpen={userDialogOpen}
        collaborators={collaborators}
        toggleUserDialog={toggleUserDetailsDialog}
        setSelectedUser={setSelectedUser}
        clearSelectedUser={clearSelectedUser}
        onClose={() => setUserDialogOpen(false)}
      />
      <DeletePromptDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        loading={loading}
        email={selectedUser.email}
        brands={selectedUser.brands}
        handleSubmit={deleteCollaborator}
      />
      <EmailNotificationDialog
        data={emailDialog}
        loading={loading}
        onChange={handleSendEmail}
        selectedUser={selectedUser}
        handleCustomEmail={handleCustomEmail}
      />
    </div>
  );
};

export default Users;
