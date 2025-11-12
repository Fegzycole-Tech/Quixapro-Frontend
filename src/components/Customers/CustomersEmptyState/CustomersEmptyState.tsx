import { EntityEmptyState } from '@/components/EntityEmptyState';

interface CustomersEmptyStateProps {
  onCreateCustomer: () => void;
}

export const CustomersEmptyState = ({
  onCreateCustomer,
}: CustomersEmptyStateProps) => {
  return (
    <EntityEmptyState
      entityName="Customers"
      entityNameSingular="Customer"
      onCreate={onCreateCustomer}
    />
  );
};
