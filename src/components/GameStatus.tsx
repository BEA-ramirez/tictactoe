import { Player, GameResult } from "@/types/game";

interface GameStatusProps {
  result: GameResult | null;
  currentPlayer: Player;
}

export function GameStatus({ result, currentPlayer }: GameStatusProps) {
  if (result?.winner === "draw") {
    return (
      <p className="text-xl font-semibold text-amber-400">It&apos;s a draw!</p>
    );
  }
  if (result?.winner) {
    return (
      <p
        className={`text-xl font-semibold ${result.winner === "X" ? "text-sky-400" : "text-rose-400"}`}
      >
        Player {result.winner} wins! 🎉
      </p>
    );
  }
  return (
    <p className="text-lg text-slate-300">
      Current turn:{" "}
      <span
        className={
          currentPlayer === "X"
            ? "text-sky-400 font-bold"
            : "text-rose-400 font-bold"
        }
      >
        {currentPlayer}
      </span>
    </p>
  );
}
