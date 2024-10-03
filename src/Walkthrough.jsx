import { useState, useRef } from 'react';
import walkthroughData from './Walkthrough.json'; // Import your JSON
import './Walkthrough.css';
import {faPlus, faMinus, faMapPin} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Walkthrough = () => {
    const [activePath, setActivePath] = useState(['General Information']);
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });

    const nodeConnectionsRef = useRef(null);

    // Handle node click and path update
    const handleNodeClick = (nodeKey) => {
        setActivePath((prevPath) => [...prevPath, nodeKey]);
    };

    // Handle going back in the path
    const handleBackClick = () => {
        if (activePath.length > 1) {
            setActivePath((prevPath) => prevPath.slice(0, -1));
        }
    };

    // Function to get current node based on the path
    const getCurrentNode = (data, path) => {
        return path.reduce((acc, key) => acc?.nodes?.[key], data);
    };

    // Render flow chart nodes based on the current path
    const renderNodes = (data, currentLevel) => {
        const currentNode = getCurrentNode(data, currentLevel);

        if (!currentNode || !currentNode.nodes) {
            return <p>No more nodes.</p>;
        }

        if (currentNode.display) {
            return renderDisplayCard(currentNode);
        }

        return (
            <div className="flow-chart">
                {Object.keys(currentNode.nodes).map((key, index) => (
                    <div
                        key={key}
                        className="node"
                        style={{ top: `${index * 100}px`, left: `${index * 150}px` }} // Adjust flow layout
                        onClick={() => handleNodeClick(key)}
                    >
                        <button>{key}</button>
                    </div>
                ))}
                <div className="connections">
                    {Object.keys(currentNode.nodes).map((key) => (
                        <div key={key} className="connection-line">
                            {/* This would represent a line connecting the nodes */}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render card for final node display (like character cards or task cards)
    const renderDisplayCard = (node) => {
        switch (node.display) {
            case 'character-card':
                return (
                    <div className="card">
                        <h3>{node.description}</h3>
                        <ul>
                            <li>{node.gender}</li>
                        </ul>
                    </div>
                );
            case 'task-card':
                return (
                    <div className="card">
                        <h3>{node.description}</h3>
                        <p>{node.objective.task} {node.objective.subject} {node.objective.quantity > 0 && `x${node.objective.quantity}`}</p>
                    </div>
                );
            case 'interaction-card':
                return (
                    <div className="card">
                        <h3>{node.description}</h3>
                        <p>Objective: {node.objective}</p>
                        <p>{node.isOptional ? "Optional" : "Required"}</p>
                    </div>
                );
            case 'encounter-card':
                return (
                    <div className="card">
                        <h3>Where to Encounter:</h3>
                        <ul>
                            {node.whereToEncounter.map((location, index) => (
                                <li key={index}>{location}</li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return <p>No display type found.</p>;
        }
    };

    // Zoom controls
    const handleZoom = (zoomIn) => {
        setScale((prevScale) => (zoomIn ? prevScale * 1.2 : prevScale / 1.2));
    };

    // Handle panning
    const handleMouseDown = (event) => {
        setIsPanning(true);
        setStartPanPosition({
            x: event.clientX - panOffset.x,
            y: event.clientY - panOffset.y,
        });
    };

    const handleMouseMove = (event) => {
        if (isPanning) {
            setPanOffset({
                x: event.clientX - startPanPosition.x,
                y: event.clientY - startPanPosition.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    return (
        <div className="walkthrough-container">
            <div className="sidebar">
                {Object.keys(walkthroughData).map((key) => (
                    <button key={key} onClick={() => setActivePath([key])}>
                        {key}
                    </button>
                ))}
            </div>

            <div
                className="node-connections"
                ref={nodeConnectionsRef}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                    left: `${panOffset.x + 200}px`,
                    top: `${panOffset.y}px`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {renderNodes(walkthroughData, activePath)}
            </div>

            <div className="zoom-controls">
                <button onClick={() => handleZoom(true)}>Zoom In  <FontAwesomeIcon icon={faPlus} size="1x" style={{fontWeight:800}} color="Black" /></button>
                <button onClick={() => handleZoom(false)}>Zoom Out <FontAwesomeIcon icon={faMinus} size="1x" style={{fontWeight:800}} color="Black" /></button>
                <div style={{alignContent:"center", position:"relative"}}>Scale: {Math.floor(scale*100)}%</div>
            </div>

            {activePath.length > 1 && <button onClick={handleBackClick}>Back</button>}
        </div>
    );
};

export default Walkthrough;