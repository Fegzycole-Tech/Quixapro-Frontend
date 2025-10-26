import { AuthHeader } from '@/components/AuthHeader';
import { AuthFooter } from '@/components/AuthFooter';
import { SignupForm } from '@/components/SignupForm';
import { PageContainer } from '@/Layout/PageContainer';

export const Signup = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <PageContainer>
        <AuthHeader />
      </PageContainer>
      <div className="flex-1 overflow-hidden">
        <SignupForm />
      </div>
      <PageContainer>
        <AuthFooter />
      </PageContainer>
    </div>
  );
};
