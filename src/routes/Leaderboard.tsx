import { useContext, useEffect, useState, useRef } from "react";
import { ScoreContext } from "../contexts/ScoreContext";
import { RotatingLines } from "react-loader-spinner";
import { Medal, CaretLeft, CaretRight } from "@phosphor-icons/react";
import "../App.css";

type Game = {
  [key: string]:
    | {
        score?: number;
        holes?: number[];
      }
    | undefined;
};

const Leaderboard = () => {
  const { pastGames } = useContext(ScoreContext);
  const [topScores, setTopScores] = useState<Record<string, number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [activePlayer, setActivePlayer] = useState<string>("");
  const [popupPageActive, setPopupPageActive] = useState<boolean>(false);
  const prevScoreRef = useRef<number | null>(null);
  const prevIndexRef = useRef<number | null>(null);
  const displayedTiedRankRef = useRef<boolean>(false);
  const gameRef = useRef<(HTMLDivElement | null)[]>([]);

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
  }, [topScores]);

  useEffect(() => {
    pastGames?.forEach((game) => {
      Object.entries(game)
        .filter(([key]) => key !== "id" && key !== "date")
        .forEach(([key, value]) => {
          if (typeof value === "object" && "score" in value) {
            const currentScore = value.score as unknown as number;
            if (topScores[key]) {
              if (currentScore < topScores[key]) {
                setTopScores((prevTopScores) => ({
                  ...prevTopScores,
                  [key]: currentScore,
                }));
              }
            } else {
              setTopScores((prevTopScores) => ({
                ...prevTopScores,
                [key]: currentScore,
              }));
            }
          }
        });
    });
  });

  function calcWorstScore(player: string) {
    const playerGames = pastGames?.filter(
      (game) => (game as Game)[player] !== undefined
    );
    const playerScores = playerGames?.map(
      (game) => (game as Game)[player]?.score || 0
    );
    const worstScore = Math.max(...playerScores!);
    return worstScore;
  }

  function calcScore(player: string, score: number = 4) {
    const playerGames = pastGames?.filter(
      (game) => (game as Game)[player] !== undefined
    );

    const playerScores = playerGames?.map(
      (game) => (game as Game)[player]?.holes || []
    );

    const playerScoresFlat = playerScores?.flat();
    if (score === 4)
      return playerScoresFlat?.filter((hole) => hole >= 4).length;
    return playerScoresFlat?.filter((hole) => hole === score).length;
  }

  function calcNumGames(player: string) {
    const playerGames = pastGames?.filter(
      (game) => (game as Game)[player] !== undefined
    );
    return playerGames?.length;
  }

  function calcHoleAvg(player: string) {
    const playerGames =
      pastGames?.filter((game) => (game as Game)[player] !== undefined) || [];

    const playerScoresFlat = playerGames
      .map((game) => (game as Game)[player]?.holes || [])
      .flat();

    const numGames = playerGames.length;

    const holeAvgs = Array.from({ length: 9 }).map((_, holeIndex) => {
      const holeScores = playerScoresFlat
        .slice(holeIndex, holeIndex + numGames * 9)
        .filter((_, idx) => idx % 9 === 0);
      const holeAvg =
        holeScores.reduce((acc, curr) => acc + curr, 0) / holeScores.length;
      return holeAvg;
    });

    return holeAvgs;
  }

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="flex flex-wrap w-full justify-center mx-6 items-between bg-white border-green-700 border-4 p-4 rounded-xl shadow-lg"
            style={{
              boxShadow: "6px 6px #2d603a",
              height: "60%",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {activePlayer ? (
              <>
                <div className="flex w-full h-1/6 flex-col justify-center items-center">
                  <div className="flex flex-row w-full justify-between items-center">
                    <div
                      className="flex flex-col w-1/4 justify-center items-start"
                      onClick={() => setPopupPageActive(!popupPageActive)}
                    >
                      {popupPageActive && (
                        <CaretLeft size={32} color="#2d603a" weight="bold" />
                      )}
                    </div>
                    <h1 className="font-archivo text-center font-black text-3xl text-green-700">
                      {activePlayer}
                    </h1>
                    <div
                      className="flex flex-col w-1/4 justify-center items-end"
                      onClick={() => setPopupPageActive(!popupPageActive)}
                    >
                      {!popupPageActive && (
                        <CaretRight size={32} color="#2d603a" weight="bold" />
                      )}
                    </div>
                  </div>
                </div>
                {!popupPageActive ? (
                  <>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        # of Rounds
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {calcNumGames(activePlayer)}
                      </h1>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        Low Round
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {topScores[activePlayer]}
                      </h1>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        High Round
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {calcWorstScore(activePlayer)}
                      </h1>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        Birdies
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {calcScore(activePlayer, 2)}
                      </h1>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        Pars
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {calcScore(activePlayer, 3)}
                      </h1>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between">
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        Bogeys
                      </h1>
                      <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                        {calcScore(activePlayer)}
                      </h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col w-2/3 items-center justify-between">
                      <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="font-archivo text-center font-black text-lg text-green-700">
                          Hole
                        </h1>
                        <h1 className="font-archivo text-center font-black text-lg text-green-700">
                          Avg
                        </h1>
                      </div>
                      {calcHoleAvg(activePlayer)?.map((holeAvg, index) => (
                        <div
                          className="flex flex-row w-full justify-between items-center"
                          key={index}
                        >
                          <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                            {index + 1}
                          </h1>
                          <h1 className="font-archivo text-center font-bold text-lg text-green-700">
                            {holeAvg.toFixed(1)}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <RotatingLines
                strokeColor="#2d603a"
                strokeWidth="4"
                animationDuration="0.85"
                width="50"
              />
            )}
          </div>
        </div>
      )}
      <div className="flex w-full h-1/5 flex-col items-center justify-center relative">
        <h1
          className="text-4xl font-black font-archivo absolute z-10"
          style={{
            color: "white",
          }}
        >
          Leaderboard
        </h1>
        <h1
          className="text-4xl font-black font-archivo absolute"
          style={{
            color: "#2d603a",
            WebkitTextStroke: "6px #2d603a",
            textShadow: "3px 3px 0px #2d603a",
          }}
        >
          Leaderboard
        </h1>
      </div>
      <div
        className="flex w-full flex-col items-center overflow-y-scroll"
        style={{
          marginBottom: "22%",
          width: "95%",
        }}
      >
        {Object.entries(topScores)
          .sort(([, a], [, b]) => a - b)
          .map(([key, value], index) => {
            let displayIndex;

            if (value === prevScoreRef.current) {
              displayIndex = prevIndexRef.current;
              if (displayIndex !== 1) {
                displayedTiedRankRef.current = true;
              }
            } else {
              displayedTiedRankRef.current = false;
              prevScoreRef.current = value;
              prevIndexRef.current = index + 1;
              displayIndex = index + 1;
            }

            return (
              <div
                className="flex w-full justify-center items-center"
                key={index}
                ref={(el) => (gameRef.current[index] = el)}
              >
                <div
                  className="flex flex-col h-16 w-full justify-center mx-4 items-center p-2 bg-white rounded-xl border-4 border-green-700 my-2"
                  style={{
                    boxShadow: "7px 7px #2d603a",
                  }}
                  key={index}
                  onClick={() => {
                    setShowPopup(true);
                    setActivePlayer(key);
                  }}
                >
                  <div className="flex w-full justify-between items-center h-full flex-row px-2">
                    {displayIndex === 1 ? (
                      <Medal size={32} color="#2d603a" weight="fill" />
                    ) : displayedTiedRankRef.current ? (
                      ""
                    ) : (
                      <h1
                        className={`font-archivo font-black text-right text-3xl text-green-700`}
                      >
                        {displayIndex}.
                      </h1>
                    )}
                    <div className="flex justify-center items-center">
                      <h1 className="font-archivo font-black text-3xl text-green-700">
                        {key}
                      </h1>
                    </div>

                    <div className="flex flex-col h-full flex-wrap justify-center items-center">
                      <h1 className="font-archivo font-black text-3xl text-green-700">
                        {value}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Leaderboard;
