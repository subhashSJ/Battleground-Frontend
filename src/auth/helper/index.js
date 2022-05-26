import axios from "axios";

//Register User
export const register = async (user_name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user_name, email, password });

  try {
    const res = await axios.post(`/users/register`, body, config);
    return res;
  } catch (err) {
    console.log(err);
    return (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors[0]
    );
  }
};

//Get registered user
export const getUser = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/api/auth`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

//sign in
export const logIn = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`/api/auth`, body, config);
    return res;
  } catch (err) {
    console.log(err);
    return (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors[0]
    );
  }
};

//Store cookies to local storage
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    next();
  }
};
