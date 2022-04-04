import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRoutine = ({ myRoutine, activities, token, fecthmyRoutine }) => {
  const params = useParams();
  const [routine, setRoutine] = useState({});
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setisPublic] = useState(true);
  const [activity, setActivity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);
  const history = useNavigate();
  const handleDelete = async (e) => {
    console.log("DELETEDs");
    await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${params.routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await fecthmyRoutine();
    history("/MyRoutines");
  };

  const handleAddActivity = async (e) => {
    await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${params.routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId: activity,
          duration: duration,
          count: count,
        }),
      }
    );
    await fecthmyRoutine();
  };

  const handleUpdateRoutine = async (e) => {
    e.preventDefault();

    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${params.routineId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
        }),
      }
    );

    await fecthmyRoutine();
  };

  useEffect(async () => {
    setRoutine(
      myRoutine.filter((theRoutine) => {
        return theRoutine.id === +params.routineId;
      })[0]
    );
  }, [myRoutine]);
  console.log(routine);
  return (
    <>
      <h1>Update routine</h1>
      <h2>{routine.name}</h2>
      <h3>{routine.goal}</h3>
      {routine.activities
        ? routine.activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h1>Activity: {activity.name}</h1>
                <h4>Duration: {activity.duration}</h4>
                <h4>Count: {activity.count}</h4>
              </div>
            );
          })
        : null}
      <form id="myForm" onSubmit={handleUpdateRoutine}>
        <input
          placeholder="Change name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Change goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <label>Is it public:</label>
        <select
          onChange={(e) => setisPublic(e.target.value)}
          defaultValue={isPublic}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type="submit">Submit Changes</button>
        <select
          onChange={(e) => setActivity(e.target.value)}
          defaultValue={activity}
        >
          {activities.map((activitiy, idx) => {
            return (
              <option key={idx} value={activitiy.id}>
                {activitiy.name}
              </option>
            );
          })}
          <option>Add Activity</option>
        </select>
        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <button type="button" onClick={handleAddActivity}>
          Add Activity
        </button>
        <button type="Button" onClick={handleDelete}>
          Delete Routine
        </button>
      </form>
    </>
  );
};

export default UpdateRoutine;
