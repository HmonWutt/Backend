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
  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    token,
    setToken,
    name1,
    setName1,
    name2,
    setName2,
  ] = useOutletContext();
  console.log("name1,name2 from protectedroute", name1, name2);
  const location = useLocation();

  //const isAuth = useAuth();
  return isAuth ? (
    <Outlet
      context={[
        username,
        setUsername,
        isAuth,
        setIsAuth,
        identifier,
        setIdentifier,
        token,
        setToken,
        name1,
        setName1,
        name2,
        setName2,
      ]}
    />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default ProtectedRoutes;
