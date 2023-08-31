import "./App.css";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import SelectPlayers from "./routes/SelectPlayers";
import MultipleTracking from "./routes/MultipleTracking";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Tracking from "./routes/Tracking";
import { useRef, useState, useEffect } from "react";
import { Player, ScoreContext } from "./contexts/ScoreContext";

function App() {
  const containerRef = useRef(null);
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Get navigate function
  const [height, setHeight] = useState("100vh"); // default to full viewport height
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Compute and set the actual visible height
    const resize = () => {
      if (containerRef.current) {
        setHeight(`${window.innerHeight}px`);
      }
    };

    // Set initial height
    resize();

    // Listen to resize events (e.g., when address bar hides or shows in mobile browsers)
    window.addEventListener("resize", resize);

    // Check localStorage for a stored route and navigate to it
    const storedRoute = localStorage.getItem("currentRoute");
    if (storedRoute && storedRoute !== location.pathname) {
      navigate(storedRoute);
      console.log("loaded");
      
    }

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    // Save current route to localStorage whenever it changes
    localStorage.setItem("currentRoute", location.pathname);
    console.log("saved route");
  }, [location.pathname]);

  return (
    <ScoreContext.Provider
      value={{
        players,
        setPlayers,
      }}
    >
      <div
        ref={containerRef}
        className="flex w-screen flex-col bg-green-500"
        style={{
          backgroundAttachment: "fixed",
          overflow: "hidden",
          height,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectPlayers" element={<SelectPlayers />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/multipleTracking" element={<MultipleTracking />} />
        </Routes>
      </div>
    </ScoreContext.Provider>
  );
}

export default App;
