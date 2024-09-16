import React, { useState } from 'react'

export default function PlanTrip() {
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
)
}
