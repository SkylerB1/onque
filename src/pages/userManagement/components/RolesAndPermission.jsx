import React, { useMemo, useState } from "react";
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
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import AddRoleDialog from "./AddRoleDialog";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";

const RolesAndPermission = () => {
  const tableHeaders = ["Role", "Description", "Users", "Action"];
  const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { value: roles, loading } = useSelector((state) => state.roles);
  const rolesData = useMemo(
    () =>
      roles?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, roles]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="mr-52">
        <Card>
          <CardBody>
            <div className="mb-4 mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="w-full">
                <Input label="Search" value={search} onChange={handleSearch} />
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
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                        onClick={() => handleRowClick(row)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className={classes}>
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
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row.description}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row.assignedUsersCount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="clone">
                            <IconButton
                              variant="text"
                              onClick={(e) => handleTrashClick(e)}
                            >
                              <DocumentDuplicateIcon
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
            )}
            {rolesData?.length === 0 && (
              <div className="text-center mb-0 pt-4">
                we haven't found any roles matching your search filters
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <AddRoleDialog
        isOpen={addRoleDialogOpen}
        onClose={() => setAddRoleDialogOpen(false)}
      />
    </>
  );
};

export default RolesAndPermission;
