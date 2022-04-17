import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Nav.scss";

const Nav = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <nav className="nav">
      <div className="logo">
        <h1>
          <Link to="/">Rent a Car</Link>
        </h1>
      </div>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/bookings">Bookings</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          {user ? (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        {user && user.role === "admin" && (
          <li className="nav-item">
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
