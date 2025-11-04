import { ThemeToggle } from '@/components/ThemeToggle';

interface AppHeaderProps {
  pageTitle?: string;
  className?: string;
}

export const AppHeader = ({
  pageTitle = 'Dashboard',
  className = '',
}: AppHeaderProps) => {
  return (
    <header className={`bg-card dark:bg-background border-b border-border ${className}`}>
      <div className="flex w-full justify-between items-center py-4 px-10">
        <span className="text-sm bg-background dark:bg-card px-4 py-2 rounded-lg font-medium text-gray-900 dark:text-white">
          {pageTitle}
        </span>

        <ThemeToggle />
      </div>
    </header>
  );
};
