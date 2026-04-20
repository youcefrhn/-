import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { type RuqyahSection } from "../data/ruqyahData";

interface NavigationProps {
  sections: RuqyahSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Navigation({ sections, activeId, onSelect }: NavigationProps) {
  // Show Home + next 4 key sections in bottom nav
  const mainTabs = sections.slice(0, 5); 

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-islamic-navy/90 backdrop-blur-xl border-t border-islamic-gold/10 px-2 pb-6 pt-2">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {mainTabs.map((section) => {
          // Dynamic icon resolution
          const IconComponent = (LucideIcons as any)[section.icon] || LucideIcons.HelpCircle;
          const isActive = activeId === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`relative flex flex-col items-center gap-1 p-2 transition-colors ${
                isActive ? "text-islamic-gold" : "text-islamic-white/40"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 w-12 h-1 bg-islamic-gold rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium transition-all ${isActive ? "scale-110" : ""}`}>
                {section.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
