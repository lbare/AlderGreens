interface DropdownProps {
  game: {
    id: string;
    date: string;
    [key: string]:
      | {
          score?: number;
          holes?: number[];
          shotHistory?: string[];
        }
      | string;
  };
  singleGame?: boolean;
}

const Dropdown = (props: DropdownProps) => {
  function convertTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  if (props.singleGame)
    return (
      <div
        className="flex flex-col justify-center items-center w-5/6 h-full rounded-3xl bg-white border-4 border-green-700"
        style={{
          boxShadow: "7px 7px #2d603a",
        }}
      >
        <div className="flex flex-row w-5/6 border border-red-500">
          <h1 className="text-4xl font-archivo font-black italic text-green-700">
            {convertTimestamp(props.game.date)}
          </h1>
        </div>
        <div className="flex flex-row w-5/6 border border-red-500">
          <h1>Dropdown</h1>
        </div>
      </div>
    );

  return (
    <div
      className="flex flex-col justify-center items-center w-4/6 p-4 my-2 h-full rounded-xl bg-white border-4 border-green-700"
      style={{
        boxShadow: "7px 7px #2d603a",
      }}
    >
      <div className="flex flex-row w-5/6 border justify-center items-center border-red-500">
        <h1 className="text-4xl font-archivo font-black italic text-green-700">
          {convertTimestamp(props.game.date)}
        </h1>
      </div>
    </div>
  );
};

export default Dropdown;
