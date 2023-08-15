import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import './App.css';
import Root from "./root";
import Loginapp from "./loginapp";
import Createuserapp from "./createuser";
import Home from "./home";
import Component from "./test";
import { NavBar } from "./navbar";

function Apps() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<Loginapp/>}/>
      <Route path="/register" element={<Createuserapp/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/component" element={<Component/>}/>
    </Route> 
    
     ))

  return (
    
      <RouterProvider router={router}/>


  );
}

export default Apps;
