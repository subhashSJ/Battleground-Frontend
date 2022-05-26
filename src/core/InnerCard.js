import React from 'react';
import { Link } from 'react-router-dom';
import "./LanguageCard.css";


const InnerCard = (props) => {

    const { battle } = props;

    return (
        <div className='innercard'>
            <Link to="/css/singlePlayer" state={{ battle }}>
                <img src={battle.link} alt="" />
            </Link>
        </div>
    )
}

export default InnerCard