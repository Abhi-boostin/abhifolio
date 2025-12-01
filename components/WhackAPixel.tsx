import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 relative overflow-hidden" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap');`}</style>

      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Game Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-neutral-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center max-w-md w-full"
        style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <h1
            className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400"
            style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace', fontWeight: 'normal' }}
          >
            Whack-a-Pixel
          </h1>
          <motion.img
            src="/icons%20and%20gifs/game1.gif"
            alt="Cheering pixel cat"
            className="w-12 h-12"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Score Board */}
        <div className="flex items-center justify-between w-full mb-6 px-4 py-2 bg-black/40 rounded-lg border border-white/5">
          <div className="text-lg text-neutral-300">Score: <span className="text-pink-500 font-bold">{score}</span></div>
          {running && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${i < missed ? 'bg-red-500' : 'bg-neutral-700'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Game Grid */}
        <div
          className="grid gap-3 mb-8 p-4 bg-black/20 rounded-xl border border-white/5"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all duration-200 relative overflow-hidden ${(running && idx === activeCell && !showGithub)
                  ? "bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)] border-2 border-white"
                  : "bg-neutral-800/50 border border-white/5 hover:bg-neutral-800"
                }`}
              onClick={() => handleCellClick(idx)}
              disabled={(!running && !showGithub) || (showGithub && idx !== activeCell)}
            >
              <AnimatePresence mode="wait">
                {((showGithub && idx === activeCell) || (missed === 2 && running && idx === activeCell)) ? (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="text-2xl font-bold text-white"
                  >
                    ?
                  </motion.span>
                ) : running && idx === activeCell ? (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    style={{ fontSize: 28, filter: 'drop-shadow(0 0 2px #fff)' }}
                  >
                    🟪
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Controls & Status */}
        <div className="h-20 flex flex-col items-center justify-center w-full">
          {!running ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all"
              onClick={startGame}
            >
              {score > 0 ? "PLAY AGAIN" : "START GAME"}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm hover:text-white hover:bg-neutral-700 transition-colors border border-white/5"
              onClick={stopGame}
            >
              END GAME
            </motion.button>
          )}

          <AnimatePresence>
            {!running && score > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 text-center"
              >
                <div className="text-2xl text-green-400 mb-1">Final Score: {score}</div>
                {missed >= 3 && (
                  <div className="text-sm text-neutral-400">
                    Game Over! <br />
                    <span className="text-white">but you can still hire me.</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}