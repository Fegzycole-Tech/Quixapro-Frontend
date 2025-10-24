import type { RouteObject } from 'react-router';
import Home from '../pages/Home';
import { ThemedLayout } from '../components/Layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <ThemedLayout />,
    children: [],
  },
];
