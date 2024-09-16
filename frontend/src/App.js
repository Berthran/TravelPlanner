import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PlanTrip from "./pages/PlanTrip";
import Destination from "./pages/Destination";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/destination/:city" element={<Destination />} />
                <Route path="/planTrip/:city" element={<PlanTrip />} /> {/* Updated route */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
