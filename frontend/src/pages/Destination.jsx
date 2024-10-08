import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from '../components/Navbar';
import "../styles/destination.scss";

const Destination = () => {
    const { city } = useParams();
    const navigate = useNavigate(); 
    const [viewState, setViewState] = useState({
        latitude: 35.6762,
        longitude: 139.6503,
        zoom: 10
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [destinationData, setDestinationData] = useState({});

    const mapStyles = {
        height: "300px",
        width: "100%"
    };

    const defaultCenter = {
        lat: viewState.latitude,
        lng: viewState.longitude
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/v1/load_place?city=${city}`)
          .then(response => response.json())
          .then(data => {
            setViewState({
              latitude: data.latitude,
              longitude: data.longitude,
              zoom: 10,
            });
            setDestinationData({
              url_link: data.url_link,
              keywords: data.keywords,
              cityName: data.city,
              description: data.description ,
              humidity: data.humidity,
              temperature: data.temperature ,
              weather: data.weather ,
              wind_speed: data.wind_speed ,
            });
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching destination data:', error);
            setError('Failed to load destination data.');
            setLoading(false);
          });
    }, [city]);

    const handlePlanTripClick = () => {
        navigate(`/planTrip/${city}`);
    };

    return (
        <div className='destination'>
            <Navbar />
            <div className="destination-container">
                {loading ? (
                    <div>Loading destination data...</div>
                ) : (
                    <div>
                        <div className="header">
                            <img src={destinationData.url_link} alt="" />
                            <div className="details">
                                <h1>{destinationData.cityName}</h1>
                                <p>{destinationData.description}</p>
                                <section>
                                    {destinationData.keywords}
                                </section>
                                <section>
                                    <button>Humidity: {destinationData.humidity}</button>
                                    <button>Temperature: {destinationData.temperature} </button>
                                    <button>Weather: {destinationData.weather}</button>
                                    <button>Wind speed: {destinationData.wind_speed}</button> 
                                </section>
                                <button onClick={handlePlanTripClick}>Plan Trip to {destinationData.cityName}</button>
                            </div>
                        </div>
                        <div className="location-map">
                            {error ? (
                                <div>Error: {error}</div>
                            ) : (
                                process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
                                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                                        <GoogleMap
                                            mapContainerStyle={mapStyles}
                                            zoom={viewState.zoom}
                                            center={defaultCenter}
                                            onClick={(e) => {
                                                // Handle map click to change view or add markers
                                                setViewState({
                                                    latitude: e.latLng.lat(),
                                                    longitude: e.latLng.lng(),
                                                    zoom: viewState.zoom
                                                });
                                            }}
                                        >
                                            <Marker
                                                position={defaultCenter}
                                                draggable={true}
                                                onDragEnd={(e) => {
                                                    setViewState({
                                                        latitude: e.latLng.lat(),
                                                        longitude: e.latLng.lng(),
                                                        zoom: viewState.zoom
                                                    });
                                                }}
                                            />
                                        </GoogleMap>
                                    </LoadScript>
                                ) : (
                                    <div>Error: Google Maps API key is missing.</div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Destination;
