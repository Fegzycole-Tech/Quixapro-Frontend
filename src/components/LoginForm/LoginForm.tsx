import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
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
import { Checkbox } from '@/components/ui/checkbox';
import { AuthContainer } from '@/components/AuthContainer';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const onSubmit = (data: LoginInput) => {
    // API logic will be added here later
    console.log(data);
  };

  const inputClassName =
    'h-9 text-sm leading-9 border-input bg-inherit shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

  const iconClassName = 'text-muted-foreground';

  return (
    <AuthContainer
      icon={<LogIn size={28} className="text-[#525866]" strokeWidth={2.5} />}
      title="Login to your account"
      subtitle="Get your invoices on the go"
      footerText="Don't have an Account?"
      footerLinkText="Sign Up"
      footerLinkHref="/signup"
      showSocialLogin={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" autoComplete="off">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Password
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

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="keepLoggedIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal data-[error=true]:text-destructive mt-1">
                    Keep me Signed in
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link to="/forgot-password" className="text-sm mt-1">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
