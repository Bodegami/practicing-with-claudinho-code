'use client';

export default function Navbar() {
  return (
    <nav className="relative z-20 w-full border-b border-white/10 backdrop-blur-md bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BallDrag
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              About
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              Features
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/50">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
