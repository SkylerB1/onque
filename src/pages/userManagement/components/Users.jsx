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
import { useState } from "react";
import UserDetailDialog from "./UserDetailDialog";
import AddUserDialog from "./AddUserDialog";
import Filters from "./filters";
import DeletePromptDialog from "./DeletePromptDialog";

const TABLE_HEAD = ["Users", "Brands", ""];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "John Michael",
    job: "Manager",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Alexa Liras",
    job: "Developer",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Laurent Perrier",
    job: "Executive",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Michael Levi",
    job: "Developer",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Richard Gran",
    job: "Manager",
  },
];
const Users = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const brands = ["Brand1", "Brand2", "Brand3"];

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTrashClick = (e) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
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
                {/* <Select label="Any Brand">
                  <Option value="admin">Admin</Option>
                  <Option value="moderator">Moderator</Option>
                  <Option value="user">User</Option>
                </Select> */}
                <Filters
                  options={brands}
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
              {TABLE_ROWS.map(({ name, job, img }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={name}
                    onClick={() => handleRowClick({ name, job, img })}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes} align={"right"}>
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          onClick={(e) => handleTrashClick(e)}
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
        </CardBody>

        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter> */}
      </Card>
      <UserDetailDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        user={selectedUser}
      />
      <AddUserDialog
        isOpen={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
      />
      <DeletePromptDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        email="user@example.com" // Pass the email dynamically
        brands={["Brand1", "Brand2"]} // Pass the brands dynamically
        onDelete={() => {
          // Logic to handle deletion
          handleCloseDeleteDialog();
        }}
      />
    </div>
  );
};

export default Users;
