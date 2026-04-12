import { motion } from "framer-motion";
import { MapPin, Calendar, Zap, GraduationCap, Building2 } from "lucide-react";

const AboutWindow = () => (
  <div className="space-y-4">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
        <span className="text-2xl">👨‍💻</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Software Engineer</h2>
        <p className="text-sm text-neon-cyan font-mono">Full-Stack Developer</p>
      </div>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-sm text-muted-foreground leading-relaxed"
    >
      B.Tech CSE graduate from DIT University (CGPA 8.35). Currently a Software Engineer Trainee at HERE Technologies,
      building workflow orchestration systems with Spring Boot, AWS, and React.
      Passionate about automation, clean architecture, and crafting great user experiences.
    </motion.p>

    <div className="grid grid-cols-1 gap-2">
      {[
        { icon: Building2, text: "HERE Technologies — SWE Trainee", color: "text-neon-cyan" },
        { icon: GraduationCap, text: "DIT University — B.Tech CSE (8.35)", color: "text-neon-purple" },
        { icon: MapPin, text: "Dehradun, Uttarakhand", color: "text-neon-green" },
        { icon: Zap, text: "Open to opportunities", color: "text-neon-cyan" },
      ].map(({ icon: Icon, text, color }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.05 }}
          className="flex items-center gap-2 text-sm"
        >
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-foreground/80">{text}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AboutWindow;
