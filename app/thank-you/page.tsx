"use client";

import { useEffect, useRef } from "react";

export default function ThankYouPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      { color: "rgba(239,154,126,", opacity: 0.18 },
      { color: "rgba(180,177,213,", opacity: 0.16 },
      { color: "rgba(200,180,255,", opacity: 0.14 },
      { color: "rgba(255,200,180,", opacity: 0.16 },
      { color: "rgba(160,140,200,", opacity: 0.12 },
    ];

    const waves = waveColors.map((wc, i) => ({
      amplitude: Math.random() * 60 + 30,
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
        ctx.moveTo(
          0,
          w.yOffset + Math.sin(w.phase + time * w.speed) * w.amplitude
        );

        for (let x = 0; x <= canvas.width; x += 4) {
          const y =
            w.yOffset +
            Math.sin(w.phase + x * w.frequency + time * w.speed) * w.amplitude +
            Math.sin(
              w.phase * 0.5 + x * w.frequency * 1.5 + time * w.speed * 0.7
            ) *
              (w.amplitude * 0.3);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(
          0,
          w.yOffset - w.amplitude,
          0,
          w.yOffset + w.amplitude + w.thickness
        );
        gradient.addColorStop(0, w.color + "0)");
        gradient.addColorStop(0.2, w.color + w.opacity + ")");
        gradient.addColorStop(0.5, w.color + w.opacity * 0.7 + ")");
        gradient.addColorStop(1, w.color + "0)");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

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
        href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes sparkle {
          0%, 50% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes floatStar {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(10deg); }
        }
        .fade-in-up-1 { animation: fadeInUp 0.8s ease-out forwards; }
        .fade-in-up-2 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        
        .scale-in { animation: scaleIn 0.6s ease-out 0.3s forwards; opacity: 0; }
        .sparkle-1 { animation: sparkle 2s ease-in-out infinite; }
        .sparkle-2 { animation: sparkle 2s ease-in-out 0.5s infinite; }
        
        
       
      `}</style>

      <div
        className="w-full min-h-screen relative"
        style={{
          background:
            "linear-gradient(180deg, #FDF6F0 0%, #F9ECF5 15%, #F0E8FA 30%, #EAE2F8 50%, #E8E0F5 65%, #F5EAF2 80%, #EDE5F8 90%, #F0E8FA 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 w-full max-w-lg mx-auto px-6 pt-12 pb-8 flex flex-col items-center">
          {/* Thank You Title - Large cursive like reference */}
          <h1
            className="text-center fade-in-up-1"
            style={{
              fontFamily: "'Charm', cursive",
              fontWeight: 700,
              fontSize: "3rem",
              color: "#362E69",
              lineHeight: 1.1,
              textShadow: "0 4px 20px rgba(239,154,126,0.2)",
              letterSpacing: "0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Thank You!
          </h1>

          {/* Subtitle */}
          <p
            className="text-center fade-in-up-2"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "1.3rem",
              color: "#362E69",
              marginBottom: "1.2rem",
            }}
          >
            Your <span style={{ color: "#c8963e", fontWeight: 700 }}>Payment</span> is Received
          </p>

          {/* Decorative line */}
          <div
            className="w-28 h-0.5 mx-auto fade-in-up-2"
            style={{
              background: "linear-gradient(90deg, transparent, #B4B1D5, transparent)",
              marginBottom: "1rem",
            }}
          />

          {/* Checkmark Circle - Large like reference */}
          <div className="relative scale-in" style={{ marginBottom: "2rem" }}>
            {/* Sparkle stars around the circle */}
            <span className="absolute -top-6 right-0 text-[#c8963e] sparkle-2 float-star-2" style={{ fontSize: "0.8rem" }}>✦</span>
            <span className="absolute top-4 -right-8 text-[#c8963e] sparkle-3 float-star-3" style={{ fontSize: "0.9rem" }}>✦</span>
            <span className="absolute top-0 -left-8 text-[#c8963e] sparkle-4 float-star-4" style={{ fontSize: "0.7rem" }}>✦</span>
            <span className="absolute bottom-6 -left-6 text-[#c8963e] sparkle-2 float-star-3" style={{ fontSize: "0.6rem" }}>✦</span>
            <span className="absolute bottom-4 -right-6 text-[#c8963e] sparkle-1 float-star-4" style={{ fontSize: "0.8rem" }}>✦</span>

            {/* Gold circle with checkmark - larger */}
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #c8963e 0%, #e8c170 40%, #d4a84e 70%, #c8963e 100%)",
                boxShadow: "0 12px 40px rgba(200,150,62,0.3), 0 4px 16px rgba(200,150,62,0.15)",
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Small decorative stars below circle */}
         

          {/* Main Message */}
          <div className="text-center fade-in-up-3" style={{ marginBottom: "0.8rem" }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#362E69",
                lineHeight: 1.3,
                marginBottom: "0.3rem",
              }}
            >
              You&rsquo;re One Step Closer
            </h2>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#c8963e",
                lineHeight: 1.3,
                
              }}
            >
              to Your Transformation!
            </h2>
          </div>

          {/* Description */}
          <p
            className="text-center fade-in-up-3"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: "#4a2060",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            We&rsquo;ve received your payment and
            <br />
            your seat is now confirmed.
            <br />
            You will receive a confirmation email
            <br />
            with all the details shortly.
          </p>

          {/* Info Cards */}
          <div
            className="w-full fade-in-up-4"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "1.5rem 1.2rem",
              boxShadow: "0 8px 32px rgba(180,177,213,0.12), 0 2px 8px rgba(54,46,105,0.04)",
              border: "1px solid rgba(180,177,213,0.15)",
              marginBottom: "2rem",
            }}
          >
            {/* Next Step */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(234,226,248,0.5)",
                  border: "1px solid rgba(180,177,213,0.25)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B5B95"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#c8963e",
                    marginBottom: "3px",
                  }}
                >
                  Next Step
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "#6B5B95",
                    lineHeight: 1.5,
                  }}
                >
                  Check your email for the
                  <br />
                  course details and schedule.
                </p>
              </div>
            </div>

            {/* What's Next */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(234,226,248,0.5)",
                  border: "1px solid rgba(180,177,213,0.25)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B5B95"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#c8963e",
                    marginBottom: "3px",
                  }}
                >
                  What&rsquo;s Next?
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "#6B5B95",
                    lineHeight: 1.5,
                  }}
                >
                  Our team will connect with you
                  <br />
                  within 24 hours.
                </p>
              </div>
            </div>

            {/* Need Help */}
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(234,226,248,0.5)",
                  border: "1px solid rgba(180,177,213,0.25)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B5B95"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#c8963e",
                    marginBottom: "3px",
                  }}
                >
                  Need Help?
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "#6B5B95",
                    lineHeight: 1.5,
                  }}
                >
                  WhatsApp us anytime at
                  <br />
                  <a
                    href="https://wa.me/917827605410"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#6B3A8A",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    +91 77383 75783
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center fade-in-up-5" style={{ marginBottom: "2rem" }}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                color: "#362E69",
                lineHeight: 1.6,
                marginBottom: "0.3rem",
              }}
            >
              You&rsquo;ve taken the first powerful step.
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#c8963e",
                
                lineHeight: 1.6,
              }}
            >
              We&rsquo;re so excited to have you on this journey!
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-[#4a2060] text-white py-6 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-nowrap justify-center items-center gap-2 sm:gap-4 mb-3">
              <a
                href="/privacy-policy"
                className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap"
              >
                Privacy Policy
              </a>
              <span className="text-white/40 text-[10px] sm:text-sm">|</span>
              <a
                href="/terms-and-conditions"
                className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap"
              >
                Terms & Conditions
              </a>
              <span className="text-white/40 text-[10px] sm:text-sm">|</span>
              <a
                href="/refund-policy"
                className="text-white/80 hover:text-[#c8963e] transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap"
              >
                Refund Policy
              </a>
            </div>
            <p className="text-[10px] sm:text-sm opacity-80">
              © 2025 Dr. Vrushali Saraswat | Happiness Holistic Clinic. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-sm opacity-60 mt-1">
              Contact: heal@drvrushali.com
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}