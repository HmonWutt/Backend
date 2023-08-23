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
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  console.log("name1,name2 from root", name1, name2);

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
          name1,
          setName1,
          name2,
          setName2,
        ]}
      />
    </>
  );
}
