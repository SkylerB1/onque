import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { axiosInstance } from "../../utils/Interceptor";
import { toastrError, toastrSuccess, API_URL } from "../../utils";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../redux/features/brandsSlice";
import { useAppContext } from "../../context/AuthContext";
import { setUser } from "../../redux/features/userSlice";
import useConnections from "../../components/customHooks/useConnections";
import UserService from "../../services/UserServices";
import { FaNetworkWired } from "react-icons/fa";
import { AllUserTable } from "./AllUserTable";

// Constants for pagination
const DEFAULT_LIMIT = 10;

const columns = [
  { id: "id", label: "User ID" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "clients_count", label: "Clients Count" },
  { id: "max_clients", label: "Max Clients" },
  { id: "posts_count_monthly", label: "Posts Count Monthly" },
  { id: "max_posts_monthly", label: "Max Posts Monthly" },
  { id: "actions", label: "Actions" },
];

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  margin: "20px auto",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: "90vw",
    margin: "10px auto",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AllUsers = () => {
  const { pathname } = useLocation();
  const url = pathname;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rowLoading, setRowLoading] = useState({}); // Track loading for each row
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();
  const { getSubscriptions, getCounter, handlePostLogin } = useAppContext();
  const { getConnections } = useConnections();
  const user = useSelector((state) => state.user.value);

  // Fetch all users data
  // const getAllUsersData = async (page, rowsPerPage, searchQuery) => {
  //   const offset = page * rowsPerPage;
  //   setLoading(true);
  //   try {
  //     const response = await UserService.getAllUsers({
  //       limit: rowsPerPage,
  //       offset,
  //       searchValue: searchQuery,
  //     });

  //     setUsersData(response.rows);
  //     setTotalUsers(response.count);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     toastrError("Failed to fetch users.");
  //   }
  // };

  // useEffect(() => {
  //   if (user?.adminRole == "admin") {
  //     getAllUsersData(page, rowsPerPage, searchQuery);
  //   }
  // }, [page, rowsPerPage, searchQuery]);

  // useEffect(() => {
  //   if (user?.adminRole != "admin") {
  //     toastrError("Unauthrized Access!");
  //     setTimeout(() => {
  //       navigate("/planner/calendar");
  //     }, 2000);
  //   }
  // }, []);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleSearch = (event) => {
  //   setSearchQuery(event.target.value);
  //   setPage(0);
  // };

  // const handleLogin = async (id) => {
  //   setRowLoading((prev) => ({ ...prev, [id]: true }));
  //   try {
  //     const response = await UserService.loginAs({ id: id });
  //     const { firstName, lastName } = response;
  //     let fullName = firstName + " " + lastName;

  //     await handlePostLogin(response);
  //     navigate("/planner/calendar");
  //     toastrSuccess(`You are logged in as ${fullName} successfully.`);
  //   } catch (error) {
  //     const message = error.response?.data?.message || "An error occurred.";
  //     toastrError(message);
  //   } finally {
  //     setRowLoading((prev) => ({ ...prev, [id]: false }));
  //   }
  // };

  return (
    <div className=" ">
      <div className="">
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
                        ? "w-full text-black mt-8 bg-[#fde8ef] rounded-md shadow-sm hover:bg-[#fde8ef] hover:text-[#ec407a] "
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
            </div>
          </div>
          {/* Right Section */}
          <div className="xl:w-5/6 pb-40 md:w-4/6">
            <div className="mt-24">
              <AllUserTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
