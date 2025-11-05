export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  mobileRender?: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface SortParams {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];

  // Mode: 'client' for client-side operations, 'server' for API calls
  mode?: 'client' | 'server';

  // URL synchronization
  syncWithUrl?: boolean;

  // Server-side props
  totalCount?: number;
  loading?: boolean;
  onSearch?: (query: string) => void;
  onSort?: (params: SortParams) => void;
  onPageChange?: (params: PaginationParams) => void;
  onFilterChange?: (filters: Record<string, string>) => void;

  // Search
  searchKeys?: string[];
  searchPlaceholder?: string;

  // Filter
  filterOptions?: FilterGroup[];

  // Actions
  onRowClick?: (row: T) => void;
  actions?: RowAction<T>[];

  // Pagination
  pageSize?: number;
  pageSizeOptions?: number[];

  className?: string;
}
