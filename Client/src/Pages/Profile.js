import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileDelete, signOut } from "../features/userSlice";

const Profile = () => {
  const { currentUser, tasks } = useSelector(
    (state) => state.user
  );

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
        <p style={{ marginTop: "100px", fontSize: "20px", fontWeight: "600" }}>
          {currentUser.username.toUpperCase()}
        </p>
        <p style={{ margin: "20px 0px", fontSize: "16px", fontWeight: "400" }}>
          Tasks: {tasks.length}
        </p>
      </div>

      <div className="profileBtnContainer">
      <button className="deleteAccountBtn" onClick={handleDelete}>Delete Account</button>
      <button className="logoutBtn" onClick={handleLogout}>Logout</button>

      </div>
    
    </div>
  );
};

export default Profile;
