"use client";

import { useTransform, motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useScrollController } from "@/lib/motion/scroll-context";

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

function useZoneOpacity(zoneIndex: number, scrollYProgress: MotionValue<number>) {
  const isFirst = zoneIndex === 0;
  const isLast = zoneIndex === ZONE_COUNT - 1;
  const inputRange = isFirst
    ? [0, 0.05, 0.1, 0.16]
    : isLast
      ? [0.84, 0.9, 0.95, 1]
      : (() => {
          const peak = zoneIndex * ZONE_STEP;
          const spread = 0.14;
          return [peak - spread, peak - 0.05, peak, peak + 0.05, peak + spread];
        })();
  const outputRange = isFirst
    ? [1, 0.6, 0.25, 0]
    : isLast
      ? [0, 0.25, 0.6, 1]
      : [0, 0.4, 1, 0.4, 0];
  return useTransform(scrollYProgress, inputRange, outputRange);
}

const FLOATING_ORBS = [
  { top: "8%", left: "5%", width: "min(45vw,360px)", blur: 100, color: "rgba(201,162,39,0.045)", anim: "float-slow", duration: "14s" },
  { top: "70%", left: "75%", width: "min(40vw,320px)", blur: 95, color: "rgba(201,162,39,0.035)", anim: "float-slower", duration: "18s" },
  { top: "35%", left: "55%", width: "min(30vw,260px)", blur: 85, color: "rgba(255,255,255,0.02)", anim: "float-slow", duration: "16s" },
  { top: "55%", left: "12%", width: "min(35vw,280px)", blur: 90, color: "rgba(201,162,39,0.03)", anim: "float-slower", duration: "20s" },
  { top: "20%", left: "70%", width: "min(25vw,220px)", blur: 80, color: "rgba(255,255,255,0.015)", anim: "float-drift", duration: "22s" },
];

export function DynamicBackground() {
  const { scrollYProgress } = useScrollController();

  const opacity0 = useZoneOpacity(0, scrollYProgress);
  const opacity1 = useZoneOpacity(1, scrollYProgress);
  const opacity2 = useZoneOpacity(2, scrollYProgress);
  const opacity3 = useZoneOpacity(3, scrollYProgress);
  const opacity4 = useZoneOpacity(4, scrollYProgress);
  const opacity5 = useZoneOpacity(5, scrollYProgress);
  const opacities = [opacity0, opacity1, opacity2, opacity3, opacity4, opacity5];

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
