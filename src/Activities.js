import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Activities = ({ routines, user, activities }) => {
  return (
    <>
      <div className="activitiesHeader">
        <h2>Activities</h2>
      </div>
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
                  <Link to={`/Activities/${activitie.id}/routines`}>
                    <h1>{activitie.name}:</h1>
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
