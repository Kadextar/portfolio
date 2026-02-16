"use client";

import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { LocaleTransitionContext } from "./LocaleTransitionContext";
import { motionConfig } from "@/lib/motion";

const AMBIENT_SRC = "/audio/ambient.mp3";
const MAX_VOLUME = 0.18;
const TARGET_VOLUME = Math.min(0.15, MAX_VOLUME);
const FADE_IN_DURATION = 2;
const FADE_OUT_DURATION = 1.5;
const STORAGE_KEY = "ambient-audio-enabled";

const { audioTransition } = motionConfig;
const DUCK_VOLUME = TARGET_VOLUME * (audioTransition.duckRatio ?? 0.4);

function getStoredPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function setStoredPreference(on: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
  } catch {
    // ignore
  }
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {on ? (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      )}
    </svg>
  );
}

type AmbientAudioProps = {
  /** When true, render inline (no fixed position) for use inside Navbar */
  embedded?: boolean;
  className?: string;
};

export function AmbientAudio({ embedded = false, className }: AmbientAudioProps = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transitionCtx = useContext(LocaleTransitionContext);
  const isExiting = transitionCtx?.isExiting ?? false;
  const isEntering = transitionCtx?.isEntering ?? false;
  const wasEnteringRef = useRef(false);

  const fadeTo = useCallback((value: number, duration: number) => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;
    const clamped = Math.min(MAX_VOLUME, Math.max(0, value));
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.linearRampToValueAtTime(clamped, now + duration);
  }, []);

  const stopAfterFade = useCallback((duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, duration * 1000);
  }, []);

  const playWithFadeIn = useCallback(() => {
    const audio = audioRef.current;
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!audio || !gain || !ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    audio.play().then(() => {
      setIsPlaying(true);
      fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
    }).catch(() => {});
  }, [fadeTo]);

  const pauseWithFadeOut = useCallback(() => {
    setIsPlaying(false);
    fadeTo(0, FADE_OUT_DURATION);
    stopAfterFade(FADE_OUT_DURATION);
  }, [fadeTo, stopAfterFade]);

  useEffect(() => {
    if (!isPlaying || !gainRef.current || !ctxRef.current) return;

    if (isExiting) {
      fadeTo(DUCK_VOLUME, audioTransition.fadeDownDuration);
    }
  }, [isExiting, isPlaying, fadeTo]);

  useEffect(() => {
    if (!isPlaying || !gainRef.current || !ctxRef.current) return;

    if (isEntering) {
      wasEnteringRef.current = true;
    } else if (wasEnteringRef.current) {
      wasEnteringRef.current = false;
      fadeTo(TARGET_VOLUME, audioTransition.fadeUpDuration);
    }
  }, [isEntering, isPlaying, fadeTo]);

  useEffect(() => {
    const onVisibilityChange = () => {
      const audio = audioRef.current;
      const gain = gainRef.current;
      const ctx = ctxRef.current;
      if (document.hidden) {
        if (audio && gain && ctx && !audio.paused) {
          fadeTo(0, FADE_OUT_DURATION * 0.5);
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
          }, (FADE_OUT_DURATION * 0.5) * 1000);
        }
      } else if (getStoredPreference() && hasInteracted && audio && gain && ctx) {
        playWithFadeIn();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [hasInteracted, fadeTo, playWithFadeIn]);

  const handleToggle = useCallback(() => {
    if (isLoading) return;

    if (!hasInteracted) {
      setHasInteracted(true);
      setIsLoading(true);

      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      ctxRef.current = ctx;

      const audio = new Audio(AMBIENT_SRC);
      audio.loop = true;
      audioRef.current = audio;

      const source = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;
      source.connect(gain);
      gain.connect(ctx.destination);

      const onCanPlay = () => {
        setIsLoading(false);
        if (ctx.state === "suspended") ctx.resume();
        audio.play().then(() => {
          setIsPlaying(true);
          setStoredPreference(true);
          fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
        }).catch(() => setIsLoading(false));
        audio.removeEventListener("canplaythrough", onCanPlay);
        audio.removeEventListener("error", onError);
      };

      const onError = () => {
        setIsLoading(false);
        setHasInteracted(false);
        audio.removeEventListener("canplaythrough", onCanPlay);
        audio.removeEventListener("error", onError);
      };

      audio.addEventListener("canplaythrough", onCanPlay);
      audio.addEventListener("error", onError);
      audio.load();
      return;
    }

    const audio = audioRef.current;
    const gain = gainRef.current;

    if (isPlaying) {
      setStoredPreference(false);
      pauseWithFadeOut();
    } else {
      if (audio && gain && ctxRef.current) {
        setStoredPreference(true);
        playWithFadeIn();
      }
    }
  }, [hasInteracted, isPlaying, isLoading, fadeTo, pauseWithFadeOut, playWithFadeIn]);

  const baseClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-300 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:border-white/15 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 shrink-0";
  const positionClass = embedded ? "" : "fixed top-6 right-14 md:right-6 z-[9997]";

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      initial={embedded ? false : { opacity: 0, x: 8 }}
      animate={embedded ? false : { opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={[positionClass, baseClass, className].filter(Boolean).join(" ")}
      style={
        embedded
          ? undefined
          : {
              boxShadow: isPlaying
                ? "0 0 20px 4px rgba(201, 162, 39, 0.2), 0 0 40px 8px rgba(201, 162, 39, 0.06)"
                : "0 0 12px 2px rgba(201, 162, 39, 0.08)",
            }
      }
      disabled={isLoading}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="block h-4 w-4 rounded-full border-2 border-accent/40 border-t-accent"
        />
      ) : (
        <motion.span
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <SpeakerIcon on={isPlaying} />
        </motion.span>
      )}
    </motion.button>
  );
}
