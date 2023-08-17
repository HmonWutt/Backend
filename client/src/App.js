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
import { Homedata, descriptionLoader } from "./homedata";
import Home from "./home";
import { Component, dataLoader } from "./test";
import ProtectedRoutes from "./Protectedroute";
import url from "./url";

function Apps() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Loginapp />} />
          <Route path="/register" element={<Createuserapp />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/home"
              element={<Homedata />}
              /*loader={descriptionLoader}
              loader={async (req,params) =>dataLoader(`${url}/todo/${params.identifier}.json`)}*/
            />
            <Route
              path="/component"
              element={<Component />}
              /*  loader={dataLoader} */
            />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default Apps;
