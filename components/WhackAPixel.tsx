import React, { useEffect, useRef, useState } from "react";

const GRID_SIZE = 5;
const INITIAL_INTERVAL = 1200; // slower start
const MIN_INTERVAL = 400;
const INTERVAL_STEP = 20; // slower speed-up

function getRandomCell(exclude: number | null) {
  let cell;
  do {
    cell = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
  } while (cell === exclude);
  return cell;
}

export default function WhackAPixel() {
  const [score, setScore] = useState(0);
  const [interval, setIntervalMs] = useState(INITIAL_INTERVAL);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [missed, setMissed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the game
  const startGame = () => {
    setScore(0);
    setMissed(0);
    setIntervalMs(INITIAL_INTERVAL);
    setRunning(true);
    setActiveCell(getRandomCell(null));
  };

  // Stop the game
  const stopGame = () => {
    setRunning(false);
    setActiveCell(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Main game loop
  useEffect(() => {
    if (!running) return;
    timerRef.current = setTimeout(() => {
      setMissed((m) => m + 1);
      setActiveCell((prev) => getRandomCell(prev));
    }, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeCell, running, interval]);

  // End game if too many misses
  useEffect(() => {
    if (missed >= 3) stopGame();
  }, [missed]);

  // Handle whack
  const handleCellClick = (idx: number) => {
    if (!running || idx !== activeCell) return;
    setScore((s) => s + 1);
    setIntervalMs((i) => Math.max(MIN_INTERVAL, i - INTERVAL_STEP));
    setActiveCell(getRandomCell(idx));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-2">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Whack-a-Pixel</h1>
      <div className="mb-2 text-lg">Score: {score} {running && <span className="ml-4 text-red-400">Misses: {missed}/3</span>}</div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 48px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 48px)`,
          gap: 8,
          marginBottom: 24,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
          <button
            key={idx}
            className={`w-12 h-12 rounded-md flex items-center justify-center border border-neutral-700 bg-neutral-900 transition-all duration-75 ${
              running && idx === activeCell ? "bg-pink-500 animate-pulse" : ""
            }`}
            style={{
              boxShadow:
                running && idx === activeCell
                  ? "0 0 0 2px #fff, 0 0 8px 2px #ff90e8"
                  : undefined,
            }}
            onClick={() => handleCellClick(idx)}
            disabled={!running}
            aria-label={running && idx === activeCell ? "Whack me!" : undefined}
          >
            {running && idx === activeCell ? (
              // Pixel art target (simple 8x8 pink pixel)
              <span style={{ fontSize: 28, filter: 'drop-shadow(0 0 2px #fff)' }}>🟪</span>
            ) : null}
          </button>
        ))}
      </div>
      {!running ? (
        <button
          className="px-6 py-2 rounded-lg bg-pink-600 text-white text-lg font-semibold shadow hover:bg-pink-700 transition-colors"
          onClick={startGame}
        >
          {score > 0 ? "Play Again" : "Start"}
        </button>
      ) : (
        <button
          className="px-4 py-1 rounded bg-neutral-800 text-neutral-300 text-sm mt-2"
          onClick={stopGame}
        >
          Stop
        </button>
      )}
      {!running && score > 0 && (
        <div className="mt-4 text-xl text-green-400 font-bold">Final Score: {score}</div>
      )}
      {!running && missed >= 3 && (
        <div className="mt-2 text-red-400">Game Over! Too many misses.</div>
      )}
    </div>
  );
} 