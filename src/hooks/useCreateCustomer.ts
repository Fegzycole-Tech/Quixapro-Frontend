import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer, type CreateCustomerData } from '@/lib/api/customers';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerData) => createCustomer(data),
    onSuccess: () => {
      // Invalidate customers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
