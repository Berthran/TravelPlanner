import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/destination.scss";

export default function PlanTrip() {
    const { city } = useParams();
    const navigate = useNavigate();
    const [customCity, setCustomCity] = useState('');
    const [tripData, setTripData] = useState({
        startDate: '',
        endDate: '',
        numberOfPeople: 1,
        accommodation: {
            name: '',
            price: 0
        },
        flights: {
            departure: {
                name: '',
                price: 0
            },
            return: {
                name: '',
                price: 0
            }
        },
        transport: {
            type: '',
            cost: 0
        },
        meals: {
            toTry: '',
            price: 0
        },
        activities: {
            toTry: '',
            touristSpots: '',
            price: 0
        }
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e, category, subcategory = null) => {
        const { name, value } = e.target;
        setTripData(prevData => ({
            ...prevData,
            [category]: subcategory 
                ? { ...prevData[category], [subcategory]: { ...prevData[category][subcategory], [name]: value } }
                : { ...prevData[category], [name]: value }
        }));
    };

    const calculateTotalBudget = () => {
        return (
            parseFloat(tripData.accommodation.price) +
            parseFloat(tripData.flights.departure.price) +
            parseFloat(tripData.flights.return.price) +
            parseFloat(tripData.transport.cost) +
            parseFloat(tripData.meals.price) +
            parseFloat(tripData.activities.price)
        );
    };

    const handleCustomCitySubmit = (e) => {
        e.preventDefault();
        if (customCity) {
            navigate(`/planTrip/${customCity}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/save_trip_plan', { // MUSA Replace with your backend API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: city || customCity,
                    ...tripData,
                    totalBudget: calculateTotalBudget()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save trip plan');
            }

            const result = await response.json();
            console.log('Trip plan saved:', result);
            // Optionally, navigate to a success page or show a success message
            alert('Trip plan saved successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="plan-trip-container">
            {city ? (
                <h1>Start Planning Trip to {city}</h1>
            ) : (
                <div>
                    <h1>Plan Your Trip</h1>
                    <form onSubmit={handleCustomCitySubmit}>
                        <input 
                            type="text" 
                            value={customCity} 
                            onChange={(e) => setCustomCity(e.target.value)}
                            placeholder="Enter a city"
                        />
                        <button type="submit">Set City</button>
                    </form>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="form-container">
                <div className="plan-input">
                    <label>Start Date:</label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={tripData.startDate}
                        onChange={(e) => handleInputChange(e, 'startDate')}
                    />
                </div>
                <div className="plan-input">
                    <label>End Date:</label>
                    <input 
                        type="date" 
                        name="endDate"
                        value={tripData.endDate}
                        onChange={(e) => handleInputChange(e, 'endDate')}
                    />
                </div>
                <div className="plan-input">
                    <label>No of People:</label>
                    <input 
                        type="number" 
                        name="numberOfPeople"
                        value={tripData.numberOfPeople}
                        onChange={(e) => handleInputChange(e, 'numberOfPeople')}
                    />
                </div>

                <div>
                    <h3>Accommodation</h3>
                    <div className="plan-input">
                        <label>Accommodation Name:</label>
                        <input 
                            type="text"
                            name="name"
                            value={tripData.accommodation.name}
                            onChange={(e) => handleInputChange(e, 'accommodation')}
                        />
                    </div>
                    <div className="plan-input">
                        <label>Price: $</label>
                        <input 
                            type="number"
                            name="price"
                            value={tripData.accommodation.price}
                            onChange={(e) => handleInputChange(e, 'accommodation')}
                        />
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
                    <h2>Total Budget: ${calculateTotalBudget().toFixed(2)}</h2>
                </div>

                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Trip Plan'}
                </button>
            </form>
        </div>
    );
}