import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const SignUp = () => {
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAuthChange = ({ currentTarget: input }) => {
    setAuthData({
      ...authData,
      [input.name]: input.value,
    });
    console.log(input.value);
  };

  // hitting register api
  const handleSignUp = (e) => {
    e.preventDefault();
    const URL = "/user/register";
    axios
      .post(URL, authData)
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="drop">
          <div className="content">
            <h2 className="animate__heartBeat">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  value={authData.email}
                  placeholder="Email"
                  onChange={handleAuthChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  value={authData.username}
                  placeholder="Username"
                  onChange={handleAuthChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  value={authData.password}
                  placeholder="Password"
                  onChange={handleAuthChange}
                />
              </div>
              <div className="input-box">
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
        </div>
        <a href="/login" className="btn">
          Log In
        </a>
        {/* <a href="#" class='btn signup'>Signup</a> */}
      </div>
    </div>
  );
};

export default SignUp;
