import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Card from './Card'
import { getAllLanguages } from "./helper/HomeHelper";
import Spinner from './layout/Spinner';

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
    <>
      <div className="position-relative">
        <div className="landing-top">
          <h1 className='x-large'>WELCOME TO  DESIGNING BATTLEGROUND</h1>
          <p className="lead">Let's learn designing in more fun and competitive way!</p>
        </div>
      </div>
      <div className='landing-middle'>
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
    </>
  )
}

export default Home
