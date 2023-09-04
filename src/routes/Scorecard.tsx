import { useState, useContext } from "react";
import CustomButton from "../components/CustomButton";
import { Player, ScoreContext } from "../contexts/ScoreContext";

const Scorecard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  const { players, setPlayers } = useContext(ScoreContext);

  const findDuplicates = (players: Player[]): string[] => {
    const letters = players.map((player) => player.name[0]);
    return letters.filter((letter, index) => letters.indexOf(letter) !== index);
  };

  const duplicatedStartingLetters: string[] = findDuplicates(players);

  return (
    <div className="flex w-full h-full justify-center">
      {/* Popup */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10"
          onClick={() => setShowPopup(false)}
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

                    // Check if the player already has data for this hole
                    if (!updatedPlayers[playerIndex].holes[holeIndex]) {
                      updatedPlayers[playerIndex].holes[holeIndex] = {
                        shotHistory: [],
                        score: 0,
                      };
                    }

                    // Update the score for the current hole
                    updatedPlayers[playerIndex].holes[holeIndex].score = score;

                    // Recalculate totalScore
                    updatedPlayers[playerIndex].totalScore = updatedPlayers[
                      playerIndex
                    ].holes.reduce((sum, hole) => sum + hole.score, 0);

                    return updatedPlayers;
                  });
                  setShowPopup(false);
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

      {/* Main Content */}
      <div
        className="flex w-full flex-row bg-green-700 justify-end items-end rounded-b-3xl"
        style={{ marginBottom: "23%" }}
      >
        <div className="flex flex-col h-full w-full items-end">
          <div className="flex flex-col w-1/2 mt-8" style={{ height: "70vh" }}>
            {[...Array(9)].map((_, i) => (
              <div
                className="flex w-full h-full justify-center items-center"
                key={i}
              >
                <h1 className="font-archivo font-bold text-xl italic text-white">
                  {i + 1}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="flex flex-row justify-center items-center mr-3"
            style={{ width: "90vw" }}
          >
            {players.map((player, i) => (
              <div
                className="flex justify-center items-center"
                style={{ width: "24%" }}
                key={i}
              >
                <h1 className="text-white font-archivo text-3xl italic font-black">
                  {duplicatedStartingLetters.includes(player.name[0])
                    ? player.name.slice(0, 2)
                    : player.name[0]}
                </h1>
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-${players.length} grid-rows-10 mb-5 mr-3 rounded-2xl bg-white`}
            style={{ height: "70vh", width: "85vw" }}
          >
            {[...Array(players.length * 9)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0
                    ? "rounded-tl-2xl"
                    : i === players.length - 1
                    ? "rounded-tr-2xl"
                    : i === players.length * 9 - 1
                    ? "rounded-br-2xl"
                    : i === players.length * 9 - players.length
                    ? "rounded-bl-2xl"
                    : ""
                } flex border-y border-green-200 border-opacity-50 justify-center items-center ${
                  i % 2 !== 0 ? "bg-green-100" : ""
                }`}
                style={{
                  minHeight: "7vh",
                }}
                onClick={() => {
                  setShowPopup(true);
                  setSelectedCell(i);
                }}
              >
                <h1 className="font-black font-archivo text-4xl text-green-700">
                  {players[i % players.length].holes[
                    Math.floor(i / players.length)
                  ].score || ""}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
