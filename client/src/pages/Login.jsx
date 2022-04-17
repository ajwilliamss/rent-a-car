import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import Layout from "../components/Layout";
import "../styles/Login.scss";

const Login = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add input to formData state
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Login user
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  // Focus name input upon initial render
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Navigate home if successful
  useEffect(() => {
    if (isAuthenticated || user) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <Layout>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          required
          ref={emailRef}
          value={email}
          onChange={handleChange}
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password123"
          required
          value={password}
          onChange={handleChange}
        />

        {/* Button */}
        <button type="submit" className="login-btn">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </Layout>
  );
};

export default Login;
