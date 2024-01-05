import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserItems = () => {
  const { tasks } = useSelector((state) => state.user);

  return (
    <div className="userItemsContainer container">
      <div>
        {
          tasks.length == 5 ? <p style={{ color : "red", fontSize: "14px", textAlign: "center"}}>You have reached your limit!</p> :<p>Task: {tasks.length} / 5</p>
        }

      </div>
    </div>
  );
};

export default UserItems;
