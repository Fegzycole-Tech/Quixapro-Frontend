import { apiClient } from './client';

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return apiClient<SignupResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
