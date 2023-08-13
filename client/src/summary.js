import Button from "react-bootstrap/Button"
const Summary = ({list})=>{
console.log("list",list)
list.forEach(element => {element.map((task, index)=>console.log(task))
    
})
return (
  <>
    <Button>Summary</Button>
    <div id="cards">
      {list.map((element, elementIndex) =>
        element.map((task, taskIndex) => (
          <div key={taskIndex} className="card">
            <div className="card-content">{task.description}</div>
            <div className="card-content">{task.hmon_count}</div>
            <div className="card-content">{task.joakim_count}</div>
          </div>
        ))
      )}
    </div>
  </>
);
}

export default Summary;