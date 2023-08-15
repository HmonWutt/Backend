import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <div id="sidebar">
      
      <nav>
        <ul id="navbaritems">
          <li>
            <NavLink
              id="register-link"
              to="/register"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Create account
            </NavLink>
          </li>
          <li>
            <NavLink
              id="home-link"
              to="/home"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Demo
            </NavLink>
          </li>

          <li>
            <NavLink
              id="component-link"
              to="/component"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Test component
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
