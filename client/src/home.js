import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Taskselector from "./taskselector";
import "./index.css";
import url from "./url";
const Home = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [taskid, setTaskid] = useState("");
  const [taskshow, settaskshow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const Gettodo = async () => {
    try {
      const response = await fetch(`${url}/todo/descriptionlist/descriptions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();
      if (data.message !== "success") setIsLoggedIn(false);
      else {
        setDescriptions(data);
        descriptions && console.log(descriptions);
      }

      setDescriptions(data);
      descriptions && console.log(descriptions);

      // const entries = document.querySelectorAll("#card");
      //   console.log(entries);
      //   entries && entries.forEach((element) => observer.observe(element));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    Gettodo();
  }, []);
  return (
    <>
      <div className="gap-2">
        {isLoggedIn ? (
          descriptions.map((description, index) => (
            <Button
              onClick={() => {
                console.log(description.todo_id);
                setTaskid(description.todo_id);
                settaskshow(true);
              }}
              className="mt-2 me-2"
              key={index}
              variant="warning"
            >
              {description.description}{" "}
            </Button>
          ))
        ) : (
          <div>
            Please <NavLink to="/login">log in</NavLink> to access this page.
          </div>
        )}
      </div>
      {taskshow && <Taskselector taskid={taskid} />}
    </>
  );
};

export default Home;
