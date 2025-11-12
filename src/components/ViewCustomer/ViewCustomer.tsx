import { useViewCustomerPage } from '@/hooks/useViewCustomerPage';
import { Button } from '@/components/ui/button';
import { ViewCustomerHeader } from './ViewCustomerHeader';
import { ViewCustomerDetails } from './ViewCustomerDetails';
import { ViewCustomerSkeleton } from './ViewCustomerSkeleton';

export const ViewCustomer = () => {
  const {
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
  } = useViewCustomerPage();

  if (isLoading) {
    return <ViewCustomerSkeleton />;
  }

  if (isError || !customer) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive">Customer not found</p>
            <Button
              onClick={handleNavigateToCustomers}
              className="mt-4"
              variant="outline"
            >
              Back to Customers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <ViewCustomerHeader onNavigateToCustomers={handleNavigateToCustomers} />
        <ViewCustomerDetails
          customer={customer}
          onBack={handleBack}
          isUpdating={isUpdating}
          uploading={uploading}
          logoPreview={logoPreview}
          fileInputRef={fileInputRef}
          form={form}
          isDirty={isDirty}
          onFileSelect={handleFileSelect}
          onRemoveLogo={handleRemoveLogo}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
