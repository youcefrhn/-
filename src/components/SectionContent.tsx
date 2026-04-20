import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type RuqyahSection } from "../data/ruqyahData";
import { Quote, Copy, Check } from "lucide-react";

interface SectionContentProps {
  section: RuqyahSection;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
        copied 
          ? "bg-green-500/20 text-green-400 border border-green-500/40" 
          : "bg-islamic-gold/10 text-islamic-gold/60 hover:text-islamic-gold hover:bg-islamic-gold/20 border border-islamic-gold/20"
      }`}
      title={copied ? "تم النسخ" : "نسخ النص"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Check size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Copy size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
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
              
              <div className="flex flex-col gap-4">
                <p className={`${item.verse ? "quran-text text-center italic" : "text-islamic-white/90 leading-relaxed text-lg"}`}>
                  {item.text}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <CopyButton text={item.text} />
                  
                  {item.reference && (
                    <span className="text-xs font-bold text-islamic-gold/60 uppercase tracking-widest px-3 py-1 rounded-full bg-islamic-gold/10 border border-islamic-gold/20">
                      {item.reference}
                    </span>
                  )}
                </div>
              </div>
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
