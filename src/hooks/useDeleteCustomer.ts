import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomer } from '@/lib/api/customers';

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
