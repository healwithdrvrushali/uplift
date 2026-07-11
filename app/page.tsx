"use client";

import { useState, useEffect, useRef } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  city?: string;
}

export default function ObtainPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(setTimeout(() => setVisibleLines(i), i * 350));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    type Wave = {
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      yOffset: number;
      color: string;
      opacity: number;
      thickness: number;
    };

    const waves: Wave[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waveColors = [
      { color: "rgba(239,154,126,", opacity: 0.22 },
      { color: "rgba(180,177,213,", opacity: 0.20 },
      { color: "rgba(200,180,255,", opacity: 0.18 },
      { color: "rgba(255,200,180,", opacity: 0.20 },
      { color: "rgba(160,140,200,", opacity: 0.16 },
      { color: "rgba(239,154,126,", opacity: 0.18 },
      { color: "rgba(180,177,213,", opacity: 0.22 },
      { color: "rgba(200,180,255,", opacity: 0.16 },
    ];

    for (let i = 0; i < waveColors.length; i++) {
      waves.push({
        amplitude: Math.random() * 100 + 50,
        frequency: Math.random() * 0.003 + 0.001,
        speed: Math.random() * 0.01 + 0.004,
        phase: Math.random() * Math.PI * 2,
        yOffset: (canvas.height / (waveColors.length + 1)) * (i + 1),
        color: waveColors[i].color,
        opacity: waveColors[i].opacity,
        thickness: Math.random() * 80 + 40,
      });
    }

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
        gradient.addColorStop(0.2, w.color + w.opacity + ")");
        gradient.addColorStop(0.5, w.color + (w.opacity * 0.7) + ")");
        gradient.addColorStop(1, w.color + "0)");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      for (let i = 0; i < 6; i++) {
        const orbX = canvas.width * (0.1 + i * 0.16) + Math.sin(time * 0.006 + i * 1.3) * 80;
        const orbY = canvas.height * (0.15 + i * 0.14) + Math.cos(time * 0.005 + i * 0.9) * 50;
        const orbR = 120 + Math.sin(time * 0.004 + i) * 40;

        const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
        const orbColors = [
          "rgba(239,154,126,",
          "rgba(180,177,213,",
          "rgba(200,180,255,",
          "rgba(255,200,180,",
          "rgba(160,140,200,",
          "rgba(239,154,126,",
        ];
        const c = orbColors[i % orbColors.length];
        orbGrad.addColorStop(0, c + "0.15)");
        orbGrad.addColorStop(0.4, c + "0.08)");
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

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) return "Name is required";
        if (trimmed.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s.]+$/.test(trimmed)) return "Name should only contain letters and spaces";
        return undefined;
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return "Email is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) return "Enter a valid email (e.g., roy@gmail.com)";
        return undefined;
      }
      case "mobile": {
        const digitsOnly = value.replace(/\D/g, "");
        if (!digitsOnly) return "Mobile number is required";
        if (digitsOnly.length !== 10) return "Mobile number must be exactly 10 digits";
        if (!/^[6-9]/.test(digitsOnly)) return "Enter a valid Indian mobile number";
        return undefined;
      }
      case "city": {
        const trimmed = value.trim();
        if (!trimmed) return "Location is required";
        if (trimmed.length < 2) return "Location must be at least 2 characters";
        if (!/^[a-zA-Z\s,.-]+$/.test(trimmed)) return "Location should only contain letters and spaces";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For mobile field, only allow digits
    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error on change if field was touched
    if (touched[name]) {
      const validationValue = name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
      const error = validateField(name, validationValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, mobile: true, city: true });

    // Validate all fields
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const GOOGLE_SHEET_URL =
      "https://script.google.com/macros/s/AKfycbwxpW_GAnB0p9SyBpWmIw46r3_yt_xYLQFv5pH2X3r65TGiT-ILWHUHbp71nQIs9nAuMg/exec";

    const isConfigured = !GOOGLE_SHEET_URL.includes("YOUR_GOOGLE_SCRIPT_ID");

    // Fire-and-forget: send data in background, don't wait for response
    if (isConfigured) {
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          city: formData.city,
          timestamp: new Date().toISOString(),
        }),
      }).catch((error) => {
        console.error("Error submitting form:", error);
      });
    }

    // Redirect instantly without waiting for the fetch to complete
    window.location.href = "/home";
  };

  const revealStyle = (index: number): React.CSSProperties => ({
    opacity: visibleLines >= index ? 1 : 0,
    transform: visibleLines >= index ? "translateY(0)" : "translateY(25px)",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  const getInputStyle = (fieldName: string): React.CSSProperties => {
    const isFocused = focusedField === fieldName;
    return {
      width: "100%",
      padding: "14px 18px 14px 44px",
      borderRadius: "14px",
      fontSize: "1rem",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      color: "#362E69",
      background: isFocused ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)",
      border: isFocused ? "2px solid rgba(180,177,213,0.6)" : "1.5px solid rgba(180,177,213,0.3)",
      outline: "none",
      backdropFilter: "blur(10px)",
      boxShadow: isFocused
        ? "0 0 0 4px rgba(180,177,213,0.1), 0 4px 16px rgba(180,177,213,0.15)"
        : "0 2px 8px rgba(54,46,105,0.05)",
      transition: "all 0.3s ease",
    };
  };

  const iconStyle = (fieldName: string): React.CSSProperties => {
    const isFocused = focusedField === fieldName;
    return {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: isFocused ? "#6B5B95" : "#B4B1D5",
      transition: "color 0.3s ease",
    };
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes btnShine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #c8963e 0%, #e8c170 30%, #c8963e 50%, #e8c170 70%, #c8963e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 3s linear infinite;
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
        input::placeholder { color: rgba(107,91,149,0.45); font-weight: 400; }
        input:focus::placeholder { color: rgba(180,177,213,0.5); }
      `}</style>

      <div
        className="w-full min-h-screen relative"
        style={{
          background:
            "linear-gradient(150deg, #FDF6F0 0%, #F9ECF5 20%, #F0E8FA 40%, #EAE2F8 55%, #E8E0F5 70%, #F5EAF2 85%, #FDF5EE 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-10 sm:pb-14 flex flex-col items-center">
          {/* Uplift Title */}
          <h1
            className="text-center"
            style={{
              color: "#362E69",
              fontFamily: "'Charm', cursive",
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 4px 20px rgba(239,154,126,0.3)",
              letterSpacing: "0.06em",
              marginBottom: "1.5rem",
            }}
          >
            <span className="block text-[3.2rem] sm:text-[4.5rem] md:text-[6rem]">Uplift</span>
          </h1>

          <p
            className="text-center text-[1.3rem] sm:text-[1.8rem] md:text-[2.3rem]"
            style={{
              color: "#362E69",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: "0.6rem",
              
            }}
          >
            If you are a{" "}
            <span className="shimmer-text" style={{ fontWeight: 500 }}>CXO, Founder, Doctor</span> Or{" "} <span className="shimmer-text" style={{ fontWeight: 500 }}>CEO</span>{" "}
            of your life.
          </p>

          <p
            className="text-center text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem]"
            style={{
              color: "#6B5B95",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              marginBottom: "1.2rem",
              
            }}
          >
            This page is for you.
          </p>

          <p
            className="text-center text-[1.1rem] sm:text-[1.4rem] md:text-[1.7rem]"
            style={{
              color: "#362E69",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              lineHeight: 1.5,
              marginBottom: "0.8rem",
             
            }}
          >
            We help people resolve{" "}
            <span className="shimmer-text" style={{ fontWeight: 700 }}>Burnout</span>{" "}
            and{" "}
            <span className="shimmer-text" style={{ fontWeight: 700 }}>manifest</span>{" "}
            
            <span className="shimmer-text" style={{ fontWeight: 700 }}>your dream life</span>.
          </p>

          <p
  className="text-center text-[0.85rem] sm:text-[1.2rem] md:text-[1.5rem] whitespace-nowrap"
  style={{
    color: "#362E69",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 300,
   
  }}
>
  Risk free program. Money Back Guarantee.
</p>

          <form onSubmit={handleSubmit} className="w-full mt-6 sm:mt-8" style={{ maxWidth: "480px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Name */}
              <div style={{ position: "relative" }}>
                <span style={iconStyle("name")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => handleBlur("name")}
                  required
                  style={{
                    ...getInputStyle("name"),
                    ...(errors.name && touched.name ? { border: "2px solid #e53e3e" } : {}),
                  }}
                />
                {errors.name && touched.name && (
                  <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px", fontFamily: "'Outfit', sans-serif", fontWeight: 500, paddingLeft: "4px" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div style={{ position: "relative" }}>
                <span style={iconStyle("email")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => handleBlur("email")}
                  required
                  style={{
                    ...getInputStyle("email"),
                    ...(errors.email && touched.email ? { border: "2px solid #e53e3e" } : {}),
                  }}
                />
                {errors.email && touched.email && (
                  <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px", fontFamily: "'Outfit', sans-serif", fontWeight: 500, paddingLeft: "4px" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div style={{ position: "relative" }}>
                <span style={iconStyle("mobile")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("mobile")}
                  onBlur={() => handleBlur("mobile")}
                  required
                  maxLength={10}
                  style={{
                    ...getInputStyle("mobile"),
                    ...(errors.mobile && touched.mobile ? { border: "2px solid #e53e3e" } : {}),
                  }}
                />
                {errors.mobile && touched.mobile && (
                  <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px", fontFamily: "'Outfit', sans-serif", fontWeight: 500, paddingLeft: "4px" }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Location */}
              <div style={{ position: "relative" }}>
                <span style={iconStyle("city")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="city"
                  placeholder="Location"
                  value={formData.city}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("city")}
                  onBlur={() => handleBlur("city")}
                  required
                  style={{
                    ...getInputStyle("city"),
                    ...(errors.city && touched.city ? { border: "2px solid #e53e3e" } : {}),
                  }}
                />
                {errors.city && touched.city && (
                  <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px", fontFamily: "'Outfit', sans-serif", fontWeight: 500, paddingLeft: "4px" }}>
                    {errors.city}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="btn-shine"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  fontSize: "1.1rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "linear-gradient(90deg, #c8963e 0%, #e8c170 30%, #c8963e 50%, #e8c170 70%, #c8963e 100%)",
                  border: "none",
                  cursor: isSubmitting || submitted ? "not-allowed" : "pointer",
                  opacity: isSubmitting || submitted ? 0.7 : 1,
                  boxShadow: "0 8px 30px rgba(239,154,126,0.4), 0 2px 8px rgba(212,96,62,0.25)",
                  transition: "all 0.3s ease",
                  marginTop: "6px",
                  letterSpacing: "0.03em",
                }}
              >

                {submitted ? "Submitted! Redirecting..." : isSubmitting ? "Submitting..." : "Register For The Training Now"}
              </button>
            </div>
          </form>

          {/* Policy Links */}
<div className="mt-8 sm:mt-10 flex flex-nowrap justify-center items-center gap-2 sm:gap-4">
            <a href="/privacy-policy" className="text-[#6B5B95] hover:text-[#4a2060] transition-colors text-[10px] sm:text-sm font-medium underline underline-offset-2">
  Privacy Policy
</a>
<span className="text-[#B4B1D5] text-[10px] sm:text-sm">|</span>
<a href="/terms-and-conditions" className="text-[#6B5B95] hover:text-[#4a2060] transition-colors text-[10px] sm:text-sm font-medium underline underline-offset-2">
  Terms & Conditions
</a>
<span className="text-[#B4B1D5] text-[10px] sm:text-sm">|</span>
<a href="/refund-policy" className="text-[#6B5B95] hover:text-[#4a2060] transition-colors text-[10px] sm:text-sm font-medium underline underline-offset-2">
  Refund Policy
</a>
          </div>
          <p className="text-center text-[10px] sm:text-xs text-[#6B5B95]/50 mt-3">
            © 2025 Dr. Vrushali Saraswat | Happiness Holistic Clinic. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}
