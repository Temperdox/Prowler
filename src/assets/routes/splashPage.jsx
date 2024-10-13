 import {useEffect, useRef, useState} from 'react';
import {
    useNavigate,
    useLocation
} from 'react-router-dom';
import '../css/splashPage.css';
import Modal from '../components/modal.jsx';
import Cookies from 'js-cookie';
import Card from "../components/card.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator, faList, faMap} from "@fortawesome/free-solid-svg-icons";
import {faXTwitter, faDiscord, faItchIo} from "@fortawesome/free-brands-svg-icons";
import initializeStarCanvas from '../js/splashStars.js';

function SplashPage() {
    const [isVerified, setIsVerified] = useState(false);
    const removeCookie = false;
    const myCardRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    if (removeCookie) {
        Cookies.remove('rememberMe');
    }

    useEffect(() => {
        const isRemembered = Cookies.get('rememberMe');
        if (!isRemembered) {
            setIsVerified(false);
            // Disable scrolling
            document.body.style.overflow = 'hidden';
            if (location.pathname !== '/') {
                navigate('/');
            }
        } else {
            setIsVerified(true);
            // Enable scrolling
            document.body.style.overflow = '';
        }

        return () => {
            // Clean up on unmount
            document.body.style.overflow = '';
        };
    }, [isVerified, location.pathname, navigate]);

    const handleAgree = () => {
        setIsVerified(true);
        Cookies.set('rememberMe', 'true', {expires: 365});
        // Enable scrolling when modal is closed
        document.body.style.overflow = '';
    };

    const handleExit = () => {
        window.location.assign('https://www.google.com');
    };

    const handleClickOutsideModal = (event) => {
        const modalElement = document.querySelector('.modal'); // Assuming modal has the class 'modal'
        if (modalElement && !modalElement.contains(event.target)) {
            event.stopPropagation();
        }
    };

    useEffect(() => {
        if (!isVerified) {
            document.addEventListener('click', handleClickOutsideModal);
        }

        return () => {
            document.removeEventListener('click', handleClickOutsideModal);
        };
    }, [isVerified]);

    useEffect(() => {
        const handleLoad = () => {
            console.log('DOMContentLoaded or load event triggered');
            transformLayer({x: 0, y: 0});
            startMistScroll();

            if (typeof initializeStarCanvas === 'function') {
                console.log('initializeStarCanvas is a function, calling it');
                initializeStarCanvas();
            } else {
                console.error('initializeStarCanvas is not a function');
            }
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            handleLoad();
        } else {
            window.addEventListener('DOMContentLoaded', handleLoad);
            return () => window.removeEventListener('DOMContentLoaded', handleLoad);
        }
    }, []);

    const transformLayer = ({x, y}) => {
        // Define the parallax image location
        const parallaxImageLoc = './images/splash/';
        // Simulate the list of files (in real-life scenarios you might want to fetch these from the server)
        const listOfFiles = [
            'farMountains.webp',
            'midMountains.webp',
            'farTrees.webp',
            'camp.webp',
            'mist.webp',
            'frontTrees.webp'
        ];
        document.querySelectorAll('.parallax').forEach((layer, i) => {
            const speed = (i + 1) * 0.1;
            layer.style.backgroundImage = `url(${parallaxImageLoc}${listOfFiles[(i)]})`;
            layer.style.transform = `translate3d(${-(x * (speed / 10) + 220)}px,${-1 * (-y * (speed / 8))}px, 0)`;
            layer.style.willChange = 'transform';
            layer.style.zIndex = `${i + 1}`; // Ensure z-index starts from 1
        });
    }

    const adjustParallax = (evt) => {
        //console.log(evt.pageX)
        transformLayer({
            x: -((evt.pageX - window.innerWidth / 2) / 2 + window.scrollX),
            y: (evt.pageY / 4) - (window.scrollY / 4)
        });
    }

    const startMistScroll = () => {
        const mistLayer = document.querySelector('.parallax:nth-child(5)');
        let position = 0;
        setInterval(() => {
            position -= 0.2; // Adjust the speed as needed
            mistLayer.style.backgroundPosition = `${position}px 40vh`;
        }, 30); // Adjust the interval as needed
    }

    return (
        <>
            <Modal show={!isVerified}>
                <img className="modalImage" src="./images/AgeWarningLabel.png"
                     alt="18+ Warning Label Image"/>
                <p>By accessing this site, you agree and declare that you are of legal age to view adult content such as
                    but not limited to NSFW (not safe for work) material.</p>
                <div className="modal-buttons">
                    <button className="close" onClick={() => {
                        setIsVerified(true);
                        handleExit();
                    }}>
                        Take me back
                    </button>
                    <button className="close" onClick={() => {
                        setIsVerified(true);
                        handleAgree();
                    }}>
                        I understand
                    </button>
                </div>
            </Modal>

            <div className="splashPage-wrapper">
                <div className="night-sky">
                    <canvas id="starCanvas"></canvas>
                </div>
                <div className="star-fade"></div>
                <div className="section parallax-wrapper" onMouseMove={(evt) => adjustParallax(evt)}>
                    <div className="parallax"></div>
                    <div className="parallax"></div>
                    <div className="parallax"></div>
                    <div className="parallax"></div>
                    <div className="parallax"></div>
                    <div className="parallax"></div>
                    <div className="splashPage-title"></div>
                    <div className="version-box">
                        <div className="wedge-box purple">
                            Current Game Version:
                        </div>
                        <div className="wedge-15 wedge-r purple"></div>
                        <div className="wedge-15 wedge-l green"></div>
                        <div className="wedge-box typing-effect green">
                            v0.114
                        </div>
                    </div>
                    <div className="game-box">
                        <img className="game-image" src="./assets/images/ProwlerDownloadImage.png"
                             alt="Prowler Download Image"/>
                        <div className="game-container">
                            <h3>Get the game on Itch.io!</h3>
                            <button className="game-button"
                                    onClick={() => window.open('https://grovedevelopment.itch.io/prowler',
                                        '_blank')}>Download Now
                            </button>
                        </div>

                    </div>
                    <div aria-label="Scroll down" className="scroll-downs">
                        <div className="mousey">
                            <div className="scroller"></div>
                        </div>
                        <div className="scroll-text">Scroll Down</div>
                    </div>
                </div>
                <div className="section v-center">
                    <Card
                        imgUrl="./assets/images/testImage.jpg"
                        title="Crafting Calculator"
                        description="A tool to calculate the total cost of materials needed to craft selected items."
                    >
                        <FontAwesomeIcon icon={faCalculator} size="3x"/>
                    </Card>
                    <Card
                        imgUrl="./assets/images/testImage.jpg"
                        title="Interactive Map"
                        description="An interactive map that certain locations can be selected to view various information about the destination. Examples include resources and enimies."
                        position="right"
                    >
                        <FontAwesomeIcon icon={faMap} size="3x"/>
                    </Card>
                    <Card
                        imgUrl="./assets/images/testImage.jpg"
                        title="Walkthrough Flowchart"
                        description="An interactive flowchart that can be expanded to see various information about accessible routes, game overs, nsfw scenes and other information."
                    >
                        <FontAwesomeIcon icon={faList} size="3x"/>
                    </Card>
                </div>
                <footer>
                    {/*<img className="footerBg" src="./src/assets/images/footerImage.png" alt="Decorative footer image"/>*/}
                    <div className="footer-wrapper">
                        <div className="footer-top">
                            <div className="about-me">
                                <div><h2 style={{textAlign: "center", margin: ".3vw 0 .1vw 0", fontSize: "1vw"}}>About
                                    This Site</h2></div>
                                <p>This website is an independent project created by CottonLeSergal and is not
                                    affiliated with the Grove Development team. The icons utilized on this site are
                                    sourced from FontAwesome. Explicit permission has been granted by the Grove
                                    Development team for the use of images related to the game Prowler on this website.
                                    Any images associated with Prowler are protected and may not be redistributed or
                                    reused from this site without express authorization from the Grove Development
                                    team. @ 2024</p>
                            </div>
                            <div className="social-media">
                                <div><h2 style={{textAlign: "center", margin: ".3vw 0 .1vw 0", fontSize: "1vw"}}>Social
                                    Media</h2></div>
                                <div className="r1">
                                    <a href="https://x.com/regalbuster" target="_blank"><FontAwesomeIcon
                                        className="social-media-icon" icon={faXTwitter} size="2xl"
                                        aria-label="@regalbuster on X"/></a>
                                    <a href="https://x.com/sirizike" target="_blank"><FontAwesomeIcon
                                        className="social-media-icon" icon={faXTwitter} size="2xl"
                                        aria-label="@SirIzike on X"/></a>
                                </div>
                                <div className="r2">
                                    <a href="https://discord.gg/TfHstyJYCB" target="_blank"><FontAwesomeIcon
                                        className="social-media-icon" icon={faDiscord} size="2xl"
                                        aria-label="Grove Discord invite"
                                        alt="Grove Discord"/></a>
                                    <a href="https://grovedevelopment.itch.io" target="_blank"><FontAwesomeIcon
                                        className="social-media-icon" icon={faItchIo} size="2xl"
                                        aria-label="Grove Development Itch.io"/></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom"></div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default SplashPage;
