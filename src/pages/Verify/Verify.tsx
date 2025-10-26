import { AuthHeader } from '@/components/AuthHeader';
import { AuthFooter } from '@/components/AuthFooter';
import { VerifyForm } from '@/components/VerifyForm';
import { PageContainer } from '@/Layout/PageContainer';

export const Verify = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <PageContainer>
        <AuthHeader />
      </PageContainer>
      <div className="flex-1 overflow-hidden">
        <VerifyForm />
      </div>
      <PageContainer>
        <AuthFooter />
      </PageContainer>
    </div>
  );
};
