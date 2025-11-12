import { useViewBusinessPage } from '@/hooks/useViewBusinessPage';
import { Button } from '@/components/ui/button';
import { ViewBusinessHeader } from './ViewBusinessHeader';
import { ViewBusinessDetails } from './ViewBusinessDetails';
import { ViewBusinessSkeleton } from './ViewBusinessSkeleton';

export const ViewBusiness = () => {
  const {
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
  } = useViewBusinessPage();

  if (isLoading) {
    return <ViewBusinessSkeleton />;
  }

  if (isError || !business) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive">Business not found</p>
            <Button
              onClick={handleNavigateToBusinesses}
              className="mt-4"
              variant="outline"
            >
              Back to Businesses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <ViewBusinessHeader onNavigateToBusinesses={handleNavigateToBusinesses} />
        <ViewBusinessDetails
          business={business}
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
