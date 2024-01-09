import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { profileDelete, signOut } from "../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const Profile = () => {
  const { currentUser, tasks } = useSelector(
    (state) => state.user
  );
  const [userName , setUserName] = useState("")
  const [email , setEmail] = useState("")


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {


    try {

      axios
      .post(`/api/user/logout`)
      .then(() => console.log("User have been logout"))
      .catch((err) => console.log(err));
       dispatch(signOut());
       navigate("/");
      
    } catch (error) {
      console.log(error)
    }

  };

  const handleDelete = () => {
    try {
      axios
        .delete(`/api/user`)
        .then(() => console.log("user account deleted"))
        .catch((err) => console.log(err));
         dispatch(profileDelete());
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="profileContainer container">
      <div className="userInfoContainer">
        <FontAwesomeIcon icon={faUserCircle} className="userIcon" />

        <div className="userContainer">
          <div className="userInfo">
          <label>Username</label>
          <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} value={currentUser.username} placeholder={currentUser.username} />
          </div>
          <div className="userInfo">
          <label>Email Address</label>
          <input className="form-control" type='email' onChange={(e) => setUserName(e.target.value)} value={currentUser.email} placeholder={currentUser.email}  />
          </div>

        </div>
      
      </div>


      <div className="profileBtnContainer">
      <button className="deleteAccountBtn" onClick={handleDelete}>Delete Account</button>
      <button className="logoutBtn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profileBottom">
      <p>Back to</p><Link className="homeBtn" to='/dashboard'>Home</Link>

      </div>
    
    </div>
  );
};

export default Profile;
