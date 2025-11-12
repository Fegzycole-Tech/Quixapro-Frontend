import { authenticatedApiClient } from './api/client';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  cloud_name: string;
  api_key: string;
  upload_url: string;
  folder?: string;
  max_file_size: number;
  allowed_formats?: string[];
  tags?: string[];
}

export const getCloudinarySignature = async (
  folder: string,
  allowedFormats: string[]
): Promise<CloudinarySignatureResponse> => {
  const params = new URLSearchParams({
    folder,
    allowed_formats: allowedFormats.join(','),
  });

  return authenticatedApiClient<CloudinarySignatureResponse>(
    `/cloudinary/signature/?${params.toString()}`
  );
};

export const uploadToCloudinary = async (
  file: File,
  folder = 'customer_photos',
  allowedFormats = ['jpg', 'png']
): Promise<CloudinaryUploadResult> => {
  // Get signature from backend
  const signatureData = await getCloudinarySignature(folder, allowedFormats);

  // Prepare form data for Cloudinary upload
  // IMPORTANT: Send ALL parameters that were used in signature generation
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.api_key);
  formData.append('timestamp', signatureData.timestamp.toString());
  formData.append('signature', signatureData.signature);

  // Add ALL signed parameters if they exist
  if (signatureData.folder) {
    formData.append('folder', signatureData.folder);
  }

  if (signatureData.allowed_formats && signatureData.allowed_formats.length > 0) {
    // Convert array to comma-separated string
    formData.append('allowed_formats', signatureData.allowed_formats.join(','));
  }

  if (signatureData.tags && signatureData.tags.length > 0) {
    // Convert array to comma-separated string
    formData.append('tags', signatureData.tags.join(','));
  }

  // DO NOT send max_file_size to Cloudinary (it's not signed)

  // Upload to Cloudinary
  const response = await fetch(signatureData.upload_url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    const errorMessage = errorData.error?.message || 'Failed to upload image to Cloudinary';
    throw new Error(errorMessage);
  }

  return response.json();
};
