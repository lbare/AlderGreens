import Tracking from "./Tracking";
import { useState } from "react";
import Scorecard from "./Scorecard";
import BottomBar from "../components/BottomBar";

const Game = () => {
  const [activePage, setActivePage] = useState<"scorecard" | "tracking">(
    "tracking"
  );

  return (
    <div className="flex h-full w-full">
      {activePage === "scorecard" ? <Scorecard /> : <Tracking />}
      <BottomBar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default Game;
