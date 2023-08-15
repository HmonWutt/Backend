import { useState, createContext, useEffect } from "react";
import AdminPanel from "./admin_panel";
import Summary from "./summary";
import url from "./url";
import Getrequest from "./getrequest";
import { useLoaderData } from "react-router-dom";

const ListContext = createContext();
const username = "default";
const identifier = "default tracker";
const newurl = `${url}/addidentifier/${username}`;
const newurl2 = `${url}/todo/${identifier.replace(/\s+/g, "-").toLowerCase()}`;
console.log("newurl2", newurl2);

export function Component() {
   const [isHidden, setIsHidden] = useState(true);
  const list = useLoaderData()

  return (
    <ListContext.Provider value={{ list, isHidden, setIsHidden }}>
      <Summary list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
      <AdminPanel list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
      
    </ListContext.Provider>
  );
}

export const dataLoader = async()=>{
  let tmp_list = [];
  Getrequest(newurl2)
    .then((data) => {
      console.log(typeof data);
      console.log(data[0]);
      tmp_list.push(data);
      console.log("tmp",tmp_list)
     
      // Returning the updated tmp_list
    })
    return tmp_list; 
}
