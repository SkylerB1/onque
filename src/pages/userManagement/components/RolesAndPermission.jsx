import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  ShieldCheckIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import AddRoleDialog from "./AddRoleDialog";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import { axiosInstance } from "../../../utils/Interceptor";
import { removeRole } from "../../../redux/features/roleSlice";
import toast from "react-hot-toast";
import AlertDialog from "../../../components/dialog/AlertDialog";
import {
  AdvancedPlanPng,
  DeleteModalError,
  EnterpisePlanPng,
} from "../../../components/common/Images";

import { useAppContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const initial = {
  name: "",
  description: "",
  viewPlanner: false,
  fullAccessPlanner: false,
  editBrand: false,
  schedulePosts: false,
  publishPosts: false,
};
const initialAlert = {
  open: false,
  title: "",
  description: "",
  alertImgSrc: "",
  loading: false,
  btnTitle: "Ok",
  onSubmit: () => {},
};

const RolesAndPermission = ({ collaborators }) => {
  const navigate = useNavigate();
  const { subscription } = useAppContext();
  const isSubscribed = Boolean(subscription) || false;
  const tableHeaders = ["Role", "Description", "Users", "Action"];
  const [isEditing, setIsEditing] = useState(false);
  const [alertDialog, setAlertDialog] = useState(initialAlert);
  const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initial);
  const { value: roles, loading } = useSelector((state) => state.roles);
  const rolesData = useMemo(
    () =>
      roles?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, roles]
  );
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleCloseAddRoleDialog = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    setData(initial);
    setAddRoleDialogOpen(false);
  };

  const handleEditRole = (e, role) => {
    e.stopPropagation();
    toggleEditing();
    setData(role);
    setAddRoleDialogOpen(true);
  };

  const checkIsRoleAssigned = (roleId) => {
    return collaborators.some((item) =>
      item.brands.some((brand) => {
        return brand.brandRole.roleId === roleId;
      })
    );
  };

  const handleCloseAlert = () => {
    setAlertDialog(initialAlert);
  };

  const checkDeleteRole = (e, roleId, roleName = "") => {
    e.stopPropagation();
    const res = checkIsRoleAssigned(roleId);
    if (res) {
      setAlertDialog((prev) => ({
        ...prev,
        open: true,
        title: `The ${roleName} can't be deleted`,
        description:
          "This role is currently in use, in order to delete it assign a different role to the users that have it assigned to them.",
        alertImgSrc: DeleteModalError,
        btnTitle: "Understood",
        onSubmit: handleCloseAlert,
      }));
    } else {
      setAlertDialog((prev) => ({
        ...prev,
        open: true,
        title: `Are you sure you want to delete the "${roleName}" role?`,
        description:
          "The role and all its settings will be deleted and no longer available for assignment to users.",
        alertImgSrc: DeleteModalError,
        btnTitle: "Delete",
        onSubmit: () => handleDeleteRole(roleId),
      }));
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      setAlertDialog((prev) => ({ ...prev, loading: true }));
      await axiosInstance.delete(`/user/roles/${roleId}`);
      dispatch(removeRole(roleId));
      setAlertDialog((prev) => ({ ...prev, open: false, loading: false }));
    } catch (err) {
      setAlertDialog((prev) => ({ ...prev, loading: false }));
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="xl:mr-52 md:mr-0 sm:mr-0">
        <Card>
          <CardBody>
            {isSubscribed == true ? (
              <>
                <div>
                  <div className="mb-4 mt-4 flex flex-col gap-2 justify-between md:flex-row md:items-center">
                    <div className="w-full">
                      <Input
                        label="Search"
                        value={search}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                      <Button
                        className="flex items-center gap-3"
                        size="sm"
                        onClick={() => setAddRoleDialogOpen(true)}
                      >
                        <PlusIcon strokeWidth={2} className="h-5 w-4" />
                        Add Role
                      </Button>
                    </div>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full  table-auto text-left">
                        <thead>
                          <tr>
                            {tableHeaders.map((header, index) => (
                              <th
                                key={index}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                colSpan={2}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  {header}
                                </Typography>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rolesData?.map((row, index) => {
                            const isLast = index === rolesData.length - 1;
                            const classes = isLast
                              ? "p-4"
                              : "p-4 border-b border-blue-gray-50";
                            return (
                              <tr
                                key={row.id}
                                onClick={(e) => handleEditRole(e, row)}
                                style={{ cursor: "pointer" }}
                              >
                                <td className={classes} colSpan={2}>
                                  <div className="flex items-center gap-3">
                                    <ShieldCheckIcon
                                      className="h-6 w-6"
                                      color="black"
                                    />
                                    <div className="flex items-center gap-3">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                      >
                                        {row.name}
                                      </Typography>
                                    </div>
                                  </div>
                                </td>
                                <td className={classes} colSpan={2}>
                                  <div className="max-w-sm ">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal break-words"
                                    >
                                      {row.description}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes} colSpan={2}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {row.assignedUsersCount}
                                  </Typography>
                                </td>
                                <td className={classes} colSpan={2}>
                                  <Tooltip content="edit">
                                    <IconButton
                                      variant="text"
                                      onClick={(e) => handleEditRole(e, row)}
                                    >
                                      <PencilSquareIcon
                                        className="h-6 w-6"
                                        color="black"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip content="delete">
                                    <IconButton
                                      variant="text"
                                      onClick={(e) =>
                                        checkDeleteRole(e, row.id, row.name)
                                      }
                                    >
                                      <TrashIcon
                                        className="h-6 w-6"
                                        color="black"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {rolesData?.length === 0 && (
                    <div className="text-center mb-0 pt-4">
                      we haven't found any roles matching your search filters
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <img
                    src={EnterpisePlanPng}
                    className="w-auto h-auto mx-auto"
                  />
                  <h3 className="mb-5">Get ADVANCED</h3>
                  <p className="mb-5">
                    Managing user roles requires an Advanced or Superior plan.
                    Upgrade your subscription to be able to use this
                    functionality.
                  </p>
                  {!isSubscribed && (
                    <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block gradient-button-solid normal-case whitespace-nowrap text-sm md:text-base "
                      onClick={() => navigate("/setting/price")}
                    >
                      Upgrade to Premium
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
      <AddRoleDialog
        isOpen={addRoleDialogOpen}
        data={data}
        roles={roles}
        setData={setData}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        onClose={handleCloseAddRoleDialog}
      />
      <AlertDialog
        open={alertDialog.open}
        title={alertDialog.title}
        description={alertDialog.description}
        alertImgSrc={alertDialog.alertImgSrc}
        loading={alertDialog.loading}
        btnTitle={alertDialog.btnTitle}
        onSubmit={alertDialog.onSubmit}
      />
    </>
  );
};

export default RolesAndPermission;
