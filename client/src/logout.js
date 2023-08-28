import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import url from "./url";

function Logoutapp() {
  const location = useLocation();
  const nav = useNavigate();
  async function logout() {
    try {
      const result = await fetch(`${url}/users/logout`, {
        method: "GET",
        credentials: "include",
      });
      const response = await result.json();

      if (response?.message === "success") {
        nav("/");
      } else {
        if (location.state?.from) {
          //console.log("location", location)
          const to = location.state.from.pathname || "/component";
          console.log("to", to);
          nav(`${to}`);
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  useEffect(() => {
    logout();
  }, []);

  //return logoutSuccess ? <Navigate to="/" /> : <div>Log out failed</div>;
}

export default Logoutapp;
