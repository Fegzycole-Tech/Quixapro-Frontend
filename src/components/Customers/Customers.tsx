import { useCustomersPage } from '@/hooks/useCustomersPage';
import { CustomersHeader } from './CustomersHeader';
import { CustomersEmptyState } from './CustomersEmptyState';
import { CustomersTable } from './CustomersTable';
import { ErrorState } from '@/components/ErrorState';

export const Customers = () => {
  const {
    data,
    isLoading,
    error,
    isEmpty,
    handleSearch,
    handleSort,
    handlePageChange,
    handleFilterChange,
    handleCreateCustomer,
    handleExport,
  } = useCustomersPage();

  if (error) {
    return <ErrorState title="Error loading customers" error={error} />;
  }

  return (
    <div className="">
      <CustomersHeader onExport={handleExport} onCreateCustomer={handleCreateCustomer} />

      {isEmpty ? (
        <CustomersEmptyState onCreateCustomer={handleCreateCustomer} />
      ) : (
        <CustomersTable
          data={data}
          isLoading={isLoading}
          onSearch={handleSearch}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};
