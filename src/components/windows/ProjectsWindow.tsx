import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Custom Workflow Orchestrator",
    desc: "End-to-end release lifecycle automation across multiple internal products at HERE Technologies. Integrated with GitLab, Jenkins, AWS S3, DynamoDB, and MySQL.",
    stack: ["Spring Boot", "React", "AWS", "MySQL", "Jenkins"],
    color: "neon-cyan",
  },
  {
    title: "Resume Analyzer & Job Recommender",
    desc: "Full-stack AI-driven resume evaluation using Google Gemini API and Apache Tika for ATS scoring. Integrated Adzuna API for job recommendations.",
    stack: ["Spring Boot", "React", "MySQL", "Gemini API", "JPA"],
    color: "neon-purple",
  },
  {
    title: "YT Bookmark Chrome Extension",
    desc: "Chrome extension to save and navigate YouTube video timestamps with custom labels. Persistent storage with Chrome Sync API and cross-device sync.",
    stack: ["JavaScript", "HTML", "CSS", "Chrome APIs"],
    color: "neon-green",
  },
  {
    title: "Portfolio OS",
    desc: "This interactive OS-style portfolio you're exploring right now.",
    stack: ["React", "TypeScript", "Framer Motion", "Tailwind"],
    color: "neon-cyan",
  },
];

const colorBorder: Record<string, string> = {
  "neon-cyan": "border-neon-cyan/20 hover:border-neon-cyan/50",
  "neon-purple": "border-neon-purple/20 hover:border-neon-purple/50",
  "neon-green": "border-neon-green/20 hover:border-neon-green/50",
};

const colorText: Record<string, string> = {
  "neon-cyan": "text-neon-cyan",
  "neon-purple": "text-neon-purple",
  "neon-green": "text-neon-green",
};

const ProjectsWindow = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {projects.map((p, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
        className={`rounded-xl border bg-surface/50 p-4 transition-all duration-300 cursor-pointer group ${colorBorder[p.color]}`}
        whileHover={{ y: -2 }}
      >
        <h3 className={`text-sm font-semibold ${colorText[p.color]} mb-1`}>{p.title}</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{p.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {p.stack.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground font-mono">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer" />
          <Github className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      </motion.div>
    ))}
  </div>
);

export default ProjectsWindow;
