import { useCreateBusinessPage } from '@/hooks/useCreateBusinessPage';
import { CreateBusinessHeader } from './CreateBusinessHeader';
import { CreateBusinessForm } from './CreateBusinessForm';

export const CreateBusiness = () => {
  const {
    form,
    uploading,
    logoPreview,
    fileInputRef,
    isPending,
    handleFileSelect,
    handleSubmit,
    handleBack,
    handleRemoveLogo,
  } = useCreateBusinessPage();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <CreateBusinessHeader />
        <CreateBusinessForm
          form={form}
          logoPreview={logoPreview}
          uploading={uploading}
          isPending={isPending}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
          onRemoveLogo={handleRemoveLogo}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};
