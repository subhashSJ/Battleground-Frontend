import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();

  const information =
    "The objective of the game is to write HTML/CSS to replicate the given target image in the least code possible. In the target page, start coding in the editor area on the left. As you start typing, the output area in the middle will start rendering your code. When you're confident that the output matches the target image, hit the Submit button to see your score. Important points to Note: What you write in the editor, renders as it is. We make no change. This means you don't even get the DOCTYPE Since this is 'CSS' battle, you are not allowed to use JavaScript or images in your code. In fact any external asset is not allowed. All code required to generate the target image has to be written in the given editor only. Now go and climb the leaderboards!";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-header">
        <div className="container-fluid">
          <Link to="/" className="h2 title link ">
            <i className="fas fa-crown"></i>{" "}
            <span className="hide-sm">Battleground</span>
          </Link>

          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <div className="d-flex me-auto">
              <Link
                type="button"
                className="btn bg-button mx-3 mt-sm  w-100 text-white"
                to="/random/singlePlayer"
              >
                Single-player Random Battle
              </Link>
            </div>

            <div className="d-flex header_right">
              <button
                className="btn bg-button mt-sm dropdown-toggle mx-3 text-white "
                type="button"
                id="defaultDropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
              >
                Information
              </button>
              <p
                className="dropdown-menu bg-faint-black text-white mx-5"
                aria-labelledby="defaultDropdown"
              >
                {information}
              </p>
              {isAuthenticated() ? (
                <>
                  <ul className="navbar-nav me-auto w-100 mt-sm">
                    <li className="nav-item dropdown mx-3">
                      <a
                        className="nav-link dropdown-toggle btn bg-button text-white"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>{" "}
                        {isAuthenticated().user.user_name}
                      </a>
                      {localStorage.setItem("user",isAuthenticated().user.user_name)}
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            className="dropdown-item  dropdown-items"
                            to="/MyProfile"
                          >
                            Profile
                          </Link>
                        </li>
                        
                        <li>
                          <Link
                            className="dropdown-item  dropdown-items "
                            to="/MyBattles"
                          >
                            My Battles
                          </Link>
                        </li>{" "}
                        
                        <li>
                          <button
                            className="dropdown-item  dropdown-items"
                            onClick={() => {
                              toast.success("You are logged out successfully", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                              signout(() => {
                                navigate("/");
                              });
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn bg-button mx-3 mt-sm text-white"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="btn bg-button mx-3 mt-sm text-white"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
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

export default Header;
