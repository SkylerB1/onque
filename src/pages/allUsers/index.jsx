import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import axios from 'axios';
import { axiosInstance } from "../../utils/Interceptor";
import { toastrError, toastrSuccess, API_URL } from "../../utils";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { getBrands } from "../../redux/features/brandsSlice";
import { useAppContext } from "../../context/AuthContext";
import { setUser } from "../../redux/features/userSlice";
import useConnections from "../../components/customHooks/useConnections";

// Constants for pagination
const DEFAULT_LIMIT = 10;

const columns = [
  { id: 'id', label: 'User ID' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'clients_count', label: 'Clients Count' },
  { id: 'max_clients', label: 'Max Clients' },
  { id: 'posts_count_monthly', label: 'Posts Count Monthly' },
  { id: 'max_posts_monthly', label: 'Max Posts Monthly' },
  { id: 'actions', label: 'Actions' },
];

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: '20px auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '90vw',
    margin: '10px auto',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AllUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rowLoading, setRowLoading] = useState({}); // Track loading for each row
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();
  const { getSubscriptions, getCounter } = useAppContext();
  const { getConnections } = useConnections();

  // Fetch all users data
  const getAllUsersData = async (page, rowsPerPage, searchQuery) => {
    const offset = page * rowsPerPage;
    setLoading(true);
    try {
      console.log(`Fetching data: page=${page}, rowsPerPage=${rowsPerPage}, offset=${offset}, searchQuery=${searchQuery}`); // Debug log
      const response = await axiosInstance.get(
        API_URL + `/user/get-all-users`,
        {
          params: { limit: rowsPerPage, offset, searchValue: searchQuery }
        }
      );
      console.log(response.data); 
      setUsersData(response.data.rows);
      setTotalUsers(response.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastrError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getAllUsersData(page, rowsPerPage, searchQuery);
  }, [page, rowsPerPage, searchQuery]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleLogin = async (id) => {
    setRowLoading(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login-user-by-id/${id}`
      );
      if (response.status === 200) {
        await handlePostLogin(response);
      } else {
        const message = response.data.message;
        toastrError(message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      toastrError(message);
    } finally {
      setRowLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handlePostLogin = async (response) => {
    const { data: userData } = response;
    const { access_token } = userData;
    localStorage.setItem("access_token", access_token);
    setCookie("access_token", access_token);
    dispatch(getBrands()).then((item) => {
      const brand = item.payload.brands[0];
      const userBrand = {
        ...userData,
        brand: brand,
      };
      getCounter(brand.id);
      dispatch(setUser(userBrand));
      getConnections(brand.id);
      getSubscriptions();
      navigate("/planner/calendar");
    });
  };

  return (
    <div className="mt-24 max-h-[10rem]">
      <Box
        className="content-center"
        style={{
          maxHeight: "42rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: '0 20px',
          marginTop: "7.6rem"
        }}
      >
        <BoxWrapper>
          <Box sx={{ textAlign: "end" }}>
            <TextField
              sx={{ width: "20rem", borderRadius: "10px" }}
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleSearch}
              value={searchQuery}
            />
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: "40rem" }}>
            <Table>
              <TableHead sx={{ bgcolor: "white", zIndex: "9999" }}>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        style={{ fontWeight: 'bold' }}
                      >
                        {column.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData?.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <StyledTableCell key={column.id}>
                        {column.id === 'actions' ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleLogin(row.id)}
                            disabled={rowLoading[row.id]}
                          >
                            {rowLoading[row.id] ? "Loading..." : "Login"}
                          </Button>
                        ) : (
                          row[column.id]
                        )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </BoxWrapper>
      </Box>
    </div>
  );
};

export default AllUsers;
