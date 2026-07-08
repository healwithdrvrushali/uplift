const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-6"
      style={{ background: '#fdf0e4' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/assets/dr_vrushali.jpg"
              alt="Dr. Vrushali Saraswat"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#c8963e]">
              About Dr. Vrushali Saraswat
            </h2>
            <h3 className="text-xl font-semibold text-[#4a2060]">
              Doctor by Profession. Healer by Choice.
            </h3>
            <div className="space-y-4 text-[#3d3d3d] leading-relaxed">
              <p>
                For over 25 years, I have been helping people heal not just physically, but emotionally, mentally, and spiritually.
              </p>
              <p>
                I am Dr. Vrushali Saraswat, a Homoeopathic Physician, Happiness Coach, Author, and Speaker who has impacted more than 38,000 lives across 20+ countries through consultations, workshops, seminars, and transformational programs.
              </p>
              <p>
                Over the years, I noticed a common pattern. Many people looked successful on the outside but felt disconnected, exhausted, and unfulfilled on the inside. They had achieved career milestones, built families, and earned respect yet struggled to experience genuine happiness, peace, and meaning.
              </p>
              <p>
                That realization led me to create{' '}
                <span className="font-semibold text-[#c8963e]">UPLIFT</span>.
              </p>
              <p>
                UPLIFT is a transformational journey designed to help high-performing individuals reconnect with themselves, overcome burnout, build emotional resilience, and create a life that feels as good on the inside as it looks on the outside.
              </p>
              <p>
                My work blends the best of medical science, psychology, neuroscience, emotional wellness, and timeless wisdom, creating practical tools that lead to lasting change not temporary motivation.
              </p>
              <p>
                Whether I am working with entrepreneurs, doctors, corporate leaders, educators, or individuals seeking a deeper sense of purpose, my mission remains the same:
              </p>
              <p className="font-semibold text-[#4a2060] italic">
                Mission: To help people stop merely surviving and start living with clarity, confidence, joy, and inner freedom.
              </p>
              <p>
                Because true success is not just about what you achieve. It&apos;s about who you become while achieving it.
              </p>
              <p>
                Through my 12-week UPLIFT Program, I help founders, doctors, CXOs, and professionals overcome burnout, regain clarity, strengthen relationships, and build a life that feels as good on the inside as it looks on the outside.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;