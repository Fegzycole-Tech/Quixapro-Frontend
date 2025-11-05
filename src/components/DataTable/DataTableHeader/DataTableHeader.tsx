import { Search } from 'lucide-react';
import { DataTableFilters } from '../DataTableFilters';
import { DataTableSortMenu } from '../DataTableSortMenu';
import type { Column, FilterGroup } from '../types';

interface DataTableHeaderProps<T> {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder: string;
  loading: boolean;

  columns: Column<T>[];
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;

  filterOptions: FilterGroup[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export function DataTableHeader<T>({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  loading,
  columns,
  sortKey,
  sortDirection,
  onSort,
  filterOptions,
  activeFilters,
  onFilterChange,
}: DataTableHeaderProps<T>) {
  return (
    <div className="p-4 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between border-b border-border">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div className="flex items-center gap-2">
        <DataTableFilters
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          loading={loading}
        />

        <DataTableSortMenu
          columns={columns}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={onSort}
          loading={loading}
        />
      </div>
    </div>
  );
}
