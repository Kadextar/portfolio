"use client";

import { useScroll, useTransform, motion } from "framer-motion";

const ZONE_COUNT = 6;
const ZONE_STEP = 1 / ZONE_COUNT;

/** Ambient gradient tones — very subtle shifts, no hard breaks */
const ZONE_GRADIENTS = [
  "linear-gradient(180deg, #070707 0%, #0a0908 40%, #080808 100%)",
  "linear-gradient(180deg, #080807 0%, #090908 50%, #070808 100%)",
  "linear-gradient(180deg, #070808 0%, #08090a 45%, #080807 100%)",
  "linear-gradient(180deg, #080707 0%, #0a0808 40%, #070908 100%)",
  "linear-gradient(180deg, #070908 0%, #080a09 50%, #080807 100%)",
  "linear-gradient(180deg, #080808 0%, #090807 45%, #070707 100%)",
];

function useZoneOpacity(zoneIndex: number, scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]) {
  const isFirst = zoneIndex === 0;
  const isLast = zoneIndex === ZONE_COUNT - 1;
  if (isFirst) {
    return useTransform(scrollYProgress, [0, 0.04, 0.08, 0.12], [1, 0.5, 0.2, 0]);
  }
  if (isLast) {
    return useTransform(scrollYProgress, [0.88, 0.92, 0.96, 1], [0, 0.2, 0.5, 1]);
  }
  const peak = zoneIndex * ZONE_STEP;
  const spread = 0.1;
  return useTransform(
    scrollYProgress,
    [peak - spread, peak - 0.04, peak, peak + 0.04, peak + spread],
    [0, 0.5, 1, 0.5, 0]
  );
}

const FLOATING_ORBS = [
  { top: "8%", left: "5%", width: "min(45vw,360px)", blur: 100, color: "rgba(201,162,39,0.045)", anim: "float-slow", duration: "14s" },
  { top: "70%", left: "75%", width: "min(40vw,320px)", blur: 95, color: "rgba(201,162,39,0.035)", anim: "float-slower", duration: "18s" },
  { top: "35%", left: "55%", width: "min(30vw,260px)", blur: 85, color: "rgba(255,255,255,0.02)", anim: "float-slow", duration: "16s" },
  { top: "55%", left: "12%", width: "min(35vw,280px)", blur: 90, color: "rgba(201,162,39,0.03)", anim: "float-slower", duration: "20s" },
  { top: "20%", left: "70%", width: "min(25vw,220px)", blur: 80, color: "rgba(255,255,255,0.015)", anim: "float-drift", duration: "22s" },
];

export function DynamicBackground() {
  const { scrollYProgress } = useScroll();

  const opacities = Array.from({ length: ZONE_COUNT }, (_, i) => useZoneOpacity(i, scrollYProgress));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark layer — ensures no flash */}
      <div className="absolute inset-0 bg-[#060606]" />

      {/* Section-aware gradient zones — crossfade by scroll */}
      {ZONE_GRADIENTS.map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: gradient,
            opacity: opacities[i],
          }}
        />
      ))}

      {/* Floating blurred gradient shapes */}
      {FLOATING_ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.width,
            aspectRatio: "1",
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            transform: "translate(-50%, -50%)",
            animation: `${orb.anim} ${orb.duration} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Subtle radial accent — very low opacity */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 60% at 30% 20%, rgba(201,162,39,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 80% 100% at 70% 70%, rgba(201,162,39,0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
