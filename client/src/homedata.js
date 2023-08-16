import { useState, useEffect, createContext } from "react";
import {
  Outlet,
  useOutletContext,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Taskselector from "./taskselector";
import "./index.css";
import url from "./url";
import Getrequest from "./getrequest";
import Home from "./home";

export const DescriptionsContext = createContext("default");

export const Homedata = () => {
  //const [isAuth, setIsAuth] = useOutletContext();

  const descriptions = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Spinner animation="grow" />;
  }

  return (
    <DescriptionsContext.Provider value={{ descriptions }}>
      <Home descriptions={descriptions} />
    </DescriptionsContext.Provider>
  );
};

export const descriptionLoader = async () => {
  return Getrequest(`${url}/todo/descriptionlist/descriptions`);
};
