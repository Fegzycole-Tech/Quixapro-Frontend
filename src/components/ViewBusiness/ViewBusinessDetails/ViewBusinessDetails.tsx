import { Building2, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { type ChangeEvent, type RefObject } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { Business } from '@/lib/api/businesses';
import type { CreateBusinessInput } from '@/lib/validations/business';
import { CompanyLogoDisplay } from '@/components/CompanyLogo';

interface ViewBusinessDetailsProps {
  business: Business;
  onBack: () => void;
  isUpdating: boolean;
  uploading: boolean;
  logoPreview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  form: UseFormReturn<CreateBusinessInput>;
  isDirty: boolean;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveLogo: () => void;
  onSubmit: (data: CreateBusinessInput) => void;
}

export const ViewBusinessDetails = ({
  business,
  onBack,
  isUpdating,
  uploading,
  logoPreview,
  fileInputRef,
  form,
  isDirty,
  onFileSelect,
  onRemoveLogo,
  onSubmit,
}: ViewBusinessDetailsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-foreground mb-1">
          Company details
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in business company details to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CompanyLogoDisplay
            photoUrl={business.photo_url}
            isEditMode={true}
            uploading={uploading}
            logoPreview={logoPreview}
            fileInputRef={fileInputRef}
            onFileSelect={onFileSelect}
            onRemoveLogo={onRemoveLogo}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...field} className="pl-10" disabled={isUpdating} />
                </div>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...field} className="pl-10" disabled={isUpdating} />
                </div>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...field} className="pl-10" disabled={isUpdating} />
                </div>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...field} className="pl-10" disabled={isUpdating} />
                </div>
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
              disabled={isUpdating}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!isDirty || isUpdating || uploading}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
