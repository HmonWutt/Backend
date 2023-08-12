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
            {/*  <li>
          }   <Link
                id="login-link"
                onClick={handleclick}
                className="link"
                to={`login`}
              >
                Log in
  </Link> 
            </li>*/}
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
