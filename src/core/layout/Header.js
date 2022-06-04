import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./style.scss";
import { isAuthenticated, signout } from "../../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <h1 className="logo"><i className="fas fa-crown"></i></h1>

            <input type="checkbox" id="nav-toggle" className="nav-toggle" />
            <nav>
                <ul>
                    <li className='header-links'>
                        <NavLink
                            to="/"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#00e5b1" : "#fff",
                                }
                            }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className='header-links'>
                        <NavLink
                            to="/leaderboard"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#00e5b1" : "#fff",
                                }
                            }}
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                    <li className='header-links'>
                        <NavLink
                            to="/about"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#00e5b1" : "#fff",
                                }
                            }}
                        >
                            About
                        </NavLink>
                    </li>
                    <li className='header-links'>
                        <NavLink
                            to="/random/singlePlayer"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#00e5b1" : "#fff",
                                }
                            }}>
                            Random battle
                        </NavLink>
                    </li>
                    {isAuthenticated() ? (
                        <>
                            <ul className="navbar-nav" >
                                <li className="nav-item dropdown header-links" >
                                    <a
                                        className="nav-link dropdown-toggle btn-logout text-white "
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-user"></i>{" "}
                                        {isAuthenticated().user.user_name}
                                    </a>

                                    <ul
                                        className="dropdown-menu logout mt-2"
                                        ria-labelledby="navbarDropdown"
                                    >
                                        <li>
                                            <button
                                                className='btn btn-logout'
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
                                                LOGOUT
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    ) :
                        <li className='header-links'>
                            <NavLink
                                to="/login"
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#00e5b1" : "#fff",
                                    }
                                }}
                            >
                                Login
                            </NavLink>
                        </li>}
                </ul>
            </nav>

            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span></span>
            </label>
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
        </header>
    )
}

export default Header;
