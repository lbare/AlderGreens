import { useContext, useEffect, useState } from "react";
import HomeBG from "../assets/HomeBG.png";
import CustomButton from "../components/CustomButton";
import CircularButton from "../components/CircularButton";
import { ScoreContext } from "../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";

const SelectPlayers = () => {
  const navigate = useNavigate();
  const { players, setPlayers } = useContext(ScoreContext);
  const [names, setNames] = useState<string[]>([
    "Aidan",
    "Blaine",
    "Colm",
    "Chris",
    "Ethan",
    "Gavin",
    "Levi",
    "Spencer",
  ]);

  useEffect(() => {
    // clear scores if new names are selected/deselected
    localStorage.removeItem("currentHole");
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        return {
          ...player,
          scores: [],
          currentHole: 0,
          holes: Array(9)
            .fill(null)
            .map(() => ({
              score: 0,
              shotHistory: [{ x: "50.5%", y: "90.8%" }],
            })),
        };
      });
    });
  }, [setPlayers]);

  const handleButtonPress = (playerName: string) => {
    setPlayers((prevSelected) => {
      const index = prevSelected.findIndex(
        (player) => player.name === playerName
      );

      if (index === -1 && prevSelected.length >= 6) {
        alert("You can select up to 6 players only."); // Optional feedback to user
        return prevSelected;
      }

      if (index === -1) {
        return [
          ...prevSelected,
          {
            name: playerName,
            holes: Array(9)
              .fill(null)
              .map(() => ({
                score: 0,
                shotHistory: [{ x: "50.5%", y: "90.8%" }],
              })),
            currentHole: 0,
          },
        ];
      } else {
        return prevSelected.filter((player) => player.name !== playerName);
      }
    });
  };

  const addName = () => {
    if (players.length >= 6) {
      alert("You can select up to 6 players only."); // Optional feedback to user
      return;
    }
    const name = prompt("Enter a name");
    if (name) {
      setNames((prevNames) => [...prevNames, name]);
      setPlayers((prevSelected) => [
        ...prevSelected,
        {
          name: name,
          holes: Array(9).fill({ shotHistory: [], score: 0 }),
          currentHole: 0,
        },
      ]);
    }
  };

  return (
    <div
      className="flex w-full h-full justify-start items-center flex-col"
      style={{
        backgroundImage: `url(${HomeBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full h-1/6 flex-col items-center justify-center relative">
        <h1
          className="text-4xl font-black italic font-archivo absolute z-10"
          style={{
            color: "white",
          }}
        >
          Select Players:
        </h1>
        <h1
          className="text-4xl font-black italic font-archivo absolute"
          style={{
            color: "#2d603a",
            WebkitTextStroke: "6px #2d603a",
            textShadow: "5px 5px 0px #2d603a",
          }}
        >
          Select Players:
        </h1>
      </div>
      <div className="flex w-4/5 flex-row flex-wrap justify-start items-center mt-16">
        {names.map((name) => (
          <CustomButton
            onClick={() => handleButtonPress(name)}
            key={name}
            title={name}
            isTitle={false}
            classNameFont="text-xl"
            isClicked={
              players.findIndex((player) => player.name === name) !== -1
            }
          />
        ))}
        <CustomButton onClick={addName} icon="plus" isTitle={false} />
      </div>
      <div className="absolute bottom-6 right-6">
        {players.length > 0 && (
          <CircularButton
            icon="forward"
            onClick={() => navigate("/tracking")}
          />
        )}
      </div>
      <div className="absolute bottom-6 left-6">
        <CircularButton icon="back" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default SelectPlayers;
