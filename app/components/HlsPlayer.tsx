"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  src: string;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties;
  posterImage?: string;
}

export default function HlsPlayer({
  src,
  loop = true,
  controls = true,
  className = "",
  style = {},
  posterImage,
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hlsReady, setHlsReady] = useState(false);

  // Initialize HLS but don't play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const proxiedSrc = src.replace(
      "http://media.drvrushali.com/",
      "/hls-proxy/"
    );

    let destroyed = false;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        autoStartLoad: false, // Don't start loading until play
        xhrSetup: (xhr) => {
          xhr.timeout = 30000;
        },
      });
      hlsRef.current = hls;
      hls.loadSource(proxiedSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!destroyed) {
          setHlsReady(true);
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && !destroyed) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      // Start loading manifest only (not segments)
      hls.startLoad();

      return () => {
        destroyed = true;
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = proxiedSrc;
      setHlsReady(true);
      return () => {
        destroyed = true;
        video.src = "";
      };
    }
  }, [src]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play().catch(() => {
      // Some browsers block unmuted autoplay, try anyway
      video.play().catch(() => {});
    });
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <video
        ref={videoRef}
        muted={false}
        loop={loop}
        playsInline
        controls={isPlaying ? controls : false}
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ display: "block", backgroundColor: "#000", ...style }}
        poster={posterImage}
      />

      {/* Play Button Overlay - shown until user clicks play */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          onClick={handlePlay}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 rounded-xl sm:rounded-2xl" />

          {/* Play Button */}
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg, #c8963e, #e8c170)",
              boxShadow: "0 8px 32px rgba(200,150,62,0.5)",
              animation: "playPulse 2s ease-in-out infinite",
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
      )}

      <style>{`
        @keyframes playPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}