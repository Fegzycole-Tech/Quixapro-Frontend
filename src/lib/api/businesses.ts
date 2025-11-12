import { authenticatedApiClient } from './client';

export interface Business {
  id: number;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  user: number;
  [key: string]: string | number | null | undefined;
}

export interface BusinessListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Business[];
}

export interface BusinessQueryParams {
  search?: string;
  ordering?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | undefined;
}

export async function getBusinesses(
  params?: BusinessQueryParams
): Promise<BusinessListResponse> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
  }

  const endpoint = `/businesses/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return authenticatedApiClient<BusinessListResponse>(endpoint);
}

export async function getBusiness(id: string): Promise<Business> {
  return authenticatedApiClient<Business>(`/businesses/${id}`);
}

export interface CreateBusinessData {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  photo_url?: string;
}

export async function createBusiness(data: CreateBusinessData): Promise<Business> {
  return authenticatedApiClient<Business>('/businesses/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteBusiness(id: number): Promise<void> {
  await authenticatedApiClient<void>(`/businesses/${id}/`, {
    method: 'DELETE',
  });
}

export interface UpdateBusinessData {
  name?: string;
  email?: string;
  address?: string;
  phone_number?: string;
  photo_url?: string;
}

export async function updateBusiness(
  id: number,
  data: UpdateBusinessData
): Promise<Business> {
  return authenticatedApiClient<Business>(`/businesses/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
