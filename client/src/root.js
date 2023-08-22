import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { NavBar } from "./navbar";

import url from "./url";
import Postrequest from "./postrequest";

export const Context = createContext("");
export default function Root() {
  const [username, setUsername] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [token, setToken] = useState("");

  return (
    <>
      <NavBar />

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
        ]}
      />
    </>
  );
}
