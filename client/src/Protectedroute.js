import {
  Route,
  Outlet,
  Navigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { createContext } from "react";
import Loginapp from "./loginapp";
import Home from "./home";
import { Component } from "./test";

const useAuth = () => {
  const user = { loggedin: false };
  return user && user.loggedin;
};

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth, identifier, setIdentifier, token, setToken] =
    useOutletContext();

  console.log("protected route identifier", isAuth, identifier);
  const location = useLocation();

  //const isAuth = useAuth();
  return isAuth ? (
    <Outlet context={[identifier, token]} />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default ProtectedRoutes;
