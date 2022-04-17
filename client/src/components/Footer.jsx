import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Footer.scss";

const Footer = () => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="column1">
          <Link to="/">
            <h1>Rent a Car</h1>
          </Link>
          <ul className="footer-address">
            <li>123-456-7890</li>
            <li>City name, country</li>
            <li>123 Street Address</li>
          </ul>
        </div>
        <div className="column2">
          <ul className="footer-nav-items">
            <li className="footer-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/bookings">Bookings</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/profile">Profile</Link>
            </li>
            {user && user.role === "admin" && (
              <li className="nav-item">
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="column3">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p>
          &copy; {new Date().getFullYear()} AJ Williams | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
