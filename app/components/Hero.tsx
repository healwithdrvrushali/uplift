const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
      style={{
        background: 'linear-gradient(180deg, #e8dff5 0%, #fce8d5 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#c8963e] leading-tight">
          Hi, I am Dr. Vrushali Saraswat
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#4a2060]">
          Doctor by Profession, Healer by Choice!
        </h2>
        <p className="text-base md:text-lg text-[#4a2060]/80 max-w-2xl mx-auto leading-relaxed">
          I help accomplished professionals master emotional well-being, purpose, and happiness without slowing down their ambition.
        </p>
        <div className="w-24 h-px bg-[#4a2060]/20 mx-auto my-4"></div>
        <a
          href="#get-started"
          className="inline-block bg-[#c8963e] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#b5842f] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Apply Now
        </a>
      </div>
    </section>
  ); 
};

export default Hero;