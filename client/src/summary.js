import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { motion, variants } from "framer-motion";
import BARChart from "./barcharts";

function Summary({ list, isHidden, setIsHidden }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: 500,
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const handleclick = (e) => {
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    const cards = document.getElementsByClassName("card");
    const cardArray = Array.from(cards);

    document.getElementById("cards").onmousemove = (e) => {
      for (const card of cardArray) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  });

  return (
    list && (
      <>
        <motion.div
          variants={variants}
          initial={false}
          animate={isHidden ? "hidden" : "visible"}
          id="summary"
          style={{
            backgroundColor: isHidden ? "rgb(250, 148, 148)" : "rgb(12,12,8)",
          }}
        >
          <div
            id="cards" /*style={{ visibility: isHidden ? "hidden" : "visible" }}*/
          >
            <div
              className="close"
              style={{ visibility: isHidden ? "hidden" : "visible" }}
              onClick={handleclick}
            ></div>
            {list.map((task, taskIndex) => (
              <div key={taskIndex} className="card">
                <div className="card-body p-3 small">
                  <small className="card-text ">
                    {task.description.charAt(0).toUpperCase() +
                      task.description.slice(1).replace(/-/g, " ")}
                  </small>
                  <BARChart
                    description={task.description}
                    count1={task.name1_count}
                    count2={task.name2_count}
                    name1={task.name1}
                    name2={task.name2}
                  >
                    {task.name1_count}
                    {task.name2_count}
                  </BARChart>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </>
    )
  );
}

export default Summary;
