import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api/user';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
