import { authenticatedApiClient } from './client';

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  user: number;
  [key: string]: string | number | null | undefined;
}

export interface CustomerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}

export interface CustomerQueryParams {
  search?: string;
  ordering?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | undefined;
}

export async function getCustomers(
  params?: CustomerQueryParams
): Promise<CustomerListResponse> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
  }

  const endpoint = `/customers/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return authenticatedApiClient<CustomerListResponse>(endpoint);
}

export async function getCustomer(id: string): Promise<Customer> {
  return authenticatedApiClient<Customer>(`/customers/${id}`);
}

export interface CreateCustomerData {
  name: string;
  email: string;
  address: string;
  photo_url?: string;
}

export async function createCustomer(data: CreateCustomerData): Promise<Customer> {
  return authenticatedApiClient<Customer>('/customers/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
