import React from 'react'
import "../styles/recCard.scss"
import {
    Link
} from 'react-router-dom'

const RecCard = ({ image, name }) => {
    return (
        <div className='recCardContainer'>
            <Link to={`/destination/${name}`}>
                <img src={image} alt="" />
                <div className="rec-name">
                    {name}
                </div>
            </Link>
        </div>
    )
}

export default RecCard