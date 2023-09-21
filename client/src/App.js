import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import useTokenVerification from './pages/useTokenVerification'; 

const App = () => {
  
    const isValidToken = useTokenVerification();
    if (isValidToken === null) {
        // Loading state
        return <div></div>;
      }

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={isValidToken ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/home"
                        element={isValidToken ? <Dashboard /> : <Navigate to="/login" />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
