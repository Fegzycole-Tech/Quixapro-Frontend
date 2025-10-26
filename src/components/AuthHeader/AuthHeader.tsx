import { Header } from '@/components/Header';
import { ThemeToggle } from '@/components/ThemeToggle';

interface AuthHeaderProps {
  showLoginLink?: boolean;
  showSignupLink?: boolean;
}

export const AuthHeader = ({
  showLoginLink = false,
  showSignupLink = false,
}: AuthHeaderProps) => {
  const links = [];

  if (showLoginLink) {
    links.push({
      to: '/login',
      label: 'Login',
      className: 'text-md hover:opacity-80 transition font-semibold',
    });
  }

  if (showSignupLink) {
    links.push({
      to: '/signup',
      label: 'Sign Up',
      className: 'text-md hover:opacity-80 transition font-semibold',
    });
  }

  return (
    <Header
      className="bg-primary dark:bg-[#1E2139]"
      brandClassName="font-bold text-xl"
      links={links}
      rightContent={<ThemeToggle />}
    />
  );
};
