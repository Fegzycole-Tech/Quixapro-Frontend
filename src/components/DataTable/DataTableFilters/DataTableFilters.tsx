import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type { FilterGroup } from '../types';

interface DataTableFiltersProps {
  filterOptions: FilterGroup[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  loading?: boolean;
}

export function DataTableFilters({
  filterOptions,
  activeFilters,
  onFilterChange,
  loading = false,
}: DataTableFiltersProps) {
  if (filterOptions.length === 0) {
    return null;
  }

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          disabled={loading}
        >
          <Filter className="w-4 h-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {filterOptions.map((filter, index) => (
          <div key={filter.key}>
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">
              {filter.label}
            </div>
            {filter.options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFilterChange(filter.key, option.value)}
              >
                <span
                  className={cn(
                    activeFilters[filter.key] === option.value && 'font-semibold'
                  )}
                >
                  {option.label}
                </span>
              </DropdownMenuItem>
            ))}
            {activeFilters[filter.key] && (
              <DropdownMenuItem onClick={() => onFilterChange(filter.key, '')}>
                <span className="text-gray-500">Clear filter</span>
              </DropdownMenuItem>
            )}
            {index < filterOptions.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
