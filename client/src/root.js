import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./navbar";

export default function Root() {
  const[isAuth,setIsAuth]=useState(false)
  return (
    <>
      <NavBar />
      {/* other elements */}
      <Outlet context={[isAuth, setIsAuth]} />
    </>
  );
}
