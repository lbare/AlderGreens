import ScoreBG from "../assets/ScoreBG.png";
import Hole1 from "../assets/holes/1.png";
import CircularButton from "../components/CircularButton";
import React, { useState } from "react";
import "../App.css";
// import Hole2 from "../assets/holes/2.png";
// import Hole3 from "../assets/holes/3.png";
// import Hole4 from "../assets/holes/4.png";
// import Hole5 from "../assets/holes/5.png";
// import Hole6 from "../assets/holes/6.png";
// import Hole7 from "../assets/holes/7.png";
// import Hole8 from "../assets/holes/8.png";
// import Hole9 from "../assets/holes/9.png";

const Tracking = () => {
  const [putts, setPutts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [shotHistory, setShotHistory] = useState<
    Array<{ x: string; y: string; length?: string; angle?: number }>
  >([{ x: "49%", y: "89.5%" }]);

  const incrementPutts = () => {
    setPutts((prevPutts) => prevPutts + 1);
    setScore((prevScore) => prevScore + 1);
  };

  const decrementPutts = () => {
    setPutts((prevPutts) => prevPutts - 1);
    setScore((prevScore) => prevScore - 1);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log("X:", e.clientX - rect.left, "Y:", e.clientY - rect.top);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setScore((prevScore) => prevScore + 1);
      setShotHistory((prevHistory) => [
        ...prevHistory,
        { x: xPercent + "%", y: yPercent + "%" },
      ]);
    }
    const newAspectRatio = rect.width / rect.height;
    setAspectRatio(newAspectRatio);
  };

  return (
    <div
      className="flex h-full w-full justify-center items-center flex-col"
      style={{
        backgroundImage: `url(${ScoreBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full mt-2 justify-evenly border absolute top-0">
        <div className="flex flex-col items-center">
          <h1 className="font-archivo font-medium italic text-green-700 opacity-75">
            HOLE
          </h1>
          <div
            className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              #1
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-archivo font-medium italic text-green-700 opacity-75">
            SCORE
          </h1>
          <div
            className="px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-8xl">
              {score}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-archivo font-medium italic text-green-700 opacity-75">
            TOTAL
          </h1>
          <div
            className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              21
            </h1>
          </div>
        </div>
      </div>
      <div
        className="flex w-4/6 h-96 mt-8 justify-between items-center border border-red-500"
        onClick={handleTap}
        style={{
          position: "relative",
          backgroundImage: `url(${Hole1})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {shotHistory.map((shot, index) => {
          if (index !== 0) {
            const prevShot = shotHistory[index - 1];
            const dx = parseFloat(shot.x) - parseFloat(prevShot.x);
            const dy = parseFloat(shot.y) - parseFloat(prevShot.y);
            const correctedDx = dx * aspectRatio; // Apply aspectRatio to dx
            const lineLength =
              Math.sqrt(correctedDx * correctedDx + dy * dy) +
              Math.abs(correctedDx) * 0.5 +
              Math.abs(dy) * 0.4;

            const angle = Math.atan2(dy, correctedDx) * (180 / Math.PI);

            return (
              <div
                key={"line-" + index}
                style={{
                  position: "absolute",
                  top: `calc(${prevShot.y} + 0px)`, // Adjust starting point
                  left: `calc(${prevShot.x} + 0px)`, // Adjust starting point
                  backgroundColor: "black",
                  width: `${lineLength}%`,
                  height: "2px",
                  transformOrigin: "left center",
                  transform: `rotate(${angle}deg)`,
                  zIndex: 0,
                }}
              ></div>
            );
          }
          return null;
        })}

        {shotHistory.map((shot, index) => (
          <div
            key={"ball-" + index}
            style={{
              position: "absolute",
              top: shot.y,
              left: shot.x,
              width: index === shotHistory.length - 1 ? "20px" : "15px",
              height: index === shotHistory.length - 1 ? "20px" : "15px",
              borderRadius: "50%",
              backgroundColor:
                index === shotHistory.length - 1 ? "white" : "black",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          ></div>
        ))}
      </div>
      <div className="flex w-full h-1/4 mb-8 justify-between items-end px-4 border absolute bottom-0">
        <div className="grid grid-cols-3 h-16 gap-6 w-4/6">
          <CircularButton icon="minus" onClick={decrementPutts} />
          <div className="flex flex-col items-center">
            <div
              className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
              style={{
                boxShadow: "5px 5px #2d603a",
              }}
            >
              <h1 className="font-archivo font-black text-green-700 text-4xl">
                {putts}
              </h1>
            </div>
            <h1 className="pt-1 font-archivo font-medium italic text-green-700 opacity-75">
              PUTTS
            </h1>
          </div>
          <CircularButton icon="plus" onClick={incrementPutts} />
        </div>
        <div className="grid grid-rows-2 grid-cols-1 h-full items-end">
          <CircularButton icon="arrow" />
          <CircularButton icon="check" />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
