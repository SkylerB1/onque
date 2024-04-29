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
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Suspense, lazy, useEffect, useState } from "react";
import AddUserDialog from "./AddUserDialog";
import Filters from "./filters";
import DeletePromptDialog from "./DeletePromptDialog";
import { axiosInstance } from "../../../utils/Interceptor";
import Loader from "../../../components/loader/Loader";
import { getCommaSeparatedNames } from "../../../utils";
import { useSelector } from "react-redux";
import EmailNotificationDialog from "./EmailNotificationDialog";
const UserDetailDialog = lazy(() => import("./UserDetailDialog"));

const TABLE_HEAD = ["Users", "Brands", "Action"];
const initialUser = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  brands: [],
  sendEmail: false,
};
const Users = ({
  collaborators,
  setCollaborators,
  loadingCollaborator: loading,
  setLoadingCollaborator: setLoading,
}) => {
  const { value: brands } = useSelector((state) => state.brands);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setEditing] = useState(false);

  const handleRowClick = (data) => {
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

  const emailDialogHandler = () => {
    setEmailDialogOpen(!emailDialogOpen);
  };

  const emailDialogBackHandler = () => {
    emailDialogHandler();
    toggleUserDetailsDialog();
  };

  const handleSendEmail = (sendEmail) => {
    setSelectedUser((prev) => ({ ...prev, sendEmail: sendEmail }));
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

  const addCollaborator = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/user/collaborators", selectedUser);
      setCollaborators((prev) => [selectedUser, ...prev]);
      setSelectedUser(initialUser);
      emailDialogHandler();
      setLoading(false);
    } catch (err) {
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
      setSelectedUser(initialUser);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="mr-52">
      <Card>
        <CardBody>
          <div className="mb-4 mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
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
                onClick={() => setUserDialogOpen(true)}
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
                  const { firstName, lastName, email, brands } = item;
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
                              {firstName?.charAt(0).toUpperCase() +
                                firstName?.charAt(1).toUpperCase()}
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
                      <td className={classes} align={"right"}>
                        <Tooltip content="Delete User">
                          <IconButton
                            variant="text"
                            onClick={(e) => handleTrashClick(e, item)}
                          >
                            <TrashIcon className="h-6 w-6" fill="black" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <AddUserDialog
        isOpen={userDialogOpen}
        collaborators={collaborators}
        toggleUserDialog={toggleUserDetailsDialog}
        setSelectedUser={setSelectedUser}
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
        open={emailDialogOpen}
        handler={emailDialogHandler}
        email={selectedUser.email}
        loading={loading}
        onChange={handleSendEmail}
        handleBack={emailDialogBackHandler}
        handleSubmit={addCollaborator}
      />
    </div>
  );
};

export default Users;
