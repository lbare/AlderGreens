import { Context, createContext } from "react";

export type Player = {
  name: string;
  scores: number[];
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
