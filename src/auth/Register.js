import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./helper";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
    didRedirect: false,
    error: "",
    success: false,
  });

  const { userName, email, password, password2, error, success } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password did not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setFormData({ ...formData, error: false });
      try {
        const userToken = await register(userName, email, password);

        if (userToken && userToken.data && userToken.data.token !== "") {
          localStorage.setItem("token", userToken.data.token);
          setFormData({
            ...formData,
            userName: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            success: true,
          });
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
        setFormData({ ...formData, error: error, success: false });
        console.log(error);
      }
    }
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 w-100 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/login">log in here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const registerForm = () => {
    return (
      <section className="myContainer">
        {successMessage()}
        {errorMessage()}
        <h1 className="MyLarge text-auth">Sign Up</h1>
        <p className="myLead">
          <i className="fas fa-user"></i> Create account
        </p>
        <form className="myForm" onSubmit={(e) => onSubmit(e)}>
          <div className="myForm-group">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={userName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
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
          <div className="myForm-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              required
              value={password2}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
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
          <input
            type="submit"
            className="btn bg-button text-white"
            value="Sign Up"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    );
  };

  return (
    <>
      {registerForm()}
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
    </>
  );
};

export default Register;
