import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Sidebar } from '@/components/Sidebar';
import { AppHeader } from '@/components/AppHeader';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useLogout } from '@/hooks/useLogout';

export const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useUserProfile();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      logoutMutation.mutate({ refresh_token: refreshToken });
    } else {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/invoicing') return 'Invoicing Management';
    if (path === '/business') return 'Manage Business';
    if (path === '/customers') return 'Customers';
    if (path === '/settings') return 'Settings';
    if (path === '/support') return 'Support';
    return 'Dashboard';
  };

  const user = data;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userName={user.name}
        userEmail={user.email}
        userAvatar={user.photo_url || undefined}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader pageTitle={getPageTitle()} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
