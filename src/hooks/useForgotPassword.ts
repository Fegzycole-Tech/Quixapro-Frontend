import { useMutation } from '@tanstack/react-query';
import { forgotPassword, type ForgotPasswordRequest } from '@/lib/api/auth';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => {
      return forgotPassword(data);
    },
  });
};
