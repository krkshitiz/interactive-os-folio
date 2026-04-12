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
  help       - Show this help
  about      - About me
  projects   - View projects
  skills     - View skills
  contact    - Contact info
  experience - Work experience
  clear      - Clear terminal
  neofetch   - System info`,
  about: `┌───────────────────────────────────┐
│  Kumar Kshitiz                    │
│  Software Engineer                │
│  Currently @ HERE Technologies    │
│  Mumbai, Maharashtra              │
│  Spring Boot · React · AWS        │
└───────────────────────────────────┘`,
  experience: `[01] HERE Technologies — SWE Trainee (May 2025–Present)
     • Spring Boot backend for release workflow automation
     • AWS (S3, DynamoDB) + MySQL integration
     • GitLab/Jenkins CI/CD pipeline integration
     • React dashboard for release tracking

[02] Design Karkhana — SWE Intern (Aug 2024–Feb 2025)
     • Built responsive web pages with React JS
     • Optimized performance & user experience`,
  projects: `[01] Resume Analyzer — AI-driven ATS scoring (Gemini API, Spring Boot)
[02] YT Bookmark Extension — Chrome extension (JS, Chrome APIs)
[03] Portfolio OS — This interactive portfolio (React, Framer Motion)`,
  skills: `Languages:  Java       █████████░ 90%
            JavaScript ████████░░ 80%
            Python     ██████░░░░ 65%
            SQL        ████████░░ 80%

Backend:    Spring Boot █████████░ 85%
            REST APIs   █████████░ 85%

Frontend:   React      ████████░░ 80%
            HTML/CSS   ████████░░ 80%

Cloud:      AWS        ███████░░░ 70%
Tools:      Git, JIRA, Postman, IntelliJ`,
  contact: `Email:    kumarkshitiz616@gmail.com
GitHub:   github.com/krkshitiz
LinkedIn: linkedin.com/in/kumar-kshitiz-565220218
Twitter:  @kumarkshitiz5`,
  neofetch: `    ╔══════════════╗
    ║  portfolio   ║    OS: PortfolioOS v1.0
    ║      OS      ║    Shell: terminal.tsx
    ╚══════════════╝    Runtime: React 18
                        Framework: Vite 5
    ██ ██ ██ ██         Theme: Neon Dark
                        User: Kumar Kshitiz`,
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

    const newLines: TerminalLine[] = [...lines, { type: "input", text: cmd }];

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
            {line.type === "input" && <span className="text-neon-green mr-1">❯</span>}
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
