import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '@/lib/validations/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthContainer } from '@/components/AuthContainer';
import { Mail, CheckCircle2 } from 'lucide-react';
import doorLockImg from '@/assets/doorLock.svg';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export const ForgotPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setEmailSent(true);
      },
    });
  };

  const inputClassName =
    'h-9 text-sm leading-9 border-input bg-inherit shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

  const iconClassName = 'text-muted-foreground';

  if (emailSent) {
    return (
      <AuthContainer
        icon={<CheckCircle2 size={24} className="text-green-600" />}
        title="Check Your Email"
        subtitle="We've sent password reset instructions to your email address."
        footerText=""
        footerLinkText=""
        footerLinkHref=""
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Please check your inbox and follow the link to reset your password.
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setEmailSent(false)}
          >
            Back to Reset Password
          </Button>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      icon={<img src={doorLockImg} alt="Door Lock" className="w-6 h-6" />}
      title="Reset Password"
      subtitle="Enter your email to reset your password"
      footerText=""
      footerLinkText=""
      footerLinkHref=""
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" autoComplete="off">
          {forgotPasswordMutation.isError && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                {forgotPasswordMutation.error instanceof Error
                  ? forgotPasswordMutation.error.message
                  : 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    leftIcon={<Mail size={16} className={iconClassName} />}
                    className={inputClassName}
                    autoComplete="nope"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            loading={forgotPasswordMutation.isPending}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
