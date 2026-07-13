"use client";
import { useEffect, useRef } from "react";
import HlsPlayer from "../components/HlsPlayer";

export default function VSLPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    "Book a call and fill out the short application in detail",
    "We'll review your application and speak with you to see if you're a good fit",
    "Limited members will be accepted",
    "The Batch will starts this Month",
    "Serious participants apply only. Application fees is non refundable",
    "Limited slots left!",
  ];

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
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
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
        .fade-in-1 { animation: fadeInUp 0.8s ease-out forwards; }
        .fade-in-2 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
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

        {/* HERO SECTION */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
            <h1
              className="fade-in-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                lineHeight: 1.2,
                color: "#4a2060",
                letterSpacing: "0.02em",
              }}
            >
              Hi, I am{" "}
              <span className="shimmer-gold whitespace-nowrap">Dr. Vrushali Saraswat</span>
            </h1>

            <h2
              className="fade-in-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(1.2rem, 3.5vw, 2.4rem)",
                lineHeight: 1.3,
                color: "#6B3A8A",
                fontStyle: "italic",
                letterSpacing: "0.03em",
              }}
            >
              Doctor by Profession, Healer by Choice!
            </h2>

            <p
              className="fade-in-3"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                lineHeight: 1.7,
                color: "#4a2060",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              I help accomplished professionals master{" "}
              <span style={{ color: "#c8963e", fontWeight: 800 }}>emotional well-being</span>,{" "}
              <span style={{ color: "#c8963e", fontWeight: 800 }}>purpose</span>, and{" "}
              <span style={{ color: "#c8963e", fontWeight: 800 }}>happiness</span>{" "}
              without slowing down their ambition.
            </p>

            <div
              className="w-24 sm:w-32 h-1 mx-auto"
              style={{
                background: "linear-gradient(90deg, transparent, #c8963e, transparent)",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </section>

        {/* VIDEO SECTION - HLS Stream */}
        <section className="relative z-10 px-3 sm:px-6 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl"
              style={{
                boxShadow:
                  "0 20px 60px rgba(74,32,96,0.2), 0 8px 24px rgba(239,154,126,0.15)",
              }}
            >
              <HlsPlayer
                src="http://media.drvrushali.com/stream.m3u8"
                loop={true}
                controls={true}
                
                className="rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* APPLY NOW BUTTON - Opens Razorpay in same tab */}
        <section className="relative z-10 px-4 sm:px-6 pb-8 sm:pb-12 text-center">
          <a
            href="https://rzp.io/rzp/pBkF3p7t"
            className="btn-shine pulse-btn inline-block bg-[#c8963e] text-white font-semibold px-7 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:bg-[#b5842f] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer no-underline"
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", letterSpacing: "0.03em" }}
          >
            BOOK CLARITY CALL
          </a>
        </section>

        {/* HOW TO GET STARTED SECTION */}
        <section className="relative z-10 py-0 px-3 sm:px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "#c8963e",
                marginBottom: "2rem",
                letterSpacing: "0.02em",
              }}
            >
              How To Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-5 text-left max-w-4xl mx-auto mb-8 sm:mb-12">
              <div className="space-y-4 sm:space-y-5">
                {steps.slice(0, 3).map((step, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#c8963e] flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-[#4a2060] font-medium text-sm sm:text-base leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 sm:space-y-5">
                {steps.slice(3, 6).map((step, i) => (
                  <div key={i + 3} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#c8963e] flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-[#4a2060] font-medium text-sm sm:text-base leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 bg-[#4a2060] text-white py-6 sm:py-8 px-4 sm:px-6">
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
