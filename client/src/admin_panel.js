//name the personalised tracker
//add task/edit tasks
import { useState, useEffect, useRef, createContext, useContext } from "react";
import Button from "react-bootstrap/Button";
import { motion, variants, AnimatePresence } from "framer-motion";

import Postrequest from "./postrequest";
import Getrequest from "./getrequest";
import url from "./url";
import "./index.css";
import Summary from "./summary";
import Addtask from "./addtask";
import Changetaskname from "./changetaskname";
import { ListContext } from "./test";

export const AddtaskContext = createContext("");
export const EditDeleteContext = createContext("");

const AdminPanel = ({
  username,
  list,
  setList,
  isHidden,
  setIsHidden,
  identifier,
  name1,
  name2,
  id,
  setID,
}) => {
  const [addshow, setaddShow] = useState(false);
  const [changeshow, setchangeShow] = useState(false);
  const [isaddOpen, setaddIsOpen] = useState(false);
  const [showaddtask, setShowaddtask] = useState(false);
  const [isbuttonhidden, setIsbuttonhidden] = useState(false);

  const [ischangeOpen, setchangeIsOpen] = useState(false);

  const variants = {
    visible: {
      opacity: 0,
      y: -500,

      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hidden: {
      opacity: 1,

      y: 0,
      transition: {
        duration: 0.5,
        easeIn: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      delay: 0.5,
      y: -20,

      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const trackernamevariants = {
    enter: { opacity: 0, x: -100 },
    display: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeOut", duration: 2, staggerChildren: 0.5 },
    },
  };

  const handleclick = (e) => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <motion.div
        id="admin-panel"
        style={{ visibility: isHidden ? "visible" : "hidden" }}
        variants={variants}
        /* animate={isHidden ? "hidden" : "visible"} */
      >
        <motion.div
          id="tracker-name"
          variants={trackernamevariants}
          initial="enter"
          animate="display"
          transition={{
            ease: "easeOut",
            duration: 1.5,
            staggerChildren: 0.2,
          }}
        >
          {`Welcome to ${
            identifier.charAt(0).toUpperCase() + identifier.slice(1)
          }!`
            .split("")
            .map((char, index) => (
              <span key={index}>{char}</span>
            ))}
        </motion.div>

        <motion.nav initial={false} className="menu">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                setaddIsOpen(!isaddOpen);
                setaddShow(!addshow);
              }}
            >
              {" "}
              Add new chore
            </Button>
          </motion.div>

          <motion.div id="description-container">
            <AnimatePresence>
              {addshow && (
                <motion.div
                  variants={itemVariants}
                  initial="open"
                  animate={{ opacity: 1, y: 0 }}
                  exit="closed"
                  //className="btn btn-warning item"
                >
                  <AddtaskContext.Provider
                    value={{
                      identifier,
                      name1,
                      name2,
                      list,
                      setList,
                      id,
                      setID,
                    }}
                  >
                    <Addtask
                      identifier={identifier}
                      name1={name1}
                      name2={name2}
                      list={list}
                      setList={setList}
                      id={id}
                      setID={setID}
                    />
                  </AddtaskContext.Provider>
                </motion.div>
              )}{" "}
            </AnimatePresence>

            {/* {list.map((task, taskIndex) => (
              <AnimatePresence>
                {addshow && (
                  <motion.div
                    key={taskIndex}
                    variants={itemVariants}
                    initial="open"
                    animate={{ opacity: 1, y: 0 }}
                    exit="closed"
                    //className="btn btn-warning item"
                  >
                    {task.description}
                  </motion.div>
                )}{" "}
              </AnimatePresence>
            ))}{" "}*/}
          </motion.div>
        </motion.nav>

        <motion.nav
          initial={false}
          animate={ischangeOpen ? "open" : "closed"}
          className="menu"
        >
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => {
                setchangeIsOpen(!ischangeOpen);
                setchangeShow(!changeshow);
              }}
              className="btn btn-primary "
            >
              Edit existing chores
            </Button>
          </motion.div>

          <div id="editdelete-container">
            <AnimatePresence>
              {changeshow && (
                <motion.div
                  style={{ margin: "0.1rem" }}
                  variants={itemVariants}
                  initial="open"
                  animate={{ opacity: 1, y: 0 }}
                  exit="closed"
                >
                  <EditDeleteContext.Provider
                    value={{
                      list,
                      setList,
                      identifier,
                      id,
                      setID,
                    }}
                  >
                    <Changetaskname
                      list={list}
                      setList={setList}
                      identifier={identifier}
                      id={id}
                      setID={setID}
                    />
                  </EditDeleteContext.Provider>

                  {/*   <div>  <Button
                        key={taskIndex}
                        id={`btn-${taskIndex}`}
                        className="btn btn-warning item"
                        onClick={(e) => {
                          console.log(typeof e.target);
                          //setIsbuttonhidden(!isbuttonhidden);
                          console.log(
                            document.getElementById(`div-${taskIndex}`),
                            document.getElementById(`btn-${taskIndex}`)
                          );
                          document
                            .getElementById(`div-${taskIndex}`)
                            .classList.remove("hidden");
                          document
                            .getElementById(`btn-${taskIndex}`)
                            .classList.add("hidden");
                          document
                            .getElementById(`alt-${taskIndex}`)
                            .classList.remove("hidden");
                        }}
                      >
                        {task.description}
                      </Button>
                    </div>
                    <div id={`div-${taskIndex}`} className="div hidden">
                      <Button className="btn btn-warning" onClick={(e) => {}}>
                        Edit
                      </Button>
                      <Button
                        className="btn btn-warning"
                        onClick={(e) => {
                          console.log(
                            document.getElementsByClassName(taskIndex)
                          );
                        }}
                      >
                        Delete
                      </Button> </div> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
        <Button onClick={handleclick} className="btn btn-primary">
          {/* {isHidden ? "Show summary" : "Close"} */}
          Show summary
        </Button>
      </motion.div>
    </>
  );
};

export default AdminPanel;
