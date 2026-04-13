import { motion } from "framer-motion";

const DesktopHero = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full border border-neon-cyan/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full border border-neon-purple/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[160px] h-[160px] rounded-full border border-neon-green/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing core glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(185 100% 50% / 0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center text */}
      <div className="relative text-center z-10">
        <motion.h1
          className="font-mono text-4xl font-bold tracking-widest neon-text-cyan"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          KSHITIZ
        </motion.h1>
        <motion.p
          className="font-mono text-sm text-muted-foreground mt-2 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Software Engineer
        </motion.p>
        <motion.div
          className="mt-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-xs text-neon-green/70">
            SYSTEM ONLINE
          </span>
        </motion.div>
      </div>

      {/* Corner accents */}
      {[
        "top-[calc(50%-180px)] left-[calc(50%-180px)]",
        "top-[calc(50%-180px)] right-[calc(50%-180px)] rotate-90",
        "bottom-[calc(50%-180px)] left-[calc(50%-180px)] -rotate-90",
        "bottom-[calc(50%-180px)] right-[calc(50%-180px)] rotate-180",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-6 h-6 border-l border-t border-neon-cyan/20`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15 }}
        />
      ))}
    </div>
  );
};

export default DesktopHero;
