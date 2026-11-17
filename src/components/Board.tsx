"use client";

import { BoardState } from "@/types/game";
import { Square } from "./Square";
import { WINNING_COMBINATIONS } from "@/lib/game-logic";

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[];
  disabled: boolean;
}

export function Board({
  board,
  onSquareClick,
  winningLine,
  disabled,
}: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {board.map((cell, index) => (
        <Square
          key={index}
          value={cell}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine.includes(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
