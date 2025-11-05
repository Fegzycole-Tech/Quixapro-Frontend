import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Column } from '../types';

interface DataTableSortMenuProps<T> {
  columns: Column<T>[];
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  loading?: boolean;
}

export function DataTableSortMenu<T>({
  columns,
  sortKey,
  sortDirection,
  onSort,
  loading = false,
}: DataTableSortMenuProps<T>) {
  const sortableColumns = columns.filter((col) => col.sortable !== false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          disabled={loading}
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort by
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortableColumns.map((col) => (
          <DropdownMenuItem key={col.key} onClick={() => onSort(col.key)}>
            {col.header}
            {sortKey === col.key && (
              <span className="ml-2 text-xs">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
