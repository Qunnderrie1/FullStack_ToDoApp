import axios from 'axios'
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { profileDelete } from '../features/userSlice';


const Profile = () => {

  const { currentUser, tasks } = useSelector((state) => state.user);


  const dispatch = useDispatch();


  return (

    <div className='profileContainer container'>

      <div>
        <p style={{ marginTop: "100px", fontSize: "20px", fontWeight: "600"}}>{currentUser.username}</p>
        <p style={{ margin: "20px 0px", fontSize: "18px", fontWeight: "600"}}>Tasks: {tasks.length}</p>
      </div>

      <button onClick={() => {

        try {

          axios.delete(`https://backend-todoapp-wexe.onrender.com/api/user`)
          .then(() => console.log("user account deleted"))
          .catch((err) => console.log(err))
          dispatch(profileDelete())
          
        } catch (error) {
          console.log(error)
        }


      }}>Delete Account</button>

    </div>
  )
}

export default Profile