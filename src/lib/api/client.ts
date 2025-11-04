const API_BASE_URL = 'https://api.quixapro.com';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function getAccessToken(): string | null {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
}

interface ApiClientOptions extends RequestInit {
  authenticated?: boolean;
}

async function baseApiClient<T>(
  endpoint: string,
  options?: ApiClientOptions
): Promise<T> {
  const { authenticated = false, ...fetchOptions } = options || {};
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (authenticated) {
    const token = getAccessToken();
    if (!token) {
      throw new ApiError('No authentication token found', 401);
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || 'An error occurred',
      response.status,
      errorData
    );
  }

  return response.json();
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return baseApiClient<T>(endpoint, { ...options, authenticated: false });
}

export async function authenticatedApiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return baseApiClient<T>(endpoint, { ...options, authenticated: true });
}
