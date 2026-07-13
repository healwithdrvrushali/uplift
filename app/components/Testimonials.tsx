"use client";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      title: "Client Testimonial 1",
      videoId: "LMvgJ7QYkUQ",
    },
    {
      id: 2,
      title: "Client Testimonial 2",
      videoId: "f_0WiazKeMI",
    },
  ];

  const shorts = [
    {
      id: 1,
      title: "Client Success Story 1",
      videoId: "VKZlQl22MTk",
    },
    {
      id: 2,
      title: "Client Success Story 2",
      videoId: "2OCxvryuTJs",
    },
    {
      id: 3,
      title: "Client Success Story 3",
      videoId: "pnmOdOMoz4U",
    },
    {
      id: 4,
      title: "Client Success Story 4",
      videoId: "1EQ1_DIfPDw",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #4a2060, #6B3A8A)",
              color: "#ffffff",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "6px 18px",
              borderRadius: "20px",
              marginBottom: "1rem",
            }}
          >
            ✦ Success Stories ✦
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#4a2060",
              lineHeight: 1.2,
              marginBottom: "0.8rem",
            }}
          >
            What Our{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #c8963e 0%, #e8c170 30%, #c8963e 50%, #e8c170 70%, #c8963e 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Clients Say
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
              color: "#4a2060",
              maxWidth: "550px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Real transformations from real people who chose to uplift their lives.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(200,150,62,0.15)",
                boxShadow: "0 8px 30px rgba(74,32,96,0.08)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                  title={testimonial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div
                className="py-3 px-4"
                style={{
                  background: "linear-gradient(135deg, #4a2060, #6B3A8A)",
                }}
              >
                <p
                  className="text-white text-sm font-medium text-center"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shorts Grid - Continuous flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {shorts.map((short) => (
            <div
              key={short.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(200,150,62,0.15)",
                boxShadow: "0 8px 30px rgba(74,32,96,0.08)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="relative" style={{ aspectRatio: "9/16" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${short.videoId}`}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div
                className="py-2 px-3"
                style={{
                  background: "linear-gradient(135deg, #4a2060, #6B3A8A)",
                }}
              >
                <p
                  className="text-white text-xs sm:text-sm font-medium text-center"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {short.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below testimonials */}
        <div className="text-center mt-10 sm:mt-12">
          <a
            href="/optin"
            className="inline-flex items-center gap-2 font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: "linear-gradient(135deg, #c8963e, #e8c170)",
              color: "#ffffff",
            }}
          >
            START YOUR TRANSFORMATION
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
