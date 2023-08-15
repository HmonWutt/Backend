import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function Summary({ list , isHidden, setIsHidden}) {
  console.log("summary runs");


  // list.forEach((element) => {
  //   element.map((task, index) => console.log(task));
  // });
  const handleclick = (e) => {
    //document.getElementById("summary").classList.add("hidden")
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    console.log("summary use effect runs");
    const cards = document.getElementsByClassName("card");
    const cardArray = Array.from(cards);
    console.log("cards", cards);
    console.log("cardarry", cardArray);

    document.getElementById("cards").onmousemove = (e) => {
      for (const card of cardArray) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        console.log(x, y);
      }
    };
  });

  //
  return (
    <>
      <div
        id="summary"
        class=""
        style={{
          backgroundColor: isHidden ? "rgb(250, 148, 148)" : "rgb(30, 30, 30)",
        }}
      >
        <Button onClick={handleclick}>
          {isHidden ? "Show summary" : "Close"}
        </Button>
        <div
          id="cards"
          className=""
          style={{ visibility: isHidden ? "hidden" : "visible" }}
        >
          {list.map((element, elementIndex) =>
            element.map((task, taskIndex) => (
              <div key={taskIndex} className="card">
                <div className="card-content">
                  {task.description}
                  {task.hmon_count}
                  {task.joakim_count}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Summary;
