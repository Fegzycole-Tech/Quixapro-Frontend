import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { login, type LoginRequest } from '@/lib/api/auth';
import type { LoginInput } from '@/lib/validations/auth';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginInput) => {
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };
      return login(loginData);
    },
    onSuccess: (data, variables) => {
      const storage = variables.keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem('auth_token', data.token);

      navigate('/dashboard');
    },
  });
};
