import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import Apps from "./App";

document.body.style.backgroundColor = `#dcdcdc`;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Apps />

  //<RouterProvider router={router} />
  // </React.StrictMode>
);
///-----------------------------------------------------------------------------------------------------////
// import {
//   BrowserRouter,
//   createBrowserRouter,
//   RouterProvider,
//   Routes,
//   Route,
//   createRoutesFromElements,
// } from "react-router-dom";

// import Root from "./root";
// import Tasklist from "./tasklist";
// import Createuserapp from "./createuser";
// import Task from "./task";
// import Home from "./home";
// import ErrorPage from "./errorhandler";
// import Loginapp from "./loginapp";
// import Component from "./test";

//  const router = createBrowserRouter([
//   {
//     path: "/",

//     element: (
//       <>
//         <Root />
//       </>
//     ),
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: (
//           <>
//             <Loginapp />
//           </>
//         ),
//       },
//       {
//         path: "/createaccount",

//         element: (
//           <>
//             <Createuserapp />
//           </>
//         ),
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "home",
//         element: (
//           <>
//             <Home />
//           </>
//         ),
//         errorElement: <ErrorPage />,
//       },

//       {
//         path: "component",
//         element: (
//           <>
//             <Component />
//           </>
//         ),
//       },
//     ],
//   },
//]

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
