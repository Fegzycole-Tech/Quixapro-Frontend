import type { RouteObject } from 'react-router';
import Home from '@/pages/Home';
import { ThemedLayout } from '@/Layout/ThemedLayout';
import { AuthenticatedLayout } from '@/Layout/AuthenticatedLayout';
import { Signup } from '@/pages/Signup';
import { Login } from '@/pages/Login';
import { ForgotPassword } from '@/pages/ForgotPassword/ForgotPassword';
import { Verify } from '@/pages/Verify';
import { ResetPassword } from '@/pages/ResetPassword';
import { Dashboard } from '@/pages/Dashboard';

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
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/verify',
        element: <Verify />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <ThemedLayout />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];
