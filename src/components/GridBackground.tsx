const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(185 100% 50% / 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(185 100% 50% / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Radial glow */}
    <div
      className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-20"
      style={{
        background: "radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] opacity-10"
      style={{
        background: "radial-gradient(circle, hsl(270 80% 60% / 0.2) 0%, transparent 70%)",
      }}
    />
    {/* Scanlines */}
    <div className="scanline absolute inset-0" />
  </div>
);

export default GridBackground;
