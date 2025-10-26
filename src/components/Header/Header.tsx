import { type ReactNode } from 'react';
import { Link } from 'react-router';
import QuixaproBillLogoLight from '@/assets/QuixaproLogoLight.svg';

interface HeaderLink {
  to: string;
  label: string;
  className?: string;
}

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  links?: HeaderLink[];
  rightContent?: ReactNode;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  brandClassName?: string;
}

export const Header = ({
  logoSrc = QuixaproBillLogoLight,
  logoAlt = 'Quixapro Logo',
  brandName = 'Quixapro',
  links = [],
  rightContent,
  className = '',
  containerClassName = 'flex w-full justify-between items-center py-4 px-8 relative z-20',
  logoClassName = 'w-8 h-8',
  brandClassName = 'font-bold text-2xl font-roseta',
}: HeaderProps) => {
  return (
    <header className={`text-white font-recoleta ${className}`}>
      <div className={containerClassName}>
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSrc} alt={logoAlt} className={logoClassName} />
          <h1 className={brandClassName}>{brandName}</h1>
        </Link>

        <div className="flex items-center gap-4">
          {links.length > 0 && (
            <nav className="flex items-center gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={
                    link.className ||
                    'text-md hover:opacity-80 transition font-bold'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {rightContent && (
            <div className="flex items-center gap-4">{rightContent}</div>
          )}
        </div>
      </div>
    </header>
  );
};
