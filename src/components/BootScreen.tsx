import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "Initializing system...",
  "Loading kernel modules...",
  "Mounting filesystem...",
  "Starting network services...",
  "Loading user profile...",
  "Compiling portfolio assets...",
  "System ready.",
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), 350);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="scanline fixed inset-0 pointer-events-none" />
          <div className="max-w-lg w-full px-6">
            <motion.h1
              className="neon-text-cyan font-mono text-2xl mb-8 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {">"} Kshitiz.exe v1.0
            </motion.h1>
            <div className="font-mono text-sm space-y-1">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    i === bootLines.length - 1
                      ? "neon-text-green font-bold"
                      : "text-muted-foreground"
                  }
                >
                  <span className="text-neon-cyan mr-2">[{String(i).padStart(2, "0")}]</span>
                  {line}
                </motion.div>
              ))}
              {visibleLines < bootLines.length && (
                <span className="terminal-cursor text-neon-cyan">█</span>
              )}
            </div>
            {visibleLines >= bootLines.length && (
              <motion.div
                className="mt-8 h-0.5 bg-neon-cyan/30 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-neon-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
