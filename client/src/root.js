import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { NavBar } from "./navbar";

export const Context = createContext("");
export default function Root() {
  const [username, setUsername] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  console.log(
    "name1,name2, username, isAuth, identifier, from root",
    name1,
    name2,
    username,
    isAuth,
    identifier
  );

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
          name1,
          setName1,
          name2,
          setName2,
        ]}
      />
    </>
  );
}
