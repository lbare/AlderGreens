import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../contexts/ScoreContext";
import "../App.css";

const PastGames = () => {
  const { pastGames = [] } = useContext(ScoreContext);
  const navigate = useNavigate();
  const gameRef = useRef<(HTMLDivElement | null)[]>([]);

  const sortedGames = [...pastGames].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("fade-out");
          entry.target.classList.add("fade-in");
        } else {
          entry.target.classList.remove("fade-in");
          entry.target.classList.add("fade-out");
        }
      });
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    gameRef.current.forEach((game) => game && observer.observe(game));

    return () =>
      gameRef.current.forEach((game) => game && observer.unobserve(game));
  }, [sortedGames]);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex w-full h-1/3 flex-col items-center justify-center relative">
        <h1
          className="text-4xl font-black italic font-archivo absolute z-10"
          style={{
            color: "white",
          }}
        >
          Past Games
        </h1>
        <h1
          className="text-4xl font-black italic font-archivo absolute"
          style={{
            color: "#2d603a",
            WebkitTextStroke: "6px #2d603a",
            textShadow: "3px 3px 0px #2d603a",
          }}
        >
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
            ref={(el) => (gameRef.current[index] = el)}
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
