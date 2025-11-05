import { usePagination } from './hooks/usePagination';
import { DataTablePaginationDesktop } from './DataTablePaginationDesktop';
import { DataTablePaginationMobile } from './DataTablePaginationMobile';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalRecords: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  totalRecords,
  loading,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const { pages, startPage, endPage, startRecord, endRecord } = usePagination({
    currentPage,
    totalPages,
    pageSize,
    totalRecords,
    maxVisiblePages: 5,
  });

  return (
    <div className="px-4 py-3 border-t border-border bg-card">
      <DataTablePaginationDesktop
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        startRecord={startRecord}
        endRecord={endRecord}
        totalRecords={totalRecords}
        loading={loading}
        pages={pages}
        startPage={startPage}
        endPage={endPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <DataTablePaginationMobile
        currentPage={currentPage}
        totalPages={totalPages}
        startRecord={startRecord}
        endRecord={endRecord}
        totalRecords={totalRecords}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
}
