import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomersHeaderProps {
  onExport: () => void;
  onCreateCustomer: () => void;
}

export const CustomersHeader = ({ onCreateCustomer }: CustomersHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customers
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create and manage all your various Customers
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={onCreateCustomer}>
          <Plus />
          Create New Customer
        </Button>
      </div>
    </div>
  );
};
