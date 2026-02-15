"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  uniform float uTime;
  uniform vec3 uDark;
  uniform vec3 uAmber;
  uniform float uAmberStrength;
  varying vec2 vUv;

  // Minimal hash for procedural noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.5 * noise(p);
    v += 0.25 * noise(p * 2.0);
    v += 0.125 * noise(p * 4.0);
    return v;
  }

  void main() {
    vec2 uv = vUv;
    // Very slow drift — minimal movement
    vec2 q = uv + uTime * 0.012;
    float n = fbm(q * 2.5) * 0.04;

    // Soft gradient: dark base, subtle amber glow off-center
    vec2 center = vec2(0.5, 0.38);
    float dist = length(uv - center);
    float gradient = 1.0 - smoothstep(0.0, 0.85, dist);
    vec3 gradColor = mix(uDark, uAmber, gradient * uAmberStrength);

    vec3 col = gradColor + n;
    float alpha = 0.88;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let mounted = true;
    let renderer: any = null;
    let material: any = null;
    const startTime = performance.now() * 0.001;

    const init = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x060606);

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera.position.z = 1;

      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uDark: { value: new THREE.Vector3(6 / 255, 6 / 255, 6 / 255) },
          uAmber: {
            value: new THREE.Vector3(
              (201 / 255) * 0.12,
              (162 / 255) * 0.12,
              (39 / 255) * 0.12
            ),
          },
          uAmberStrength: { value: 0.28 },
        },
        depthWrite: false,
        depthTest: false,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      const container = containerRef.current;
      if (container) container.appendChild(renderer.domElement);

      function tick() {
        if (!mounted || !material || !renderer) return;
        const time = performance.now() * 0.001 - startTime;
        material.uniforms.uTime.value = time;
        renderer.render(scene, camera);
        frameRef.current = requestAnimationFrame(tick);
      }
      frameRef.current = requestAnimationFrame(tick);

      const onResize = () => {
        renderer?.setSize(window.innerWidth, window.innerHeight);
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };
      window.addEventListener("resize", onResize);

      return () => {
        mounted = false;
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener("resize", onResize);
        material?.dispose();
        geometry.dispose();
        renderer?.dispose();
        if (containerRef.current && renderer?.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch {
            // already removed
          }
        }
      };
    };

    let dispose: (() => void) | undefined;
    init().then((fn) => {
      dispose = fn;
    });

    return () => {
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      data-layer="webgl-background"
      aria-hidden
    />
  );
}
