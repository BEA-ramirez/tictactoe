"use client";

import { Cell } from "@/types/game";
import { cn } from "@/lib/utils";

const ICONS = { X: "💣", O: "🧨" };

interface SquareProps {
  value: Cell;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-24 w-24 items-center justify-center rounded-2xl text-5xl font-bold",
        "bg-slate-800/60 backdrop-blur-sm border border-slate-700",
        "transition-all duration-200 hover:bg-slate-700/60 hover:scale-105",
        "disabled:cursor-not-allowed",
        isWinning &&
          "bg-emerald-500/30 border-emerald-400 scale-105 animate-pulse",
        value === "X" && "text-sky-400",
        value === "O" && "text-rose-400",
      )}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      <span className={cn(value && "animate-[pop_0.3s_ease-out]")}>
        {value ? ICONS[value] : null}
      </span>
    </button>
  );
}
