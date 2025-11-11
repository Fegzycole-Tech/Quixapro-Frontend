import { Link } from 'react-router';
import { Home, ChevronRight } from 'lucide-react';

export const CreateCustomerHeader = () => {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/customers" className="hover:text-foreground transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/customers" className="hover:text-foreground transition-colors">
          Customers Table
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Create New Customer</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-foreground mb-8">New Customer</h1>
    </>
  );
};
