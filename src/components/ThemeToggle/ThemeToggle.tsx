import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'default' | 'auth';
}

export const ThemeToggle = ({ variant = 'default' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 cursor-pointer',
        variant === 'auth'
          ? 'bg-white/10 hover:bg-white/20'
          : 'bg-card hover:bg-gray-50 dark:hover:bg-gray-700 border border-border'
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          'absolute w-5 h-5 transition-all duration-300',
          variant === 'auth' ? 'text-white' : 'text-foreground',
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        )}
      />
      <Moon
        className={cn(
          'absolute w-5 h-5 transition-all duration-300',
          variant === 'auth' ? 'text-white' : 'text-foreground',
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        )}
      />
    </button>
  );
};
