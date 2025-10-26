import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Lock, Eye, EyeOff } from 'lucide-react';

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    console.log('Reset password data:', data);
  };

  const handleDiscard = () => {
    form.reset();
  };

  const inputClassName =
    'h-9 text-sm leading-9 border-input bg-inherit shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

  const iconClassName = 'text-muted-foreground';

  const password = form.watch('password');

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
            >
              Discard
            </Button>
            <Button type="submit" className="flex-1">
              Apply Changes
            </Button>
          </div>
        </form>
      </Form>
    </AuthContainer>
  );
};
