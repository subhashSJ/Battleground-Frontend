import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import LanguageCard from "./LanguageCard";
import { getAllCategories } from "./helper/Catetgorycall";
//import { getAllBattles } from "./helper/LanguageHelper";

import Spinner from "./layout/Spinner";

const ParticularLanguage = () => {
  const [categories, setCatogories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setCatogories(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // if(categories.length !== 0){

  // }
  
  // useState(() => {
  //   getAllBattles("Pilot Battle")
  //     .then((response) => {
  //       if (response.error) {
  //         setError(response.error);
  //       } else {
  //         setBattles(response.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  return (
    <>
      <div className="container p-0">
        <div className="row pt-4">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 my-content">
            {categories.length === 0 ? (
              <Spinner />
            ) : (
              categories.map((categorie, index) => (
                <LanguageCard key={index} categorie={categorie} />
              ))
            )}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 my-content">
            <Leaderboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticularLanguage;
