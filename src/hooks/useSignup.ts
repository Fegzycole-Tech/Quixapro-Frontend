import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { signup, type SignupRequest } from '@/lib/api/auth';
import type { SignupInput } from '@/lib/validations/auth';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupInput) => {
      const signupData: SignupRequest = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };
      return signup(signupData);
    },
    onSuccess: (_data, variables) => {
      navigate(`/verify?email=${encodeURIComponent(variables.email)}`);
    },
  });
};
