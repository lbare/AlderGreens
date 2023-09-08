import Tracking from "./Tracking";
import { useState, useContext } from "react";
import Scorecard from "./Scorecard";
import BottomBar from "../components/BottomBar";
import { ScoreContext } from "../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";

const CurrentGame = () => {
  const [activePage, setActivePage] = useState<
    "tracking" | "scorecard" | "games" | "leaderboard"
  >("scorecard");
  const { players } = useContext(ScoreContext);
  const navigate = useNavigate();

  if (!players || players.length === 0) {
    navigate("/selectPlayers");
  }

  return (
    <div className="flex h-full w-full">
      {activePage === "scorecard" ? <Scorecard /> : <Tracking />}
      <BottomBar
        activePage={activePage}
        setActivePage={setActivePage}
        type="current"
      />
    </div>
  );
};

export default CurrentGame;
