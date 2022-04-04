import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "./App";

const Register = ({
  token,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  confirm,
  setConfirm,
  error,
  setError,
}) => {
  const history = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (password !== confirm) {
        setError("Passwords don't match");
        return;
      }

      const response = await fetch(`${url}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        return setError(data.error.message);
      }
      setToken(data.token);
      localStorage.setItem("token", data.token);
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <div className="register">
        <form onSubmit={handleRegister}>
          <input
            required
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            required
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button className="glows-on-hover">Submit Register</button>
        </form>
      </div>
      <p>{error}</p>
      <div className="login-shortcut">
        <p>
          Already have an account?
          <Link to="/Login"> Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
