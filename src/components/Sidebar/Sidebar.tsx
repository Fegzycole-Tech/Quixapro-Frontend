import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import QuixaproLogoLight from '@/assets/QuixaproLogoLight.svg';
import QuixaproLogoDark from '@/assets/QuixaproLogoDark.svg';
import Avatar from 'boring-avatars';
import { cn } from '@/lib/utils';
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
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Sidebar = ({
  userName = 'Arthur Taylor',
  userEmail = 'arthur@alignui.com',
  userAvatar,
  onLogout,
  isOpen = false,
  onClose,
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
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'w-64 h-screen bg-card border-r border-border flex flex-col',
          'fixed md:static top-0 left-0 z-50 transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-center gap-2">
            <img
              src={theme === 'dark' ? QuixaproLogoLight : QuixaproLogoDark}
              alt="Quixapro Logo"
              className="w-8 h-8"
            />
            <h2 className="text-2xl text-primary font-recoleta font-extrabold dark:text-white">
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
    </>
  );
};
