import { authenticatedApiClient } from './client';

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  photo_url: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  return authenticatedApiClient<UserProfile>('/users/profile');
}
