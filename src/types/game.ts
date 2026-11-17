export type Player = "X" | "O";
export type Cell = Player | null;
export type BoardState = Cell[];

export interface GameResult {
  winner: Player | "draw";
  line: number[];
}

export interface Scores {
  X: number;
  O: number;
  draw: number;
}
