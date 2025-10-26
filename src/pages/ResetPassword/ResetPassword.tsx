import { AuthHeader } from '@/components/AuthHeader';
import { AuthFooter } from '@/components/AuthFooter';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import { PageContainer } from '@/Layout/PageContainer';

export const ResetPassword = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <PageContainer>
        <AuthHeader />
      </PageContainer>
      <div className="flex-1 overflow-hidden">
        <ResetPasswordForm />
      </div>
      <PageContainer>
        <AuthFooter />
      </PageContainer>
    </div>
  );
};
