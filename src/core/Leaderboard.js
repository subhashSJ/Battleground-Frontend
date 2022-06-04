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
    <div className="container">
      <div className="leaderboard-table">
        <div
          className="btn-group px-2 my-3 toggle-div"
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
            className={document.getElementById("btnradio1") && document.getElementById("btnradio1").checked ? "btn btn-outline-custom btn-lg active toggle-button" : "btn btn-outline-custom btn-lg toggle-button"}
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
            className={document.getElementById("btnradio2") && document.getElementById("btnradio2").checked ? "btn btn-outline-custom btn-lg active toggle-button" : "btn btn-outline-custom btn-lg toggle-button"}
            htmlFor="btnradio2"
          >
            Multiplayer
          </label>
        </div>
        <table className="table my-5 bg-light">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col">Username</th>
              <th scope="col">Trophies</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <><td colSpan="4"><Spinner /></td></>
            ) : (
              data.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td><img
                      src="https://i.pinimg.com/originals/c4/43/46/c44346b273fc3bbaed46809a3f728302.jpg"
                      className="img-fluid rounded-circle"
                      style={{ width: "50px" }}
                      alt="Avatar"
                    /></td>
                    <td>{user.userName}</td>
                    <td>{user.score}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
