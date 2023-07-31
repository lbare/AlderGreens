import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";

const names = ["Blaine", "Colm", "Chris", "Ethan", "Gavin", "Levi", "Spencer"];

const Players = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleButtonPress = (playerName: string) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(playerName);
      return isSelected
        ? prevSelected.filter((item) => item !== playerName)
        : [...prevSelected, playerName];
    });
    console.log(selected);
  };

  return (
    <div className="flex w-full h-screen justify-between items-center flex-col py-16">
      <div className="flex h-1/12 w-4/5 flex-col items-start">
        <h1 className="text-4xl font-bold text-white font-archivo">Players:</h1>
      </div>
      <div className="flex h-1/3 w-4/5 flex-row flex-wrap justify-start items-center">
        {names.map((name) => (
          <button
            className={`rounded-full border-2 text-2xl font-bold mr-4 ${
              selected.includes(name)
                ? "text-lime-300 border-lime-300"
                : "text-white"
            }  font-roboto px-8 py-1`}
            onClick={() => handleButtonPress(name)}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex h-1/12 w-4/5 justify-end">
        <Link
          to="/scorecard"
          className="text-4xl font-bold underline text-white hover:text-green-300 font-archivo"
        >
          <ArrowCircleRight className="text-white" size={80} />
        </Link>
      </div>
    </div>
  );
};

export default Players;
