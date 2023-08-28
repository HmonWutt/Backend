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

export const ListContext = createContext();

export function Component() {
  const [list, setList] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [id, setID] = useState("");
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
  console.log("id from component", id);

  //const list = useLoaderData();
  // const navigation = useNavigation();
  // if (navigation.state === "loading") {
  //   return <Spinner animation="grow" />;
  // }

  useEffect(() => {
    Getrequest(
      `${url}/todo/${identifier.replace(/\s+/g, "-").replace(/'+/g, "")}`
    ).then((data) => setList(data));
  }, [id]);

  return (
    <>
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
          id,
          setID,
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
          id={id}
          setID={setID}
        />
      </ListContext.Provider>
    </>
  );
}

// export async function dataLoader() {
//   return Getrequest(newurl2);
// }
