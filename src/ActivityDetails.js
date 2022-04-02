import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ActivityDetails = ({ activites, user, url }) => {
  const [activityRoutines, setActivityRoutines] = useState([]);
  const { activityId } = useParams();

  const activity = activites.find((activite) => activityId * 1 === activite.id); // string value that is a number ("20") * 1 to convert to number(20)

  const fetchActivitiesRoutines = async (event) => {
    const response = await fetch(`${url}/activities/${activityId}/routines`, {
      headers: {
        "Content-Type": "applicaton/json",
      },
    });
    // console.log(response);
    const data = await response.json();
    setActivityRoutines(data);
  };
  console.log(activityRoutines);
  useEffect(async () => {
    await fetchActivitiesRoutines();
  }, []);

  return (
    <div className="activity-details">
      {activity ? (
        <>
          <h2>{activity.name}</h2>
          <h3>{activity.description}</h3>

          {activityRoutines
            ? activityRoutines.map((activityRoutine, idx) => {
                return (
                  <div key={idx}>
                    <h3>{activityRoutine.name}</h3>;
                  </div>
                );
              })
            : null}
        </>
      ) : null}
    </div>
  );
};

export default ActivityDetails;
