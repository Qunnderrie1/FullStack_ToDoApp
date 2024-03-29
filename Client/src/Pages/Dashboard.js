import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import UserItems from "../Component/UserItems.js";
import { getUserTasks } from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const [userTask, setUserTask] = useState("");
  const [isDisable , setIsDisable] = useState(false);





  const { tasks } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  useEffect(() => {


    // Get tasks
    
    axios
      .get(`/api/task`)
      .then((res) => dispatch(getUserTasks(res.data)))
      .catch((err) => console.log(err));



    // Once user reaches 5 tasks the button become disable
    if(tasks.length == 5){
        setIsDisable(true)
    }else{
        setIsDisable(false)
    }




  },[isDisable]);

  const handleAddTask = () => {

    if (userTask) {
      axios.post(`/api/task`, { userTask })
        .then(() => console.log("added task"))
        .catch((err) => console.log(err));
      setUserTask("");
    } else{
        console.log("Please type in a value")
    }

    axios
    .get(`/api/task`)
    .then((res) => dispatch(getUserTasks(res.data)))
    .catch((err) => console.log(err));



  };

  const handleDelete = (id) => {


    axios.delete(`/api/task/${id}`)
      .then(() => console.log("Task removed"))
      .catch((err) => console.log(err));
      
      axios
      .get(`/api/task`)
      .then((res) => dispatch(getUserTasks(res.data)))
      .catch((err) => console.log(err));
  



  };


  return (
    <div className="mainDashboard container">
      <h3>Welcome!</h3>
    <h3 className="headerText"><span>{currentUser.username.toUpperCase()}</span></h3>

      <div className="dashBoardContainer">
        <div className="taskContainer container">
        <UserItems />

          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setUserTask(e.target.value)}
              value={userTask}
              className="form-control"
              minLength="0"
              maxLength="40"
              placeholder="What's on the agenda for today?"
            />
            <button disabled={isDisable} className="addTaskBtn" onClick={handleAddTask}>
              Add
            </button>
          </form>
        </div>
        <div className="userTasksContainer">
          {tasks.length > 0 ? (
            tasks.map((item, i) => {
              return (
                <div key={i} className="task-item container">
                  <p>{item.task}</p>
                  <div className="taskButtonContainer">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="removeBtn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", margin: "20px 0px", fontStyle:"italic", color: "white" }}>No Tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
