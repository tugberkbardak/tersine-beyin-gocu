"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// Damping constants
const MOVEMENT_DAMPING = 1200;       // for pointer drag
const SCROLL_DAMPING = 600;          // lower = more rotation on scroll
const AUTO_ROTATION_SPEED = 0.0005;  // slower auto-rotate when idle

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 2,      // initial horizontal rotation (radians)
  theta: 0.3,  // initial tilt from vertical (radians)
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.5, 0.2, 0.8],
  markerColor: [0.8, 0.5, 1],
  glowColor: [0.7, 0.3, 1],
  markers: [
    // Existing global cities
    { location: [14.5995, 120.9842], size: 0.03 },  // Manila
    { location: [19.076, 72.8777], size: 0.1 },      // Mumbai
    { location: [23.8103, 90.4125], size: 0.05 },    // Dhaka
    { location: [30.0444, 31.2357], size: 0.07 },    // Cairo
    { location: [39.9042, 116.4074], size: 0.08 },   // Beijing
    { location: [-23.5505, -46.6333], size: 0.1 },   // São Paulo
    { location: [19.4326, -99.1332], size: 0.1 },    // Mexico City
    { location: [40.7128, -74.006], size: 0.1 },     // New York
    { location: [34.6937, 135.5022], size: 0.05 },   // Osaka
    { location: [41.0082, 28.9784], size: 0.1 },    // Istanbul

    // Additional Europe markers
    { location: [51.5074, -0.1278], size: 0.06 },    // London
    { location: [48.8566, 2.3522], size: 0.06 },     // Paris
    { location: [52.52, 13.4050], size: 0.06 },      // Berlin
    { location: [40.4168, -3.7038], size: 0.06 },    // Madrid
    { location: [41.9028, 12.4964], size: 0.06 },    // Rome

    // More Turkey markers
    { location: [39.9334, 32.8597], size: 0.06 },    // Ankara
    { location: [38.4237, 27.1428], size: 0.05 },    // İzmir
    { location: [36.8969, 30.7133], size: 0.05 },    // Antalya
  ],
  arcs: [
    {
      startLat: 0,
      startLng: 0,
      endLat: 45,
      endLng: 90,
      color: [1, 0, 0],
      stroke: 2,
      arcAlt: 0.5,
    },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  // initialize with config.phi so you can change starting position
  let phi = config.phi ?? 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  // Track last scroll position
  const lastScrollY = useRef(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
      pointerInteracting.current = clientX;
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          // slower idle rotation
          phi += AUTO_ROTATION_SPEED;
        }
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        if (config.onRender) config.onRender(state);
      },
    });

    // Fade in
    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  // Scroll-based rotation effect
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      if (delta !== 0) {
        // amplify scroll rotation
        r.set(r.get() + delta / SCROLL_DAMPING);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [r]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
