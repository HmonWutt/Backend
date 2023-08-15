import { useState, createContext, useEffect } from "react";
import AdminPanel from "./admin_panel";
import Summary from "./summary";
import url from "./url";
import Getrequest from "./getrequest";

const ListContext = createContext();
const username = "default";
const identifier = "default tracker";
const newurl = `${url}/addidentifier/${username}`;
const newurl2 = `${url}/todo/${identifier.replace(/\s+/g, "-").toLowerCase()}`;
console.log("newurl2", newurl2);

function Component() {
  const [list, setList] = useState([]);
   const [isHidden, setIsHidden] = useState(true);
  async function getsummary(url) {
    let tmp_list = [];
    Getrequest(url)
      .then((data) => {
        console.log(typeof data);
        console.log(data[0]);
        tmp_list.push(data);
        return tmp_list; // Returning the updated tmp_list
      })
      .then((updatedList) => {
        setList(updatedList); // Update the state with the updated list
        console.log(updatedList); // Logging the updated list
      });
  }
  useEffect(() => {
    console.log("url in getsummary ", newurl2);
    getsummary(newurl2);
    // console.log("list from getsummary", list);
  }, []);
  return (
    <ListContext.Provider value={{ list, isHidden, setIsHidden }}>
      <Summary list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
      <AdminPanel list={list} isHidden={isHidden} setIsHidden={setIsHidden} />
      
    </ListContext.Provider>
  );
}

export default Component;
