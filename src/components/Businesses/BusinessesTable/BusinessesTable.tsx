import { useMemo, useCallback, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  DataTable,
  type Column,
  type SortParams,
  type PaginationParams,
} from '@/components/DataTable';
import { DeleteBusinessDialog } from '@/components/DeleteBusinessDialog';
import { cn } from '@/lib/utils';
import type { Business, BusinessListResponse } from '@/lib/api/businesses';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

interface BusinessesTableProps {
  data?: BusinessListResponse;
  isLoading: boolean;
  onSearch: (query: string) => void;
  onSort: (params: SortParams) => void;
  onPageChange: (params: PaginationParams) => void;
  onFilterChange: (filters: Record<string, string>) => void;
}

export const BusinessesTable = ({
  data,
  isLoading,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
}: BusinessesTableProps) => {
  const navigate = useNavigate();
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(null);

  const columns: Column<Business>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Business Name',
        render: (business) => (
          <div className="flex items-center gap-3">
            {business.photo_url ? (
              <img
                src={business.photo_url}
                alt={business.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium',
                  getAvatarColor(business.name)
                )}
              >
                {getInitials(business.name)}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {business.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {business.email}
              </div>
            </div>
          </div>
        ),
        mobileRender: (business) => (
          <div className="flex items-center gap-3">
            {business.photo_url ? (
              <img
                src={business.photo_url}
                alt={business.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium',
                  getAvatarColor(business.name)
                )}
              >
                {getInitials(business.name)}
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {business.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {business.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'address',
        header: 'Address',
        render: (business) => (
          <div className="text-gray-900 dark:text-white">
            {business.address}
          </div>
        ),
        hideOnMobile: true,
      },
      {
        key: 'phone_number',
        header: 'Phone',
        render: (business) => (
          <div className="text-gray-900 dark:text-white">
            {business.phone_number}
          </div>
        ),
        hideOnMobile: true,
      },
      {
        key: 'created_at',
        header: 'Date Added',
        render: (business) => (
          <div className="text-gray-900 dark:text-white">
            {new Date(business.created_at).toLocaleDateString()}
          </div>
        ),
        hideOnMobile: true,
      },
    ],
    []
  );

  const handleView = useCallback((business: Business) => {
    navigate(`/businesses/${business.id}`);
  }, [navigate]);

  const handleDelete = useCallback((business: Business) => {
    setBusinessToDelete(business);
  }, []);

  return (
    <>
      <div className="p-4 md:p-8">
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
          searchKeys={['name', 'email', 'address', 'phone_number']}
          searchPlaceholder="Search businesses..."
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

      <DeleteBusinessDialog
        business={businessToDelete}
        onClose={() => setBusinessToDelete(null)}
      />
    </>
  );
};
