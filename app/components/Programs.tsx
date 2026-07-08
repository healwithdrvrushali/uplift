"use client";

import { useState } from "react";

const programs = [
  {
    id: 1,
    title: "Uplift",
    subtitle: "Transform Your Life From Within",
    description:
      "A 12-week transformational journey designed for high-performing professionals to overcome burnout, regain clarity, and build a life that feels as good on the inside as it looks on the outside.",
    image: "/uplift.png",
    color: "#c8963e",
    highlights: ["Overcome Burnout", "Emotional Resilience", "Inner Freedom"],
  },
  {
    id: 2,
    title: "Happiness Reset",
    subtitle: "Rewire Your Mind For Joy",
    description:
      "A powerful program that helps you break free from negative thought patterns, cultivate genuine happiness, and create lasting emotional well-being through proven neuroscience-backed techniques.",
    image: "/happinessreset.jpeg",
    color: "#6B3A8A",
    highlights: ["Positive Mindset", "Emotional Balance", "Lasting Joy"],
  },
  {
    id: 3,
    title: "Life By Design",
    subtitle: "Architect Your Dream Reality",
    description:
      "Stop living by default and start living by design. This program empowers you to create a clear vision, set meaningful goals, and build the life you've always imagined with purpose and intention.",
    image: "/LIFEBYDESIGN.png",
    color: "#4a2060",
    highlights: ["Clear Vision", "Purposeful Living", "Goal Mastery"],
  },
  {
    id: 4,
    title: "Beyond CGPA",
    subtitle: "Success Beyond Academics",
    description:
      "Designed for students and young professionals who want to discover their true potential beyond grades. Learn emotional intelligence, life skills, and build confidence to thrive in the real world.",
    image: "/bryondcgpa.jpeg",
    color: "#c8963e",
    highlights: ["Self Discovery", "Life Skills", "Confidence Building"],
  },
];

const Programs = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="programs" className="relative z-10 py-14 sm:py-18 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #c8963e, #e8c170)",
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
            ✦ Our Programs ✦
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
            Transformational{" "}
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
              Programs
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
              color: "#4a2060",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Choose the journey that resonates with your soul. Each program is
            crafted to unlock your highest potential.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              onClick={() => {
                if (program.title === "Uplift") {
                  window.location.href = "/home";
                }
              }}
              onMouseEnter={() => setHoveredId(program.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(200,150,62,0.15)",
                boxShadow:
                  hoveredId === program.id
                    ? "0 16px 40px rgba(74,32,96,0.15), 0 6px 16px rgba(200,150,62,0.12)"
                    : "0 4px 20px rgba(74,32,96,0.08)",
                transform:
                  hoveredId === program.id
                    ? "translateY(-4px)"
                    : "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Image - compact square aspect ratio */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover object-center"
                  style={{
                    transform:
                      hoveredId === program.id ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 50%, ${program.color}33 80%, ${program.color}55 100%)`,
                  }}
                />
                {/* Program Number Badge */}
                <div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    border: `2px solid ${program.color}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      color: program.color,
                    }}
                  >
                    {program.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: program.color,
                    marginBottom: "0.2rem",
                  }}
                >
                  {program.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#6B3A8A",
                    fontStyle: "italic",
                    marginBottom: "0.5rem",
                  }}
                >
                  {program.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    color: "#4a2060",
                    lineHeight: 1.5,
                    marginBottom: "0.7rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {program.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {program.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: "inline-block",
                        background: `${program.color}12`,
                        border: `1px solid ${program.color}30`,
                        color: program.color,
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.65rem",
                        padding: "3px 8px",
                        borderRadius: "10px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below programs */}
        <div className="text-center mt-10 sm:mt-14">
          <a
            href="https://pages.razorpay.com/pl_QzeWz5qOyKRAu3/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4a2060] text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            EXPLORE & ENROLL NOW
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

export default Programs;