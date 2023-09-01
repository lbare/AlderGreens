import Tracking from "./Tracking";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
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

      {/* <div className="flex h-full absolute left-0 flex-col justify-center">
        <CustomButton
          isTitle={false}
          icon="scorecard"
          classNameButton="rounded-xl px-2 py-2"
          isClicked={activePage === "scorecard"}
          onClick={() => setActivePage("scorecard")}
        />
        <CustomButton
          isTitle={false}
          icon="track"
          classNameButton="rounded-xl px-2 py-2"
          isClicked={activePage === "tracking"}
          onClick={() => setActivePage("tracking")}
        />
      </div> */}
    </div>
  );
};

export default Game;
