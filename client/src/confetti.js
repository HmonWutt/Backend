import Confetti from "react-confetti";
//import tweenFunctions from "./tweenfunction";
//var tweenFunctions = require("tween-functions");
const Confettitrigger = () => {
  //const { width, height } = useWindowSize();

  let width = window.innreWidth;
  let height = window.innerHeight;
  
   // => 4

  return <Confetti width={width} height={"5000px"} tweenDuration={5000}/>;
};
export default Confettitrigger;
