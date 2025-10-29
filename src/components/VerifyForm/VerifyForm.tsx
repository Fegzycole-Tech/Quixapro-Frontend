import { useRef, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyCodeSchema, type VerifyCodeInput } from '@/lib/validations/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthContainer } from '@/components/AuthContainer';
import { useRequireValidEmail } from '@/hooks/useRequireValidEmail';
import { useVerifyCode } from '@/hooks/useVerifyCode';
import { useResendVerification } from '@/hooks/useResendVerification';
import mailCheckFillImg from '@/assets/mail-check-fill.svg';

export const VerifyForm = () => {
  const email = useRequireValidEmail({ redirectTo: '/signup' });

  const {
    mutate: verifyCodeMutation,
    isPending: isVerifying,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyCode();
  const {
    mutate: resendVerificationMutation,
    isPending: isResending,
    isSuccess: isResendSuccess,
  } = useResendVerification();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const form = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: '' },
  });

  const currentCode = form.watch('code');
  const codeArray = (currentCode + '    ').slice(0, 4).split('');

  const updateCode = (index: number, value: string) => {
    const newArray = [...codeArray];
    newArray[index] = value;
    form.setValue('code', newArray.join('').trim());
  };

  const handleInputChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    updateCode(index, value);
    if (value && index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!codeArray[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
        updateCode(index - 1, '');
      } else {
        updateCode(index, '');
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    form.setValue('code', pastedData);
    pastedData.split('').forEach((digit, i) => {
      if (inputRefs[i].current) inputRefs[i].current.value = digit;
    });
    inputRefs[Math.min(pastedData.length, 3)].current?.focus();
  };

  const onSubmit = (data: VerifyCodeInput) => {
    if (!email) return;
    verifyCodeMutation({
      email,
      code: data.code,
    });
  };

  const handleResendCode = () => {
    if (!email) return;
    resendVerificationMutation({ email });
  };

  if (!email) return null;

  return (
    <AuthContainer
      icon={<img src={mailCheckFillImg} alt="Door Lock" className="w-6 h-6" />}
      title="Enter Verification Code"
      subtitle={`We've sent a code to ${email}`}
      footerText=""
      footerLinkText=""
      footerLinkHref=""
      showSocialLogin={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isVerifyError && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              {verifyError?.message ||
                'Invalid verification code. Please try again.'}
            </div>
          )}

          {isResendSuccess && (
            <div className="p-3 text-sm text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              Verification code has been resent to your email.
            </div>
          )}

          <FormField
            control={form.control}
            name="code"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-3 justify-between">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={codeArray[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        disabled={isVerifying}
                        className="w-[calc(25%-9px)] h-14 text-center text-2xl font-semibold border border-input rounded-md bg-inherit shadow-xs focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-2 outline-none transition-[border-color,box-shadow] disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-destructive text-xs opacity-80 text-left" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" loading={isVerifying}>
            Submit Code
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            Experiencing issues receiving the code?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Resending...' : 'Resend code'}
            </button>
          </div>
        </form>
      </Form>
    </AuthContainer>
  );
};
