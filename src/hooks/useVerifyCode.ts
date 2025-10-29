import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { verifyCode, type VerifyCodeRequest } from '@/lib/api/auth';

export const useVerifyCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyCodeRequest) => {
      return verifyCode(data);
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.tokens.access);
      localStorage.setItem('refresh_token', data.tokens.refresh);

      navigate('/dashboard');
    },
  });
};
