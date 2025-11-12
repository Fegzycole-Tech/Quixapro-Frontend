import { Plus } from 'lucide-react';
import EmptyIcon from '@/assets/empty.svg';
import { Button } from '@/components/ui/button';

interface EntityEmptyStateProps {
  entityName: string; // e.g., "Customers", "Businesses"
  entityNameSingular: string; // e.g., "Customer", "Business"
  onCreate: () => void;
}

export const EntityEmptyState = ({
  entityName,
  entityNameSingular,
  onCreate,
}: EntityEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      <div className="mb-6">
        <img src={EmptyIcon} alt={`No ${entityName.toLowerCase()}`} className="w-24 h-24 md:w-32 md:h-32" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No {entityName} Added
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
        You have not added any {entityName.toLowerCase()} yet. Click on the button below to get started.
      </p>
      <Button onClick={onCreate} size="lg">
        <Plus />
        Create New {entityNameSingular}
      </Button>
    </div>
  );
};
