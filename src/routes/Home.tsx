import CustomButton from "../components/CustomButton";
import HomeBG from "../assets/HomeBG.png";
import { useContext } from "react";
import { ScoreContext } from "../contexts/ScoreContext";

const Home = () => {
  const { setPlayers } = useContext(ScoreContext);
  const wasOnTrackingPage = localStorage.getItem("lastRoute") === "/tracking";

  return (
    <div
      className="flex flex-col h-full w-full justify-center items-center"
      style={{
        backgroundImage: `url(${HomeBG})`,
        backgroundSize: "cover",
      }}
    >
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
        <CustomButton title="Scores" isTitle={true} page="scores" />
      </div>
    </div>
  );
};

export default Home;
