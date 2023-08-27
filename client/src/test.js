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
    name1,
    setName1,
    name2,
    setName2,
  ] = useOutletContext();
  const newurl = `${url}/addidentifier/${username}`;

  // const [isAuth, setIsAuth, identifier, setIdentifier] = useOutletContext();

  console.log(identifier, "identifier from component");
  console.log("name1,name2 from component", name1, name2);
  //const list = useLoaderData();
  // const navigation = useNavigation();
  // if (navigation.state === "loading") {
  //   return <Spinner animation="grow" />;
  // }

  useEffect(() => {
    // Getrequest(
    //   `${url}/todo/${identifier.replace(/\s+/g, "-").replace(/'+/g, "")}`,
    //   token
    // ).then((data) => setList(data));
  }, []);
  return (
    <>
      {identifier && (
        <ListContext.Provider
          value={{
            list,
            setList,
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
          }}
        >
          <Summary list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
          <AdminPanel
            username={username}
            list={list}
            setList={setList}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            identifier={identifier}
            name1={name1}
            name2={name2}
          />
        </ListContext.Provider>
      )}
    </>
  );
}

// export async function dataLoader() {
//   return Getrequest(newurl2);
// }
