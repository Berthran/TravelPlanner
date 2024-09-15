import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Destination = lazy(() => import('./pages/Destination'));
const PlanTrip = lazy(() => import ('./pages/PlanTrip'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/destination/:id" element={<Destination />} />
                    <Route path="/planTrip" element={<PlanTrip />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
