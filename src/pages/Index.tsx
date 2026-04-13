import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import GridBackground from "@/components/GridBackground";
import StarfieldBackground from "@/components/StarfieldBackground";
import DesktopIcon from "@/components/DesktopIcon";
import DraggableWindow from "@/components/DraggableWindow";
import Taskbar from "@/components/Taskbar";
import Terminal from "@/components/Terminal";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import { User, Briefcase, Code, Mail, Terminal as TerminalIcon } from "lucide-react";

type WindowId = "about" | "projects" | "skills" | "contact" | "terminal";

interface WindowState {
  isOpen: boolean;
  zIndex: number;
}

const windowConfigs: Record<
  WindowId,
  { title: string; color: "cyan" | "purple" | "green"; pos: { x: number; y: number }; size: { w: number; h: number } }
> = {
  about: { title: "about.exe", color: "cyan", pos: { x: 80, y: 60 }, size: { w: 420, h: 340 } },
  projects: { title: "projects.exe", color: "purple", pos: { x: 200, y: 100 }, size: { w: 550, h: 450 } },
  skills: { title: "skills.exe", color: "green", pos: { x: 320, y: 80 }, size: { w: 400, h: 380 } },
  contact: { title: "contact.exe", color: "cyan", pos: { x: 400, y: 140 }, size: { w: 400, h: 320 } },
  terminal: { title: "terminal.exe", color: "green", pos: { x: 150, y: 200 }, size: { w: 520, h: 360 } },
};

const desktopIcons: { id: WindowId; icon: typeof User; label: string; color: "cyan" | "purple" | "green" }[] = [
  { id: "about", icon: User, label: "About", color: "cyan" },
  { id: "projects", icon: Briefcase, label: "Projects", color: "purple" },
  { id: "skills", icon: Code, label: "Skills", color: "green" },
  { id: "contact", icon: Mail, label: "Contact", color: "cyan" },
  { id: "terminal", icon: TerminalIcon, label: "Terminal", color: "green" },
];

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    about: { isOpen: false, zIndex: 1 },
    projects: { isOpen: false, zIndex: 1 },
    skills: { isOpen: false, zIndex: 1 },
    contact: { isOpen: false, zIndex: 1 },
    terminal: { isOpen: false, zIndex: 1 },
  });
  const [topZ, setTopZ] = useState(10);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  const toggleWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const w = prev[id];
        const newZ = topZ + 1;
        setTopZ(newZ);
        return { ...prev, [id]: { isOpen: !w.isOpen, zIndex: newZ } };
      });
    },
    [topZ]
  );

  const focusWindow = useCallback(
    (id: WindowId) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setWindows((prev) => ({ ...prev, [id]: { ...prev[id], zIndex: newZ } }));
    },
    [topZ]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
  }, []);

  const handleTerminalCommand = useCallback(
    (cmd: string) => {
      const mapping: Record<string, WindowId> = {
        about: "about",
        projects: "projects",
        skills: "skills",
        contact: "contact",
      };
      const wid = mapping[cmd];
      if (wid && !windows[wid].isOpen) {
        toggleWindow(wid);
      }
    },
    [windows, toggleWindow]
  );

  const openWindowIds = Object.entries(windows)
    .filter(([, v]) => v.isOpen)
    .map(([k]) => k);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          <GridBackground />

          {/* Mobile layout */}
          <div className="md:hidden p-4 pb-16 h-full overflow-y-auto space-y-4 relative z-10">
            <h1 className="neon-text-cyan font-mono text-lg font-bold mb-4">Kshitiz.exe</h1>
            
            {/* Mobile icon grid */}
            <div className="grid grid-cols-5 gap-1 mb-4">
              {desktopIcons.map((di) => (
                <DesktopIcon key={di.id} {...di} onClick={() => toggleWindow(di.id)} />
              ))}
            </div>

            {/* Mobile windows as stacked cards */}
            {(Object.keys(windows) as WindowId[]).map((id) => {
              const cfg = windowConfigs[id];
              const w = windows[id];
              return (
                <DraggableWindow
                  key={id}
                  id={id}
                  title={cfg.title}
                  isOpen={w.isOpen}
                  onClose={() => closeWindow(id)}
                  onFocus={() => focusWindow(id)}
                  zIndex={w.zIndex}
                  color={cfg.color}
                >
                  {id === "about" && <AboutWindow />}
                  {id === "projects" && <ProjectsWindow />}
                  {id === "skills" && <SkillsWindow />}
                  {id === "contact" && <ContactWindow />}
                  {id === "terminal" && <Terminal onCommand={handleTerminalCommand} />}
                </DraggableWindow>
              );
            })}
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block h-full relative z-10">
            {/* Desktop icons */}
            <div className="absolute top-6 left-6 flex flex-col gap-1">
              {desktopIcons.map((di) => (
                <DesktopIcon key={di.id} {...di} onClick={() => toggleWindow(di.id)} />
              ))}
            </div>

            {/* Windows */}
            {(Object.keys(windows) as WindowId[]).map((id) => {
              const cfg = windowConfigs[id];
              const w = windows[id];
              return (
                <DraggableWindow
                  key={id}
                  id={id}
                  title={cfg.title}
                  isOpen={w.isOpen}
                  onClose={() => closeWindow(id)}
                  onFocus={() => focusWindow(id)}
                  zIndex={w.zIndex}
                  defaultPosition={cfg.pos}
                  defaultSize={cfg.size}
                  color={cfg.color}
                >
                  {id === "about" && <AboutWindow />}
                  {id === "projects" && <ProjectsWindow />}
                  {id === "skills" && <SkillsWindow />}
                  {id === "contact" && <ContactWindow />}
                  {id === "terminal" && <Terminal onCommand={handleTerminalCommand} />}
                </DraggableWindow>
              );
            })}
          </div>

          <Taskbar openWindows={openWindowIds} onIconClick={(id) => toggleWindow(id as WindowId)} />
        </>
      )}
    </div>
  );
};

export default Index;
