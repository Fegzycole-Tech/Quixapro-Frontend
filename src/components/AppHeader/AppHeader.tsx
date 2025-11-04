import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppStore } from '@/store/use-app-store';
import QuixaproLogoLight from '@/assets/QuixaproLogoLight.svg';
import QuixaproLogoDark from '@/assets/QuixaproLogoDark.svg';

interface AppHeaderProps {
  pageTitle?: string;
  onMenuClick?: () => void;
  className?: string;
}

export const AppHeader = ({
  pageTitle = 'Dashboard',
  onMenuClick,
  className = '',
}: AppHeaderProps) => {
  const { theme } = useAppStore();

  return (
    <header className={`bg-card dark:bg-background border-b border-border ${className}`}>
      <div className="flex w-full justify-between items-center py-4 px-4 md:px-10">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <img
            src={theme === 'dark' ? QuixaproLogoLight : QuixaproLogoDark}
            alt="Quixapro Logo"
            className="w-7 h-7"
          />
        </div>

        <span className="hidden md:block text-sm bg-background dark:bg-card px-4 py-2 rounded-lg font-medium text-gray-900 dark:text-white">
          {pageTitle}
        </span>

        <ThemeToggle />
      </div>
    </header>
  );
};
