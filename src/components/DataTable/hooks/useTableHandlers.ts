import type { SortParams, PaginationParams } from '../types';

interface UseTableHandlersProps {
  mode: 'client' | 'server';
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  pageSize: number;
  activeFilters: Record<string, string>;
  setSearchQuery: (value: string) => void;
  setSortKey: (value: string | null) => void;
  setSortDirection: (value: 'asc' | 'desc') => void;
  setCurrentPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setActiveFilters: (value: Record<string, string>) => void;
  updateUrl: (updates: {
    search?: string;
    sortBy?: string | null;
    sortDirection?: 'asc' | 'desc';
    page?: number;
    filters?: Record<string, string>;
  }) => void;
  onSearch?: (query: string) => void;
  onSort?: (params: SortParams) => void;
  onPageChange?: (params: PaginationParams) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export function useTableHandlers({
  mode,
  sortKey,
  sortDirection,
  pageSize,
  activeFilters,
  setSearchQuery,
  setSortKey,
  setSortDirection,
  setCurrentPage,
  setPageSize,
  setActiveFilters,
  updateUrl,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
}: UseTableHandlersProps) {
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateUrl({ search: query, page: 1 });

    if (mode === 'server' && onSearch) {
      onSearch(query);
    }
  };

  const handleSort = (key: string) => {
    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);
    updateUrl({ sortBy: key, sortDirection: newDirection });

    if (mode === 'server' && onSort) {
      onSort({ key, direction: newDirection });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl({ page });

    if (mode === 'server' && onPageChange) {
      const offset = (page - 1) * pageSize;
      onPageChange({ page, limit: pageSize, offset });
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    updateUrl({ page: 1 });

    if (mode === 'server' && onPageChange) {
      onPageChange({ page: 1, limit: newSize, offset: 0 });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters =
      value === '' ? { ...activeFilters } : { ...activeFilters, [key]: value };

    if (value === '') {
      delete newFilters[key];
    }

    setActiveFilters(newFilters);
    setCurrentPage(1);
    updateUrl({ filters: newFilters, page: 1 });

    if (mode === 'server' && onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return {
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
  };
}
