import { Context, createContext } from "react";

export type Hole = {
  putts?: number;
  score: number;
  shotHistory?: Array<{
    x: string;
    y: string;
    length?: string;
    angle?: number;
  }>;
};

export type Player = {
  name: string;
  currentHole: number;
  totalScore?: number;
  holes: Hole[];
};

interface ScoreContextProps {
  players: Player[];
  setPlayers: (
    players: Player[] | ((prevPlayers: Player[]) => Player[])
  ) => void;
}

export const ScoreContext: Context<ScoreContextProps> =
  createContext<ScoreContextProps>({
    players: [],
    setPlayers: () => {},
  });
