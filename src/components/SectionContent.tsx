import { motion, AnimatePresence } from "motion/react";
import { type RuqyahSection } from "../data/ruqyahData";
import { Quote } from "lucide-react";

interface SectionContentProps {
  section: RuqyahSection;
}

export default function SectionContent({ section }: SectionContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pb-32 pt-24 px-6 max-w-md mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-islamic-gold/10 flex items-center justify-center border border-islamic-gold/30">
            <Quote className="text-islamic-gold" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-islamic-white">{section.title}</h2>
        </div>

        {section.content.subtitle && (
          <p className="text-islamic-gold font-medium mb-6 text-lg border-r-4 border-islamic-gold pr-4">
            {section.content.subtitle}
          </p>
        )}

        <div className="space-y-6">
          {section.content.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 relative overflow-hidden group hover:border-islamic-gold/40 transition-colors"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-islamic-gold/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-islamic-gold/10 transition-colors" />
              
              <p className={`${item.verse ? "quran-text text-center italic" : "text-islamic-white/90 leading-relaxed text-lg"}`}>
                {item.text}
              </p>
              
              {item.reference && (
                <div className="mt-4 flex justify-end">
                  <span className="text-xs font-bold text-islamic-gold/60 uppercase tracking-widest px-3 py-1 rounded-full bg-islamic-gold/10 border border-islamic-gold/20">
                    {item.reference}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Decorative divider at the end */}
        <div className="mt-12 flex items-center justify-center gap-4 opacity-20">
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-islamic-gold" />
          <div className="w-3 h-3 rotate-45 border border-islamic-gold" />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-islamic-gold" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
