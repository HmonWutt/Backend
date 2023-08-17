import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { NavBar } from "./navbar";

export const Context = createContext("");
export default function Root() {
  const [isAuth, setIsAuth] = useState(false);
  const [identifier, setIdentifier] = useState("");

  return (
    <>
      <NavBar />
      <Outlet context={[isAuth, setIsAuth, identifier, setIdentifier]} />
    </>
  );
}
