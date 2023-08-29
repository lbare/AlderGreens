import ScoreBG from "../assets/ScoreBG.png";
import Hole1 from "../assets/holes/1.png";
import CircularButton from "../components/CircularButton";
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
      <div className="flex w-full h-1/4 mb-8 justify-between items-end px-4">
        <div className="grid grid-cols-3 h-16 gap-6 w-4/6">
          <CircularButton icon="minus" />
          <div className="flex flex-col items-center">
            <div
              className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
              style={{
                boxShadow: "5px 5px #2d603a",
              }}
            >
              <h1 className="font-archivo font-black text-green-700 text-4xl">
                2
              </h1>
            </div>
            <h1 className="pt-1 font-archivo font-medium italic text-green-700 opacity-75">
              PUTTS
            </h1>
          </div>
          <CircularButton icon="plus" />
        </div>
        <div className="grid grid-rows-2 grid-cols-1 h-full items-end">
          <CircularButton icon="arrow" />
          <CircularButton icon="check" />
        </div>
        {/* <div className="flex w-4/6 border border-red-300">
          <div className="flex flex-row items-start justify-between w-full border">
            <CircularButton icon="minus" />
            <div className="flex flex-col items-center">
              <div
                className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
                style={{
                  boxShadow: "5px 5px #2d603a",
                }}
              >
                <h1 className="font-archivo font-black text-green-700 text-4xl">
                  2
                </h1>
              </div>
              <h1 className="pt-1 font-archivo font-medium italic text-green-700 opacity-75">
                PUTTS
              </h1>
            </div>
            <CircularButton icon="plus" />
          </div>
        </div>
        <div className="flex flex-col h-36 justify-between border border-blue-400">
          <CircularButton icon="arrow" />
          <CircularButton icon="check" />
        </div> */}
      </div>
    </div>
  );
};

export default Tracking;
