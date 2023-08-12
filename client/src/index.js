import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

import Root from "./root";
import Tasklist from "./tasklist";
import Createuserapp from "./createuser";
import Task from "./task";
import Home from "./home";
import ErrorPage from "./errorhandler";

const router = createBrowserRouter([
  {
    path: "/createaccount",

    element: (
      <>
        <Root />
        <Createuserapp />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: (
      <>
        <Root />
        <Home />
      </>
    ),
  },
]);

document.body.style.backgroundColor = `#dcdcdc`;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
