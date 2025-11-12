import { ChevronRight } from 'lucide-react';

interface ViewBusinessHeaderProps {
  onNavigateToBusinesses: () => void;
}

export const ViewBusinessHeader = ({
  onNavigateToBusinesses,
}: ViewBusinessHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button
          onClick={onNavigateToBusinesses}
          className="hover:text-foreground transition-colors"
        >
          Businesses Table
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Business Info</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-6">Business Info</h1>
    </>
  );
};
