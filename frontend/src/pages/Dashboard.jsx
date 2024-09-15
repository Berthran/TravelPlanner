import React from 'react'
import "../styles/dashboard.scss"
import {
    faCheckCircle,
    faCheck,
    faTemperature0,
    faSun
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar'

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Navbar />
            <div className="dashboard-wrapper">

                <div className="upperContent">
                    <div className="leftContainer">
                        <h1>Planned Trips</h1>
                        <div className="trip-container">
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072009/landmark-statue-liberty-new-york-city-famous-landscape-buildings-statue-liberty-uas-tourist-attraction-design-postcard-travel-poster-vector-illustration_1150-56573-compressed.jpg" alt="" />
                            <div className="details">
                                <h3>New York</h3>
                                <p>23rd March - 25th March</p>
                            </div>
                        </div>
                        <div className="trip-container">
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072310/travel-around-world-colorful-poster_52683-28357.jpg" alt="" />
                            <div className="details">
                                <h3>Venice</h3>
                                <p>15th April - 20th April</p>
                            </div>
                        </div>
                        <div className="trip-container">
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072631/flat-ski-station_23-2148010938.jpg" alt="" />
                            <div className="details">
                                <h3>Gangtok</h3>
                                <p>7th June - 10th June</p>
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <h1>Wishlist</h1>
                        <div className="wish-container">
                            <FontAwesomeIcon icon={faCheckCircle} id='first' />
                            To drink a coffee in Paris
                        </div>
                        <div className="wish-container">
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                            To climb Mount Kailash
                        </div>
                        <div className="wish-container">
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                            To stand under the Northern Lights
                        </div>
                        <div className="wish-container">
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                            To pick up glowing water in my hands
                        </div>
                        <div className="wish-container">
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                            To light a flying lantern in Thailand
                        </div>

                        <button className="wish-button">Add New Wish</button>
                    </div>
                </div>
                <div className="lowerContent">
                    <div className="side">
                        <h1>Upcoming Tour</h1>
                        <p>Cairo, Egypt, 17th March</p>
                        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072500/egyptian-night-desert-pyramids-sphinx-anubis_107791-1591.jpg" alt="" />
                    </div>
                    <div className="side">
                        <h3>About</h3>
                        <p>Cairo, Egypt's capital, is a sprawling metropolis
                            along the Nile River. Known for its ancient landmarks
                            like the Pyramids of Giza and the Sphinx, it's a cultural
                            hub with museums, mosques, and vibrant markets.
                            It blends historic charm with modern energy,
                            offering visitors a glimpse into Egypt's rich heritage.
                        </p>
                        <h3>Itenerary</h3>
                        <p><span>Pyramids of Giza
                        </span> - <span>
                                Egyptian Museum
                            </span> - <span>
                                Salah El-Din Citadel
                            </span> - <span>
                                Cairo Tower
                            </span> - <span>
                                Khan El Khalili
                            </span></p>
                        <section>
                            <FontAwesomeIcon icon={faTemperature0} className="icon" />
                            <span>30-35</span>
                            <FontAwesomeIcon icon={faSun} className="icon" />
                            <span>All days</span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
