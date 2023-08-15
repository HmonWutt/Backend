import { Outlet, Link, NavLink } from "react-router-dom";
import { NavBar } from "./navbar";

export default function Root() {
  return (
    <>
      <NavBar />
      {/* other elements */}
      <Outlet />
    </>
  );
}
