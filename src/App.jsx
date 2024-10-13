import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Crafting from "./routes/Crafting.jsx";
import Walkthrough from "./routes/Walkthrough.jsx";
import SplashPage from "./routes/splashPage.jsx";
const App = () => {
    return (
        <Router>
            <Router>
                <Routes>
                    <Route path="/" element={<SplashPage/>}/>
                    {/* Add more routes here if needed */}
                    <Route path="/crafting" element={<Crafting/>}/>
                    <Route path="/walkthrough" element={<Walkthrough/>}/>
                </Routes>
            </Router>
        </Router>
    );
};
export default App;