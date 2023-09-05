import {
  MapPin,
  MapPinLine,
  PencilSimple,
  PencilSimpleLine,
  Trophy,
  ListBullets,
} from "@phosphor-icons/react";

interface BottomBarProps extends React.HTMLAttributes<HTMLDivElement> {
  activePage: "tracking" | "scorecard" | "games" | "leaderboard";
  setActivePage: React.Dispatch<
    React.SetStateAction<"tracking" | "scorecard" | "games" | "leaderboard">
  >;
  type: "current" | "past";
}

const BottomBar = (props: BottomBarProps) => {
  if (props.type === "past")
    return (
      <div
        className="flex justify-between items-center w-1/2 h-16 left-0 right-0 ml-auto mr-auto absolute bg-white rounded-full bottom-4 border-4 border-green-700"
        style={{
          boxShadow: "5px 5px #2d603a",
        }}
      >
        <div
          className={`flex w-full pl-2 justify-center items-center h-5/6 z-10 transition-color duration-300 ${
            props.activePage === "leaderboard" ? "text-white" : "text-green-700"
          }`}
          onClick={() => props.setActivePage("leaderboard")}
        >
          <Trophy
            size={30}
            weight="fill"
            className={`absolute transition-opacity duration-300 ${
              props.activePage === "leaderboard" ? "opacity-100" : "opacity-0"
            }`}
          />
          <Trophy
            size={30}
            weight="bold"
            className={`absolute transition-opacity duration-300 ${
              props.activePage === "leaderboard" ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div
          className={`flex w-full pr-2 justify-center items-center h-5/6 z-10 transition-color duration-300 ${
            props.activePage === "games" ? "text-white" : "text-green-700"
          }`}
          onClick={() => props.setActivePage("games")}
        >
          <ListBullets
            size={30}
            weight="fill"
            className={`absolute transition-opacity duration-300 ${
              props.activePage === "games" ? "opacity-100" : "opacity-0"
            }`}
          />
          <ListBullets
            size={30}
            weight="bold"
            className={`absolute transition-opacity duration-300 ${
              props.activePage === "games" ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div
          className="w-1/2 h-5/6 bg-green-700 rounded-3xl absolute z-0 transition-all ease-in-out duration-500"
          style={
            props.activePage === "leaderboard"
              ? {
                  transform: "translateX(5px)",
                }
              : {
                  transform: "translateX(calc(100% - 5px))",
                }
          }
        />
      </div>
    );

  return (
    <div
      className="flex justify-between items-center w-1/2 h-16 left-0 right-0 ml-auto mr-auto absolute bg-white rounded-full bottom-4 border-4 border-green-700"
      style={{
        boxShadow: "5px 5px #2d603a",
      }}
    >
      <div
        className={`flex w-full pl-2 justify-center items-center h-5/6 z-10 transition-color duration-300 ${
          props.activePage === "tracking" ? "text-white" : "text-green-700"
        }`}
        onClick={() => props.setActivePage("tracking")}
      >
        <MapPinLine
          size={30}
          weight="fill"
          className={`absolute transition-opacity duration-300 ${
            props.activePage === "tracking" ? "opacity-100" : "opacity-0"
          }`}
        />
        <MapPin
          size={30}
          weight="bold"
          className={`absolute transition-opacity duration-300 ${
            props.activePage === "tracking" ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div
        className={`flex w-full pr-2 justify-center items-center h-5/6 z-10 transition-color duration-300 ${
          props.activePage === "scorecard" ? "text-white" : "text-green-700"
        }`}
        onClick={() => props.setActivePage("scorecard")}
      >
        <PencilSimpleLine
          size={30}
          weight="fill"
          className={`absolute transition-opacity duration-300 ${
            props.activePage === "scorecard" ? "opacity-100" : "opacity-0"
          }`}
        />
        <PencilSimple
          size={30}
          weight="bold"
          className={`absolute transition-opacity duration-300 ${
            props.activePage === "scorecard" ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div
        className="w-1/2 h-5/6 bg-green-700 rounded-3xl absolute z-0 transition-all ease-in-out duration-500"
        style={
          props.activePage === "tracking"
            ? {
                transform: "translateX(5px)",
              }
            : {
                transform: "translateX(calc(100% - 5px))",
              }
        }
      />
    </div>
  );
};

export default BottomBar;
