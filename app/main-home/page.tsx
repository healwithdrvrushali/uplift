"use client";

import { useEffect, useRef, useState } from "react";
import Programs from "../components/Programs";
import Testimonials from "../components/Testimonials";

export default function MainHomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waveColors = [
      { color: "rgba(239,154,126,", opacity: 0.22 },
      { color: "rgba(180,177,213,", opacity: 0.2 },
      { color: "rgba(200,180,255,", opacity: 0.18 },
      { color: "rgba(255,200,180,", opacity: 0.2 },
      { color: "rgba(160,140,200,", opacity: 0.16 },
      { color: "rgba(239,154,126,", opacity: 0.18 },
    ];

    const waves = waveColors.map((wc, i) => ({
      amplitude: Math.random() * 80 + 40,
      frequency: Math.random() * 0.003 + 0.001,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      yOffset: (canvas.height / (waveColors.length + 1)) * (i + 1),
      color: wc.color,
      opacity: wc.opacity,
      thickness: Math.random() * 60 + 30,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, w.yOffset + Math.sin(w.phase + time * w.speed) * w.amplitude);

        for (let x = 0; x <= canvas.width; x += 4) {
          const y =
            w.yOffset +
            Math.sin(w.phase + x * w.frequency + time * w.speed) * w.amplitude +
            Math.sin(w.phase * 0.5 + x * w.frequency * 1.5 + time * w.speed * 0.7) * (w.amplitude * 0.3);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, w.yOffset - w.amplitude, 0, w.yOffset + w.amplitude + w.thickness);
        gradient.addColorStop(0, w.color + "0)");
        gradient.addColorStop(0.3, w.color + w.opacity + ")");
        gradient.addColorStop(0.6, w.color + (w.opacity * 0.5) + ")");
        gradient.addColorStop(1, w.color + "0)");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      for (let i = 0; i < 5; i++) {
        const orbX = canvas.width * (0.1 + i * 0.2) + Math.sin(time * 0.005 + i * 1.2) * 60;
        const orbY = canvas.height * (0.2 + i * 0.15) + Math.cos(time * 0.004 + i * 0.8) * 40;
        const orbR = 100 + Math.sin(time * 0.003 + i) * 30;

        const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
        const orbColorsList = [
          "rgba(239,154,126,",
          "rgba(180,177,213,",
          "rgba(200,180,255,",
          "rgba(255,200,180,",
          "rgba(160,140,200,",
        ];
        const c = orbColorsList[i % orbColorsList.length];
        orbGrad.addColorStop(0, c + "0.12)");
        orbGrad.addColorStop(0.5, c + "0.06)");
        orbGrad.addColorStop(1, c + "0)");

        ctx.beginPath();
        ctx.arc(orbX, orbY, orbR, 0, Math.PI * 2);
        ctx.fillStyle = orbGrad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes shimmerGold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes btnShine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(200,150,62,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 12px 40px rgba(200,150,62,0.6); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .shimmer-gold {
          background: linear-gradient(90deg, #c8963e 0%, #e8c170 30%, #c8963e 50%, #e8c170 70%, #c8963e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 4s linear infinite;
        }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: btnShine 3s ease-in-out infinite;
        }
        .pulse-btn {
          animation: pulse 2.5s ease-in-out infinite;
        }
        .fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .fade-in-right { animation: fadeInRight 1s ease-out 0.3s forwards; opacity: 0; }
        .fade-in-up-1 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-up-2 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .fade-in-up-3 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .fade-in-up-4 { animation: fadeInUp 0.8s ease-out 0.8s forwards; opacity: 0; }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marqueeScroll 45s linear infinite;
        }
        .nav-pill {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(200,150,62,0.2);
          box-shadow: 0 4px 20px rgba(74,32,96,0.1);
        }
        .nav-pill a {
          transition: color 0.3s ease;
        }
        .nav-pill a:hover {
          color: #c8963e !important;
        }
      `}</style>

      <div
        className="w-full min-h-screen relative"
        style={{
          background:
            "linear-gradient(150deg, #FDF6F0 0%, #F9ECF5 20%, #F0E8FA 40%, #EAE2F8 55%, #E8E0F5 70%, #F5EAF2 85%, #FDF5EE 100%)",
        }}
      >
        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* STICKY HEADER - Marquee + Navbar together, stays fixed at top */}
        <div className="sticky top-0 z-50">
          {/* MARQUEE STRIP AT TOP - Small font, slow speed, no stars */}
          <div
            className="w-full py-1.5"
            style={{ background: "#4a2060" }}
          >
            <div className="marquee-container">
              <div className="marquee-content">
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.65rem",
                    color: "#c8963e",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.65rem",
                    color: "#c8963e",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India&apos;s No 1 Happiness Coach &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>

          {/* NAVIGATION BAR - Dr Vrushali + centered pill nav in same line */}
          <nav className="flex items-center justify-center py-3 px-4 sm:px-8 gap-4 sm:gap-6"
            style={{ transition: "all 0.3s ease" }}
          >
            {/* Dr Vrushali - shrinks on scroll */}
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontWeight: 400,
                fontSize: scrolled ? "1.3rem" : "2rem",
                color: "#4a2060",
                lineHeight: 1.2,
                transition: "font-size 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Dr Vrushali
            </span>

            {/* Nav links - centered pill shape */}
            <div className="nav-pill rounded-full px-5 sm:px-8 py-2.5 flex items-center justify-center gap-5 sm:gap-8">
              <a
                href="#"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#c8963e",
                  textDecoration: "none",
                }}
              >
                Home
              </a>
              <a
                href="#about"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#4a2060",
                  textDecoration: "none",
                }}
              >
                About
              </a>
              <a
                href="#programs"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#4a2060",
                  textDecoration: "none",
                }}
              >
                Programs
              </a>
              <a
                href="#testimonial"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#4a2060",
                  textDecoration: "none",
                }}
              >
                Testimonial
              </a>
            </div>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-10 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* LEFT SIDE - Text Content */}
              <div className="space-y-5 sm:space-y-6 fade-in-left">
                {/* Badge - Happiness Coach */}
                <div className="fade-in-up-1">
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
                    }}
                  >
                    ✦ Happiness Coach ✦
                  </span>
                </div>

                {/* Main Heading */}
                <div className="fade-in-up-2">
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      lineHeight: 1.1,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontSize: "clamp(2.2rem, 5vw, 5rem)",
                        color: "#4a2060",
                        fontFamily: "'Charm', cursive",
                        fontWeight: 700,
                        textShadow: "0 4px 20px rgba(239,154,126,0.3)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Uplift
                    </span>
                    <span
                      className="shimmer-gold"
                      style={{
                        display: "block",
                        fontSize: "clamp(2.2rem, 5vw, 5rem)",
                      }}
                    >
                      your life
                    </span>
                  </h2>
                </div>

                {/* Description */}
                <p
                  className="fade-in-up-3"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                    lineHeight: 1.7,
                    color: "#4a2060",
                    maxWidth: "520px",
                  }}
                >
                  I help accomplished professionals master emotional well-being,
                  purpose, and happiness without slowing down their ambition.
                </p>

                {/* CTA Button */}
                <div className="fade-in-up-4 pt-2">
                  <a
                    href="/"
                    className="btn-shine pulse-btn inline-block"
                    style={{
                      padding: "16px 40px",
                      borderRadius: "14px",
                      fontSize: "1.1rem",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      background: "linear-gradient(90deg, #c8963e 0%, #e8c170 30%, #c8963e 50%, #e8c170 70%, #c8963e 100%)",
                      border: "none",
                      boxShadow: "0 8px 30px rgba(239,154,126,0.4), 0 2px 8px rgba(212,96,62,0.25)",
                      transition: "all 0.3s ease",
                      letterSpacing: "0.03em",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Register
                  </a>
                </div>
              </div>

              {/* RIGHT SIDE - Image */}
              <div className="flex flex-col items-center lg:items-end fade-in-right">
                <div
                  className="relative"
                  style={{
                    maxWidth: "480px",
                    width: "100%",
                  }}
                >
                  <img
                    src="/dr_vrushali.jpg"
                    alt="Dr. Vrushali Saraswat"
                    className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                    style={{
                      boxShadow:
                        "0 25px 60px rgba(74,32,96,0.2), 0 10px 30px rgba(200,150,62,0.15)",
                    }}
                  />
                  {/* Decorative accent */}
                  <div
                    className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
                    style={{
                      border: "3px solid rgba(200,150,62,0.3)",
                    }}
                  ></div>
                </div>
                {/* Text below image */}
                <p
                  className="mt-6 text-center lg:text-right"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    color: "#6B3A8A",
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                  }}
                >
                  Doctor by Profession, Healer by Choice!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <Programs />

        {/* TESTIMONIALS SECTION */}
        <section id="testimonial" className="relative z-10">
          <Testimonials />
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 bg-[#4a2060] text-white py-6 sm:py-8 px-4 sm:px-6 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-nowrap justify-center items-center gap-2 sm:gap-4 mb-4">
              <a href="/privacy-policy" className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap">
                Privacy Policy
              </a>
              <span className="text-white/40 text-[10px] sm:text-sm">|</span>
              <a href="/terms-and-conditions" className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap">
                Terms & Conditions
              </a>
              <span className="text-white/40 text-[10px] sm:text-sm">|</span>
              <a href="/refund-policy" className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap">
                Refund Policy
              </a>
            </div>
            <p className="text-[10px] sm:text-sm opacity-80 whitespace-nowrap">
              © 2025 Dr. Vrushali Saraswat | Happiness Holistic Clinic. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-sm opacity-60 mt-2">
              Contact: heal@drvrushali.com
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}