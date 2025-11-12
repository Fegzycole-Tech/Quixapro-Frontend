import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/lib/api/customers';

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
  });
};
