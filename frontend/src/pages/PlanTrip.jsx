import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/planTrip.scss";
import AuthComponent from '../components/AuthComponent';

export default function PlanTrip() {
    const { city } = useParams();
    const navigate = useNavigate();
    const [customCity, setCustomCity] = useState('');
    const [tripData, setTripData] = useState({
        startDate: null,
        endDate: null,
        numberOfPeople: {
            number: 1,
        },
        accommodation: {
            name: '',
            price: 0
        },
        flights: {
            departure: {
                price: 0,
            },
            return: {
                price: 0,
            }
        },
        transport: {
            cost: 0
        },
        meals: {
            price: 0
        },
        activities: {
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

    const handleDateChange = (date, field) => {
        setTripData(prevData => ({
            ...prevData,
            [field]: date
        }));
    };

    // console.log(tripData);
    const calculateTotalBudget = () => {
        const baseTotal = (
            Number.parseFloat(tripData.accommodation.price) +
            Number.parseFloat(tripData.flights.departure.price) +
            Number.parseFloat(tripData.flights.return.price) +
            Number.parseFloat(tripData.transport.cost) +
            Number.parseFloat(tripData.meals.price) +
            Number.parseFloat(tripData.activities.price)
        );
        return baseTotal * tripData.numberOfPeople.number;
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
            const response = await fetch('http://127.0.0.1:5000/api/v1/plan_trip', {
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
            //eslint-disable-next-line
            const result = await response.json();
            alert('Trip plan saved successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="planTrip">
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
                    <DatePicker
                        selected={tripData.startDate}
                        onChange={(date) => handleDateChange(date, 'startDate')}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                    />
                </div>
                <div className="plan-input">
                    <label>End Date:</label>
                    <DatePicker
                        selected={tripData.endDate}
                        onChange={(date) => handleDateChange(date, 'endDate')}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                    />
                </div>
                <div className="plan-input">
                    <label>No. of People:</label>
                    <input 
                        type="number" 
                        name="number"
                        value={tripData.numberOfPeople.number}
                        onChange={(e) => handleInputChange(e, 'numberOfPeople')}
                        min="1"
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
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <h3>Flights</h3>
                    <div className="plan-input">
                        <label>Flight Departure Price: $</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={tripData.flights.departure.price} 
                            onChange={(e) => handleInputChange(e, 'flights', 'departure')} 
                            min="0"
                        />
                    </div>
                    <div className="plan-input">
                        <label>Flight Return Price: $</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={tripData.flights.return.price} 
                            onChange={(e) => handleInputChange(e, 'flights', 'return')} 
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <h3>Transportation</h3>
                    <div className="plan-input">
                        <label>Transport Cost: $</label>
                        <input 
                            type="number" 
                            name="cost" 
                            value={tripData.transport.cost} 
                            onChange={(e) => handleInputChange(e, 'transport')}
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <h3>Meals & Food</h3>
                    <div className="plan-input">
                        <label>Meals & Snacks Price: $</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={tripData.meals.price} 
                            onChange={(e) => handleInputChange(e, 'meals')}
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <h3>Activities & Tourist Spots</h3>
                    <div className="plan-input">
                        <label>Activities & Tourist Spots Price: $</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={tripData.activities.price} 
                            onChange={(e) => handleInputChange(e, 'activities')}
                            min="0"
                        />
                    </div>

                </div>
                <div>
                    <h2>Total Budget: ${(calculateTotalBudget()).toFixed(2)}</h2>
                </div>

                {error && <div className="error">{error}</div>}
                <AuthComponent>
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save Trip Plan'}
                    </button>
                </AuthComponent>
            </form>
        </div>            
        </div>
    );
}
