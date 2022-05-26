import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllPosition,
  getAllTotalBattles,
  getAUser,
} from "../core/helper/Profile";
import { isAuthenticated, signout } from "../auth/helper";

const MyProfile = (props) => {
  const [users, setUsers] = useState([]);
  const [totals, setTotals] = useState([]);
  const [totalBattles, setTotalBattles] = useState([]);
  const [error, setError] = useState(false);

  // // const{ users } = props;

  useEffect(() => {
    getAUser(localStorage.getItem("user"))
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setUsers(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllPosition(isAuthenticated().user._id, "CSS")
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setTotals(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllTotalBattles(isAuthenticated().user._id, "CSS")
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setTotalBattles(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // var languageName="CSS";

  return (
    <div className="myProfile">
      <div className="card custom-card setlength">
        <div className="row g-0">
          <div className="col-md-4 setmargin">
            <div className="round-card">
              <img
                src="https://i.pinimg.com/originals/c4/43/46/c44346b273fc3bbaed46809a3f728302.jpg"
                className="img-fluid rounded-start card-img-top"
              ></img>
            </div>
            <div className="text-name">
              <b> NAME: </b> {users.user_name}
            </div>
            {users.github && (
              <div className="text-name">
                <b> GITHUB: </b> {users.github}
              </div>
            )}
            {users.location && (
              <div className="location">
                <b> Location: </b> {users.location}
              </div>
            )}
            <div className="button-group">
              <Link to="/EditForm" className="btn bg-button my-2 text-white">
                Edit Details
              </Link>
            </div>
          </div>
          <div className="col-md-8 outsideborder">
            <div className="card innercard">
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="card imgheight">
                    <img
                      src="https://raw.githubusercontent.com/smohsin4/images/main/CSS%20logo.png"
                      className="img-fluid rounded-start card-img-top"
                    ></img>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="card-title">
                      {" "}
                      <b className="font_size"> Single Player </b>
                      <div className="card-title targetmargin">
                        {" "}
                        <b> Target Completed </b>
                        <div className="outputmargin">
                          {totalBattles.completed}/ {totalBattles.total}
                        </div>
                      </div>
                    </div>
                    <div className="card-title">
                      {" "}
                      <b className="font_size"> MultiPlayer </b>
                      <div className="card-title targetmargin">
                        {" "}
                        <b> Global LeaderBoard </b>
                        <div className="outputmargin">
                          {totals.rank}/{totals.total}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
