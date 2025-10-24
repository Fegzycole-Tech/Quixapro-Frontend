import { Link } from 'react-router';
import QuixaproBillLogoLight from '../../../assets/QuickBillLogoLight.png';

export const Header = () => {
  return (
    <header className="flex w-full justify-between text-white items-center py-6 px-8 relative z-20 font-recoleta">
      <div className="flex items-center gap-2">
        <img src={QuixaproBillLogoLight} alt="Quixapro Logo" className="w-8 h-8" />
        <h1 className="font-bold text-2xl">Quixapro</h1>
      </div>
      <nav>
        <Link to="/signup" className="text-md hover:text-indigo-400 transition font-bold">
          Login
        </Link>
      </nav>
    </header>
  );
};
