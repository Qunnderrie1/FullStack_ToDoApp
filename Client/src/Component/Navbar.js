import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { signOut } from "../features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {



  const { currentUser } = useSelector((state) => state.user);


  return (
    <div className="navMain container-fluid">
      {currentUser ? (
        <nav className={currentUser ? "nav container" : "nav active"}>
          <div className="navContainer">
            <Link to='/profile' style={{ background: "none", color: "white", fontSize: "24px"}}>
              Profile
            </Link>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
