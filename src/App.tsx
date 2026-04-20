/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import SectionContent from "./components/SectionContent";
import { ruqyahData, type RuqyahSection } from "./data/ruqyahData";
import { LayoutGrid, ArrowLeft } from "lucide-react";

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>("home");
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  
  const activeSection = ruqyahData.find(s => s.id === activeSectionId);

  if (isSplashScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-islamic-navy flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-islamic-gold shadow-2xl shadow-islamic-gold/30 mb-6 mx-auto bg-islamic-navy-light">
            <img 
              src="https://picsum.photos/seed/gold-calligraphy/400/400" 
              alt="الرقية الشرعية" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-bold text-islamic-gold mb-2">الرقية الشرعية</h1>
          <div className="h-1 w-12 bg-islamic-gold/40 mx-auto rounded-full" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-16 w-full px-12"
        >
          <div className="h-0.5 w-full bg-islamic-gold/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onAnimationComplete={() => setIsSplashScreen(false)}
              className="h-full bg-islamic-gold"
            />
          </div>
          <p className="mt-4 text-islamic-gold/40 text-xs font-medium tracking-widest uppercase">Loading Guidance</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-islamic-navy selection:bg-islamic-gold selection:text-islamic-navy">
      <Header />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {activeSectionId === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-32 px-6 max-w-md mx-auto"
            >
              <div className="mb-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 inline-block p-1 rounded-full border-2 border-islamic-gold/20"
                >
                  <img 
                    src="https://picsum.photos/seed/optimism-islamic/400/400" 
                    alt="Islamic Art" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-islamic-gold shadow-lg shadow-islamic-gold/20"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <h2 className="text-3xl font-bold text-islamic-white mb-2">أهلاً بك</h2>
                <p className="text-islamic-white/60">دليلك الشامل للرقية الشرعية من الكتاب والسنة</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {ruqyahData.map((section, idx) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveSectionId(section.id)}
                    className="glass-card p-5 flex items-center justify-between group active:scale-95 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-islamic-gold/10 flex items-center justify-center text-islamic-gold group-hover:bg-islamic-gold group-hover:text-islamic-navy transition-colors">
                        <LayoutGrid size={20} />
                      </div>
                      <span className="text-lg font-bold text-islamic-white/90">{section.title}</span>
                    </div>
                    <ArrowLeft size={18} className="text-islamic-gold/40 group-hover:text-islamic-gold transition-colors" />
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-islamic-gold/20 to-transparent border border-islamic-gold/10">
                <h3 className="text-islamic-gold font-bold mb-2 italic">نصيحة اليوم</h3>
                <p className="text-islamic-white/70 text-sm leading-relaxed">
                  الرقية تنفع مما نزل ومما لم ينزل، فعليك بالدعاء والتوجه إلى الله بقلب حاضر.
                </p>
              </div>
            </motion.div>
          ) : (
            activeSection && (
              <div key={activeSection.id}>
                {/* Back button for deep views */}
                <button 
                  onClick={() => setActiveSectionId("home")}
                  className="fixed top-20 right-6 z-40 p-2 glass-card rounded-full text-islamic-gold/80 hover:text-islamic-gold transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <SectionContent section={activeSection} />
              </div>
            )
          )}
        </AnimatePresence>
      </main>

      <Navigation 
        sections={[{ id: "home", title: "الرئيسية", icon: "Home", content: { items: [] } }, ...ruqyahData]} 
        activeId={activeSectionId} 
        onSelect={setActiveSectionId} 
      />
    </div>
  );
}

