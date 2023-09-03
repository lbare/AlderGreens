const Scorecard = () => {
  const names = ["Blaine", "Spencer", "Chris", "Levi"];

  return (
    <div className="flex w-full h-full justify-center">
      <div
        className="flex w-full flex-row bg-green-700 justify-end items-end rounded-b-3xl"
        style={{
          marginBottom: "23%",
        }}
      >
        <div className="flex flex-col h-full w-full items-end">
          <div
            className="flex flex-col w-1/2 mt-8"
            style={{
              height: "70vh",
            }}
          >
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
            style={{
              width: "90vw",
            }}
          >
            {names.map((name) => (
              <div
                className="flex justify-center items-center"
                style={{
                  width: "24%",
                }}
              >
                <h1 className="text-white font-archivo text-3xl italic font-black">
                  {name[0]}
                </h1>
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-${names.length} grid-rows-10 mb-5 mr-3 rounded-2xl bg-white`}
            style={{
              height: "70vh",
              width: "85vw",
            }}
          >
            {[...Array(names.length * 9)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0
                    ? "rounded-tl-2xl" // top left
                    : i === names.length - 1
                    ? "rounded-tr-2xl" // top right
                    : i === names.length * 9 - 1
                    ? "rounded-br-2xl" // bottom right
                    : i === names.length * 9 - names.length
                    ? "rounded-bl-2xl" // bottom left
                    : ""
                } flex border-y border-green-200 border-opacity-50 justify-center items-center ${
                  i % 2 !== 0 ? "bg-green-100" : ""
                }`}
                onClick={() => {
                  prompt("Enter score");
                }}
              >
                <h1 className="font-black font-archivo text-4xl text-green-700">
                  4
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
