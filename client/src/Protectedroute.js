import { Outlet, Navigate, useOutletContext } from "react-router-dom";
import Loginapp from "./loginapp";
import { Component } from "./test";

const useAuth = () => {
  const user = { loggedin: false };
  return user && user.loggedin;
};

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useOutletContext();
  //const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to="/" />;

};
export default ProtectedRoutes;
