import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Routines = ({ token, user, routines }) => {
  return (
    <>
      <h2>Routines</h2>

      {user ? (
        <Link to="/MyRoutines">See My Routines</Link>
      ) : (
        "Login to see my routines"
      )}

      {routines.map((routine) => {
        if (routine.isPublic) {
          return (
            <div className="routinesCard" key={routine.id}>
              <div className="routine">
                <h2>{routine.name}:</h2>
                <h4>Goal: {routine.goal}</h4>
                <h5>Creator: {routine.creatorName}</h5>
              </div>
              <div className="activity">
                {routine.activities.map((activity) => {
                  return (
                    <>
                      <h4>Activity: {activity.name}</h4>
                      <h5>
                        {" "}
                        Duration: {activity.duration} Count: {activity.count}
                      </h5>
                      <br />
                    </>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Routines;
