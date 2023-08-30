import ScoreBG from "../assets/ScoreBG.png";
import Hole1 from "../assets/holes/1.png";
import CircularButton from "../components/CircularButton";
import { useState } from "react";
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
  const [ballPosition, setBallPosition] = useState({
    x: "49%",
    y: "102%",
  });
  const [shotHistory, setShotHistory] = useState<
    Array<{ x: string; y: string; length?: string; angle?: number }>
  >([{ x: "49%", y: "102%" }]);

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const prevShot = shotHistory[shotHistory.length - 1];

      let lineLength, angle, adjustedLength;
      const shotRadius = 5; // half the size of the shot div
      const ballRadius = 10; // half the size of the ball div

      if (prevShot) {
        const dx = x - parseFloat(prevShot.x);
        const dy = y - parseFloat(prevShot.y);
        lineLength = Math.sqrt(dx * dx + dy * dy);
        angle = Math.atan2(dy, dx); // Keep this in radians for now

        // Adjust the line's length to start at the edge of the previous shot and end at the edge of the current shot
        adjustedLength = lineLength - shotRadius - ballRadius;
      }

      setBallPosition({ x: x + "px", y: y + "px" });
      setScore((prevScore) => prevScore + 1);
      setShotHistory((prevHistory) => [
        ...prevHistory,
        {
          x: x + "px",
          y: y + "px",
          length: adjustedLength ? adjustedLength + "px" : undefined,
          angle: angle * (180 / Math.PI), // Convert to degrees here
        },
      ]);
    }
  };

  return (
    <div
      className="flex h-full w-full justify-between items-center flex-col"
      style={{
        backgroundImage: `url(${ScoreBG})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={Hole1}
        alt="ScoreBG"
        style={{
          backgroundSize: "cover",
          height: "60%",
        }}
        className="absolute left-0 right-0 top-12 bottom-0 m-auto"
      />
      <div className="flex w-full mt-2 justify-evenly">
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
        className="flex w-4/6 h-full justify-between items-center"
        onClick={handleTap}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            top: ballPosition.y,
            left: ballPosition.x,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        ></div>
        {shotHistory.map((shot, index) => (
          <div
            key={index}
            style={
              {
                position: "absolute",
                top: shot.y,
                left: shot.x,
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "black",
                transform: "translate(-50%, -50%)",
                opacity: 0.7,
                zIndex: 1,
              } as never
            }
          >
            {index !== 0 && shot.length && shot.angle !== undefined && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  width: shot.length,
                  height: "2px",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${shot.angle}deg)`,
                  zIndex: -1,
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full h-1/4 mb-8 justify-between items-end px-4">
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
