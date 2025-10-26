import { type ReactNode } from 'react';
import { Link } from 'react-router';

import googleImg from '@/assets/google.svg';
import { AuthIcon } from '../AuthIcon';
import { Button } from '@/components/ui/button';

interface AuthContainerProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showSocialLogin?: boolean;
}

export const AuthContainer = ({
  icon,
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  showSocialLogin = false,
}: AuthContainerProps) => {
  return (
    <div className="flex items-start justify-center pt-8 pb-4 px-4 sm:px-6 lg:px-8 overflow-y-auto h-full">
      <div className="max-w-md w-full space-y-5 rounded-lg shadow-sm p-4 bg-card">
        <div className="text-center">
          <AuthIcon icon={icon} />
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-0.5 text-sm">{subtitle}</p>
        </div>

        <div className="mt-4">{children}</div>

        <div className="text-center text-sm">
          <span className="">{footerText} </span>
          <Link to={footerLinkHref} className="font-semibold">
            {footerLinkText}
          </Link>
        </div>

        {showSocialLogin && (
          <>
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full hover:bg-background hover:text-foreground dark:hover:bg-input/30 dark:hover:text-foreground items-center"
              >
                <img src={googleImg} alt="Google svg icon"  />
                <span className="mt-1">Continue with Google</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
