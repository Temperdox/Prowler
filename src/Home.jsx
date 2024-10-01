import { Link } from 'react-router-dom';
import './App.css';
import './Home.css'

const Home = () => {
    return (
        <div className="splash-screen">
            <video autoPlay muted loop className="background-video">
                <source src="https://cdn.discordapp.com/attachments/1264298704542634027/1290203151756034078/Clip_-_9292024_20406_AM.mp4?ex=66fb9ad2&is=66fa4952&hm=a71af367eea88c67fba63171170016da9996c80443f40b10af0ab8e4a020b611&" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <h1>Prowler Walkthrough Tool</h1>
                <h3>V1.0.3</h3>
                <Link to="/act-one">
                    <button aria-label="Act One Button">Act One</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;