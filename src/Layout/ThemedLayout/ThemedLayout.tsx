import { Outlet } from 'react-router';
import { ThemeProvider } from '@/components/ThemeProvider';

export const ThemedLayout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};
