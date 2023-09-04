import CustomButton from "../components/CustomButton";
import HomeBG from "../assets/HomeBG.png";
import { useState, useContext } from "react";
import { ScoreContext } from "../contexts/ScoreContext";

const Home = () => {
  const { setPlayers } = useContext(ScoreContext);
  const [isClicked, setIsClicked] = useState(false);
  const wasOnTrackingPage =
    localStorage.getItem("lastRoute") === "/tracking" ||
    localStorage.getItem("lastRoute") === "/selectPlayers";

  return (
    <div
      className="flex flex-col h-full w-full justify-center items-center"
      style={{
        backgroundImage: `url(${HomeBG})`,
        backgroundSize: "cover",
      }}
    >
      <CustomButton
        title="Play"
        isTitle={true}
        classNameText="absolute w-1/4 top-0 left-0"
        hidden={true}
        onClick={() => {
          setIsClicked(true);
          setTimeout(() => {
            setIsClicked(false);
          }, 1000);
        }}
      />
      {isClicked && (
        <CustomButton
          hidden={true}
          title="Play"
          isTitle={true}
          page="multipleTracking"
          classNameText="absolute w-1/4 top-0 right-0"
        />
      )}
      <div
        className={`flex w-3/4 flex-col justify-between items-center ${
          wasOnTrackingPage ? "h-1/2" : "h-1/3"
        }`}
      >
        <CustomButton
          title="New Game"
          isTitle={true}
          page="selectPlayers"
          onClick={() => {
            localStorage.removeItem("lastRoute");
            localStorage.removeItem("players");
            localStorage.removeItem("currentHole");
            setPlayers([]);
          }}
        />
        {wasOnTrackingPage && (
          <CustomButton title="Resume Game" isTitle={true} page="tracking" />
        )}
        <CustomButton title="Scores" isTitle={true} page="" />
      </div>
    </div>
  );
};

export default Home;
