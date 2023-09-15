import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Game, ScoreContext } from "../contexts/ScoreContext";

const PastGameDetail = () => {
  const { gameId } = useParams();
  const { pastGames } = useContext(ScoreContext);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const game = pastGames?.find((game) => game.id === gameId);
    setGame(game);
  }, [pastGames, gameId]);

  return (
    <div>
      <h1>{game?.id.toString()}</h1>
      {Object.entries(game || {}).map(([key, value]) => {
        if (key !== "id" && key !== "date" && typeof value !== "string") {
          return (
            <div key={key}>
              <h2>{key}</h2>
              <p>Score: {value.score}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PastGameDetail;
