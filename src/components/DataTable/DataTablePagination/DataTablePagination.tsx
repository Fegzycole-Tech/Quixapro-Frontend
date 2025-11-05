import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalRecords: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  totalRecords,
  loading,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Showing {startRecord} to {endRecord} of {totalRecords} entries
      </div>

      <div className="flex items-center gap-2">
        {/* First page button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loading}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to first page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page 1 if not visible */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              disabled={loading}
              className="px-3 py-1 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}

        {/* Visible page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={cn(
              'px-3 py-1 rounded text-sm',
              currentPage === page
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {page}
          </button>
        ))}

        {/* Last page if not visible */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={loading}
              className="px-3 py-1 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Last page button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to last page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Page size selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-4 px-3 py-1 text-sm border border-border rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
              disabled={loading}
            >
              {pageSize} / page
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {pageSizeOptions.map((size) => (
              <DropdownMenuItem key={size} onClick={() => onPageSizeChange(size)}>
                {size} / page
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
