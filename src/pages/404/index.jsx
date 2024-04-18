import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("lg")]: {
    height: 400,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  }
}));

const Error404 = () => {
  return (
    <Box
      className="content-center"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        <BoxWrapper>
          <Typography variant="h1">404</Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, fontSize: "1.5rem !important" }}
          >
            Page Not Found ⚠️
          </Typography>
          <Typography variant="body2">
            We couldn&prime;t find the page you are looking for.
          </Typography>
        </BoxWrapper>
        <Img style={{ marginBottom: 40 }} alt="error-illustration" src="src\assets\404.png" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ px: 5.5 }}>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Error404;