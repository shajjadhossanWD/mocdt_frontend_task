import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Common/Main";
import NotFound from "../Components/Common/NotFound";
import EmailListMain from "../Components/EmailListMain";
import RequireUser from "../Components/auth/RequireUser";
import LoginPage from "../Components/LoginPage";
import RegistrationForm from "../Components/RegistrationForm";
import ComposeEmail from "../Components/ComposeEmail";
import EmailView from "../Components/EmailView";
import ProfilePage from "../Components/ProfilePage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <NotFound/>,
    children: [
      
      {
        element: <RequireUser />,
        children: [
              {
                path: "/",
                element: <EmailListMain />,
              },
              {
                path: "/home",
                element: <EmailListMain />,
              },
              {
                path: "/view/:id",
                element: <EmailView/>,
              },
              {
                path: "/compose",
                element: <ComposeEmail />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
         
        ],
      },

      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegistrationForm />,
      },
    ],
  },
]);

export default Routes;
