import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Crafting from "./routes/Crafting.jsx";
import Walkthrough from "./routes/Walkthrough.jsx";
import SplashPage from "./routes/splashPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/splash"/>}/>
                <Route path="/splash" element={<SplashPage/>}/>
                <Route path="/crafting" element={<Crafting/>}/>
                <Route path="/walkthrough" element={<Walkthrough/>}/>
            </Routes>
        </Router>
    );
};
export default App;