import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCheck, faTemperature0, faSun } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [cityPlaces, setCityPlaces] = useState([]);
  const [message, setMessage] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/v1/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setCityPlaces(response.data);
        setMessage(response.data[0]);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [token]);


  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-wrapper">

        {/* Planned Trips */}
        <div className="upperContent">
          <div className="leftContainer">
            <h1>Planned Trips</h1>
            {cityPlaces.map((place, index) => (
              <div className="trip-container" key={index}>
                <img src={place.url_link} alt={place.city} />
                <div className="details">
                  <h3>{place.city}</h3>
                  <p>{place.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist */}
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

        {/* Upcoming Tour */}
        <div className="lowerContent">
          <div className="side">
            <h1>Upcoming Tour</h1>
            <p>{message.city}</p>
            <img src={cityPlaces.length > 0 ? cityPlaces[0].url_link : ''} alt="Upcoming Tour" />
          </div>
          <div className="side">
            <h3>About</h3>
            <p>{message.description}</p>
            <h3>Weather</h3>
            <section>
              <FontAwesomeIcon icon={faTemperature0} className="icon" />
              <span>{Math.round(message.temperature - 273.15)}°C</span>
              <FontAwesomeIcon icon={faSun} className="icon" />
              <span>{message.weather}</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
