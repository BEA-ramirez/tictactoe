import { Scores } from "@/types/game";

interface ScoreboardProps {
  scores: Scores;
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
}

export function Scoreboard({ scores, currentPlayer, winner }: ScoreboardProps) {
  const cards = [
    {
      label: "Player X",
      value: scores.X,
      accent: "text-sky-400",
      active: !winner && currentPlayer === "X",
    },
    {
      label: "Draws",
      value: scores.draw,
      accent: "text-slate-300",
      active: false,
    },
    {
      label: "Player O",
      value: scores.O,
      accent: "text-rose-400",
      active: !winner && currentPlayer === "O",
    },
  ];

  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-xl border p-3 text-center transition-all ${
            c.active
              ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
              : "border-slate-700 bg-slate-800/40"
          }`}
        >
          <div className="text-xs uppercase tracking-wider text-slate-400">
            {c.label}
          </div>
          <div className={`text-2xl font-bold ${c.accent}`}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}
