import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { resetPassword, type ResetPasswordRequest } from '@/lib/api/auth';
import type { ResetPasswordInput } from '@/lib/validations/auth';

interface UseResetPasswordParams {
  email: string | null;
  token: string | null;
}

export const useResetPassword = ({ email, token }: UseResetPasswordParams) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => {
      if (!email || !token) {
        throw new Error('Invalid reset password link. Email and token are required.');
      }

      const resetData: ResetPasswordRequest = {
        email,
        token,
        new_password: data.password,
      };

      return resetPassword(resetData);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};
