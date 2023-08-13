import Button from "react-bootstrap/Button"
const Summary = ({list})=>{
console.log("list",list)
list.forEach(element => {element.map((task, index)=>console.log(task))
    
})
return (
  <>
    <Button>Summary</Button>
    <div id="summary-container">
      {list.map((element, elementIndex) =>
        element.map((task, taskIndex) => (
          <div key={taskIndex} className="task-item">
            <div className="description">{task.description}</div>
            <div className="count-1">{task.hmon_count}</div>
            <div className="count-2">{task.joakim_count}</div>
          </div>
        ))
      )}
    </div>
  </>
);
}

export default Summary;