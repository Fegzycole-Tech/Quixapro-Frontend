import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessesHeaderProps {
  onExport: () => void;
  onCreateBusiness: () => void;
}

export const BusinessesHeader = ({
  onExport,
  onCreateBusiness,
}: BusinessesHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Businesses
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create and manage all your various Businesses
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={onExport} variant="outline">
          <Download />
          Export
        </Button>
        <Button onClick={onCreateBusiness}>
          <Plus />
          Create New Business
        </Button>
      </div>
    </div>
  );
};
