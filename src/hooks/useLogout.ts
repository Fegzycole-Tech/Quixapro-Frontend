import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { logout, type LogoutRequest } from '@/lib/api/auth';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LogoutRequest) => {
      return logout(data);
    },
    onSettled: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('auth_token');

      navigate('/login');
    },
  });
};
