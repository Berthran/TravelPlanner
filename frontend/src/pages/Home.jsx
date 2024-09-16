import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RecCard from '../components/RecCard';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState('');
  const [viewState, setViewState] = useState({
    lat: 37.8,
    lng: -122.4,
    zoom: 12,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key in .env
    libraries: ['places'],
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      if (value) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json`,
            {
              params: {
                query: value,
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              },
            }
          );
          const placesData = response.data.results;
          setPlaces(placesData); // Store the search results
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      }
    };

    fetchPlaces();
  }, [value]);

  const handleClick = async (query) => {
    setValue(query.name); // Set the selected place name in the input field
    setViewState((prevState) => ({
      ...prevState,
      lat: query.geometry.location.lat,
      lng: query.geometry.location.lng,
    }));

    // Send only the place name to the backend
    try {
      await axios.post('http://localhost:5000/api/v1/place', {
        city: query.name, // Only sending the city name
      });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }

    setPlaces([]); // Clear the search results after selection
  };

  const mockData = [
    {
      name: 'New York',
      image:
        'https://media.geeksforgeeks.org/wp-content/uploads/20240321072009/landmark-statue-liberty-new-york-city-famous-landscape-buildings-statue-liberty-uas-tourist-attraction-design-postcard-travel-poster-vector-illustration_1150-56573-compressed.jpg',
    },
    {
      name: 'Venice',
      image:
        'https://media.geeksforgeeks.org/wp-content/uploads/20240321072310/travel-around-world-colorful-poster_52683-28357.jpg',
    },
    {
      name: 'Gangtok',
      image:
        'https://media.geeksforgeeks.org/wp-content/uploads/20240321072631/flat-ski-station_23-2148010938.jpg',
    },
    {
      name: 'Cairo',
      image:
        'https://media.geeksforgeeks.org/wp-content/uploads/20240321072500/egyptian-night-desert-pyramids-sphinx-anubis_107791-1591.jpg',
    },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='home'>
      <Navbar />
      <div className='home-wrapper'>
        <div className='map'>
          <div className='search'>
            <div className='search-bar'>
              <input
                placeholder='Search places'
                type='text'
                name='place'
                id='place'
                value={value}
                onChange={(e) => setValue(e.target.value)} // Set value based on user input
              />
            </div>
            <div className='searches'>
              {places?.map((item, index) => (
                <div key={index} onClick={() => handleClick(item)}>
                  <p>{item.name}</p> {/* Show place name */}
                </div>
              ))}
            </div>
          </div>
          <Link to={`/destination/${value}`}>
            <GoogleMap
              center={{ lat: viewState.lat, lng: viewState.lng }} // Display map centered at selected location
              zoom={viewState.zoom}
              mapContainerStyle={{ width: '800px', height: '400px' }}
            >
              <Marker position={{ lat: viewState.lat, lng: viewState.lng }} />
            </GoogleMap>
          </Link>
        </div>
        <h1 className='head'>Recommendations for you</h1>
        <div className='recommendations'>
          {mockData.map((d, index) => (
            <RecCard key={index} image={d.image} name={d.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
