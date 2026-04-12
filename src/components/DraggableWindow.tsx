import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

interface DraggableWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { w: number; h: number };
  children: React.ReactNode;
  color?: "cyan" | "purple" | "green";
}

const borderColors = {
  cyan: "border-neon-cyan/20",
  purple: "border-neon-purple/20",
  green: "border-neon-green/20",
};

const dotColors = {
  cyan: "bg-neon-cyan",
  purple: "bg-neon-purple",
  green: "bg-neon-green",
};

const DraggableWindow = ({
  title,
  isOpen,
  onClose,
  onFocus,
  zIndex,
  defaultPosition,
  defaultSize,
  children,
  color = "cyan",
}: DraggableWindowProps) => {
  const [position, setPosition] = useState(defaultPosition ?? { x: 100, y: 80 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        setPosition({
          x: dragRef.current.posX + (ev.clientX - dragRef.current.startX),
          y: Math.max(0, dragRef.current.posY + (ev.clientY - dragRef.current.startY)),
        });
      };
      const handleMouseUp = () => {
        dragRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position, onFocus, isMobile]
  );

  const size = defaultSize ?? { w: 500, h: 400 };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: isMinimized ? 0.95 : 1,
            height: isMinimized ? 44 : "auto",
          }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`glass-strong ${borderColors[color]} overflow-hidden shadow-2xl ${
            isMobile ? "relative w-full mb-4" : "fixed"
          }`}
          style={
            isMobile
              ? {}
              : {
                  left: position.x,
                  top: position.y,
                  width: size.w,
                  zIndex,
                }
          }
          onMouseDown={onFocus}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 h-11 border-b border-border/50 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${dotColors[color]} animate-glow-pulse`} />
              <span className="text-xs font-mono text-muted-foreground">{title}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          {/* Content */}
          {!isMinimized && (
            <div
              className="overflow-y-auto p-4"
              style={isMobile ? { maxHeight: 400 } : { maxHeight: size.h - 44 }}
            >
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DraggableWindow;
