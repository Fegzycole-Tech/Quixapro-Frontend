import { useState, useRef, useCallback, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from '@/lib/validations/customer';
import { useCreateCustomer } from './useCreateCustomer';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const useCreateCustomerPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      photo_url: '',
    },
  });

  const handleFileSelect = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    try {
      setUploading(true);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file);

      // Only set preview after successful upload
      setLogoPreview(result.secure_url);
      form.setValue('photo_url', result.secure_url);

      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload logo');
      setLogoPreview(null);
    } finally {
      setUploading(false);
    }
  }, [form]);

  const handleSubmit = useCallback((data: CreateCustomerInput) => {
    createCustomer(data, {
      onSuccess: () => {
        toast.success('Customer Created successfully!', {
          description: 'You have successfully created a new customer.',
        });
        navigate('/customers');
      },
      onError: (error) => {
        toast.error('Failed to create customer', {
          description: error instanceof Error ? error.message : 'An error occurred',
        });
      },
    });
  }, [createCustomer, navigate]);

  const handleBack = useCallback(() => {
    navigate('/customers');
  }, [navigate]);

  const handleRemoveLogo = useCallback(() => {
    setLogoPreview(null);
    form.setValue('photo_url', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  return {
    form,
    uploading,
    logoPreview,
    fileInputRef,
    isPending,
    handleFileSelect,
    handleSubmit,
    handleBack,
    handleRemoveLogo,
  };
};
