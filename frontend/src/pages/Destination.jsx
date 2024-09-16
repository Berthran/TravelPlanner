import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link, useParams } from 'react-router-dom'; // Import useParams and Link
import Navbar from '../components/Navbar';

const Destination = () => {
    const { city } = useParams(); // Get the city parameter from the URL
    const [viewState, setViewState] = useState({
        latitude: 35.6764,  // Default latitude (Tokyo, Japan)
        longitude: 139.7300, // Default longitude (Tokyo, Japan)
        zoom: 10
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [destinationData, setDestinationData] = useState({
        cityName: "Tokyo, Japan",
        description: "Tokyo, the capital of Japan, is a vibrant metropolis where traditional culture meets futuristic innovation. It boasts iconic landmarks like the Tokyo Tower and Skytree, bustling districts like Shibuya and Shinjuku, serene shrines and temples, and a diverse culinary scene."
    });

    // Fetch destination data from backend
    useEffect(() => {
        fetch(`/api/dashboard?city=${city}`)
            .then(response => response.json())
            .then(data => {
                setViewState({
                    latitude: data.latitude || 35.6764,
                    longitude: data.longitude || 139.7300,
                    zoom: 10
                });
                setDestinationData({
                    cityName: data.cityName || "Tokyo, Japan",
                    description: data.description || "Default description"
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destination data:', error);
                setError('Failed to load destination data.');
                setLoading(false);
            });
    }, [city]);

    const mapStyles = {
        height: "300px",
        width: "80%"  // Adjust to make it responsive
    };

    const defaultCenter = {
        lat: viewState.latitude,
        lng: viewState.longitude
    };

    return (
        <div className='flex flex-col items-center'>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-24">
                {loading ? (
                    <div>Loading destination data...</div>
                ) : (
                    <div>
                        <div className="flex gap-24 p-8 items-center justify-center w-full max-w-screen-lg">
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20240321072734/hand-drawn-japanese-castle-illustration_52683-46247-compressed.jpg"
                                alt=""
                                className="h-[400px] w-[500px] object-cover clip-path-polygon"
                            />
                            <div className="flex flex-col gap-5 w-3/5">
                                <h1 className="text-4xl font-cursive"> {destinationData.cityName} </h1>
                                <p>
                                    {destinationData.description}
                                </p>
                                <section className="bg-light-pink text-center py-5 rounded-md">
                                    {/* Add any dynamic travel info, budget, duration, etc. */}
                                </section>
                                <Link to={`/planTrip/${city}`} className="inline-block">
                                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md transition-transform transform hover:translate-y-[-2px]">
                                        Plan Trip to {destinationData.cityName}
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-12">
                            {error ? (
                                <div className="text-red-600">Error: {error}</div>
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
                                    <div className="text-red-600">Error: Google Maps API key is missing.</div>
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
