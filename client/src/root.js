import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
  //   const links = document.querySelectorAll(".link");

  //   console.log(links);
  //   const handleclick = (e) => {
  //     const target = e.target.getAttribute("id");
  //     for (const link of links) {
  //       link.style.color = "rgb(139, 0, 139)";
  //       if (link.getAttribute("id") !== target) {
  //         link.style.color = "blue";
  //       }
  //     }
  //   };
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

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
                Demo
              </NavLink>
            </li>
            <li>
              <NavLink
                id="create-link"
                to="/createaccount"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Create account
              </NavLink>
            </li>
            <li>
              <NavLink
                id="admin-link"
                to="/adminpanel"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Admin panel
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

      {/* other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
