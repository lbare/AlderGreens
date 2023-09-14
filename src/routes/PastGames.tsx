import Dropdown from "../components/Dropdown";
import { useEffect } from "react";
import { getGames } from "../firebase/config";

const games = [
  {
    id: "L9EjHEIR2A2VEhQ8IMwK",
    Spencer: {
      score: 35,
      holes: [5, 4, 3, 4, 4, 5, 4, 2, 4],
    },
    Colm: {
      score: 45,
      holes: [5, 5, 6, 4, 5, 5, 6, 3, 6],
    },
    Chris: {
      score: 42,
      holes: [6, 4, 5, 9, 3, 3, 4, 5, 3],
    },
    Sarah: {
      score: 49,
      holes: [6, 4, 7, 7, 5, 4, 4, 5, 7],
    },
    Levi: {
      score: 36,
      holes: [3, 4, 3, 4, 4, 5, 4, 4, 5],
    },
    date: "2023-09-07T03:11:18.016Z",
  },
  {
    id: "QMVWqyvsHIOMyVD9knmf",
    Chris: {
      score: 41,
      holes: [5, 4, 2, 5, 4, 4, 6, 5, 6],
    },
    Gavin: {
      score: 44,
      holes: [6, 2, 5, 5, 5, 8, 5, 5, 3],
    },
    date: "2023-09-08T03:06:48.205Z",
    Spencer: {
      score: 40,
      holes: [6, 4, 5, 4, 4, 4, 5, 3, 5],
    },
  },
  {
    id: "ks7ZSWy2EEDwAnHI2aVJ",
    Spencer: {
      score: 32,
      holes: [3, 4, 4, 5, 3, 3, 3, 3, 4],
    },
    Levi: {
      score: 38,
      holes: [5, 5, 5, 6, 3, 4, 3, 3, 4],
    },
    Ethan: {
      score: 41,
      holes: [4, 5, 5, 5, 5, 3, 5, 5, 4],
    },
    Colm: {
      score: 45,
      holes: [5, 4, 6, 5, 5, 6, 4, 6, 4],
    },
    date: "2023-09-09T18:38:21.334Z",
  },
  {
    id: "nChYjoSDkoUD6KSQiBEe",
    date: "2023-09-05T21:13:50.304Z",
    Levi: {
      score: 38,
      holes: [3, 6, 5, 4, 3, 5, 4, 4, 4],
    },
  },
  {
    id: "rv53K3PBFYG1Udwu2IU9",
    date: "2023-09-05T21:11:29.740Z",
    Spencer: {
      score: 35,
      holes: [6, 4, 4, 4, 3, 4, 4, 3, 3],
    },
    Levi: {
      score: 37,
      holes: [4, 4, 4, 4, 4, 4, 4, 4, 5],
    },
  },
];

const PastGames = () => {
  // useEffect(() => {
  //   const getGamesFirebase = async () => {
  //     const games = await getGames();
  //     console.log(games);
  //   };

  //   getGamesFirebase().catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex w-full py-6 justify-center items-center border">
        <h1 className="text-4xl font-archivo font-black italic text-green-700">
          Past Games
        </h1>
      </div>
      <div className="flex w-full flex-col justify-center items-center overflow-y-scroll">
        {games.map((game) => (
          <Dropdown key={game.id} game={game} singleGame={false} />
        ))}
      </div>
    </div>
  );
};

export default PastGames;
