import { SidebarNavItem } from '../SidebarNavItem';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarNavSectionProps {
  title: string;
  items: NavItem[];
}

export const SidebarNavSection = ({ title, items }: SidebarNavSectionProps) => {
  return (
    <div>
      <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <SidebarNavItem
            key={item.path}
            label={item.label}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </nav>
    </div>
  );
};
