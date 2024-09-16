import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PlanTrip() {
    const { city } = useParams(); // Get the city parameter from the URL
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Start Planning Trip to {city}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <div className="grid gap-4 mb-6">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">Start Date:</label>
                        <input type="date" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">End Date:</label>
                        <input type="date" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">No of People:</label>
                        <input type="number" className="p-2 border border-gray-300 rounded" />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Accommodation</h3>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Accommodation Name:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Price: $</label>
                        <input
                            type="number"
                            value={accommodationPrice}
                            onChange={(e) => setAccommodationPrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Flights</h3>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Enter Flight Name:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Flight Departure Price: $</label>
                        <input
                            type="number"
                            value={flightDeparturePrice}
                            onChange={(e) => setFlightDeparturePrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Enter Flight Name:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Flight Return Price: $</label>
                        <input
                            type="number"
                            value={flightReturnPrice}
                            onChange={(e) => setFlightReturnPrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Transportation</h3>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Transport Type</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Transport Cost: $</label>
                        <input
                            type="number"
                            value={transportPrice}
                            onChange={(e) => setTransportPrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Meals & Food</h3>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Enter Meals to Try:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Meals & Snacks Price: $</label>
                        <input
                            type="number"
                            value={mealsPrice}
                            onChange={(e) => setMealsPrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Activities & Tourist Spots</h3>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Enter Activities to Try:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Enter Tourist Spots to Explore:</label>
                        <input type="text" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Activities & Tourist Spots Price: $</label>
                        <input
                            type="number"
                            value={activitiesPrice}
                            onChange={(e) => setActivitiesPrice(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold">Total Budget: ${calculateTotalBudget()}</h2>
                </div>
            </div>
        </div>
    );
}
