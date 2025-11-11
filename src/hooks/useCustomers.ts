import { useQuery } from '@tanstack/react-query';
import { getCustomers, type CustomerQueryParams } from '@/lib/api/customers';

export const useCustomers = (params?: CustomerQueryParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomers(params),
    staleTime: 30 * 1000,
  });
};
