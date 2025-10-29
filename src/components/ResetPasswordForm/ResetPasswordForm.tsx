import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  type ResetPasswordInput,
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
import { PasswordStrengthChecker } from '@/components/PasswordStrengthChecker';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useResetPassword } from '@/hooks/useResetPassword';

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const resetPasswordMutation = useResetPassword({ email, token });

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!email || !token) {
      // Could redirect to forgot-password page or show an error
      console.error('Invalid reset password link');
    }
  }, [email, token]);

  const onSubmit = (data: ResetPasswordInput) => {
    resetPasswordMutation.mutate(data);
  };

  const handleDiscard = () => {
    form.reset();
  };

  const inputClassName =
    'h-9 text-sm leading-9 border-input bg-inherit shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

  const iconClassName = 'text-muted-foreground';

  const password = form.watch('password');

  if (!email || !token) {
    return (
      <AuthContainer
        icon={<AlertCircle size={24} className="text-destructive" />}
        title="Invalid Link"
        subtitle="This password reset link is invalid or has expired."
        footerText=""
        footerLinkText=""
        footerLinkHref=""
        showSocialLogin={false}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Please request a new password reset link.
          </p>
          <Button
            type="button"
            className="w-full"
            onClick={() => navigate('/forgot-password')}
          >
            Request New Link
          </Button>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      icon={<Lock size={24} strokeWidth={2.5} className="text-[#525866]" />}
      title="Reset Password"
      subtitle="Reset your password and try to log in again."
      footerText=""
      footerLinkText=""
      footerLinkHref=""
      showSocialLogin={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" autoComplete="off">
          {resetPasswordMutation.isError && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                {resetPasswordMutation.error instanceof Error
                  ? resetPasswordMutation.error.message
                  : 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    leftIcon={<Lock size={16} className={iconClassName} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={16} className={iconClassName} />
                        ) : (
                          <Eye size={16} className={iconClassName} />
                        )}
                      </button>
                    }
                    className={inputClassName}
                    autoComplete="new-password"
                    disabled={resetPasswordMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    leftIcon={<Lock size={16} className={iconClassName} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} className={iconClassName} />
                        ) : (
                          <Eye size={16} className={iconClassName} />
                        )}
                      </button>
                    }
                    className={inputClassName}
                    autoComplete="new-password"
                    disabled={resetPasswordMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80" />
              </FormItem>
            )}
          />

          {password && <PasswordStrengthChecker password={password} />}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleDiscard}
              disabled={resetPasswordMutation.isPending}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="flex-1"
              loading={resetPasswordMutation.isPending}
            >
              Apply Changes
            </Button>
          </div>
        </form>
      </Form>
    </AuthContainer>
  );
};
