import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors duration-200 border border-border-primary"
      aria-label="Toggle theme"
    >
      <Sun
        className={`absolute w-5 h-5 text-text-primary transition-all duration-300 ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
        }`}
      />
      <Moon
        className={`absolute w-5 h-5 text-text-primary transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`}
      />
    </button>
  );
};
