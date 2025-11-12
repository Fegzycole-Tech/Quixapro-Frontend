import { ChevronRight } from 'lucide-react';

interface ViewCustomerHeaderProps {
  onNavigateToCustomers: () => void;
}

export const ViewCustomerHeader = ({
  onNavigateToCustomers,
}: ViewCustomerHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button
          onClick={onNavigateToCustomers}
          className="hover:text-foreground transition-colors"
        >
          Customers Table
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Customer Info</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-6">Customer Info</h1>
    </>
  );
};
