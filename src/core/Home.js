import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getAllLanguages } from "./helper/HomeHelper";
import Spinner from "./layout/Spinner";
import Leaderboard from "./Leaderboard";

const Home = () => {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(false);

  const getLanguages = () => {
    getAllLanguages()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setLanguages(response.data);
        }
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <div className="container p-0">
      <div className="row pt-4">
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 my-content">
          {languages.length === 0 ? (
            <Spinner />
          ) : (
            languages.map((language, index) => (
              <Card
                key={index}
                language_name={language.language_name}
                language_description={language.language_description}
                language_logo={language.logo}
              />
            ))
          )}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 my-content">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
