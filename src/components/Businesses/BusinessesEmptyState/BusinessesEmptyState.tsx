import { Plus } from 'lucide-react';
import EmptyIcon from '@/assets/empty.svg';
import { Button } from '@/components/ui/button';

interface BusinessesEmptyStateProps {
  onCreateBusiness: () => void;
}

export const BusinessesEmptyState = ({
  onCreateBusiness,
}: BusinessesEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      <div className="mb-6">
        <img src={EmptyIcon} alt="No businesses" className="w-24 h-24 md:w-32 md:h-32" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No Businesses Added
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
        You have not added any businesses yet. Click on the button below to get started.
      </p>
      <Button onClick={onCreateBusiness} size="lg">
        <Plus />
        Create New Business
      </Button>
    </div>
  );
};
