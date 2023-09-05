import Tracking from "./Tracking";
import { useState, useContext } from "react";
import Scorecard from "./Scorecard";
import BottomBar from "../components/BottomBar";
import { ScoreContext } from "../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [activePage, setActivePage] = useState<"scorecard" | "tracking">(
    "scorecard"
  );
  const { players } = useContext(ScoreContext);
  const navigate = useNavigate();

  if (!players || players.length === 0) {
    navigate("/selectPlayers");
  }

  return (
    <div className="flex h-full w-full">
      {activePage === "scorecard" ? <Scorecard /> : <Tracking />}
      <BottomBar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default Game;
