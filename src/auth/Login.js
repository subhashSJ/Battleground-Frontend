import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";
import { authenticate, getUser, isAuthenticated, logIn } from "./helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user } = isAuthenticated();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const user = await getUser();
      if (user) {
        authenticate({ user: user.data }, () => {
          setFormData({
            ...formData,
            didRedirect: true,
          });
        });
      }
    } catch (error) { }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userToken = await logIn(email, password);

      if (userToken && userToken.data && userToken.data.token !== "") {
        localStorage.setItem("token", userToken.data.token);
        loadUser();
      }
      if (userToken && userToken.msg !== "") {
        toast.error(userToken.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <section className="myContainer">
        <h1 className="myLarge text-auth">Sign In</h1>
        <p className="myLead">
          <i className="fas fa-user"></i> Sign into your account
        </p>
        <form className="myForm" onSubmit={(e) => onSubmit(e)}>
          <div className="myForm-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="myForm-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <input
            type="submit"
            className="btn card-bg-button text-white"
            value="Sign In"
          />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
