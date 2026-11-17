import { Player, BoardState, GameResult } from "../types/game";

export const WINNING_COMBINATIONS: number[][] = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(board: BoardState): GameResult | null {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }

  if (board.every((cell) => cell !== null)) {
    return { winner: "draw", line: [] };
  }
  return null;
}
