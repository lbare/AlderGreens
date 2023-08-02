const numPlayers = 4;
const names = ["Blaine", "Colm", "Chris", "Ethan"];

const Scorecard = () => {
  return (
    <div className="flex justify-evenly flex-col items-center h-screen">
      <h1 className="font-archivo text-white text-4xl">Scoreboard</h1>
      {/* Grid for top names */}
      <div className="w-full">
        <div className={`grid grid-cols-${numPlayers + 1} gap-1`}>
          {/* Empty cell for the top-left corner */}
          <div className="bg-blue-300 text-black font-bold text-center py-2"></div>
          {/* Render player names in the top row */}
          {names.map((name) => (
            <div
              key={name}
              className="bg-blue-300 text-black font-bold text-center p-2"
            >
              {name}
            </div>
          ))}
        </div>
        {/* Grid for hole numbers and scores */}
        <div className={`grid grid-cols-1 gap-2 mt-2 border`}>
          {/* Render hole numbers in the left column */}
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={index}
              className="bg-red-300 text-black font-bold text-center p-2"
            >
              #{index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
