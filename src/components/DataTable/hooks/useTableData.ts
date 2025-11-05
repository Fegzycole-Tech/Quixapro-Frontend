import { useMemo } from 'react';

interface UseTableDataProps<T> {
  data: T[];
  mode: 'client' | 'server';
  searchQuery: string;
  searchKeys: string[];
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
  totalCount?: number;
}

export function useTableData<
  T extends Record<string, string | number | boolean | null | undefined>
>({
  data,
  mode,
  searchQuery,
  searchKeys,
  sortKey,
  sortDirection,
  currentPage,
  pageSize,
  totalCount,
}: UseTableDataProps<T>) {
  // Client-side filtering
  const filteredData = useMemo(() => {
    if (mode === 'server' || !searchQuery || searchKeys.length === 0) {
      return data;
    }

    return data.filter((row) =>
      searchKeys.some((key) => {
        const value = row[key];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [mode, data, searchQuery, searchKeys]);

  // Client-side sorting
  const sortedData = useMemo(() => {
    if (mode === 'server' || !sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [mode, filteredData, sortKey, sortDirection]);

  // Calculate total pages
  const totalPages =
    mode === 'server' && totalCount
      ? Math.ceil(totalCount / pageSize)
      : Math.ceil(sortedData.length / pageSize);

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (mode === 'server') return data;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [mode, sortedData, currentPage, pageSize, data]);

  const totalRecords =
    mode === 'server' && totalCount ? totalCount : sortedData.length;

  return {
    paginatedData,
    totalPages,
    totalRecords,
  };
}
