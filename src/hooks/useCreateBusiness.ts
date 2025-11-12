import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBusiness, type CreateBusinessData } from '@/lib/api/businesses';

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBusinessData) => createBusiness(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};
