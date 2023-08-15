import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Root from "./root";
import Loginapp from "./loginapp";
import Createuserapp from "./createuser";
import Home from "./home";
import { Component, dataLoader } from "./test";

function Apps() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Loginapp />} />
        <Route path="/register" element={<Createuserapp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/component" element={<Component />} loader={dataLoader} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Apps;
