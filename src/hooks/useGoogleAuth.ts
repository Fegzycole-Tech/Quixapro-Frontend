import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { googleAuth, type GoogleAuthRequest } from '@/lib/api/auth';

export const useGoogleAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: GoogleAuthRequest) => {
      return googleAuth(data);
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      navigate('/dashboard');
    },
  });
};
