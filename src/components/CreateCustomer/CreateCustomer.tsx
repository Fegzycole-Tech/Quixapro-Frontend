import { useCreateCustomerPage } from '@/hooks/useCreateCustomerPage';
import { CreateCustomerHeader } from './CreateCustomerHeader';
import { CreateCustomerForm } from './CreateCustomerForm';

export const CreateCustomer = () => {
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
  } = useCreateCustomerPage();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <CreateCustomerHeader />
        <CreateCustomerForm
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
