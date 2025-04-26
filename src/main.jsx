import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./pages/planner/calendar";
import Login from "./pages/auth/login";
import "./index.css";
import Header from "./components/header";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LinkedInCallbackPage from "./pages/linkedin";
import Register from "./pages/auth/register";
import PrivacyPolicy from "./pages/privacy-policy";
import Terms from "./pages/terms";
import Connect from "./components/SocialMediaConnection/Connect";
import { AppContextProvider } from "./context/AuthContext";
import History from "./pages/planner/history";
import Connection from "./pages/brand/connection";
import ClientDetails from "./pages/brand/clientDetails";
import TeamAccess from "./pages/brand/teamAccess";
import Setting from "./pages/setting/Settings/index";
import UserManagement from "./pages/userManagement/index";
import AllUsers from "./pages/allUsers";
import AdminPasswordPage from "./pages/adminPassword";
import { CookiesProvider } from "react-cookie";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./utils/localization/i18n";
import ForgotPassword from "./pages/auth/fogot-password";
import Error404 from "./pages/404";
import NewPassword from "./pages/auth/NewPassword";
import ToasterCustomConatiner from "./components/ToasterCustomConatiner";
import Smartlink from "./pages/smart-link";
import PublicBio from "./pages/public/PublicBio";
import VerifyEmail from "./pages/auth/verify-email/index";

const stripeKey = import.meta.env.VITE_STRIPE_KEY;

const router = createBrowserRouter([
  {
    path: "/login/:socialMedia?/:token?",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/public/smartlink/:bioname?",
    element: <PublicBio />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/linkedin",
    element: <LinkedInCallbackPage />,
  },
  {
    path: "/planner/calendar",
    element: (
      <PrivateRoute>
        <Header>
          <Calendar />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/smartlink",
    element: (
      <PrivateRoute>
        <Header>
          <Smartlink />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/brands/connect",
    element: <Connect />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  /* Commenting the Planning History Link */
  // {
  //   path: "/planner/history",
  //   element: (
  //     <PrivateRoute>
  //       <Header>
  //         <History />
  //       </Header>
  //     </PrivateRoute>
  //   ),
  // },
  {
    path: "/brand/connection",
    element: (
      <PrivateRoute>
        <Header>
          <Connection />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/brand/name",
    element: (
      <PrivateRoute>
        <Header>
          <ClientDetails />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/brand/team/access",
    element: (
      <PrivateRoute>
        <Header>
          <TeamAccess />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/linkedin",
    element: (
      <PrivateRoute>
        <Header>
          <LinkedInCallbackPage />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/setting/:tab",
    element: (
      <PrivateRoute>
        <Header>
          <Setting />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/userManagement/:tab",
    element: (
      <PrivateRoute>
        <Header>
          <UserManagement />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/404",
    element: <Error404 />,
  },
  {
    path: "/allUsers",
    element: (
      <PrivateRoute>
        <Header>
          <AllUsers />
        </Header>
      </PrivateRoute>
    ),
  },
  {
    path: "/adminPassword",
    element: (
      <PrivateRoute>
        <Header>
          <AdminPasswordPage />
        </Header>
      </PrivateRoute>
    ),
  },
]);
const stripePromise = loadStripe(stripeKey);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <ToasterCustomConatiner />
      </div>
      <ThemeProvider>
        <CookiesProvider>
          <AppContextProvider>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
            </Elements>
          </AppContextProvider>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
