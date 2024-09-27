import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Box, Modal, TextField } from "@mui/material";
import { toastrError, toastrSuccess, API_URL } from "../../utils";
import { useAppContext } from "../../context/AuthContext";
import UserService from "../../services/UserServices";
import TablePagination from "@mui/material/TablePagination";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const TABLE_HEAD = [
  "S. No.",
  "First Name",
  "Last Name",
  "Email",
  "Clients Count",
  "Max Clients",
  "Posts Count Monthly",
  "Max Posts Monthly",
  "Action",
];

const DEFAULT_LIMIT = 10; // Set default rows per page to 10

export function AllUserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rowLoading, setRowLoading] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handlePostLogin } = useAppContext();
  const user = useSelector((state) => state.user.value);

  // Dummy password for admin login
  const DUMMY_PASSWORD = "admin123";

  const getAllUsersData = async (page, rowsPerPage, searchQuery) => {
    const offset = page * rowsPerPage;
    setLoading(true);
    try {
      const response = await UserService.getAllUsers({
        limit: rowsPerPage,
        offset,
        searchValue: searchQuery,
      });
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getAllUsersData(0, parseInt(event.target.value, 10), searchQuery);
  };

  const handleSearch = (event) => {
    let value = event.target.value.trim();
    setSearchQuery(value);
    setPage(0);
    getAllUsersData(0, rowsPerPage, value);
  };

  const handleLogin = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const verifyPasswordAndLogin = async () => {
    try {
      const response = await axios.post(API_URL + `/user/master-login`, {
        email: user.email,
        password,
      });
  
      if (response.status === 200) {
        setRowLoading((prev) => ({ ...prev, [selectedUserId]: true }));
  
        try {
          const userResponse = await UserService.loginAs({ id: selectedUserId });
          const { firstName, lastName } = userResponse;
          let fullName = `${firstName} ${lastName}`;
  
          await handlePostLogin(userResponse);
          navigate("/planner/calendar");
          toastrSuccess(`You are logged in as ${fullName} successfully.`);
        } catch (error) {
          const message = error.response?.data?.message || "An error occurred.";
          toastrError(message);
        } finally {
          setRowLoading((prev) => ({ ...prev, [selectedUserId]: false }));
          setShowModal(false);
          setPassword(""); // Reset password
        }
      } else {
        // This block should now handle unexpected status codes
        toastrError(response.data.message || "An error occurred during login.");
      }
    } catch (error) {
      // Catch errors from the axios request
      console.error("Error during login attempt:", error);
      toastrError("Failed to login. Please check your credentials.");
    }
  };
  

  // const verifyPasswordAndLogin = async () => {
  //   const response = await axios.post( API_URL + `/user/master-login`, {
  //     email:user.email,
  //     password
  //   });
  //   console.log(response,"callled")
  //   if (response.status === 200) {
  //     setRowLoading((prev) => ({ ...prev, [selectedUserId]: true }));
  //     try {
  //       const response = await UserService.loginAs({ id: selectedUserId });
  //       const { firstName, lastName } = response;
  //       let fullName = `${firstName} ${lastName}`;
  //       await handlePostLogin(response);
  //       navigate("/planner/calendar");
  //       toastrSuccess(`You are logged in as ${fullName} successfully.`);
  //     } catch (error) {
  //       const message = error.response?.data?.message || "An error occurred.";
  //       toastrError(message);
  //     } finally {
  //       setRowLoading((prev) => ({ ...prev, [selectedUserId]: false }));
  //       setShowModal(false);
  //       setPassword(""); // Reset password
  //     }
  //   } else {
  //     console.log("Coming In Elsoe")
  //     toastrError(response.data.msg);
  //   }
  // };

  return (
    <>
      <Card className="h-full w-full px-5 shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Users List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about all users
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
                <tr>
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
                    <td className="p-4 border-b border-blue-gray-50">{index + 1}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.firstName}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.lastName}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.email}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.clients_count}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.max_clients}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.posts_count_monthly}</td>
                    <td className="p-4 border-b border-blue-gray-50">{row.max_posts_monthly}</td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Login As User">
                        <IconButton
                          variant="text"
                          onClick={() => handleLogin(row.id)}
                          disabled={rowLoading[row.id]}
                        >
                          {rowLoading[row.id] ? "Loading..." : <PaperAirplaneIcon className="h-6 w-6" />}
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter className="border-t border-blue-gray-50 p-4">
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
      <Modal open={showModal} onClose={() => {
        setShowModal(false);
        setPassword(""); // Clear the password field when the modal closes
      }}>
        <Box
          sx={{
            maxWidth: 600,
            width: '50%',
            mx: "auto",
            mt: '10%',
            bgcolor: "background.paper",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" color="blue-gray">
            Enter Admin Password
          </Typography>
          <div className="relative">
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    className="bg-white text-gray-950 text-xl shadow-none hover:shadow-none transition-shadow duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={() => {
              setShowModal(false);
              setPassword(""); // Clear password on cancel
            }} color="gray">Cancel</Button>
            <Button
              onClick={verifyPasswordAndLogin}
              className="mr-2"
              disabled={!password} // Disable button if password is empty
            >
              Login
            </Button>
          </div>
        </Box>
      </Modal>

    </>
  );
}
