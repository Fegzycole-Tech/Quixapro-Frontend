import { useQuery } from '@tanstack/react-query';
import { getBusiness } from '@/lib/api/businesses';

export const useBusiness = (id: string) => {
  return useQuery({
    queryKey: ['business', id],
    queryFn: () => getBusiness(id),
    enabled: !!id,
  });
};
