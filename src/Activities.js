import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Activities = ({ routines, user, activities }) => {
  return (
    <>
      <h2>Activities</h2>

      {user ? (
        <Link to="/MyActivities">Create new activity</Link>
      ) : (
        "Login to create activities"
      )}

      {activities
        ? activities.map((activitie) => {
            return (
              <div className="activitiesCard" key={activitie.id}>
                {/* <h1>hi {user.name}</h1> */}

                <Link to={`/Activities/${activitie.id}/routines`}>
                  <h4 span id="activitie">
                    {activitie.name}:
                  </h4>
                  <h5 span id="description">
                    Description: {activitie.description}
                  </h5>
                </Link>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Activities;
