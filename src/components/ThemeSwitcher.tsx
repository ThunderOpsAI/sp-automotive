'use client';

import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'default', name: 'Performance Blue & Charcoal (Default)', color: 'bg-blue-600' },
  { id: 'theme-copper', name: 'High-Vis Amber & Gunmetal', color: 'bg-amber-500' },
  { id: 'theme-terracotta', name: 'Motorsport Red & Carbon', color: 'bg-red-600' },
  { id: 'theme-emerald', name: 'Service Green & Titanium', color: 'bg-emerald-600' },
];

const THEME_STORAGE_KEY = 'sp-automotive-theme';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && ['default', 'theme-emerald', 'theme-terracotta', 'theme-copper'].includes(savedTheme)) {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    document.documentElement.classList.remove('theme-terracotta', 'theme-emerald', 'theme-copper', 'default');
    if (themeId !== 'default') {
      document.documentElement.classList.add(themeId);
    }
  };

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Storage access fallback
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-4 w-64 bg-surface-950 rounded-2xl shadow-2xl shadow-black/60 border border-surface-800 overflow-hidden"
          >
            <div className="p-4 border-b border-surface-800">
              <h3 className="text-white font-bold text-xs uppercase tracking-wider">Workshop Theme Palette</h3>
            </div>
            <div className="p-2 space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTheme === theme.id 
                      ? 'bg-surface-800 text-white' 
                      : 'text-surface-400 hover:text-white hover:bg-surface-900'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.color}`} />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Palette"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}
