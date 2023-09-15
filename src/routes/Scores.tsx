import BottomBar from "../components/BottomBar";
import { useState } from "react";
import PastGames from "./PastGames";
import Leaderboard from "./Leaderboard";

const Scores = () => {
  const [activePage, setActivePage] = useState<
    "tracking" | "scorecard" | "games" | "leaderboard"
  >("games");

  return (
    <div className="flex h-full w-full">
      {activePage === "leaderboard" ? <Leaderboard /> : <PastGames />}
      <BottomBar
        activePage={activePage}
        setActivePage={setActivePage}
        type="past"
      />
    </div>
  );
};

export default Scores;
