import { useState, useEffect } from 'react';
import '../assets/css/Crafting.css';
import itemsData from '../assets/json/Items.json'; // Import your JSON file
import {faArrowLeft, faFilter, faMapPin} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import resourceSpriteMap from '../assets/js/resourceSpriteMap.js';
import {useNavigate} from "react-router-dom"; // Update the path as necessary

const iconSrc = new URL('./../assets/images/maps/IconSet.gif', import.meta.url).href;
const Swamp = new URL('./../assets/images/maps/map-Swamp.png', import.meta.url).href;
const Savannah = new URL('./../assets/images/maps/map-Savannah.png', import.meta.url).href;
const Stream = new URL('./../assets/images/maps/map-Stream.png', import.meta.url).href;

const Crafting = ({ setView }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [filteredItems, setFilteredItems] = useState(Object.keys(itemsData)); // State for filtered items
    const [selectedItems, setSelectedItems] = useState([]); // For storing selected items
    const [expandedItems, setExpandedItems] = useState({});
    const [acquiredItems, setAcquiredItems] = useState({}); // State for tracking acquired items
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item for the modal
    const navigate = useNavigate(); // Hook for navigation

    // Function to load selected and acquired items from localStorage
    const loadSelectedAndAcquiredItems = () => {
        const savedSelectedItems = localStorage.getItem('selectedItems');
        const savedAcquiredItems = localStorage.getItem('acquiredItems');

        if (savedSelectedItems) {
            setSelectedItems(JSON.parse(savedSelectedItems));
        }
        if (savedAcquiredItems) {
            setAcquiredItems(JSON.parse(savedAcquiredItems));
        }
    };

    // Load selected and acquired items from localStorage when the component mounts
    useEffect(() => {
        loadSelectedAndAcquiredItems(); // On mount, load the selected and acquired items from localStorage
    }, []);

    // Save selected items to localStorage whenever they change
    useEffect(() => {
        if (selectedItems.length > 0) {
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        } else {
            localStorage.removeItem('selectedItems');
        }
    }, [selectedItems]);

    // Save acquired items to localStorage whenever they change
    useEffect(() => {
        if (Object.keys(acquiredItems).length > 0) {
            localStorage.setItem('acquiredItems', JSON.stringify(acquiredItems));
        } else {
            localStorage.removeItem('acquiredItems');
        }
    }, [acquiredItems]);

    // Filter the items whenever the search term changes
    useEffect(() => {
        const term = searchTerm.toLowerCase(); // Convert search term to lowercase
        const results = Object.keys(itemsData).filter(itemName =>
            itemName.toLowerCase().includes(term) // Case-insensitive search
        );
        setFilteredItems(results);
    }, [searchTerm]); // Run this effect whenever searchTerm changes

    const toggleExpand = (itemName) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }));
    };

    const handleItemSelect = (itemName) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedItems = prevSelectedItems.includes(itemName)
                ? prevSelectedItems.filter((i) => i !== itemName) // Remove if already selected
                : [...prevSelectedItems, itemName]; // Add if not already selected

            return updatedItems;
        });
    };

    const handleAcquiredChange = (name, quantity, change) => {
        setAcquiredItems((prev) => {
            const newQuantity = Math.max(0, Math.min((prev[name] || 0) + change, quantity)); // Ensure it's between 0 and the quantity
            return { ...prev, [name]: newQuantity };
        });
    };

    // Function to check if an item is "complete" (all materials collected) AND selected
    const isItemCompleteAndSelected = (itemName) => {
        const item = itemsData[itemName];
        const isComplete = item.materials.every(material => acquiredItems[material.name] >= material.quantity);
        return selectedItems.includes(itemName) && isComplete; // Check if item is selected and complete
    };

    const totalMaterials = selectedItems.reduce((acc, itemName) => {
        const item = itemsData[itemName];
        item.materials.forEach((material) => {
            acc[material.name] = (acc[material.name] || 0) + material.quantity;
        });
        return acc;
    }, {});

    const handleMouseEnter = (name) => {
        setHoveredItem(name); // Set the hovered item to trigger the modal
    };

    const handleMouseLeave = () => {
        setHoveredItem(null); // Remove the hovered item to hide the modal
    };

    const getMapImage = (location) => {
        switch (location) {
            case 'Swamp':
                return Swamp;
            case 'Savannah':
                return Savannah;
            case 'Stream':
                return Stream;
            default:
                return null; // In case the location doesn't match any of these
        }
    };

    const clearCheckmarks = () => {
        setSelectedItems([]); // Clear the selected items
        localStorage.removeItem('selectedItems'); // Remove the selected items from localStorage
        setAcquiredItems({}); // Clear the acquired items
        localStorage.removeItem('acquiredItems'); // Remove the acquired items from localStorage
    };

    return (
        <div className="crafting-page">
            <div className="header">
                {/* Back button */}
                <button onClick={() => navigate('/')} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" /> <span className="back-text">Back</span>
                </button>

                {/* Filter button */}
                <button onClick={() => setFilterModalVisible(true)} className="filter-button">
                    <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                    <span className="filter-text">Filter</span>
                </button>

                <button onClick={clearCheckmarks} className="filter-button">Clear
                    <span className="filter-text">Selection</span></button>

                {/* Search bar */}
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                </form>
            </div>

            <div className="content">
                <div className="left-pane">
                    <h3>Items</h3>
                    <p><strong>Note:</strong> Items that items highlighted <strong>
                        <span style={{color: "#21d321"}}>green</span></strong>
                        means that you have collected enough items to craft the <u><strong>SELECTED</strong></u> item,
                        <u><strong>NOT ALL</strong></u> items selected.</p>
                    <div className="accordion">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((itemName) => {
                                const completeClass = isItemCompleteAndSelected(itemName) ? 'complete' : ''; // Add "complete" class only if selected and complete

                                return (
                                    <div key={itemName} className={`item ${completeClass}`}>
                                        <div className="item-wrapper">
                                            <div
                                                className="item-header"
                                                onClick={() => toggleExpand(itemName)}
                                            >
                                                <label className="checkbox-container">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleItemSelect(itemName)}
                                                        checked={selectedItems.includes(itemName)} // Check if selected
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                                {itemName} <span className="expanded">
                                                {expandedItems[itemName] ? '-' : '+'}</span>
                                            </div>
                                            {expandedItems[itemName] && (
                                                <div className="item-details">
                                                    <p>Category: {itemsData[itemName].category}</p>
                                                    <p>Resources:</p>
                                                    {itemsData[itemName].materials.map((material) => (
                                                        <p key={material.name}>
                                                            {material.quantity} x {material.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No matching items found</p>
                        )}
                    </div>
                </div>

                <div className="right-pane">
                    <div className="right-pane-bg"></div>
                    <h3>Total Costs</h3>
                    {Object.keys(totalMaterials).length > 0 ? (
                        <ul>
                            {Object.entries(totalMaterials).map(([name, quantity]) => {
                                const acquired = acquiredItems[name] || 0;
                                const isComplete = acquired === quantity;
                                return (
                                    <div
                                        key={name}
                                        className={`total-cost-wrapper ${isComplete ? 'complete' : ''}`}
                                    >
                                        <div className="total-cost-content">
                                            {/* Background Image for sprite using the map */}
                                            <div
                                                className="resource-image"
                                                style={{
                                                    backgroundImage: `url(${iconSrc})`,
                                                    backgroundPosition: `${-resourceSpriteMap[name]?.x * 32}px 
                                                    ${-resourceSpriteMap[name]?.y * 32}px`,
                                                    width: '32px',
                                                    height: '32px'
                                                }}
                                            />
                                            <li key={name}>
                                                <span className="cost"> {quantity}</span> x {name}
                                            </li>
                                        </div>
                                        <div className="total-cost-count-wrapper">
                                            {/* Map icon with hover event */}
                                            <div className="total-cost-location"
                                                 onMouseDown={() => handleMouseEnter(name)}
                                                 onMouseLeave={handleMouseLeave}>
                                                {/* Conditional rendering of the modal based on hover state */}
                                                {hoveredItem === name && (
                                                    <div className="modal.show map-modal">
                                                        <img
                                                            src={getMapImage(resourceSpriteMap[name]?.location)}
                                                            alt={`${name} map`}
                                                            className="map-image"
                                                        />
                                                    </div>
                                                )}
                                                <FontAwesomeIcon icon={faMapPin} size="2x" color="#9c65cd" />
                                            </div>
                                            <div
                                                className="square total-cost-add"
                                                onClick={() => handleAcquiredChange(name, quantity, 1)}
                                            >
                                                +
                                            </div>
                                            <div
                                                className="square total-cost-subtract"
                                                onClick={() => handleAcquiredChange(name, quantity, -1)}
                                            >
                                                -
                                            </div>
                                            <div className="square total-cost-acquired">
                                                {acquired}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No items selected.</p>
                    )}
                </div>
            </div>

            {filterModalVisible && (
                <div className="modal">
                    {/* Filter Modal content here */}
                </div>
            )}
        </div>
    );
};

export default Crafting;