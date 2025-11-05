import { useState, useCallback } from 'react';
import { Lock, Pencil } from 'lucide-react';
import {
  DataTable,
  type Column,
  type SortParams,
  type PaginationParams,
} from '@/components/DataTable';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  businessEmail: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  [key: string]: string | undefined;
}

// Sample data matching the screenshots
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'James Brown',
    email: 'jamesbrown@gmail.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Serena Williams',
    email: 'serenawilliams.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Arthur Taylor',
    email: 'arthur@alignu.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emma Wright',
    email: 'emmaw@email.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Matthew Johnson',
    email: 'matthewj@unsign.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
  {
    id: '6',
    name: 'Matthew Johnson',
    email: 'matthewj@unsign.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
  {
    id: '7',
    name: 'Matthew Johnson',
    email: 'matthewj@unsign.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
  {
    id: '8',
    name: 'Matthew Johnson',
    email: 'matthewj@unsign.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'pending',
  },
  {
    id: '9',
    name: 'Matthew Johnson',
    email: 'matthewj@unsign.com',
    phone: '08169234810',
    address: 'NO 12 Lekki, Phase One',
    businessName: 'Great Minds Concept',
    businessEmail: 'Greatminds@gmail.com',
    status: 'active',
  },
];

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

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  // In a real app, these would come from your API response
  const totalCount = 25; // Total number of records in the database

  // Simulate API calls - wrapped in useCallback to prevent re-renders
  const handleSearch = useCallback((query: string) => {
    console.log('Search API call with query:', query);
    // In real app: make API call with search query
    // setLoading(true);
    // api.getCustomers({ search: query }).then(...)
  }, []);

  const handleSort = useCallback((params: SortParams) => {
    console.log('Sort API call with params:', params);
    // In real app: make API call with sort parameters
    // setLoading(true);
    // api.getCustomers({ sortBy: params.key, sortDirection: params.direction }).then(...)
  }, []);

  const handlePageChange = useCallback((params: PaginationParams) => {
    console.log('Pagination API call with params:', params);
    // In real app: make API call with pagination parameters
    // setLoading(true);
    // api.getCustomers({ page: params.page, limit: params.limit, offset: params.offset }).then(...)
  }, []);

  const handleFilterChange = useCallback((filters: Record<string, string>) => {
    console.log('Filter API call with filters:', filters);
    // In real app: make API call with filter parameters
    // setLoading(true);
    // api.getCustomers({ filters }).then(...)
  }, []);

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Customer Name',
      render: (customer) => (
        <div className="flex items-center gap-3">
          {customer.avatar ? (
            <img
              src={customer.avatar}
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
          {customer.avatar ? (
            <img
              src={customer.avatar}
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
              {customer.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone/Address',
      render: (customer) => (
        <div>
          <div className="text-gray-900 dark:text-white">{customer.phone}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {customer.address}
          </div>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: 'businessName',
      header: 'Business Name/Email',
      render: (customer) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">📊</span>
          </div>
          <div>
            <div className="text-gray-900 dark:text-white">
              {customer.businessName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {customer.businessEmail}
            </div>
          </div>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (customer) => (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            customer.status === 'active' &&
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            customer.status === 'inactive' &&
              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            customer.status === 'pending' &&
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          )}
        >
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </span>
      ),
      mobileRender: (customer) => (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2',
            customer.status === 'active' &&
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            customer.status === 'inactive' &&
              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            customer.status === 'pending' &&
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          )}
        >
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </span>
      ),
    },
  ];

  const handleView = (customer: Customer) => {
    console.log('View customer:', customer);
  };

  const handleEdit = (customer: Customer) => {
    console.log('Edit customer:', customer);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customers
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your customer database
        </p>
      </div>

      <DataTable
        data={sampleCustomers}
        columns={columns}
        mode="server" // Use server-side mode for API-driven operations
        syncWithUrl={true} // Enable URL synchronization
        totalCount={totalCount}
        loading={loading}
        onSearch={handleSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onFilterChange={handleFilterChange}
        searchKeys={['name', 'email', 'phone', 'businessName']}
        searchPlaceholder="Search customers..."
        filterOptions={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Pending', value: 'pending' },
            ],
          },
          {
            key: 'businessType',
            label: 'Business Type',
            options: [
              { label: 'Enterprise', value: 'enterprise' },
              { label: 'SMB', value: 'smb' },
              { label: 'Startup', value: 'startup' },
            ],
          },
        ]}
        actions={[
          {
            label: 'View',
            icon: <Lock className="w-4 h-4" />,
            onClick: handleView,
          },
          {
            label: 'Edit',
            icon: <Pencil className="w-4 h-4" />,
            onClick: handleEdit,
          },
        ]}
      />
    </div>
  );
};
