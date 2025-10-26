import { type ReactNode } from 'react';
import { Link } from 'react-router';

import googleImg from '@/assets/google.svg';
import { AuthIcon } from '../AuthIcon';

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
  showSocialLogin = true,
}: AuthContainerProps) => {
  return (
    <div className="flex items-start justify-center pt-8 pb-4 px-4 sm:px-6 lg:px-8 overflow-y-auto h-full">
      <div className="max-w-md w-full space-y-5 rounded-lg shadow-sm p-4 bg-card">
        <div className="text-center">
          <AuthIcon icon={icon} />
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-0.5 text-xs">{subtitle}</p>
        </div>

        <div className="mt-4">{children}</div>

        <div className="text-center text-xs">
          <span className="">{footerText} </span>
          <Link to={footerLinkHref} className="font-semibold">
            {footerLinkText}
          </Link>
        </div>

        {showSocialLogin && (
          <>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border rounded-md shadow-sm text-sm font-medium"
              >
                <img src={googleImg} alt="Google svg icon" />
                Continue with Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
