import { useBusinessesPage } from '@/hooks/useBusinessesPage';
import { BusinessesHeader } from './BusinessesHeader';
import { BusinessesEmptyState } from './BusinessesEmptyState';
import { BusinessesTable } from './BusinessesTable';
import { ErrorState } from '@/components/ErrorState';

export const Businesses = () => {
  const {
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
  } = useBusinessesPage();

  if (error) {
    return <ErrorState title="Error loading businesses" error={error} />;
  }

  return (
    <div className="">
      <BusinessesHeader onExport={handleExport} onCreateBusiness={handleCreateBusiness} />

      {isEmpty ? (
        <BusinessesEmptyState onCreateBusiness={handleCreateBusiness} />
      ) : (
        <BusinessesTable
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
