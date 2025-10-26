import { AuthHeader } from '@/components/AuthHeader';
import { AuthFooter } from '@/components/AuthFooter';
import { LoginForm } from '@/components/LoginForm';
import { PageContainer } from '@/Layout/PageContainer';

export const Login = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <PageContainer>
        <AuthHeader />
      </PageContainer>
      <div className="flex-1 overflow-hidden">
        <LoginForm />
      </div>
      <PageContainer>
        <AuthFooter />
      </PageContainer>
    </div>
  );
};
