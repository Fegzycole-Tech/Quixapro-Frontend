import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UseRequireValidEmailOptions {
  redirectTo?: string;
  paramName?: string;
}

export const useRequireValidEmail = (
  options: UseRequireValidEmailOptions = {}
): string | null => {
  const { redirectTo = '/login', paramName = 'email' } = options;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get(paramName);

  useEffect(() => {
    if (!email || !EMAIL_REGEX.test(email)) {
      navigate(redirectTo, { replace: true });
    }
  }, [email, navigate, redirectTo]);

  if (!email || !EMAIL_REGEX.test(email)) {
    return null;
  }

  return email;
};
