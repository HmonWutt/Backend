import { useState, createContext } from "react";
import AdminPanel from "./admin_panel";
import Summary from "./summary";
import url from "./url";
import Getrequest from "./getrequest";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const username = "default";
const identifier = "default tracker";
const newurl = `${url}/addidentifier/${username}`;
const newurl2 = `${url}/todo/${identifier.replace(/\s+/g, "-").toLowerCase()}`;
console.log("newurl2", newurl2);

const ListContext = createContext();

export function Component() {
  const [isHidden, setIsHidden] = useState(true);

  const list = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Spinner animation="grow" />;
  }

  return (
    <ListContext.Provider value={{ list, isHidden, setIsHidden }}>
      <Summary list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
      <AdminPanel list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
    </ListContext.Provider>
  );
}

export async function dataLoader() {
  return Getrequest(newurl2);
}
