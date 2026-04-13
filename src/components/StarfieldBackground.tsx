import { useMemo } from "react";

const StarfieldBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: Math.random() * 60 + 5,
      delay: i * 6 + Math.random() * 4,
      duration: 1.5 + Math.random(),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.id % 5 === 0
              ? "hsl(var(--neon-purple))"
              : s.id % 3 === 0
              ? "hsl(var(--neon-green))"
              : "hsl(var(--neon-cyan))",
            opacity: s.opacity,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="absolute h-px"
          style={{
            top: `${s.top}%`,
            left: "-5%",
            width: 60,
            background: "linear-gradient(90deg, transparent, hsl(var(--neon-cyan)), transparent)",
            animation: `shooting-star ${s.duration}s linear ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default StarfieldBackground;
