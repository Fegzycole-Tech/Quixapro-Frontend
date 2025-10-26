import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <div className={`w-full mx-auto 3xl:max-w-[50vw] ${className}`}>
      {children}
    </div>
  );
};
