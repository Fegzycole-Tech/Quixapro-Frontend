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

        <div
          className="relative inline-flex rounded-full transition-all duration-300"
          style={{
            background:
              'linear-gradient(90deg, #ec4899 0%, #8b5cf6 50%, #60a5fa 100%)',
            padding: '2px',
            boxShadow: '0 6px 20px rgba(139,92,246,0.12)',
          }}
        >
          <div className="rounded-full w-full h-full bg-[#0a0a0f]">
            <button
              className="px-6 py-2.5 w-[170px] cursor-pointer h-full rounded-full bg-[#0a0a0f] hover:bg-[#0a0a0f]/80 text-white text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              aria-label="Get Started"
              type="button"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
