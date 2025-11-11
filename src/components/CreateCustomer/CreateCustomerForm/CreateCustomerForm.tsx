import { type UseFormReturn } from 'react-hook-form';
import { type RefObject, type ChangeEvent } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { CreateCustomerInput } from '@/lib/validations/customer';
import { CompanyLogoUpload } from '../CompanyLogoUpload';

interface CreateCustomerFormProps {
  form: UseFormReturn<CreateCustomerInput>;
  logoPreview: string | null;
  uploading: boolean;
  isPending: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: CreateCustomerInput) => void;
  onBack: () => void;
}

export const CreateCustomerForm = ({
  form,
  logoPreview,
  uploading,
  isPending,
  fileInputRef,
  onFileSelect,
  onSubmit,
  onBack,
}: CreateCustomerFormProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Company details
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in customer company details to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CompanyLogoUpload
            logoPreview={logoPreview}
            uploading={uploading}
            fileInputRef={fileInputRef}
            onFileSelect={onFileSelect}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Name" {...field} />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="hello@zolvex.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Address" {...field} />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isPending || uploading}
              loading={isPending}
              className="flex-1"
            >
              Save Customer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
