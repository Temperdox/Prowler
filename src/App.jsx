import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import ActOne from './ActOne.jsx';
import Home from './Home.jsx';
import Crafting from "./Crafting.jsx";

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const isRemembered = Cookies.get('rememberMe');
        if (!isRemembered) {
            setShowModal(true);
        } else {
            setIsVerified(true);
        }
    }, []);

    const handleAgree = () => {
        setIsVerified(true);
        Cookies.set('rememberMe', 'true', { expires: 365 });
        setShowModal(false);
    };

    const handleExit = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!isVerified) {
        return (
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <h2>Age Restricted Content</h2>
                    <p>You must be 18+ to enter this site.</p>
                    <div>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button onClick={handleAgree}>I Agree</button>
                    <button onClick={handleExit}>Exit Site</button>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/act-one" element={<ActOne />} />
                <Route path="/crafting" element={<Crafting />} />
            </Routes>
        </Router>
    );
};

export default App;