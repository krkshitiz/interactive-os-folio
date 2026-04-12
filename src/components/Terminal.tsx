import { useState, useRef, useEffect } from "react";

interface TerminalProps {
  onCommand?: (cmd: string) => void;
}

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

const commandResponses: Record<string, string> = {
  help: `Available commands:
  help     - Show this help
  about    - About me
  projects - View projects
  skills   - View skills
  contact  - Contact info
  clear    - Clear terminal
  neofetch - System info`,
  about: `┌─────────────────────────────┐
│  Full-Stack Developer       │
│  Passionate about building  │
│  immersive digital          │
│  experiences with modern    │
│  web technologies.          │
└─────────────────────────────┘`,
  projects: `[01] Portfolio OS — Interactive portfolio (React, Tailwind, Framer Motion)
[02] AI Dashboard — Real-time ML analytics (Python, React, D3)
[03] CryptoTracker — Live crypto monitoring (Next.js, WebSocket)
[04] DevConnect — Developer social platform (Node.js, GraphQL)`,
  skills: `Languages:  TypeScript ████████░░ 80%
            Python     ███████░░░ 70%
            Rust       █████░░░░░ 50%

Frontend:   React      █████████░ 90%
            Tailwind   ████████░░ 80%

Backend:    Node.js    ████████░░ 80%
            PostgreSQL ███████░░░ 70%`,
  contact: `Email:    hello@developer.dev
GitHub:   github.com/developer
LinkedIn: linkedin.com/in/developer
Twitter:  @developer`,
  neofetch: `    ╔══════════════╗
    ║  portfolio   ║    OS: PortfolioOS v1.0
    ║      OS      ║    Shell: terminal.tsx
    ╚══════════════╝    Runtime: React 18
                        Framework: Vite 5
    ██ ██ ██ ██         Theme: Neon Dark
                        Resolution: ∞ × ∞`,
};

const Terminal = ({ onCommand }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: 'Welcome to PortfolioOS Terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", text: cmd },
    ];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const response = commandResponses[cmd];
    if (response) {
      newLines.push({ type: "output", text: response });
    } else {
      newLines.push({
        type: "output",
        text: `Command not found: ${cmd}. Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setInput("");
    onCommand?.(cmd);
  };

  return (
    <div
      className="font-mono text-sm h-full flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-1 mb-2">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-neon-cyan" : "text-foreground/80"}>
            {line.type === "input" && (
              <span className="text-neon-green mr-1">❯</span>
            )}
            <pre className="whitespace-pre-wrap inline font-mono text-xs leading-relaxed">
              {line.text}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 border-t border-border/30 pt-2">
        <span className="text-neon-green">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-neon-cyan text-sm font-mono caret-neon-cyan"
          autoFocus
          spellCheck={false}
        />
        <span className="terminal-cursor text-neon-cyan text-xs">█</span>
      </form>
    </div>
  );
};

export default Terminal;
