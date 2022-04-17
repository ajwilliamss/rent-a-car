import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import EditCar from "./pages/EditCar";
import NotFound from "./pages/NotFound";
import "./styles/App.scss";

function App() {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/bookings" element={user ? <Bookings /> : <Login />} />
          <Route
            path="/booking/:carId"
            element={user ? <Booking /> : <Login />}
          />
          {user && user.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/edit/:carId" element={user ? <EditCar /> : <Login />} />
          <Route
            path="/profile/:userId"
            element={user ? <Profile /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
