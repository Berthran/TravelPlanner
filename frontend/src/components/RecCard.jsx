import React from 'react';
import { Link } from 'react-router-dom';

const RecCard = ({ image, name }) => {
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <Link to={`/destination/${name}`}>
                <img src={image} alt={name} className="w-full h-auto block" />
                <div className="p-4 text-lg font-bold text-gray-800 text-center bg-white">
                    {name}
                </div>
            </Link>
        </div>
    );
}

export default RecCard;
