import ScoreBG from "../assets/ScoreBG.png";
import Hole1 from "../assets/holes/1.png";
// import Hole2 from "../assets/holes/2.png";
// import Hole3 from "../assets/holes/3.png";
// import Hole4 from "../assets/holes/4.png";
// import Hole5 from "../assets/holes/5.png";
// import Hole6 from "../assets/holes/6.png";
// import Hole7 from "../assets/holes/7.png";
// import Hole8 from "../assets/holes/8.png";
// import Hole9 from "../assets/holes/9.png";

const Tracking = () => {
  return (
    <div
      className="flex h-full w-full justify-between items-center flex-col"
      style={{
        backgroundImage: `url(${ScoreBG})`,
        backgroundSize: "contain",
      }}
    >
      <img
        src={Hole1}
        alt="ScoreBG"
        style={{
          backgroundSize: "contain",
          height: "60%",
        }}
        className="absolute left-0 right-0 top-0 bottom-0 m-auto"
      />
      <div className="flex w-full mt-4 justify-evenly">
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
              4
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
      <div className="flex w-full mb-16 justify-evenly">
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
    </div>
  );
};

export default Tracking;
