import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import { getAUser, updateUser } from "../core/helper/Profile";

const EditForm = () => {
  const [formData, setFormData] = useState({
    github: "",
    location: "",
    bio: "",
    name: "",
  });

  const [user, setUser] = useState([]);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);

  const { name, location, github, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAUser(localStorage.getItem("user"))
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setUser(response.data);
          setFormData({
            ...formData,
            name: response.data.user_name,
            bio: response.data.bio,
            github: response.data.github,
            location: response.data.location,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [flag]);

  const updateDetails = () => {
    updateUser(formData).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setFlag(true);
      }
    });
  };

  return (
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
            <b> Name: </b>
            {user.user_name}
          </div>
          {user.github && (
            <div className="text-name">
              <b> GITHUB: </b> {user.github}
            </div>
          )}
          {user.location && (
            <div className="location">
              <b> Location: </b> {user.location}
            </div>
          )}
        </div>
        <div className="col-md-8 outsideborder">
          <form className="myForm formmargin">
            <div className="myForm-group">
              <b>Name</b>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="myForm-group">
              <b>Github</b>
              <input
                className="e-input"
                type="text"
                value={github}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="myForm-group">
              <b>Location</b>
              <input
                type="text"
                value={location}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="myForm-group">
              <b>About Yourself</b>
              <input type="text" value={bio} onChange={(e) => onChange(e)} />
            </div>

            <button
              className="btn bg-button text-white"
              onClick={() => updateDetails()}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
