import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMap, faList } from '@fortawesome/free-solid-svg-icons';
import Crafting from './Crafting.jsx'; // Import Crafting component
import './ActOne.css';
import homeIcon from './assets/icon.png'; // Import your home icon image

const ActOne = () => {
    const [view, setView] = useState('menu'); // Track current view (menu, crafting, etc.)
    const navigate = useNavigate(); // Hook for navigation

    // Conditional rendering based on the current view
    const renderContent = () => {
        if (view === 'crafting') {
            return <Crafting setView={setView} />; // Pass setView to go back to the menu
        } else {
            return (
                <div className="box-container">
                    <div className="box" onClick={() => setView('crafting')}>
                        <h3>Crafting Calculator</h3>
                        <FontAwesomeIcon icon={faCalculator} size="3x" />
                    </div>

                    <div className="box" onClick={() => alert('Interactive Map - Coming Soon!')}>
                        <h3>Interactive Map</h3>
                        <FontAwesomeIcon icon={faMap} size="3x" />
                    </div>

                    <div className="box" onClick={() => alert('Walkthrough - Coming Soon!')}>
                        <h3>Walkthrough</h3>
                        <FontAwesomeIcon icon={faList} size="3x" />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="act-one">
            {/* Replace Home button with clickable image */}
            <img
                src={homeIcon}
                alt="Home"
                className="home-icon"
                onClick={() => navigate('/')} // Navigate to home page on click
            />

            {renderContent()}
        </div>
    );
};

export default ActOne;
