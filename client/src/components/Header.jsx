import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const dispatch = useDispatch();

  // Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Nav handleLogout={handleLogout} />
      <MobileNav handleLogout={handleLogout} />
    </header>
  );
};

export default Header;
