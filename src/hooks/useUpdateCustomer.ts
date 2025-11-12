import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCustomer, type UpdateCustomerData } from '@/lib/api/customers';

interface UpdateCustomerVariables {
  id: number;
  data: UpdateCustomerData;
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCustomerVariables) => updateCustomer(id, data),
    onSuccess: (updatedCustomer) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.setQueryData(['customer', updatedCustomer.id.toString()], updatedCustomer);
    },
  });
};
