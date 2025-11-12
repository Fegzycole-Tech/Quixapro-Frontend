import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBusiness, type UpdateBusinessData } from '@/lib/api/businesses';

interface UpdateBusinessVariables {
  id: number;
  data: UpdateBusinessData;
}

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateBusinessVariables) => updateBusiness(id, data),
    onSuccess: (updatedBusiness) => {
      // Invalidate businesses list
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      // Update the specific business in cache
      queryClient.setQueryData(['business', updatedBusiness.id.toString()], updatedBusiness);
    },
  });
};
