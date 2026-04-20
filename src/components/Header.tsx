import { motion } from "motion/react";
import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-islamic-navy/80 backdrop-blur-lg border-b border-islamic-gold/20 px-6 py-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-islamic-gold shadow-lg shadow-islamic-gold/20 bg-islamic-navy-light">
            <img 
              src="https://picsum.photos/seed/gold-calligraphy/200/200" 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-islamic-gold leading-tight">الرقية الشرعية</h1>
            <p className="text-[10px] text-islamic-white/60 tracking-wider uppercase font-medium">Kitab wa Sunnah</p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-4 text-islamic-gold/80">
          <button className="p-2 hover:bg-islamic-navy-light rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-islamic-navy-light rounded-full transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
