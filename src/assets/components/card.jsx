import {useRef, useState, useEffect, useCallback} from 'react';
import './../css/card.css';
import PropTypes from "prop-types"; // Import the CSS styles
import {useNavigate} from 'react-router-dom';

const Card = ({imgUrl, children, position = "left", title, description}) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({mouseX: 0, mouseY: 0});
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);
    const [mouseInCard, setMouseInCard] = useState(false); // Convert to state
    const [view, setView] = useState('menu'); // Track current view (menu, crafting, walkthrough, etc.)
    const navigate = useNavigate(); // Hook for navigation

    const updateDimensions = () => {
        if (cardRef.current) {
            setDimensions({
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleMouseEnter = () => {
        setMouseInCard(true); // Set state
        if (mouseLeaveDelay) {
            clearTimeout(mouseLeaveDelay); // If the mouse re-enters, cancel any pending reset
        }
    };

    const handleMouseLeave = () => {
        // Delay the reset by 0.2 seconds
        setMouseLeaveDelay(setTimeout(() => {
            setMousePos({mouseX: 0, mouseY: 0});
            setMouseInCard(false); // Reset state on leave
        }, 1000));
    };

    const handleMouseMove = (evt) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePos({
                mouseX: evt.clientX - rect.left - dimensions.width / 2,
                mouseY: evt.clientY - rect.top - dimensions.height / 2,
            });
        }
    };

    const handleClick = () => {
        const firstWord = title.split(" ")[0];
        setView(firstWord);
        navigate(`/${firstWord}`);
    };

    const mousePX = mousePos.mouseX / dimensions.width;
    const mousePY = mousePos.mouseY / dimensions.height;

    // Card rotation based on mouse movement
    const cardStyle = {

        transform: `translateX(${mousePX * -5}px) translateY(${mousePY * -5}px) rotateY(${mousePX * 20}deg) rotateX(${mousePY * -20}deg)`, // Card rotates as per mouse position
        transition: mouseInCard ? 'transform 200ms ease-out, rotate 200ms ease-out' : '1s ease-out', // Smooth return transition on leave
        ...(position === 'left' && {right: '33vw'}),
        ...(position === 'right' && {left: '33vw'}),
        ...(position !== 'left' && position !== 'right' && {margin: '0 auto'}) // Center horizontally otherwise
    };

    const cardContainerStyle = {
        ...(position === 'left' && {right: '23vw'}),
        ...(position === 'right' && {left: '23vw'}),
        ...(position === 'left' && {background: 'linear-gradient(to left, rgb(52, 0, 64) 10%, rgba(52, 0, 64, 0) 100%)'}),
        ...(position === 'right' && {background: 'linear-gradient(to right, rgb(52, 0, 64) 10%, rgba(52, 0, 64, 0) 100%)'}),
        ...(position !== 'left' && position !== 'right' && {margin: '0 auto'}) // Center horizontally otherwise
    }

    const cardInfoStyle = {
        ...(position === 'left' && {left: '5vw'}),
        ...(position === 'right' && {right: '5vw'}),
        ...(position === 'left' && {margin: '0 auto'}),
        ...(position === 'right' && {margin: '0 auto'}),
    }

    // Parallax background movement
    const cardBgTransform = {
        transform: `translateX(${mousePX * -15}px) translateY(${mousePY * -15}px) rotateY(${mousePX * 20}deg) rotateX(${mousePY * -20}deg)`, // Background moves with parallax effect
        transition: mouseInCard ? 'transform 200ms ease-out, rotate 200ms ease-out' : '1s ease-out', // Smooth return transition on leave
    };

    return (
        <div
            className="card-container"
            style={cardContainerStyle}
        >
            <a onClick={handleClick}>
                <div
                    className="card"
                    ref={cardRef}
                    style={cardStyle}  // Apply the card rotation
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    aria-label={title}
                >
                    <div
                        className="card-bg"
                        style={{backgroundImage: `url(${imgUrl})`, ...cardBgTransform}}
                    ></div>
                    <div className="card-content">
                        <div className="card-inner">
                            {/* Content of the card */}
                            {children}
                        </div>
                    </div>
                </div>
            </a>

            <div
                className="card-info"
                style={cardInfoStyle}
            >
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};


// Define propTypes for better type checking
Card.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    position: PropTypes.string
};

export default Card;
