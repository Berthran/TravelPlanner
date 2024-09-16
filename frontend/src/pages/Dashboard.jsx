import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCheck, faTemperature0, faSun } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [cityPlaces, setCityPlaces] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/v1/get_city_data?city=Lagos')
      .then((response) => {
        setCityPlaces(response.data.city_places.places);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className='bg-light-blue'>
      <Navbar />
      <div className="mt-16 flex flex-col items-center justify-center gap-12 w-full">

        {/* Planned Trips */}
        <div className="flex w-9/12 items-center justify-center gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/5 h-[400px] flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-cursive mb-5">Planned Trips</h1>
            {cityPlaces.map((place, index) => (
              <div className="flex bg-light-pink p-4 w-[400px] gap-8 items-center" key={index}>
                <img src={place.url_link} alt={place.Place} className="h-[70px] w-[100px] object-cover" />
                <div className="flex flex-col justify-between">
                  <h3 className="text-lg font-bold">{place.Place}</h3>
                  <p>{place.Description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/5 h-[400px] flex flex-col items-center justify-center gap-4 text-xl">
            <h1 className="text-2xl font-cursive">Wishlist</h1>
            <div className="flex items-center space-x-2 text-blue-600">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>To drink a coffee in Paris</span>
            </div>
            <div className="flex items-center space-x-2 text-sky-blue">
              <FontAwesomeIcon icon={faCheck} />
              <span>To climb Mount Kailash</span>
            </div>
            <div className="flex items-center space-x-2 text-sky-blue">
              <FontAwesomeIcon icon={faCheck} />
              <span>To stand under the Northern Lights</span>
            </div>
            <div className="flex items-center space-x-2 text-sky-blue">
              <FontAwesomeIcon icon={faCheck} />
              <span>To pick up glowing water in my hands</span>
            </div>
            <div className="flex items-center space-x-2 text-sky-blue">
              <FontAwesomeIcon icon={faCheck} />
              <span>To light a flying lantern in Thailand</span>
            </div>

            <button className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 transition-transform transform hover:translate-y-[-2px]">
              Add New Wish
            </button>
          </div>
        </div>

        {/* Upcoming Tour */}
        <div className="flex w-11/12 bg-white p-12 rounded-lg shadow-lg gap-12 mb-12">
          <div className="flex flex-col gap-4 w-1/2">
            <h1 className="text-2xl font-cursive">Upcoming Tour</h1>
            <p>{message.description}</p>
            <img src={cityPlaces.length > 0 ? cityPlaces[0].url_link : ''} alt="Upcoming Tour" className="w-[200px] h-[100px] object-cover rounded-lg" />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <h3 className="text-xl font-bold">About</h3>
            <p>{message.description}</p>
            <h3 className="text-xl font-bold">Weather</h3>
            <section className="flex items-center justify-center bg-light-pink p-4 rounded-md text-lg">
              <FontAwesomeIcon icon={faTemperature0} className="text-blue-600 mr-2" />
              <span>{Math.round(message.temperature - 273.15)}°C</span>
              <FontAwesomeIcon icon={faSun} className="text-yellow-500 ml-4 mr-2" />
              <span>{message.weather}</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
