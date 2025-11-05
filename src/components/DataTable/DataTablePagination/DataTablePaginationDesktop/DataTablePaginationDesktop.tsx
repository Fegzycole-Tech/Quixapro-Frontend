import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTablePaginationDesktopProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  startRecord: number;
  endRecord: number;
  totalRecords: number;
  loading: boolean;
  pages: number[];
  startPage: number;
  endPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePaginationDesktop({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  startRecord,
  endRecord,
  totalRecords,
  loading,
  pages,
  startPage,
  endPage,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationDesktopProps) {
  return (
    <div className="hidden md:flex items-center justify-between">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Showing {startRecord} to {endRecord} of {totalRecords} entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

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

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

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
