import React, { useEffect, useState } from "react";
import "./LanguageCard.css";
//import { Link } from "react-router-dom";
import Spinner from "./layout/Spinner";
import { getAllBattles } from "./helper/LanguageHelper";
import InnerCard from "./InnerCard";



const LanguageCard = (props) => {
  const [battles, setBattles] = useState([]);
  const [error, setError] = useState(false);
  const { categorie } = props;
  // console.log(categorie)
  useEffect(() => {
    getAllBattles(categorie.title)
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setBattles(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);




  return (
    <div className="card card_home">
      <div className="card-header">
        <div className="left_align">{categorie.title}</div>
        {/* <div className="right_align"> Time Left: </div> */}
      </div>
      <div className="battle_title_content">
        
        <div className="battle_title_targets">
          <div className="battle_title_target ">
            
                {battles.length === 0 ? (
                  <Spinner />
                ) : (
                  battles.map((battle, index) => (
                    <InnerCard key={index} battle={battle} />
                  ))
                )}
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;
