import { AuthFooter } from '@/components/AuthFooter';
import { AuthHeader } from '@/components/AuthHeader';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import { PageContainer } from '@/Layout/PageContainer';

export const ForgotPassword = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <PageContainer>
        <AuthHeader />
      </PageContainer>
      <div className="flex-1 overflow-hidden">
        <ForgotPasswordForm />
      </div>
      <PageContainer>
        <AuthFooter />
      </PageContainer>
    </div>
  );
};
