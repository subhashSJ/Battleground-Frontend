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
      <div className="language-container">
          <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 hide-scroll">
            {categories.length === 0 ? (
              <Spinner />
            ) : (
              categories.map((categorie, index) => (
                <LanguageCard key={index} categorie={categorie} />
              ))
            )}
          </div>
          
        </div>
    </>
  );
};

export default ParticularLanguage;
