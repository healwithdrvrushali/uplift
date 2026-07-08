const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-purple-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#4a2060]">
            Happiness Holistic Clinic
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">
            Home
          </a>
          <a href="#about" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">
            About
          </a>
          <a href="#testimonials" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">
            Testimonials
          </a>
          <a href="#get-started" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">
            Get Started
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Dr. Vrushali Logo" className="h-10 w-auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;