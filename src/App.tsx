/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import SelectPlayers from "./routes/SelectPlayers";
import CurrentGame from "./routes/CurrentGame";
import Scores from "./routes/Scores";
import PastGameDetail from "./routes/PastGameDetail";
import { Routes, Route, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Player, ScoreContext } from "./contexts/ScoreContext";
import { Game } from "./contexts/ScoreContext";
import { getGames } from "./firebase/config";

function App() {
  const containerRef = useRef(null);
  const location = useLocation(); // Get current location
  const [height, setHeight] = useState("100vh"); // default to full viewport height
  const [players, setPlayers] = useState<Player[]>([]);
  const [pastGames, setPastGames] = useState<Game[]>([]);

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

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", resize);
    };
  });

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }

    const fetchGames = async () => {
      const newGames = await getGames(true);
      setPastGames((prevGames) => [...prevGames, ...newGames] as Game[]);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    console.log(pastGames);
  }, [pastGames]);

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("pastGames", JSON.stringify(pastGames));
    localStorage.setItem("lastUpdated", new Date().toISOString());
  }, [pastGames]);

  return (
    <ScoreContext.Provider
      value={{
        players,
        setPlayers,
        pastGames,
        setPastGames,
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
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/tracking" element={<CurrentGame />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/past-games/:gameId" element={<PastGameDetail />} />
        </Routes>
      </div>
    </ScoreContext.Provider>
  );
}

export default App;
