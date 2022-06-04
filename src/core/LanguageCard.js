import React, { useEffect, useState } from "react";
import "./LanguageCard.css";
// import Spinner from "./layout/Spinner";
import { getAllBattles } from "./helper/LanguageHelper";
// import InnerCard from "./InnerCard";
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


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



  const [current, setCurrent] = useState(0);
  const length = battles.length;



  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current+1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1 );
  };

  // if (!Array.isArray(battles) || battles.length <= 0) {
  //   return null;
  // }


  return (
    // <div className="card card_home">
    //   <div className="card-header">
    //     <div className="left_align">{categorie.title}</div>
    //     {/* <div className="right_align"> Time Left: </div> */}
    //   </div>
    //   <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    //     <div class="carousel-inner">
    //       <div class="carousel-item active">
    //         <div className="battle_title_content">
    //           <div className="battle_title_targets">
    //             <div className="battle_title_target ">

    //               {battles.length === 0 ? (
    //                 <Spinner />
    //               ) : (
    //                 battles.map((battle, index) => (
    //                   <InnerCard key={index} battle={battle} />
    //                 ))
    //               )}

    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //     <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    //       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //       <span class="sr-only">Previous</span>
    //     </a>
    //     <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    //       <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //       <span class="sr-only">Next</span>
    //     </a>
    //   </div>

    // </div>

    <div className="card card_home mt-4">
      <div className="card-header">
        <div className="left_align">{categorie.title}</div>
      </div>
      {/* <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {/* <div className="carousel-item active"> 

          <div className="battle_title_content">

            <div className="battle_title_target ">

              {battles.length === 0 ? (
                <Spinner />
              ) : (
                battles.map((battle, index) => (

                  
                  <div className='innercard mt-0' >
                    <div className={index === current ? 'active' : ''} key={index} battle={battle}>
                      <Link to="/css/singlePlayer" state={{ battle }}>
                        <img src={battle.link} alt="" />
                      </Link>


                    </div>
                  </div>

                ))
              )}


            </div>
            
          </div>

        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" onClick={prev}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" onClick={next}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div> */}

      <section className='slider'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {battles.map((battle, index) => {
          return (
            <div
              className={index === current ? 'battle active' : 'battle'}
              key={index}
            >
              {index === current && (
                <Link to="/css/singlePlayer" state={{ battle }}>
                  <img src={battle.link} alt='travel image' className='image' />
                </Link>
              )}
            </div>
          );
        })}
      </section>


    </div>
  );
};

export default LanguageCard;
