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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return apiClient<SignupResponse>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return apiClient<LoginResponse>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface VerifyCodeResponse {
  user: {
    id: number;
    email: string;
    name: string;
    photo_url: string | null;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
  message: string;
}

export async function verifyCode(data: VerifyCodeRequest): Promise<VerifyCodeResponse> {
  return apiClient<VerifyCodeResponse>('/auth/verify-email/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  message: string;
}

export async function resendVerification(data: ResendVerificationRequest): Promise<ResendVerificationResponse> {
  return apiClient<ResendVerificationResponse>('/auth/resend-verification/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  return apiClient<ForgotPasswordResponse>('/auth/forgot-password/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return apiClient<ResetPasswordResponse>('/auth/reset-password/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface GoogleAuthRequest {
  access_token: string;
}

export interface GoogleAuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    photo_url: string | null;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
  refresh_token: string;
  message: string;
}

export async function googleAuth(data: GoogleAuthRequest): Promise<GoogleAuthResponse> {
  return apiClient<GoogleAuthResponse>('/auth/google/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
