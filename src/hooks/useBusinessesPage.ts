import { useState, useCallback } from 'react';
import type { SortParams, PaginationParams } from '@/components/DataTable';
import { useBusinesses } from './useBusinesses';
import type { BusinessQueryParams } from '@/lib/api/businesses';

export const useBusinessesPage = () => {
  const [queryParams, setQueryParams] = useState<BusinessQueryParams>({
    limit: 7,
    offset: 0,
  });

  const { data, isLoading, error } = useBusinesses(queryParams);

  const handleSearch = useCallback((query: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: query,
      offset: 0,
    }));
  }, []);

  const handleSort = useCallback((params: SortParams) => {
    const ordering =
      params.direction === 'desc' ? `-${params.key}` : params.key;
    setQueryParams((prev) => ({
      ...prev,
      ordering,
    }));
  }, []);

  const handlePageChange = useCallback((params: PaginationParams) => {
    setQueryParams((prev) => ({
      ...prev,
      limit: params.limit,
      offset: params.offset,
    }));
  }, []);

  const handleFilterChange = useCallback(
    (filters: Record<string, string>) => {
      setQueryParams((prev) => {
        const newParams: BusinessQueryParams = {
          ...prev,
          offset: 0,
        };

        Object.keys(prev).forEach((key) => {
          if (key !== 'search' && key !== 'ordering' && key !== 'limit' && key !== 'offset') {
            delete newParams[key];
          }
        });

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            newParams[key] = value;
          }
        });

        return newParams;
      });
    },
    []
  );

  const handleCreateBusiness = useCallback(() => {
    window.location.href = '/businesses/create';
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export businesses');
  }, []);

  const isEmpty = !isLoading && (!data?.results || data.results.length === 0);

  return {
    data,
    isLoading,
    error,
    isEmpty,
    handleSearch,
    handleSort,
    handlePageChange,
    handleFilterChange,
    handleCreateBusiness,
    handleExport,
  };
};
