"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Board } from "@/components/Board";
import { Scoreboard } from "@/components/Scoreboard";
import { GameStatus } from "@/components/GameStatus";
import { calculateWinner } from "@/lib/game-logic";
import { BoardState, Player, Scores } from "@/types/game";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const EMPTY_BOARD: BoardState = Array(9).fill(null);

export default function Home() {
  const [board, setBoard] = useState<BoardState>(EMPTY_BOARD);
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draw: 0 });

  const result = useMemo(() => calculateWinner(board), [board]);
  const currentPlayer: Player = isXNext ? "X" : "O";

  // Fire confetti on win (once per result)
  useEffect(() => {
    if (result?.winner && result.winner !== "draw") {
      // 💥 explosion burst
      confetti({
        particleCount: 150,
        spread: 120,
        startVelocity: 55,
        origin: { y: 0.6 },
        colors: ["#f97316", "#ef4444", "#fbbf24", "#dc2626"],
        shapes: ["circle", "square"],
      });
      // second wave for oomph
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ["#f97316", "#ef4444"],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ["#f97316", "#ef4444"],
        });
      }, 200);
    }
  }, [result]);

  const handleSquareClick = useCallback(
    (index: number) => {
      if (board[index] || result) return;
      const next = [...board];
      next[index] = currentPlayer;
      setBoard(next);

      const newResult = calculateWinner(next);
      if (newResult) {
        if (newResult.winner === "draw") {
          setScores((s) => ({ ...s, draw: s.draw + 1 }));
        } else {
          setScores((s) => ({
            ...s,
            [newResult.winner]: s[newResult.winner] + 1,
          }));
        }
      } else {
        setIsXNext(!isXNext);
      }
    },
    [board, currentPlayer, result, isXNext],
  );

  const resetGame = useCallback(() => {
    setBoard(EMPTY_BOARD);
    setIsXNext(true);
  }, []);

  const resetAll = useCallback(() => {
    resetGame();
    setScores({ X: 0, O: 0, draw: 0 });
  }, [resetGame]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="bg-linear-to-r from-sky-400 via-emerald-400 to-rose-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Tic-Tac-Toe
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            First to align three marks wins
          </p>
        </header>

        <Scoreboard
          scores={scores}
          currentPlayer={currentPlayer}
          winner={result?.winner ?? null}
        />

        <GameStatus result={result} currentPlayer={currentPlayer} />
        <div
          className={cn(
            result?.winner &&
              result.winner !== "draw" &&
              "animate-[shake_0.5s_ease-in-out]",
          )}
        >
          <Board
            board={board}
            onSquareClick={handleSquareClick}
            winningLine={result?.line ?? []}
            disabled={!!result}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={resetGame}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            New Game
          </Button>
          <Button onClick={resetAll} size="lg" variant="outline">
            Reset Scores
          </Button>
        </div>
      </div>
      {result?.winner && result.winner !== "draw" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          {/* white flash */}
          <div className="absolute inset-0 bg-white animate-[explode-flash_0.4s_ease-out_forwards]" />

          {/* orange shockwave ring */}
          <div className="absolute h-64 w-64 rounded-full border-orange-400 animate-[shockwave_0.6s_ease-out_forwards]" />

          {/* second ring */}
          <div className="absolute h-64 w-64 rounded-full border-yellow-300 animate-[shockwave_0.8s_ease-out_0.1s_forwards]" />

          {/* big center icon */}
          <span className="text-[12rem] animate-[explode-ring_0.7s_ease-out_forwards]">
            💥
          </span>
        </div>
      )}

      {result?.winner === "draw" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="animate-[pop_0.5s_ease-out] flex flex-col items-center gap-3">
            <img
              src="/okcat-ok-cat.gif"
              alt="Bomb defused cat"
              className="max-h-[400px] rounded-2xl border-2 border-emerald-400 shadow-2xl shadow-emerald-500/40"
            />
            <p className="rounded-full bg-emerald-500 px-6 py-2 text-xl font-bold text-slate-950">
              Bomb Defused 🤝
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
