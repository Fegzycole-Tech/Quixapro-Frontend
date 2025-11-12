import { cn } from '@/lib/utils';
import { DataTableHeader } from './DataTableHeader';
import { DataTableDesktop } from './DataTableDesktop';
import { DataTableMobile } from './DataTableMobile';
import { DataTablePagination } from './DataTablePagination';
import { DataTableSkeleton } from './DataTableSkeleton';
import { useTableState } from './hooks/useTableState';
import { useUrlSync } from './hooks/useUrlSync';
import { useTableData } from './hooks/useTableData';
import { useTableHandlers } from './hooks/useTableHandlers';
import type { DataTableProps } from './types';

export function DataTable<
  T extends Record<string, string | number | boolean | null | undefined>
>({
  data,
  columns,
  mode = 'client',
  syncWithUrl = false,
  totalCount,
  loading = false,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
  searchKeys = [],
  searchPlaceholder = 'Search...',
  filterOptions = [],
  onRowClick,
  actions = [],
  pageSize: initialPageSize = 7,
  pageSizeOptions = [5, 7, 10, 20, 50],
  className = '',
}: DataTableProps<T>) {
  const tableState = useTableState({
    initialPageSize,
    filterOptions,
    syncWithUrl,
  });

  const { updateUrl } = useUrlSync({
    syncWithUrl,
    mode,
    filterOptions,
    ...tableState,
    pageSize: tableState.pageSize,
    onSearch,
    onSort,
    onPageChange,
    onFilterChange,
  });

  const { paginatedData, totalPages, totalRecords } = useTableData<T>({
    data,
    mode,
    searchQuery: tableState.searchQuery,
    searchKeys,
    sortKey: tableState.sortKey,
    sortDirection: tableState.sortDirection,
    currentPage: tableState.currentPage,
    pageSize: tableState.pageSize,
    totalCount,
  });

  const handlers = useTableHandlers({
    mode,
    sortKey: tableState.sortKey,
    sortDirection: tableState.sortDirection,
    pageSize: tableState.pageSize,
    activeFilters: tableState.activeFilters,
    setSearchQuery: tableState.setSearchQuery,
    setSortKey: tableState.setSortKey,
    setSortDirection: tableState.setSortDirection,
    setCurrentPage: tableState.setCurrentPage,
    setPageSize: tableState.setPageSize,
    setActiveFilters: tableState.setActiveFilters,
    updateUrl,
    onSearch,
    onSort,
    onPageChange,
    onFilterChange,
  });

  return (
    <div className={cn('bg-card rounded-lg border border-border', className)}>
      <DataTableHeader
        searchQuery={tableState.searchQuery}
        onSearchChange={handlers.handleSearch}
        searchPlaceholder={searchPlaceholder}
        loading={loading}
        columns={columns}
        sortKey={tableState.sortKey}
        sortDirection={tableState.sortDirection}
        onSort={handlers.handleSort}
        filterOptions={filterOptions}
        activeFilters={tableState.activeFilters}
        onFilterChange={handlers.handleFilterChange}
      />

      {loading && (
        <DataTableSkeleton rows={tableState.pageSize} columns={columns.length} />
      )}

      {!loading && (
        <DataTableDesktop
          data={paginatedData}
          columns={columns}
          onSort={handlers.handleSort}
          actions={actions}
          onRowClick={onRowClick}
        />
      )}

      {!loading && (
        <DataTableMobile
          data={paginatedData}
          columns={columns}
          actions={actions}
          onRowClick={onRowClick}
        />
      )}

      {!loading && (
        <DataTablePagination
          currentPage={tableState.currentPage}
          totalPages={totalPages}
          pageSize={tableState.pageSize}
          pageSizeOptions={pageSizeOptions}
          totalRecords={totalRecords}
          loading={loading}
          onPageChange={handlers.handlePageChange}
          onPageSizeChange={handlers.handlePageSizeChange}
        />
      )}
    </div>
  );
}
