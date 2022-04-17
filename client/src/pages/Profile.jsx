import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../redux/actions/userActions";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Profile = () => {
  // Access state in redux store
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading } = useSelector((state) => state.alertReducer);

  // Destructure user object
  const { _id, name, email, token } = user;

  // Input refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPwdRef = useRef(null);

  // Password state
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);
  const [confirmIsFocused, setConfirmIsFocused] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(updateUser(token, userData, _id));
  };

  useEffect(() => {
    // Focus name input upon initial render
    nameRef.current.focus();
  }, []);

  // Test password
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(pwd));
    // Compare passwords
    setIsMatch(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <form className="profile" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            defaultValue={name}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            defaultValue={email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            value={pwd}
            required
            onFocus={() => setPwdIsFocused(true)}
            onBlur={() => setPwdIsFocused(false)}
            onChange={(e) => setPwd(e.target.value)}
          />
          {!validPassword && pwdIsFocused && (
            <p>
              Password must be 8 to 24 characters, include uppercase and
              lowercase letters, a number, and a special character. Special
              characters that are permitted: ! @ # $ %
            </p>
          )}
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            ref={confirmPwdRef}
            value={confirmPwd}
            required
            onFocus={() => setConfirmIsFocused(true)}
            onBlur={() => setConfirmIsFocused(false)}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          {!isMatch && confirmIsFocused && (
            <p>Confirm password must match the password</p>
          )}
          <button
            type="submit"
            className="profile-btn"
            disabled={!validPassword || !isMatch ? true : false}
          >
            Update
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => dispatch(deleteUser(token, _id, navigate))}
          >
            Delete Account
          </button>
        </form>
      )}
    </Layout>
  );
};

export default Profile;
