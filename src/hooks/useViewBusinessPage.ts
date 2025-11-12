import { useState, useRef, useCallback, useEffect, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useBusiness } from './useBusiness';
import { useUpdateBusiness } from './useUpdateBusiness';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  createBusinessSchema,
  type CreateBusinessInput,
} from '@/lib/validations/business';

export const useViewBusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: business, isLoading, isError } = useBusiness(id || '');
  const { mutate: updateBusiness, isPending: isUpdating } = useUpdateBusiness();

  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Track if form is dirty (has changes)
  const isDirty = form.formState.isDirty || logoPreview !== business?.photo_url;

  // Initialize form with business data
  useEffect(() => {
    if (business) {
      form.reset({
        name: business.name,
        email: business.email,
        address: business.address,
        phone_number: business.phone_number,
        photo_url: business.photo_url || '',
      });
      setLogoPreview(business.photo_url);
    }
  }, [business, form]);

  const handleNavigateToBusinesses = useCallback(() => {
    navigate('/businesses');
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate('/businesses');
  }, [navigate]);

  const handleFileSelect = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
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

        // Set preview and form value
        setLogoPreview(result.secure_url);
        form.setValue('photo_url', result.secure_url, { shouldDirty: true });

        toast.success('Logo uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload logo');
        setLogoPreview(business?.photo_url || null);
      } finally {
        setUploading(false);
      }
    },
    [form, business]
  );

  const handleRemoveLogo = useCallback(() => {
    setLogoPreview(null);
    form.setValue('photo_url', '', { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  const handleSubmit = useCallback(
    (data: CreateBusinessInput) => {
      if (!business) return;

      updateBusiness(
        { id: business.id, data },
        {
          onSuccess: () => {
            toast.success('Business updated successfully!', {
              description: 'Business information has been updated.',
            });
          },
          onError: (error: unknown) => {
            let errorMessage = 'Failed to update business';

            if (error && typeof error === 'object') {
              if ('data' in error && error.data && typeof error.data === 'object' && 'email' in error.data) {
                const emailErrors = error.data.email;
                if (Array.isArray(emailErrors) && emailErrors.length > 0) {
                  errorMessage = String(emailErrors[0]);
                }
              } else if ('message' in error && typeof error.message === 'string') {
                errorMessage = error.message;
              }
            }

            toast.error('Update failed', {
              description: errorMessage,
            });
          },
        }
      );
    },
    [business, updateBusiness]
  );

  return {
    business,
    isLoading,
    isError,
    isUpdating,
    uploading,
    logoPreview,
    fileInputRef,
    form,
    isDirty,
    handleNavigateToBusinesses,
    handleBack,
    handleFileSelect,
    handleRemoveLogo,
    handleSubmit,
  };
};
