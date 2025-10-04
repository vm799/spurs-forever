import { Bird } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#132257] to-[#1a2d6b] text-white py-4 sm:py-6 px-4 shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-white rounded-full p-2 sm:p-3 shadow-lg transform hover:scale-105 transition-transform duration-200 touch-manipulation">
            <Bird className="w-6 h-6 sm:w-8 sm:h-8 text-[#132257]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              THFC News & Goals
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-1">
              To Dare Is To Do
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
