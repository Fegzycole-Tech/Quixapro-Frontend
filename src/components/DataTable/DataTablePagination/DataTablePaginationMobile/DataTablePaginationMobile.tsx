import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTablePaginationMobileProps {
  currentPage: number;
  totalPages: number;
  startRecord: number;
  endRecord: number;
  totalRecords: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export function DataTablePaginationMobile({
  currentPage,
  totalPages,
  startRecord,
  endRecord,
  totalRecords,
  loading,
  onPageChange,
}: DataTablePaginationMobileProps) {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-border hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Page {currentPage} of {totalPages}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {startRecord}-{endRecord} of {totalRecords}
          </div>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-border hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
