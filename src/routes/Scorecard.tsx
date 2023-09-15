import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { Game, Player, ScoreContext } from "../contexts/ScoreContext";
import CircularButton from "../components/CircularButton";
import { addGame } from "../firebase/config";
import { Shot } from "../contexts/ScoreContext";
import { RotatingLines } from "react-loader-spinner";

type ScoreHistoryEntry = {
  playerIndex: number;
  holeIndex: number;
  prevScore: number;
};

const Scorecard = () => {
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showFinalScorePopup, setShowFinalScorePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<ScoreHistoryEntry[]>([]);
  const {
    players,
    setPlayers,
    setPastGames = () => {},
  } = useContext(ScoreContext);
  const navigate = useNavigate();

  const findDuplicates = (players: Player[]): string[] => {
    const letters = players.map((player) => player.name[0]);
    return letters.filter((letter, index) => letters.indexOf(letter) !== index);
  };

  const duplicatedStartingLetters: string[] = findDuplicates(players);

  const undoScore = () => {
    if (scoreHistory.length === 0) return; // Nothing to undo

    const lastScore = scoreHistory[scoreHistory.length - 1];
    const { playerIndex, holeIndex, prevScore } = lastScore;

    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[playerIndex].holes[holeIndex].score = prevScore;
      updatedPlayers[playerIndex].totalScore = updatedPlayers[
        playerIndex
      ].holes.reduce((sum, hole) => sum + hole.score, 0);

      return updatedPlayers;
    });

    // Remove the last score from the history
    setScoreHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  const isDefaultShotHistory = (shotHistory: Shot[] | undefined) => {
    if (!shotHistory || shotHistory.length !== 1) return false;
    return shotHistory[0].x === "50.5%" && shotHistory[0].y === "90.8%";
  };

  const transformPlayersData = (players: Player[]) => {
    return players.map((player) => {
      const totalScore = player.holes.reduce(
        (acc, hole) => acc + hole.score,
        0
      );
      const updatedHoles = player.holes.map((hole) => {
        if (isDefaultShotHistory(hole.shotHistory)) {
          return { ...hole, shotHistory: undefined };
        }
        return hole;
      });

      return {
        ...player,
        totalScore,
        holes: updatedHoles,
      };
    });
  };

  const submitScore = async () => {
    try {
      setIsLoading(true);

      const transformedPlayers = transformPlayersData(players);

      const newGame = await addGame(transformedPlayers);
      if (!newGame) throw new Error("Failed to add game");
      setIsLoading(false);
      setShowSubmitPopup(false);
      setShowFinalScorePopup(true);
      setPastGames((prevGames) => [...prevGames, newGame] as Game[]);
      navigate(`/past-games/${newGame.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-start">
      {/* Score Popup */}
      {showScorePopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10"
          onClick={() => setShowScorePopup(false)}
        >
          <div
            className="flex flex-wrap justify-center items-center w-11/12 h-1/2 bg-white border-green-700 border-4 p-4 rounded-xl shadow-lg"
            style={{
              boxShadow: "6px 6px #2d603a",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full flex-col justify-center items-center">
              <h1 className="font-archivo font-black text-3xl text-green-700">
                {players[selectedCell % players.length].name} - Hole #
                {Math.floor(selectedCell / players.length) + 1}
              </h1>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((score, i) => (
              <CustomButton
                className="flex bg-green-700 text-white rounded"
                onClick={() => {
                  setPlayers((prevPlayers) => {
                    const updatedPlayers = [...prevPlayers];

                    const playerIndex = selectedCell % players.length;
                    const holeIndex = Math.floor(selectedCell / players.length);
                    const prevScore =
                      updatedPlayers[playerIndex].holes[holeIndex].score;

                    // Check if the player already has data for this hole
                    if (!updatedPlayers[playerIndex].holes[holeIndex]) {
                      updatedPlayers[playerIndex].holes[holeIndex] = {
                        shotHistory: [],
                        score: 0,
                      };
                    }

                    setScoreHistory((prevHistory) => [
                      ...prevHistory,
                      { playerIndex, holeIndex, prevScore },
                    ]);

                    // Update the score for the current hole
                    updatedPlayers[playerIndex].holes[holeIndex].score = score;

                    // Recalculate totalScore
                    updatedPlayers[playerIndex].totalScore = updatedPlayers[
                      playerIndex
                    ].holes.reduce((sum, hole) => sum + hole.score, 0);

                    return updatedPlayers;
                  });
                  setShowScorePopup(false);
                }}
                isClicked={
                  players[selectedCell % players.length].holes[
                    Math.floor(selectedCell / players.length)
                  ].score === score
                }
                isTitle={false}
                title={score.toString()}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
      {/* Submit Popup */}
      {showSubmitPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10"
          onClick={() => setShowSubmitPopup(false)}
        >
          <div
            className="flex flex-wrap justify-center items-center w-3/4 h-1/3 bg-white border-green-700 border-4 p-4 rounded-xl shadow-lg"
            style={{
              boxShadow: "6px 6px #2d603a",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {!isLoading ? (
              <>
                <div className="flex w-full flex-col justify-center items-center">
                  <h1 className="font-archivo text-center font-black text-3xl text-green-700">
                    Submit?
                  </h1>
                </div>
                <div className="flex flex-row">
                  <CustomButton
                    className="flex bg-green-700 text-white rounded"
                    classNameButton="w-24"
                    onClick={() => {
                      setShowSubmitPopup(false);
                    }}
                    isTitle={false}
                    title="No"
                  />
                  <CustomButton
                    className="flex bg-green-700 text-white rounded"
                    classNameButton="w-24"
                    onClick={() => {
                      submitScore();
                    }}
                    isTitle={false}
                    title="Yes"
                  />
                </div>
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
      {/* Final Score Popup */}
      {showFinalScorePopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10"
          onClick={() => setShowSubmitPopup(false)}
        >
          <div
            className="flex flex-wrap justify-center items-center basis-2/3 bg-white border-green-700 border-4 p-4 rounded-xl shadow-lg"
            style={{
              boxShadow: "6px 6px #2d603a",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full flex-col justify-center items-center">
              <h1 className="font-archivo text-center font-black text-3xl text-green-700">
                Final Scores
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center py-10 pr-4">
              {players
                .sort((a, b) => a.totalScore - b.totalScore)
                .map((player, i) => (
                  <div
                    className="flex w-full flex-row justify-evenly items-center"
                    key={i}
                  >
                    <h1 className="font-archivo text-right font-bold text-2xl text-green-700 w-1/2">
                      {player.name}:
                    </h1>
                    <h1 className="font-archivo font-bold text-2xl text-green-700 text-left">
                      {player.totalScore}
                    </h1>
                  </div>
                ))}
            </div>
            <div className="flex flex-row">
              <CustomButton
                className="flex bg-green-700 text-white rounded"
                isTitle={false}
                title="Home"
                onClick={() => {
                  setShowFinalScorePopup(false);
                  localStorage.removeItem("lastRoute");
                  localStorage.removeItem("players");
                  localStorage.removeItem("currentHole");
                  setPlayers([]);
                  navigate("/");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-row ${
          players.length > 2 ? "justify-start" : "justify-center"
        } items-end mt-4`}
        style={{
          height: "84%",
          width: "95%",
        }}
      >
        <div
          className="flex flex-col h-full justify-center items-center bg-green-700 rounded-l-3xl"
          style={{
            height: "93%",
            width: players.length > 2 ? "12%" : "15%",
          }}
        >
          {/* Hole #'s */}
          <div
            className="flex flex-col w-full h-full mb-2"
            style={{
              height: "99%",
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div
                className="flex w-full h-full justify-center pl-2 items-center"
                key={i}
              >
                <h1 className="font-archivo font-bold text-xl italic text-white">
                  {i + 1}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex h-full flex-col justify-center items-start bg-green-700 rounded-t-3xl rounded-r-3xl"
          style={{
            width:
              players.length === 6 ||
              players.length === 5 ||
              players.length === 4 ||
              players.length === 3
                ? "93%"
                : players.length === 2
                ? "75%"
                : "45%",
          }}
        >
          <div
            className="flex w-full h-10 flex-row ml-2 justify-center items-center"
            style={{
              width: "94%",
            }}
          >
            {players.map((player, i) => (
              <div
                className="flex h-full w-full justify-center items-end"
                key={i}
              >
                <h1
                  className={`text-white font-archivo ${
                    players.length === 6 || players.length === 3
                      ? "text-xl"
                      : players.length === 5 || players.length === 2
                      ? "text-2xl"
                      : "text-3xl"
                  } font-black`}
                >
                  {players.length !== 1 &&
                  players.length !== 2 &&
                  players.length !== 3
                    ? duplicatedStartingLetters.includes(player.name[0])
                      ? player.name.slice(0, 2)
                      : player.name[0]
                    : player.name}
                </h1>
              </div>
            ))}
          </div>
          <div
            className={`grid ${
              players.length === 6
                ? "grid-cols-6"
                : players.length === 5
                ? "grid-cols-5"
                : players.length === 4
                ? "grid-cols-4"
                : players.length === 3
                ? "grid-cols-3"
                : players.length === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            } grid-rows-10 mb-3 ml-2 rounded-2xl bg-white`}
            style={{
              height: "100%",
              width: players.length > 1 ? "94%" : "90%",
            }}
          >
            {[...Array(players.length * 9)].map((_, i) => (
              <div
                key={i}
                className={`${
                  players.length !== 1 && i === 0
                    ? "rounded-tl-2xl"
                    : players.length !== 1 && i === players.length - 1
                    ? "rounded-tr-2xl"
                    : players.length !== 1 && i === players.length * 9 - 1
                    ? "rounded-br-2xl"
                    : players.length !== 1 &&
                      i === players.length * 9 - players.length
                    ? "rounded-bl-2xl"
                    : players.length === 1 && i === 0
                    ? "rounded-t-2xl"
                    : players.length === 1 && i === 8
                    ? "rounded-b-2xl"
                    : ""
                } flex border-y border-green-200 border-opacity-50 min-h-min justify-center items-center
                  ${players.length === 6 && i % 2 !== 0 ? "bg-green-100" : ""}
                  ${
                    players.length === 5 && (i % 5 === 1 || i % 5 === 3)
                      ? "bg-green-100"
                      : ""
                  }
                ${players.length === 4 && i % 2 !== 0 ? "bg-green-100" : ""} ${
                  players.length === 3 && i % 3 === 1 ? "bg-green-100" : ""
                } ${players.length === 2 && i % 2 === 1 ? "bg-green-100" : ""}`}
                onClick={() => {
                  setShowScorePopup(true);
                  setSelectedCell(i);
                }}
                style={{
                  minHeight: "7vh",
                }}
              >
                <div
                  className={`flex w-12 h-12 justify-center items-center ${
                    players[i % players.length].holes[
                      Math.floor(i / players.length)
                    ].score === 2
                      ? "border-green-500 border-2 rounded-full"
                      : players[i % players.length].holes[
                          Math.floor(i / players.length)
                        ].score === 4
                      ? "border-red-400 border-2 rounded-xl"
                      : players[i % players.length].holes[
                          Math.floor(i / players.length)
                        ].score > 4
                      ? "border-red-400 border-8 border-double rounded-xl"
                      : players[i % players.length].holes[
                          Math.floor(i / players.length)
                        ].score === 1
                      ? "border-green-500 border-8 border-double rounded-full"
                      : ""
                  }`}
                >
                  <h1 className="font-black font-archivo text-4xl text-green-700">
                    {players[i % players.length].holes[
                      Math.floor(i / players.length)
                    ].score || ""}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {scoreHistory.length > 0 && (
        <div className="absolute bottom-0 left-0 flex w-1/2 px-4 mb-4 justify-start">
          <CircularButton icon="undo" onClick={undoScore} />
        </div>
      )}
      <div className="absolute bottom-0 right-0 flex w-1/2 px-4 mb-4 justify-end">
        <CircularButton
          icon="check"
          onClick={() => {
            setShowSubmitPopup(true);
          }}
        />
      </div>
    </div>
  );
};

export default Scorecard;
