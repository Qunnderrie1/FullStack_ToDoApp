import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;

  
  },[])

  const { isError } = useSelector((state) => state.user);

  const handleLogin = () => {
    // User must input in email and password
    if (!email && !password) {
      console.log("Please enter in a value");
    } else {
      // User login information will be excuted with the code below
      try {
        axios
         .post('/api/user/login', { email, password })
          .then((res) => {
            if (res.data) {
              dispatch(signInSuccess(res.data));
              navigate("/dashboard");
            }
          })
          .catch(() => {
            dispatch(signInFailure(true));
          });
      } catch (error) {
        throw new Error(error);
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="loginContainer container">
      <div className="logoContainer">
        <FontAwesomeIcon icon={faSignIn} />
        <h1>Login</h1>
      </div>

      <p>Login to get started creating tasks</p>
      {isError ? (
        <p className="errorText">Email or Password is invaild</p>
      ) : (
        <p></p>
      )}
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="username"
          className="form-control"
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form-control"
          placeholder="password"
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <div className="loginBottomContainer">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
