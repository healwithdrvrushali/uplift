"use client";

import { useEffect, useRef, useState } from "react";
import Programs from "./components/Programs";
import Testimonials from "./components/Testimonials";

export default function MainHomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Disable captions after video starts playing
  useEffect(() => {
    if (!isPlaying) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const disableCaptions = () => {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "setOption",
            args: ["captions", "track", {}],
          }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "unloadModule",
            args: ["captions"],
          }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "unloadModule",
            args: ["cc"],
          }),
          "*"
        );
      } catch {
        // silently fail
      }
    };

    const timers = [
      setTimeout(disableCaptions, 1000),
      setTimeout(disableCaptions, 2000),
      setTimeout(disableCaptions, 3000),
      setTimeout(disableCaptions, 5000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
        @keyframes playPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
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
        .fade-in-up-1 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-up-2 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .fade-in-up-3 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .fade-in-up-4 { animation: fadeInUp 0.8s ease-out 0.8s forwards; opacity: 0; }
        .fade-in-up-5 { animation: fadeInUp 0.8s ease-out 1.0s forwards; opacity: 0; }
        .fade-in-up-6 { animation: fadeInUp 0.8s ease-out 1.2s forwards; opacity: 0; }
        .play-pulse {
          animation: playPulse 2s ease-in-out infinite;
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marqueeScroll 45s linear infinite;
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

        {/* MARQUEE STRIP AT TOP */}
        <div
          className="w-full py-1.5 relative z-10"
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

        {/* HERO SECTION - Centered like reference image */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
            {/* Badge - Happiness Coach (creative style) */}
            <div className="fade-in-up-1">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(74,32,96,0.08)",
                  border: "1px solid rgba(200,150,62,0.3)",
                  color: "#c8963e",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "8px 22px",
                  borderRadius: "30px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ animation: "sparkle 2s ease-in-out infinite" }}>✦</span>
                Happiness Coach
                <span style={{ animation: "sparkle 2s ease-in-out infinite 0.5s" }}>✦</span>
              </span>
            </div>

            {/* Main Heading - Uplift your life */}
            <div className="fade-in-up-2">
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    color: "#4a2060",
                    fontFamily: "'Charm', cursive",
                    fontWeight: 700,
                    textShadow: "0 4px 20px rgba(239,154,126,0.3)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Uplift
                </span>
                <span
                  className="shimmer-gold"
                  style={{
                    display: "block",
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  }}
                >
                  your life
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className="fade-in-up-3"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                lineHeight: 1.7,
                color: "#4a2060",
                maxWidth: "560px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              I help accomplished professionals master emotional well-being,
              purpose, and happiness without slowing down their ambition.
            </p>

            {/* Two Buttons */}
            <div className="fade-in-up-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              {/* Register Button - Primary (filled gold) */}
              <a
                href="/"
                className="btn-shine pulse-btn inline-block"
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
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
                  minWidth: "220px",
                  textAlign: "center",
                }}
              >
                Register for the training now
              </a>

              {/* Uplift Book Button - Secondary (outline) */}
              
            </div>

            {/* 3 Stats */}
            <div className="fade-in-up-5 flex flex-row items-center justify-center gap-6 sm:gap-12 pt-6">
              {/* Stat 1 */}
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    color: "#c8963e",
                  }}
                >
                  3x
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "#4a2060",
                    opacity: 0.8,
                    textAlign: "center",
                  }}
                >
                  Business<br />Growth
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: "1px", height: "50px", background: "rgba(74,32,96,0.15)" }}></div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    color: "#c8963e",
                  }}
                >
                  200+
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "#4a2060",
                    opacity: 0.8,
                    textAlign: "center",
                  }}
                >
                  Businesses<br />Transformed
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: "1px", height: "50px", background: "rgba(74,32,96,0.15)" }}></div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    color: "#c8963e",
                  }}
                >
                  26+
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "#4a2060",
                    opacity: 0.8,
                    textAlign: "center",
                  }}
                >
                  Years of<br />Experience
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO SECTION - Same style as home page */}
        <section className="relative z-10 px-3 sm:px-6 pb-8 sm:pb-12 fade-in-up-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl"
              style={{
                paddingTop: "56.25%",
                boxShadow:
                  "0 20px 60px rgba(74,32,96,0.2), 0 8px 24px rgba(239,154,126,0.15)",
              }}
            >
              {!isPlaying ? (
                /* Thumbnail with Play Button */
                <div
                  className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                  onClick={handlePlay}
                >
                  {/* YouTube Thumbnail */}
                  <img
                    src="https://img.youtube.com/vi/gNVNzNId25U/maxresdefault.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 rounded-xl sm:rounded-2xl" />
                  {/* Play Button */}
                  <div
                    className="play-pulse absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "linear-gradient(135deg, #c8963e, #e8c170)",
                      boxShadow: "0 8px 32px rgba(200,150,62,0.5)",
                    }}
                  >
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : (
                /* YouTube iframe - plays with sound */
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/gNVNzNId25U?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=&disablekb=0&fs=1&playsinline=1&loop=1&playlist=gNVNzNId25U&enablejsapi=1"
                  title="Video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
              )}
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
