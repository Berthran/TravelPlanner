import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PlanTrip from './pages/PlanTrip';
import Destination from './pages/Destination';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/planTrip/:city"
                    element={
                        <ProtectedRoute>
                            <PlanTrip />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/destination/:city"
                    element={
                        <ProtectedRoute>
                            <Destination />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
