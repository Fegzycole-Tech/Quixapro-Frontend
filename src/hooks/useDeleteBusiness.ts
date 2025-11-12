import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBusiness } from '@/lib/api/businesses';

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};
