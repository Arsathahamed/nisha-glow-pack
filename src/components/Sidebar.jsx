import { Link } from "react-router-dom";
import logo from "../assets/nisha_logo.png";
import {
  FaHome,
  FaPlusCircle,
  FaBox
} from "react-icons/fa";

function Sidebar() {

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1f2937",
        color: "#fff",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
      }}
    >
     <div className="text-center mb-4">
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
        >
          <FaHome /> Dashboard
        </Link>

        <Link
          to="/add-order"
          className="text-white text-decoration-none"
        >
          <FaPlusCircle /> Add Order
        </Link>

        <Link
          to="/orders"
          className="text-white text-decoration-none"
        >
          <FaBox /> Orders
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;