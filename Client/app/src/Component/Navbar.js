import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { signOut } from "../features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    
    try {
      axios
        .post(`/api/user/logout`)
        .then(() => console.log("User have been logout"))
        .catch((err) => console.log(err));
      dispatch(signOut());
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navMain container">
      {currentUser ? (
        <nav className={currentUser ? "nav container" : "nav active"}>
          <div className="navContainer">
    
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <div className="logoutContainer">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
