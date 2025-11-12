import { useQuery } from '@tanstack/react-query';
import { getBusinesses, type BusinessQueryParams } from '@/lib/api/businesses';

export const useBusinesses = (params?: BusinessQueryParams) => {
  return useQuery({
    queryKey: ['businesses', params],
    queryFn: () => getBusinesses(params),
  });
};
