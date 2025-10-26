import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-center px-6 py-12">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl sm:text-5xl font-recoleta font-extrabold leading-tight text-white mb-4">
          <span className="text-indigo-400">Create</span>, Manage, and Send
          Invoices Effortlessly..
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
          Simple invoicing for your growing business — sign up and get started
          in minutes
        </p>

        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full animate-gradient-border"></div>
          <div className="relative m-[2px] rounded-full bg-[#0a0a0f]">
            <Button
              className="w-[170px] rounded-full bg-[#0a0a0f] hover:bg-[#0a0a0f]/80 text-white shadow-[0_6px_20px_rgba(139,92,246,0.12)]"
              type="button"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
