import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainEditor from "./core/editorPage/Main";
import Home from "./core/Home";
import Footer from "./core/layout/Footer";
import Header from "./core/layout/Header";
import ParticularLanguage from "./core/ParticularLanguage";
import LanguageCard from "./core/LanguageCard";
import MyProfile from "./user/MyProfile";
import EditForm from "./user/EditForm";
import MyBattles from "./user/MyBattles";
import setAuthToken from "./utils/setAuthToken";
import Register from "./auth/Register";
import Login from "./auth/Login";
import About from "./core/About";
import NotFound from "./core/NotFound";
import Leaderboard from "./core/Leaderboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AllRoutes = () => {
  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:languageName/:battleType" element={<MainEditor />} />
            <Route path="/:languageName/:battleType/:gameID" element={<MainEditor />} />
            <Route path="/ParticularLanguage" element={< ParticularLanguage />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/EditForm" element={<EditForm />} />
            <Route path="/MyBattles" element={<MyBattles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AllRoutes;
