import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nisha_logo.png";
import {
  FaHome,
  FaPlusCircle,
  FaBox
} from "react-icons/fa";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => {
  if (window.innerWidth <= 768) {
    setShowMenu(false);
  }
};
return (
  <>
    <button
      className="btn btn-dark d-md-none m-2"
      onClick={() => setShowMenu(!showMenu)}
    >
      ☰ Menu
    </button>

    <div
      className={`sidebar ${showMenu ? "show" : ""}`}
    >
     <div className="mb-4">
  <img
    src={logo}
    alt="Nisha's"
    style={{
      width: "120px",
      height: "auto",
      borderRadius: "10px"
    }}
  />

  <h5
    style={{
      color: "#fff",
      marginTop: "10px",
      fontWeight: "600"
    }}
  >
  </h5>
</div>

      <hr />

      <div className="d-flex flex-column gap-3">

<Link
  to="/"
  className="text-white text-decoration-none"
  onClick={closeMenu}
>
  <FaHome /> Dashboard
</Link>

<Link
  to="/add-order"
  className="text-white text-decoration-none"
  onClick={closeMenu}
>
  <FaPlusCircle /> Add Order
</Link>

<Link
  to="/orders"
  className="text-white text-decoration-none"
  onClick={closeMenu}
>
  <FaBox /> Orders
</Link>
            <button
            className="btn btn-danger w-100 mt-5"
            onClick={() => {
                localStorage.removeItem("loggedIn");
                window.location.reload();
            }}
            >
            Logout
            </button>
      </div>
    </div>
  </>
);
}

export default Sidebar;