import { motion } from "framer-motion";
import { Monitor, Terminal, User, Briefcase, Code, Mail } from "lucide-react";

interface TaskbarProps {
  openWindows: string[];
  onIconClick: (id: string) => void;
}

const icons = [
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
];

const Taskbar = ({ openWindows, onIconClick }: TaskbarProps) => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-12 bg-taskbar/90 backdrop-blur-xl border-t border-border/50 flex items-center justify-between px-4 z-[9999] md:flex"
      initial={{ y: 48 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", damping: 20 }}
    >
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/30 transition-colors cursor-pointer">
          <Monitor className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-mono text-muted-foreground hidden sm:inline">PortfolioOS</span>
        </div>
        <div className="w-px h-5 bg-border/50 mx-1" />
        {icons.map(({ id, icon: Icon, label }) => {
          const isOpen = openWindows.includes(id);
          return (
            <button
              key={id}
              onClick={() => onIconClick(id)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-mono transition-all ${
                isOpen
                  ? "bg-muted/50 text-neon-cyan"
                  : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{label}</span>
              {isOpen && (
                <div className="w-1 h-1 rounded-full bg-neon-cyan" />
              )}
            </button>
          );
        })}
      </div>
      <div className="text-xs font-mono text-muted-foreground">{time}</div>
    </motion.div>
  );
};

export default Taskbar;
