import { Bird } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#0c1420] via-[#0f1a2e] to-[#0c1420] text-white py-5 sm:py-7 px-4 shadow-2xl sticky top-0 z-40 backdrop-blur-lg border-b border-[#1a2942]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="bg-gradient-to-br from-white to-slate-100 rounded-2xl p-2.5 sm:p-3.5 shadow-xl transform hover:scale-105 hover:rotate-3 transition-all duration-300 touch-manipulation">
            <Bird className="w-7 h-7 sm:w-9 sm:h-9 text-[#0c1420]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white">
              THFC <span className="font-semibold">Hub</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light tracking-wider">
              To Dare Is To Do
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
