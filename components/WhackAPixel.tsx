import React, { useEffect, useRef, useState } from "react";

const GRID_COLS = 4;
const GRID_ROWS = 5;
const INITIAL_INTERVAL = 1200; // slower start
const MIN_INTERVAL = 400;
const INTERVAL_STEP = 20; // slower speed-up

function getRandomCell(exclude: number | null) {
  let cell;
  do {
    cell = Math.floor(Math.random() * GRID_COLS * GRID_ROWS);
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
  const [showGithub, setShowGithub] = useState(false);

  // Start the game
  const startGame = () => {
    setScore(0);
    setMissed(0);
    setIntervalMs(INITIAL_INTERVAL);
    setRunning(true);
    setActiveCell(getRandomCell(null));
    setShowGithub(false);
  };

  // Stop the game
  const stopGame = () => {
    setRunning(false);
    // Keep the last cell and show the GitHub icon if 2+ misses
    if (missed >= 2) setShowGithub(true);
    else setActiveCell(null);
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
    if (missed === 2) setShowGithub(true);
  }, [missed]);

  // Handle whack
  const handleCellClick = (idx: number) => {
    // If X icon is visible, redirect to Twitter
    if (showGithub && idx === activeCell) {
      window.location.href = "https://twitter.com/Abhiboostin";
      return;
    }
    if (!running || idx !== activeCell) return;
    setScore((s) => s + 1);
    setIntervalMs((i) => Math.max(MIN_INTERVAL, i - INTERVAL_STEP));
    setActiveCell(getRandomCell(idx));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-2" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap');`}</style>
      <div className="flex items-center justify-center gap-3 mb-6">
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace', fontWeight: 'normal' }}
        >
          Whack-a-Pixel
        </h1>
        <img src="/icons%20and%20gifs/game1.gif" alt="Cheering pixel cat" className="w-12 h-12" />
      </div>
      <div className="mb-2 text-lg" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>Score: {score} {running && <span className="ml-4 text-red-400">Misses: {missed}/3</span>}</div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 48px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 48px)`,
          gap: 8,
          marginBottom: 24,
        }}
      >
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, idx) => (
          <button
            key={idx}
            className={`w-12 h-12 rounded-md flex items-center justify-center border border-neutral-700 bg-neutral-900 transition-all duration-75 ${
              (running && idx === activeCell && !showGithub) ? "bg-pink-500 animate-pulse" : ""
            }`}
            style={{
              boxShadow:
                (running && idx === activeCell && !showGithub)
                  ? "0 0 0 2px #fff, 0 0 8px 2px #ff90e8"
                  : undefined,
            }}
            onClick={() => handleCellClick(idx)}
            disabled={(!running && !showGithub) || (showGithub && idx !== activeCell)}
            aria-label={
              showGithub && idx === activeCell
                ? "Go to GitHub"
                : running && idx === activeCell
                ? "Whack me!"
                : undefined
            }
          >
            {((showGithub && idx === activeCell) || (missed === 2 && running && idx === activeCell)) ? (
              // Question mark icon
              <span className="text-2xl font-bold text-white">?</span>
            ) : running && idx === activeCell ? (
              <span style={{ fontSize: 28, filter: 'drop-shadow(0 0 2px #fff)' }}>🟪</span>
            ) : null}
          </button>
        ))}
      </div>
      {!running ? (
        <button
          className="px-6 py-2 rounded-lg bg-pink-600 text-white text-lg shadow hover:bg-pink-700 transition-colors"
          style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}
          onClick={startGame}
        >
          {score > 0 ? "Play Again" : "Start"}
        </button>
      ) : (
        <button
          className="px-4 py-1 rounded bg-neutral-800 text-neutral-300 text-sm mt-2"
          style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}
          onClick={stopGame}
        >
          Stop
        </button>
      )}
      {!running && score > 0 && (
        <div className="mt-4 text-xl text-green-400" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>Final Score: {score}</div>
      )}
      {!running && missed >= 3 && (
        <div className="mt-2 text-red-400" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>text me, imma help you imrpove your skills</div>
      )}
      {!running && (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="mb-4">but you can still hire me.</p>
          <button
            onClick={startGame}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 