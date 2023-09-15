import { Context, createContext } from "react";

export type Shot = {
  x: string;
  y: string;
  length?: string;
  angle?: number;
};

export type Hole = {
  putts?: number;
  score: number;
  shotHistory?: Shot[];
};

export type Player = {
  name: string;
  currentHole: number;
  totalScore: number;
  holes: Hole[];
};

export type Game = {
  players: {
    [playerName: string]: {
      map(
        arg0: (
          hole: number,
          index: number
        ) => import("react/jsx-runtime").JSX.Element
      ): import("react").ReactNode;
      holes: number[];
      score: number;
    };
  };
  date: string;
  id?: string;
};

interface ScoreContextProps {
  players: Player[];
  setPlayers: (
    players: Player[] | ((prevPlayers: Player[]) => Player[])
  ) => void;
  pastGames?: Game[];
  setPastGames?: (games: Game[] | ((prevGames: Game[]) => Game[])) => void;
}

export const ScoreContext: Context<ScoreContextProps> =
  createContext<ScoreContextProps>({
    players: [],
    setPlayers: () => {},
    pastGames: [],
    setPastGames: () => {},
  });
