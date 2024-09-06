import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

import { toastrError, toastrSuccess } from "../../utils";
import { useAppContext } from "../../context/AuthContext";
import UserService from "../../services/UserServices";
import TablePagination from "@mui/material/TablePagination";

const TABLE_HEAD = [
  "S. No.",
  // "User ID",
  "First Name",
  "Last Name",
  "Email",
  "Clients Count",
  "Max Clients",
  "Posts Count Monthly",
  "Max Posts Monthly",
  "Action",
];

const DEFAULT_LIMIT = 10; // Set default rows per page to 7

export function AllUserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rowLoading, setRowLoading] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handlePostLogin } = useAppContext();
  const user = useSelector((state) => state.user.value);

  // Fetch all users data
  const getAllUsersData = async (page, rowsPerPage, searchQuery) => {
    const offset = page * rowsPerPage;
    setLoading(true);
    try {
      const response = await UserService.getAllUsers({
        limit: rowsPerPage,
        offset,
        searchValue: searchQuery,
      });
      console.log(response);
      setUsersData(response.rows);
      setTotalUsers(response.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toastrError("Failed to fetch users.");
    }
  };
  useEffect(() => {
    if (user?.adminRole === "admin") {
      getAllUsersData(page, rowsPerPage, searchQuery);
    }
  }, [page, rowsPerPage, searchQuery, user?.adminRole]);

  useEffect(() => {
    if (user?.adminRole !== "admin") {
      toastrError("Unauthorized Access!");
      setTimeout(() => {
        navigate("/planner/calendar");
      }, 2000);
    }
  }, [user?.adminRole, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllUsersData(newPage, rowsPerPage, searchQuery);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Use base 10 for parsing rowsPerPage
    setPage(0);
    getAllUsersData(0, parseInt(event.target.value, 10), searchQuery);
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    value = value.trim();
    setSearchQuery(value);
    setPage(0);
    getAllUsersData(0, rowsPerPage, value);
  };

  const handleLogin = async (id) => {
    setRowLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await UserService.loginAs({ id });
      const { firstName, lastName } = response;
      let fullName = firstName + " " + lastName;

      await handlePostLogin(response);
      navigate("/planner/calendar");
      toastrSuccess(`You are logged in as ${fullName} successfully.`);
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      toastrError(message);
    } finally {
      setRowLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Card className="h-full w-full px-5 shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Users List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the all users
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll max-w-md md:max-w-full md:overflow-x-auto px-0 max-h-lg">
        <div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersData?.map((row, index) => (
                <tr key={row.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    {index + 1}
                  </td>
                  {/* <td className="p-4 border-b border-blue-gray-50">{row.id}</td> */}
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.firstName}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.lastName}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.email}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.clients_count}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.max_clients}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.posts_count_monthly}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.max_posts_monthly}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Tooltip content="Login As User">
                      <IconButton
                        variant="text"
                        onClick={() => handleLogin(row.id)}
                        disabled={rowLoading[row.id]}
                      >
                        {rowLoading[row.id] ? (
                          "Loading..."
                        ) : (
                          <PaperAirplaneIcon className="h-6 w-6" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
      <CardFooter className=" border-t border-blue-gray-50 p-4">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page"
        />
      </CardFooter>
    </Card>
  );
}
