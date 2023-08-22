import { useState, useEffect, createContext } from "react";
import AdminPanel from "./admin_panel";
import Summary from "./summary";
import url from "./url";
import Getrequest from "./getrequest";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
  Outlet,
} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import Postrequest from "./postrequest";

//const username = "default";
//const identifier = "default-tracker";

//const newurl2 = `${url}/todo/${identifier.replace(/\s+/g, "-").toLowerCase()}`;
//console.log("newurl2", newurl2);

const ListContext = createContext();

export function Component() {
  const [list, setList] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    token,
    setToken,
  ] = useOutletContext();
  const newurl = `${url}/addidentifier/${username}`;

  // const [isAuth, setIsAuth, identifier, setIdentifier] = useOutletContext();

  console.log(identifier, "identifier from component");
  console.log("token from component", token);
  //const list = useLoaderData();
  // const navigation = useNavigation();
  // if (navigation.state === "loading") {
  //   return <Spinner animation="grow" />;
  // }

  useEffect(() => {
    Getrequest(
      `${url}/todo/${identifier.replace(/\s+/g, "-").replace(/'+/g, "")}`,
      token
    ).then((data) => setList(data));
  }, []);
  return (
    <>
      {identifier && (
        <ListContext.Provider
          value={{
            list,
            username,
            setUsername,
            isAuth,
            setIsAuth,
            identifier,
            setIdentifier,
            token,
            setToken,
          }}
        >
          <Summary list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
          <AdminPanel
            list={list}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            identifier={identifier}
          />
        </ListContext.Provider>
      )}
    </>
  );
}

// export async function dataLoader() {
//   return Getrequest(newurl2);
// }
