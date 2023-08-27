import {
  Route,
  Outlet,
  Navigate,
  useOutletContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

const useAuth = () => {
  const user = { loggedin: false };
  return user && user.loggedin;
};

const ProtectedRoutes = () => {
  const nav = useNavigate();
  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    name1,
    setName1,
    name2,
    setName2,
  ] = useOutletContext();

  const location = useLocation();
  useEffect(() => {}, [isAuth]);
  return isAuth ? (
    <Outlet
      context={[
        username,
        setUsername,
        isAuth,
        setIsAuth,
        identifier,
        setIdentifier,
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
