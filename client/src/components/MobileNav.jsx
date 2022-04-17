import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import "../styles/MobileNav.scss";

const MobileNav = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);

  const icon = (
    <BiMenu
      size="2rem"
      className="mobile-icon"
      onClick={() => setOpen((prevState) => !prevState)}
    />
  );

  const closeIcon = (
    <MdClose
      size="2rem"
      className="mobile-icon"
      onClick={() => setOpen((prevState) => !prevState)}
    />
  );

  return (
    <div className="mobile-nav">
      <div className="mobile-logo">
        <h1>
          <Link to="/">Rent a Car</Link>
        </h1>
      </div>
      {open ? closeIcon : icon}
      {open && (
        <ul className="mobile-nav-items" onClick={() => setOpen(false)}>
          <li className="mobile-nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="mobile-nav-item">
            {user ? (
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          {user && user.role === "admin" && (
            <li className="mobile-nav-item">
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MobileNav;
