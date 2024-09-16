import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import RecCard from '../components/RecCard';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import "../styles/home.scss";
import axios from 'axios';

const Home = () => {
  const [viewState, setViewState] = useState({
    lat: 37.8,
    lng: -122.4,
    zoom: 12,
  });
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key in .env
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocompleteService = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'], // Restrict results to geographic locations
      });
  
      const handlePlaceChange = () => {
        const place = autocompleteService.getPlace();
        if (place.geometry) {
          setViewState({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            zoom: 12, // Adjust zoom based on requirements
          });
  
          // Send the place name to the backend
          axios
            .post('http://localhost:3000/place', {
              city: place.name, // Only sending the city name
            })
            .catch((error) => {
              console.error('Error sending data to backend:', error);
            });
        }
      };
  
      autocompleteService.addListener('place_changed', handlePlaceChange);
    }
  }, [isLoaded]);

  const handleRecommendationClick = (city) => {
    axios
      .post('http://localhost:3000/query_place', {
        city, // Send the city name
      })
      .then((response) => {
        // Handle response if needed
        console.log('Place details:', response.data);
        // Redirect to destination page or update state as needed
        // Example: Redirect to destination page
        window.location.href = `/destination/${city}`;
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };

  const mockData = [
    {
      name: 'New York',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240321072009/landmark-statue-liberty-new-york-city-famous-landscape-buildings-statue-liberty-uas-tourist-attraction-design-postcard-travel-poster-vector-illustration_1150-56573-compressed.jpg',
    },
    {
      name: 'Venice',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240321072310/travel-around-world-colorful-poster_52683-28357.jpg',
    },
    {
      name: 'Gangtok',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240321072631/flat-ski-station_23-2148010938.jpg',
    },
    {
      name: 'Cairo',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240321072500/egyptian-night-desert-pyramids-sphinx-anubis_107791-1591.jpg',
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
                ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <Link to={`/destination/${value}`}>
            <GoogleMap
              center={{ lat: viewState.lat, lng: viewState.lng }}
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
            <RecCard
              key={index}
              image={d.image}
              name={d.name}
              onClick={() => handleRecommendationClick(d.name)} // Handle click
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
