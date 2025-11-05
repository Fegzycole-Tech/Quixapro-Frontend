import { useState } from 'react';
import { useSearchParams } from 'react-router';
import type { FilterGroup } from '../types';

interface UseTableStateProps {
  initialPageSize: number;
  filterOptions: FilterGroup[];
  syncWithUrl: boolean;
}

export function useTableState({
  initialPageSize,
  filterOptions,
  syncWithUrl,
}: UseTableStateProps) {
  const [searchParams] = useSearchParams();

  // Initialize from URL if sync is enabled
  const getInitialValue = <T,>(
    urlKey: string,
    defaultValue: T,
    parser?: (value: string) => T
  ): T => {
    if (!syncWithUrl) return defaultValue;
    const value = searchParams.get(urlKey);
    if (!value) return defaultValue;
    return parser ? parser(value) : (value as T);
  };

  const getInitialFilters = () => {
    if (!syncWithUrl) return {};
    const filters: Record<string, string> = {};
    filterOptions.forEach((filterGroup) => {
      const value = searchParams.get(`filter_${filterGroup.key}`);
      if (value) filters[filterGroup.key] = value;
    });
    return filters;
  };

  const [searchQuery, setSearchQuery] = useState(
    getInitialValue('search', '')
  );
  const [sortKey, setSortKey] = useState<string | null>(
    getInitialValue('sortBy', null)
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    getInitialValue('sortDirection', 'asc', (val) =>
      val === 'desc' ? 'desc' : 'asc'
    )
  );
  const [currentPage, setCurrentPage] = useState(
    getInitialValue('page', 1, (val) => {
      const page = parseInt(val, 10);
      return page > 0 ? page : 1;
    })
  );
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    getInitialFilters()
  );

  return {
    searchQuery,
    setSearchQuery,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    activeFilters,
    setActiveFilters,
  };
}
