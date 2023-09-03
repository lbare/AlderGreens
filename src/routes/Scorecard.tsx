import React, { useState } from "react";
import CustomButton from "../components/CustomButton";

const Scorecard = () => {
  const names = ["Blaine", "Spencer", "Chris", "Levi"];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  const [scores, setScores] = useState(Array(names.length * 9).fill(null));

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
                {names[selectedCell % 4]} - Hole #{(selectedCell % 9) + 1}
              </h1>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((score) => (
              <CustomButton
                className="flex bg-green-700 text-white rounded"
                onClick={() => {
                  const newScores = [...scores];
                  newScores[selectedCell] = score;
                  setScores(newScores);
                  setShowPopup(false);
                }}
                isClicked={
                  scores[selectedCell] === score &&
                  scores[selectedCell] !== null
                }
                isTitle={false}
                title={score.toString()}
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
                <h1 className="font-archivo font-black text-xl italic text-white">
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
            {names.map((name) => (
              <div
                className="flex justify-center items-center"
                style={{ width: "24%" }}
              >
                <h1 className="text-white font-archivo text-3xl italic font-black">
                  {name[0]}
                </h1>
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-${names.length} grid-rows-10 mb-5 mr-3 rounded-2xl bg-white`}
            style={{ height: "70vh", width: "85vw" }}
          >
            {[...Array(names.length * 9)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0
                    ? "rounded-tl-2xl"
                    : i === names.length - 1
                    ? "rounded-tr-2xl"
                    : i === names.length * 9 - 1
                    ? "rounded-br-2xl"
                    : i === names.length * 9 - names.length
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
                  {scores[i] || ""}
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
