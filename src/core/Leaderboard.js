import React, { useEffect, useState } from "react";
import {
  getMultiPlayerLeaderboard,
  getSinglePlayerLeaderboard,
} from "./helper/HomeHelper";
import Spinner from "./layout/Spinner";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const singlePlayerLeaderboard = () => {
    getSinglePlayerLeaderboard()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const multiPlayerLeaderboard = () => {
    getMultiPlayerLeaderboard()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    singlePlayerLeaderboard();
  }, []);

  const handleChange = (flag) => {
    setData([]);
    if (flag === "multiplayer") {
      multiPlayerLeaderboard();
    } else {
      singlePlayerLeaderboard();
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard_header">
        <h3>Leaderboard</h3>
        <div
          className="btn-group px-2 mb-2 toggle-div"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check "
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            defaultChecked
            onChange={() => handleChange("singlePlayer")}
          />
          <label
            className="btn btn-outline-success toggle-button "
            htmlFor="btnradio1"
          >
            Single-player
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            onChange={() => handleChange("multiplayer")}
          />
          <label
            className="btn btn-outline-success toggle-button"
            htmlFor="btnradio2"
          >
            Multiplayer
          </label>
        </div>
      </div>
      {data.length === 0 ? (
        <Spinner />
      ) : (
        data.map((user, index) => {
          return (
            <div className="card leaderboard_card p-1" key={index}>
              <div className="row leaderboard_avatar">
                <div className="col-md-3">
                  <img
                    src="https://i.pinimg.com/originals/c4/43/46/c44346b273fc3bbaed46809a3f728302.jpg"
                    className="img-fluid rounded"
                    alt="..."
                  />
                </div>
                <div className="col-md-8 ">
                  <div className="card-body">
                    <h5 className="card-title ">
                      {user.userName} :{" "}
                      <span className="card-title ">{user.score}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Leaderboard;
