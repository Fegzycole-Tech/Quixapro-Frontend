import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const SidebarNavItem = ({ label, icon, path }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer relative',
          isActive
            ? 'bg-background dark:bg-card text-primary dark:text-white before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary before:dark:bg-blue-400 before:rounded-r-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};
