import { useState, useRef, useCallback, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  createBusinessSchema,
  type CreateBusinessInput,
} from '@/lib/validations/business';
import { useCreateBusiness } from './useCreateBusiness';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const useCreateBusinessPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createBusiness, isPending } = useCreateBusiness();

  const form = useForm<CreateBusinessInput>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone_number: '',
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

  const handleSubmit = useCallback((data: CreateBusinessInput) => {
    createBusiness(data, {
      onSuccess: () => {
        toast.success('Business Created successfully!', {
          description: 'You have successfully created a new business.',
        });
        navigate('/businesses');
      },
      onError: (error) => {
        toast.error('Failed to create business', {
          description: error instanceof Error ? error.message : 'An error occurred',
        });
      },
    });
  }, [createBusiness, navigate]);

  const handleBack = useCallback(() => {
    navigate('/businesses');
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
