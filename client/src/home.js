import { useState } from "react";

import Button from "react-bootstrap/Button";

import Taskselector from "./taskselector";
import "./index.css";
import url from "./url";

function Home({ descriptions }) {
  //const descriptions = useLoaderData();
  console.log("home runs");
  const [taskid, setTaskid] = useState("");
  const [taskshow, setTaskshow] = useState(false);

  return (
    <>
      <section
        className="gap-2"
        /* style={{ visibility: isHidden ? "hidden" : "visible" }} */
      >
        {descriptions.map((description, index) => (
          <Button
            onClick={() => {
              console.log(description.todo_id);
              setTaskid(description.todo_id);
              setTaskshow(true);
            }}
            className="mt-2 me-2"
            key={index}
            variant="warning"
          >
            {description.description}{" "}
          </Button>
        ))}
      </section>
      {taskshow && <Taskselector taskid={taskid} />}
    </>
  );
}
export default Home;
