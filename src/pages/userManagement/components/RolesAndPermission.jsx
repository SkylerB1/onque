import React, { useState } from "react";
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

const RolesAndPermission = () => {
  // Define table headers
  const tableHeaders = ["Role", "Description", "Users", ""];

  // Define table rows
  const tableRows = [
    {
      name: "Admin",
      job: "Administrator",
      users: 10,
    },
    {
      name: "Moderator",
      job: "Moderator",
      users: 5,
    },
    {
      name: "User",
      job: "Regular User",
      users: 100,
    },
  ];

  const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);

  return (
    <>
      <div className="mr-52">
        <Card>
          <CardBody>
            <div className="mb-4 mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="w-full">
                <Input label="Search" />
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
                {tableRows.map((row, index) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(row)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <div
                            class="border border-solid "
                            style={{
                              height: "16px",
                              width: "16px",
                              borderColor: "rgb(72, 76, 79)",
                              background: "rgb(228, 237, 244)",
                            }}
                          ></div> */}
                          <ShieldCheckIcon className="h-6 w-6" color="black" />
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
                          {row.job}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.users}
                        </Typography>
                      </td>
                      <td align={"right"} className={classes}>
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
