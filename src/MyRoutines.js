import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UpdateRoutine from "./UpdateRoutine";

const MyRoutines = ({ token, routines, user, myRoutine, fecthmyRoutine }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleDelete = (e) => {
    console.log("DELETEDs");
    fetch("http://fitnesstrac-kr.herokuapp.com/api/routines/6", {
      method: "PATCH",
      body: JSON.stringify({
        name: "Long Cardio Day",
        goal: "To get your heart pumping!",
      }),
    });
  };

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: true,
        }),
      }
    );
    const info = await resp.json();
    await fecthmyRoutine();
    console.log(info);
  };

  return (
    <>
      <div className="myRoutinesForm">
        Create Routine Form
        <form onSubmit={handleCreateRoutine}>
          <input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Enter goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <button type="submit">Submit Routine</button>
        </form>
      </div>
      <div className="myRountinesHeader">My Routines</div>
      <div>
        {myRoutine.map((routine, idx) => {
          return (
            <div className="myRoutinesCard" key={idx}>
              <Link to={`/UpdateRoutine/${routine.id}`} className="link">
                {routine.name}
              </Link>
              <h4>Goal: {routine.goal}</h4>
              <h4>Creator: {routine.creatorName}</h4>
              {routine.activities.map((activity, idx) => {
                return (
                  <div key={idx}>
                    <h3>Activity: {activity.name}</h3>
                    <h4>Duration: {activity.duration}</h4>
                    <h4>Count: {activity.count}</h4>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyRoutines;
