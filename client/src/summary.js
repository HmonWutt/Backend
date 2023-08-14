import { useEffect } from "react";
import Button from "react-bootstrap/Button";

function Summary({list}) {
  console.log("list", list);

  list.forEach((element) => {
    element.map((task, index) => console.log(task));
  });

  useEffect(() => {
    console.log("summary use effect runs");
    const cards = document.getElementsByClassName("card");
    const cardArray = Array.from(cards);
    console.log("cards", cards);
    console.log("cardarry", cardArray);
    console.log(document.getElementById("cards"));
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
      <Button>Summary</Button>
      <div id="cards">
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
    </>
  );
}

export default Summary;
