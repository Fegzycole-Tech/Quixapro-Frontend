import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Settings,
  HeadphonesIcon,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import QuixaproLogoLight from '@/assets/QuixaproLogoLight.svg';
import QuixaproLogoDark from '@/assets/QuixaproLogoDark.svg';
import Avatar from 'boring-avatars';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarNavSection } from './SidebarNavSection';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onLogout?: () => void;
  className?: string;
}

export const Sidebar = ({
  userName = 'Arthur Taylor',
  userEmail = 'arthur@alignui.com',
  userAvatar,
  onLogout,
  className = '',
}: SidebarProps) => {
  const { theme } = useAppStore();

  const mainNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      label: 'Invoicing Management',
      icon: <FileText className="w-5 h-5" />,
      path: '/invoicing',
    },
    {
      label: 'Manage Business',
      icon: <Building2 className="w-5 h-5" />,
      path: '/business',
    },
    {
      label: 'Customers',
      icon: <Users className="w-5 h-5" />,
      path: '/customers',
    },
  ];

  const otherNavItems: NavItem[] = [
    {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
    },
    {
      label: 'Support',
      icon: <HeadphonesIcon className="w-5 h-5" />,
      path: '/support',
    },
  ];

  return (
    <aside
      className={`w-64 h-screen bg-card border-r border-border flex flex-col ${className}`}
    >
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          <img
            src={theme === 'dark' ? QuixaproLogoLight : QuixaproLogoDark}
            alt="Quixapro Logo"
            className="w-8 h-8"
          />
          <h2 className="text-xl text-primary font-recoleta font-extrabold dark:text-white">
            Quixapro
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 dark:bg-background space-y-8">
        <SidebarNavSection title="Main" items={mainNavItems} />
        <SidebarNavSection title="Other" items={otherNavItems} />
      </div>

      <div className="p-4 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Avatar
                    size={40}
                    name={userName}
                    variant="beam"
                    colors={[
                      '#123283',
                      '#4F46E5',
                      '#7C3AED',
                      '#EC4899',
                      '#F59E0B',
                    ]}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userEmail}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={onLogout}
              className="text-red-600 dark:text-red-400 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
