import { useState, useRef, useCallback, useEffect, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCustomer } from './useCustomer';
import { useUpdateCustomer } from './useUpdateCustomer';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from '@/lib/validations/customer';

export const useViewCustomerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: customer, isLoading, isError } = useCustomer(id || '');
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();

  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      photo_url: '',
    },
  });

  // Track if form is dirty (has changes)
  const isDirty = form.formState.isDirty || logoPreview !== customer?.photo_url;

  // Initialize form with customer data
  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
        email: customer.email,
        address: customer.address,
        photo_url: customer.photo_url || '',
      });
      setLogoPreview(customer.photo_url);
    }
  }, [customer, form]);

  const handleNavigateToCustomers = useCallback(() => {
    navigate('/customers');
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate('/customers');
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
        setLogoPreview(customer?.photo_url || null);
      } finally {
        setUploading(false);
      }
    },
    [form, customer]
  );

  const handleRemoveLogo = useCallback(() => {
    setLogoPreview(null);
    form.setValue('photo_url', '', { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  const handleSubmit = useCallback(
    (data: CreateCustomerInput) => {
      if (!customer) return;

      updateCustomer(
        { id: customer.id, data },
        {
          onSuccess: () => {
            toast.success('Customer updated successfully!', {
              description: 'Customer information has been updated.',
            });
          },
          onError: (error: unknown) => {
            let errorMessage = 'Failed to update customer';

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
    [customer, updateCustomer]
  );

  return {
    customer,
    isLoading,
    isError,
    isUpdating,
    uploading,
    logoPreview,
    fileInputRef,
    form,
    isDirty,
    handleNavigateToCustomers,
    handleBack,
    handleFileSelect,
    handleRemoveLogo,
    handleSubmit,
  };
};
