import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import type { FilterGroup, SortParams, PaginationParams } from '../types';

interface UseUrlSyncProps {
  syncWithUrl: boolean;
  mode: 'client' | 'server';
  filterOptions: FilterGroup[];
  searchQuery: string;
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  activeFilters: Record<string, string>;
  pageSize: number;
  setSearchQuery: (value: string) => void;
  setSortKey: (value: string | null) => void;
  setSortDirection: (value: 'asc' | 'desc') => void;
  setCurrentPage: (value: number) => void;
  setActiveFilters: (value: Record<string, string>) => void;
  onSearch?: (query: string) => void;
  onSort?: (params: SortParams) => void;
  onPageChange?: (params: PaginationParams) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export function useUrlSync({
  syncWithUrl,
  mode,
  filterOptions,
  searchQuery,
  sortKey,
  sortDirection,
  currentPage,
  activeFilters,
  pageSize,
  setSearchQuery,
  setSortKey,
  setSortDirection,
  setCurrentPage,
  setActiveFilters,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
}: UseUrlSyncProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL when state changes
  const updateUrl = (updates: {
    search?: string;
    sortBy?: string | null;
    sortDirection?: 'asc' | 'desc';
    page?: number;
    filters?: Record<string, string>;
  }) => {
    if (!syncWithUrl) return;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (updates.search !== undefined) {
        updates.search
          ? newParams.set('search', updates.search)
          : newParams.delete('search');
      }

      if (updates.sortBy !== undefined) {
        if (updates.sortBy) {
          newParams.set('sortBy', updates.sortBy);
          newParams.set('sortDirection', updates.sortDirection || 'asc');
        } else {
          newParams.delete('sortBy');
          newParams.delete('sortDirection');
        }
      }

      if (updates.page !== undefined) {
        updates.page > 1
          ? newParams.set('page', updates.page.toString())
          : newParams.delete('page');
      }

      if (updates.filters !== undefined) {
        Array.from(newParams.keys())
          .filter((key) => key.startsWith('filter_'))
          .forEach((key) => newParams.delete(key));

        Object.entries(updates.filters).forEach(([key, value]) => {
          if (value) newParams.set(`filter_${key}`, value);
        });
      }

      return newParams;
    });
  };

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    if (!syncWithUrl || mode !== 'server') return;

    const urlSearch = searchParams.get('search') || '';
    const urlSortBy = searchParams.get('sortBy');
    const urlSortDirection =
      searchParams.get('sortDirection') === 'desc' ? 'desc' : 'asc';
    const urlPage = parseInt(searchParams.get('page') || '1', 10);

    const urlFilters: Record<string, string> = {};
    filterOptions.forEach((filterGroup) => {
      const value = searchParams.get(`filter_${filterGroup.key}`);
      if (value) urlFilters[filterGroup.key] = value;
    });

    // Update local state
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
    if (urlSortBy && (urlSortBy !== sortKey || urlSortDirection !== sortDirection)) {
      setSortKey(urlSortBy);
      setSortDirection(urlSortDirection);
    }
    if (urlPage !== currentPage) setCurrentPage(urlPage);

    const filtersChanged =
      JSON.stringify(urlFilters) !== JSON.stringify(activeFilters);
    if (filtersChanged) setActiveFilters(urlFilters);

    // Trigger API callbacks
    if (urlSearch !== searchQuery && onSearch) onSearch(urlSearch);
    if (urlSortBy && (urlSortBy !== sortKey || urlSortDirection !== sortDirection) && onSort) {
      onSort({ key: urlSortBy, direction: urlSortDirection });
    }
    if (urlPage !== currentPage && onPageChange) {
      const offset = (urlPage - 1) * pageSize;
      onPageChange({ page: urlPage, limit: pageSize, offset });
    }
    if (filtersChanged && onFilterChange) onFilterChange(urlFilters);
  }, [
    searchParams,
    syncWithUrl,
    mode,
    filterOptions,
    searchQuery,
    sortKey,
    sortDirection,
    currentPage,
    activeFilters,
    pageSize,
    onSearch,
    onSort,
    onPageChange,
    onFilterChange,
    setSearchQuery,
    setSortKey,
    setSortDirection,
    setCurrentPage,
    setActiveFilters,
  ]);

  return { updateUrl };
}
