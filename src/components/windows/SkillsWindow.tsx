import { motion } from "framer-motion";

const skills = [
  { name: "Java", level: 90, color: "bg-neon-cyan" },
  { name: "Spring Boot", level: 85, color: "bg-neon-cyan" },
  { name: "React", level: 80, color: "bg-neon-cyan" },
  { name: "JavaScript", level: 80, color: "bg-neon-green" },
  { name: "SQL / MySQL", level: 80, color: "bg-neon-green" },
  { name: "AWS (S3, DynamoDB)", level: 70, color: "bg-neon-purple" },
  { name: "Python", level: 65, color: "bg-neon-purple" },
  { name: "REST APIs / Microservices", level: 85, color: "bg-neon-cyan" },
  { name: "Git / CI-CD", level: 75, color: "bg-neon-green" },
  { name: "HTML / CSS", level: 80, color: "bg-neon-green" },
];

const SkillsWindow = () => (
  <div className="space-y-3">
    {skills.map((skill, i) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <div className="flex justify-between text-xs mb-1">
          <span className="font-mono text-foreground/80">{skill.name}</span>
          <span className="font-mono text-muted-foreground">{skill.level}%</span>
        </div>
        <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${skill.color}/70`}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

export default SkillsWindow;
