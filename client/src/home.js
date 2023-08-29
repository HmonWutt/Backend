import { useState } from "react";

import Button from "react-bootstrap/Button";

import Taskselector from "./taskselector";
import "./index.css";
import url from "./url";

function Home({ descriptions, identifier }) {
  //const descriptions = useLoaderData();

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
              setTaskid(description.todo_id);
              setTaskshow(true);
            }}
            className="mt-2 me-2"
            key={index}
            variant="warning"
          >
            {description.description.charAt(0).toUpperCase() +
              description.description.slice(1).replace(/-/g, " ")}{" "}
          </Button>
        ))}
      </section>
      {taskshow && <Taskselector taskid={taskid} identifier={identifier} />}
    </>
  );
}
export default Home;
