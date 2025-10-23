import { Link } from 'react-router';
import QuickBillLogoLight from '../../../assets/QuickBillLogoLight.png';

export const Header = () => {
  return (
    <header className="flex w-full justify-between text-white items-center py-6 px-8 relative z-20 font-recoleta">
      <div className="flex items-center gap-2">
        <img src={QuickBillLogoLight} alt="Quick Bill Logo" className="w-8 h-8" />
        <h1 className="font-bold text-2xl">QuickBill</h1>
      </div>
      <nav>
        <Link to="/signup" className="text-md hover:text-indigo-400 transition font-bold">
          Login
        </Link>
      </nav>
    </header>
  );
};
