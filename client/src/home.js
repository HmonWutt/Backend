import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
const Home = () => {

  const [descriptions, setDescriptions] = useState([]);
  

  const Gettodo = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/descriptions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();
      setDescriptions(data);
      descriptions && console.log(descriptions)

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
      {descriptions.map((description, index) => (
        <Button
          onClick={()=>console.log(description.todo_id)}
          className="mt-2 me-2"
          key={index}
          variant="primary"
        >
          {description.description}{" "}
        </Button>
      ))}
    </div>
  </>
);
}

export default Home;