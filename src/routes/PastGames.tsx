import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../contexts/ScoreContext";

const PastGames = () => {
  const { pastGames = [] } = useContext(ScoreContext);
  const navigate = useNavigate();

  const sortedGames = [...pastGames].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => console.log(sortedGames));

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex flex-col w-full h-48 bg-green-700 justify-center items-center">
        <h1 className="font-archivo font-black italic text-4xl text-white">
          Past Games
        </h1>
      </div>
      <div
        className="flex w-full flex-col items-center overflow-y-scroll"
        style={{
          marginBottom: "22%",
          width: "95%",
        }}
      >
        {sortedGames.map((game, index) => (
          <div
            className="flex flex-col h-16 justify-center items-center p-2 bg-white rounded-xl border-4 border-green-700 my-2"
            style={{
              boxShadow: "7px 7px #2d603a",
              width: "95%",
            }}
            key={index}
            onClick={() => navigate(`/past-games/${game.id}`)}
          >
            <div className="flex w-full justify-center items-center h-full flex-row px-2">
              <div className="flex justify-center items-center mr-4">
                <h2 className="font-archivo font-black text-3xl text-green-700">
                  {game?.date
                    ? new Date(game.date).toLocaleDateString("en-US", {
                        timeZone: "America/Los_Angeles",
                        month: "numeric",
                        day: "numeric",
                      })
                    : ""}
                </h2>
              </div>

              <div
                className={
                  "flex flex-col w-full h-full flex-wrap justify-center items-center"
                }
              >
                {Object.keys(game)
                  .filter(
                    (key) =>
                      key !== "id" &&
                      key !== "date" &&
                      typeof game[key as keyof typeof game] === "object"
                  )
                  .map((playerName) => (
                    <div className="flex flex-col w-10 h-10 items-center justify-center bg-green-700 rounded-full">
                      <h1 className="font-archivo font-extrabold text-center text-sm text-white">
                        {playerName[0]}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastGames;
