import { Outlet } from 'react-router';
import { ThemeProvider } from '../ThemeProvider';

export const ThemedLayout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};
