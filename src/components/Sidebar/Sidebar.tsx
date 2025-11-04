import { LayoutDashboard, FileText, Building2, Users, Settings, HeadphonesIcon, LogOut, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import QuixaproLogoLight from '@/assets/QuixaproLogoLight.svg';
import QuixaproLogoDark from '@/assets/QuixaproLogoDark.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  className?: string;
}

export const Sidebar = ({
  userName = 'Arthur Taylor',
  userEmail = 'arthur@alignui.com',
  userAvatar,
  currentPath = '/dashboard',
  onNavigate,
  onLogout,
  className = '',
}: SidebarProps) => {
  const { theme } = useAppStore();

  const mainNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { label: 'Invoicing Management', icon: <FileText className="w-5 h-5" />, path: '/invoicing' },
    { label: 'Manage Business', icon: <Building2 className="w-5 h-5" />, path: '/business' },
    { label: 'Customers', icon: <Users className="w-5 h-5" />, path: '/customers' },
  ];

  const otherNavItems: NavItem[] = [
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
    { label: 'Support', icon: <HeadphonesIcon className="w-5 h-5" />, path: '/support' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate?.(path);
  };

  return (
    <aside
      className={`w-64 h-screen bg-card border-r border-border flex flex-col ${className}`}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={theme === 'dark' ? QuixaproLogoLight : QuixaproLogoDark}
            alt="Quixapro Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Quixapro
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-8">
          <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Main
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Other
          </h3>
          <nav className="space-y-1">
            {otherNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
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
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
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
