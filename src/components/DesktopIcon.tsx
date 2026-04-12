import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  color: "cyan" | "purple" | "green";
  onClick: () => void;
}

const colorMap = {
  cyan: "text-neon-cyan hover:shadow-[var(--glow-cyan)]",
  purple: "text-neon-purple hover:shadow-[var(--glow-purple)]",
  green: "text-neon-green hover:shadow-[var(--glow-green)]",
};

const DesktopIcon = ({ icon: Icon, label, color, onClick }: DesktopIconProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-muted/30 group cursor-pointer ${colorMap[color]}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="glass w-14 h-14 flex items-center justify-center rounded-xl group-hover:border-current/40 transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-xs font-mono text-foreground/70 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
