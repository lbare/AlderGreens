import Dropdown from "../components/Dropdown";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../contexts/ScoreContext";

const PastGames = () => {
  const { pastGames = [] } = useContext(ScoreContext);
  const navigate = useNavigate();

  const sortedGames = [...pastGames].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex w-full py-6 justify-center items-center border">
        <h1 className="text-4xl font-archivo font-black italic text-green-700">
          Past Games
        </h1>
      </div>
      <div
        className="flex w-full flex-col items-center overflow-y-scroll"
        style={{
          marginBottom: "20%",
        }}
      >
        {sortedGames.map((game) => (
          <Dropdown
            game={game}
            singleGame={false}
            onClick={() => {
              console.log("clicked");

              navigate(`/past-games/${game.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PastGames;
