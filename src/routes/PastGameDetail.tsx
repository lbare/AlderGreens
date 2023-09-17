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

  function getOrdinalSuffix(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex flex-col w-full h-32 bg-green-700 justify-center items-center">
        <h1 className="font-archivo font-black italic text-4xl text-white">
          {game?.date
            ? new Date(game.date).toLocaleDateString("en-US", {
                timeZone: "America/Los_Angeles",
                month: "long",
              })
            : ""}
          {"   "}
          {game?.date && getOrdinalSuffix(new Date(game.date).getDate())}
        </h1>
        <h1 className="font-archivo font-bold text-xl text-white">
          {game?.date
            ? new Date(game.date).toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            : "No date found"}
        </h1>
      </div>
      <div className="flex w-full flex-col items-center overflow-y-scroll">
        {Object.entries(game || {})
          .sort(([, a], [, b]) => {
            if (
              typeof a === "object" &&
              typeof b === "object" &&
              "score" in a &&
              "score" in b
            ) {
              return (
                (a.score as unknown as number) - (b.score as unknown as number)
              );
            }
            return 0;
          })
          .map(([key, value]) => {
            if (key !== "id" && key !== "date" && typeof value !== "string") {
              const toPar = Number(value.score) - 27;
              return (
                <div
                  key={key}
                  className="flex flex-col justify-center items-center p-2 bg-white rounded-xl border-4 border-green-700 my-2"
                  style={{
                    boxShadow: "7px 7px #2d603a",
                    width: "95%",
                  }}
                >
                  <div className="flex flex-row w-full items-center justify-between px-3">
                    <h2 className="text-3xl font-archivo font-black text-center text-white">
                      {key}
                    </h2>
                    <div className="flex w-full justify-end">
                      <div className="flex flex-col items-center justify-center mr-8">
                        <h1 className="w-20 font-archivo font-black italic text-center text-green-700">
                          To Par
                        </h1>
                        <h1 className="w-20 text-4xl font-archivo font-black text-center text-green-700">
                          {toPar > 0 ? `+${toPar}` : toPar.toString()}
                        </h1>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <h1 className="flex w-full font-archivo font-black italic text-center text-green-700">
                          Total
                        </h1>
                        <h1 className="flex w-full text-4xl font-archivo font-black text-center text-green-700">
                          {value.score.toString()}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-start items-center mt-2 border-4 border-green-700 rounded-xl">
                    {value.holes.map((hole, index) => (
                      <div
                        key={index}
                        className="flex flex-col w-full justify-center items-center"
                      >
                        <div className="flex flex-col w-full justify-center items-center bg-green-700">
                          <h1 className="text-lg font-archivo font-bold text-center text-white">
                            {index + 1}
                          </h1>
                        </div>
                        <div
                          className={`flex flex-col w-8 h-8 justify-center items-center my-1 ${
                            hole === 2
                              ? "border-green-500 border-2 rounded-full"
                              : hole === 4
                              ? "border-red-400 border-2 rounded-md"
                              : hole > 4
                              ? "border-red-400 border-8 border-double rounded-md"
                              : hole === 1
                              ? "border-green-500 border-8 border-double rounded-full"
                              : ""
                          }`}
                        >
                          <h1 className="text-lg font-archivo font-black text-center text-green-700">
                            {hole}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default PastGameDetail;
