import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

export const CreateBusinessHeader = () => {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link
          to="/businesses"
          className="hover:text-foreground transition-colors"
        >
          Businesses Table
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Create New Business</span>
      </nav>

      <h1 className="text-3xl font-bold text-foreground mb-8">New Business</h1>
    </>
  );
};
