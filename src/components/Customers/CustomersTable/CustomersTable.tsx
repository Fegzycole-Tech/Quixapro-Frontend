import { useMemo, useCallback, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  DataTable,
  type Column,
  type SortParams,
  type PaginationParams,
} from '@/components/DataTable';
import { EntityDeleteDialog } from '@/components/EntityDeleteDialog';
import { useDeleteCustomer } from '@/hooks';
import { cn } from '@/lib/utils';
import { getInitials, getAvatarColor } from '@/lib/utils/avatar';
import type { Customer, CustomerListResponse } from '@/lib/api/customers';

interface CustomersTableProps {
  data?: CustomerListResponse;
  isLoading: boolean;
  onSearch: (query: string) => void;
  onSort: (params: SortParams) => void;
  onPageChange: (params: PaginationParams) => void;
  onFilterChange: (filters: Record<string, string>) => void;
}

export const CustomersTable = ({
  data,
  isLoading,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
}: CustomersTableProps) => {
  const navigate = useNavigate();
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const columns: Column<Customer>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Customer Name',
        render: (customer) => (
          <div className="flex items-center gap-3">
            {customer.photo_url ? (
              <img
                src={customer.photo_url}
                alt={customer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium',
                  getAvatarColor(customer.name)
                )}
              >
                {getInitials(customer.name)}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {customer.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {customer.email}
              </div>
            </div>
          </div>
        ),
        mobileRender: (customer) => (
          <div className="flex items-center gap-3">
            {customer.photo_url ? (
              <img
                src={customer.photo_url}
                alt={customer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium',
                  getAvatarColor(customer.name)
                )}
              >
                {getInitials(customer.name)}
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {customer.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {customer.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'address',
        header: 'Address',
        render: (customer) => (
          <div className="text-gray-900 dark:text-white">
            {customer.address}
          </div>
        ),
        hideOnMobile: true,
      },
      {
        key: 'created_at',
        header: 'Date Added',
        render: (customer) => (
          <div className="text-gray-900 dark:text-white">
            {new Date(customer.created_at).toLocaleDateString()}
          </div>
        ),
        hideOnMobile: true,
      },
    ],
    []
  );

  const handleView = useCallback(
    (customer: Customer) => {
      navigate(`/customers/${customer.id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback((customer: Customer) => {
    setCustomerToDelete(customer);
  }, []);

  return (
    <>
      <div className="px-4">
        <DataTable
          data={data?.results || []}
          columns={columns}
          mode="server"
          syncWithUrl={true}
          totalCount={data?.count || 0}
          loading={isLoading}
          onSearch={onSearch}
          onSort={onSort}
          onPageChange={onPageChange}
          onFilterChange={onFilterChange}
          searchKeys={['name', 'email', 'address']}
          searchPlaceholder="Search customers..."
          filterOptions={[]}
          actions={[
            {
              label: 'View',
              icon: <Eye className="w-4 h-4" />,
              onClick: handleView,
            },
            {
              label: 'Delete',
              icon: <Trash2 className="w-4 h-4" />,
              onClick: handleDelete,
            },
          ]}
        />
      </div>

      <EntityDeleteDialog
        entity={customerToDelete}
        entityName="customer"
        onClose={() => setCustomerToDelete(null)}
        onDelete={deleteCustomer}
        isPending={isDeleting}
      />
    </>
  );
};
