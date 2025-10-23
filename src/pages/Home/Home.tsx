function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Quixapro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            Your modern frontend application built with React, TypeScript, and Tailwind CSS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Development
              </h3>
              <p className="text-gray-600">
                Built with Vite for lightning-fast development experience and hot module replacement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Type Safety
              </h3>
              <p className="text-gray-600">
                TypeScript ensures your code is reliable and maintainable with full type checking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Beautiful Design
              </h3>
              <p className="text-gray-600">
                Styled with Tailwind CSS and custom Helvetica Neue typography for a polished look.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
