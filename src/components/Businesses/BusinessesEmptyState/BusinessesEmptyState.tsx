import { EntityEmptyState } from '@/components/EntityEmptyState';

interface BusinessesEmptyStateProps {
  onCreateBusiness: () => void;
}

export const BusinessesEmptyState = ({
  onCreateBusiness,
}: BusinessesEmptyStateProps) => {
  return (
    <EntityEmptyState
      entityName="Businesses"
      entityNameSingular="Business"
      onCreate={onCreateBusiness}
    />
  );
};
