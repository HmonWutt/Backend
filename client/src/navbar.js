import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <div id="sidebar">
      <nav>
        <ul id="navbaritems">
          <li>
            <NavLink
              id="home-link"
              to="/home"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Scores
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
          <li>
            <NavLink
              id="logout-link"
              to="/logout"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Log out
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
