import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { useState } from "react";

const links = [
  { icon: Mail, label: "hello@developer.dev", href: "mailto:hello@developer.dev", color: "text-neon-cyan" },
  { icon: Github, label: "github.com/developer", href: "#", color: "text-foreground/80" },
  { icon: Linkedin, label: "linkedin.com/in/developer", href: "#", color: "text-neon-cyan" },
  { icon: Twitter, label: "@developer", href: "#", color: "text-neon-purple" },
];

const ContactWindow = () => {
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {links.map(({ icon: Icon, label, href, color }, i) => (
          <motion.a
            key={i}
            href={href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 text-sm ${color} hover:text-neon-cyan transition-colors group`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono text-xs">{label}</span>
          </motion.a>
        ))}
      </div>
      <div className="border-t border-border/30 pt-3">
        <p className="text-xs text-muted-foreground mb-2 font-mono">Quick message:</p>
        <div className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted/30 rounded-lg px-3 py-2 text-xs font-mono outline-none border border-border/50 focus:border-neon-cyan/50 text-foreground transition-colors"
          />
          <button className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
