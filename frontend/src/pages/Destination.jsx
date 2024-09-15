import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import "../styles/destination.scss";

const Destination = () => {
    const [viewState, setViewState] = useState({
        latitude: 35.6764,  // Default latitude (Tokyo, Japan)
        longitude: 139.7300, // Default longitude (Tokyo, Japan)
        zoom: 10
    });

    const [error, setError] = useState(null);

    // Fetch destination data from backend
    useEffect(() => {
        // Replace with your API endpoint
        fetch('/api/dashboard')
            .then(response => response.json())
            .then(data => {
                setViewState({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    zoom: 10
                });
            })
            .catch(error => {
                console.error('Error fetching destination data:', error);
                setError('Failed to load destination data.');
            });
    }, []);

    const mapStyles = {
        height: "300px",
        width: "1500px"
    };

    const defaultCenter = {
        lat: viewState.latitude,
        lng: viewState.longitude
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
                        <section>
                            {/* Add any information like travel budget and duration */}
                        </section>
                    </div>
                </div>
                <div className="location-map">
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default Destination;
