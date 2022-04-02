import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Activities = ({ routines, user, activities, url }) => {
  const fetchActivitiesRoutines = async (event) => {
    const response = await fetch(
      `${url}/activities/${singleRoutine.id}/routines`,
      {
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    );
    // console.log(response);
    const data = await response.json();
    console.log(data);
  };

  useEffect(async () => {
    await fetchActivitiesRoutines();
  }, [user]);

  return (
    <>
      <h2>Activities</h2>

      <div>
        {user ? (
          <Link to="/MyActivities">Create new activity</Link>
        ) : (
          "Login to create activities"
        )}
      </div>
      <div>
        {activities
          ? activities.map((activitie) => {
              return (
                <div className="activitiesCard" key={activitie.id}>
                  {/* <h1>hi {user.name}</h1> */}

                  <Link to={`/Activities/${activitie.id}`}>
                    <h2>{activitie.name}:</h2>
                    <h3>Description: {activitie.description}</h3>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Activities;
