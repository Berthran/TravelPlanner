import React from 'react';
import "../styles/recCard.scss";
import { Link } from 'react-router-dom';

const RecCard = ({ image, name, onClick }) => {
    return (
        <div className='recCardContainer'>
            <Link to={`/destination/${name}`} onClick={onClick}>
                <img src={image} alt={name} />
                <div className="rec-name">
                    {name}
                </div>
            </Link>
        </div>
    );
};

export default RecCard;
