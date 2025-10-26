import type { RouteObject } from 'react-router';
import Home from '@/pages/Home';
import { ThemedLayout } from '@/Layout/ThemedLayout';
import { Signup } from '@/pages/Signup';
import { Login } from '@/pages/Login';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <ThemedLayout />,
    children: [
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];
