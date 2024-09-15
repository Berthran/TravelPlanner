import React, { useState } from 'react'
import { faMoneyBill1Wave, faWalking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar';
import "../styles/destination.scss"
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Destination = () => {

    const [viewState, setViewState] = React.useState({
        latitude: 35.6764,
        longitude: 139.7300,
        zoom: 10
    });

    const [accommodationPrice, setAccommodationPrice] = useState(0);
    const [flightDeparturePrice, setFlightDeparturePrice] = useState(0);
    const [flightReturnPrice, setFlightReturnPrice] = useState(0);
    const [transportPrice, setTransportPrice] = useState(0);
    const [mealsPrice, setMealsPrice] = useState(0);
    const [activitiesPrice, setActivitiesPrice] = useState(0);

    const calculateTotalBudget = () => {
        return (
            parseFloat(accommodationPrice) +
            parseFloat(flightDeparturePrice) +
            parseFloat(flightReturnPrice) +
            parseFloat(transportPrice) +
            parseFloat(mealsPrice) +
            parseFloat(activitiesPrice)
        );
    };

    return (
        <div className='destination'>
            <Navbar />
            <div className="destination-container">
                <div className="header">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072734/hand-drawn-japanese-castle-illustration_52683-46247-compressed.jpg" alt="" />
                    <div className="details">
                        <h1>Tokyo, Japan</h1>
                        <p>Tokyo, the capital of Japan, is a vibrant metropolis
                            where traditional culture meets futuristic innovation.
                            It boasts iconic landmarks like the Tokyo Tower
                            and Skytree, bustling districts like Shibuya and
                            Shinjuku, serene shrines and temples, and a diverse
                            culinary scene. Tokyo is a dynamic blend of history,
                            technology, and culture.
                        </p>
                        <p>
                            <span>Vibrant</span>
                            <span>Modern</span>
                            <span>Bustling</span>
                            <span>Electric</span>
                            <span>Cultural</span>
                        </p>
                        <section>
                            <FontAwesomeIcon icon={faMoneyBill1Wave}
                                className="icon" />
                            <span>$600</span>
                            <FontAwesomeIcon icon={faWalking}
                                className="icon" />
                            <span>2-3 days</span>
                        </section>
                    </div>
                </div>
                <div className="location-map">
                    <Map
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        style={{ width: 1500, height: 300 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    >
                        <Marker className="marker"
                            longitude={viewState.longitude}
                            latitude={viewState.latitude} color="red" />
                    </Map>
                </div>


                <div className="plan-trip-container">
                    <h1>Start Planning Trip to Tokyo</h1>
                    <div className="form-container">
                        <div className="plan-input">
                            <label>Start Date:</label>
                            <input type="date" />
                        </div>
                        <div className="plan-input">
                            <label>End Date:</label>
                            <input type="date" />
                        </div>
                        <div className="plan-input">
                            <label>No of People:</label>
                            <input type="number" />
                        </div>

                        <div>
                            <h3>Accommodation</h3>

                            <div className="plan-input">
                                <label>Accommodation Name:</label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Price: $</label>
                                <input type="number" value={accommodationPrice}
                                    onChange={(e) => setAccommodationPrice(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <h3>Flights</h3>

                            <div className="plan-input">
                                <label htmlFor>Enter Flight Name: </label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Flight Departure Price: $</label>
                                <input type="number" value={flightDeparturePrice}
                                    onChange={(e) => setFlightDeparturePrice(e.target.value)} />
                            </div>
                            <div className="plan-input">
                                <label htmlFor>Enter Flight Name: </label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Flight Return Price: $</label>
                                <input type="number" value={flightReturnPrice}
                                    onChange={(e) => setFlightReturnPrice(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <h3>Transportation</h3>

                            <div className="plan-input">
                                <label>Transport Type</label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Transport Cost: $</label>
                                <input type="number" value={transportPrice}
                                    onChange={(e) => setTransportPrice(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <h3>Meals & Food</h3>

                            <div className="plan-input">
                                <label htmlFor>Enter Meals to Try: </label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Meals & Snacks Price: $</label>
                                <input type="number" value={mealsPrice}
                                    onChange={(e) => setMealsPrice(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <h3>Activities & Tourist Spots</h3>
                            <div className="plan-input">
                                <label htmlFor>Enter Activities to Try: </label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label htmlFor>Enter Tourist Spots to Explore: </label>
                                <input type="text" />
                            </div>
                            <div className="plan-input">
                                <label>Activities & Tourist Spots Price: $</label>
                                <input type="number" value={activitiesPrice}
                                    onChange={(e) => setActivitiesPrice(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <h2>Total Budget: {calculateTotalBudget()}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destination
