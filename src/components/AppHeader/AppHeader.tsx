import { ThemeToggle } from '@/components/ThemeToggle';

interface AppHeaderProps {
  pageTitle?: string;
  className?: string;
}

export const AppHeader = ({
  pageTitle = 'Dashboard',
  className = ''
}: AppHeaderProps) => {
  return (
    <header
      className={`bg-card border-b border-border ${className}`}
    >
      <div className="flex w-full justify-between items-center py-4 px-8">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {pageTitle}
        </h1>

        <ThemeToggle />
      </div>
    </header>
  );
};
