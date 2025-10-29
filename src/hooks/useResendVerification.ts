import { useMutation } from '@tanstack/react-query';
import { resendVerification, type ResendVerificationRequest } from '@/lib/api/auth';

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (data: ResendVerificationRequest) => {
      return resendVerification(data);
    },
  });
};
