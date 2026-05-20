"use client";

import { useEffect, useRef } from "react";

export function WebGLBackground({ absolute = false }: { absolute?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let mounted = true;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    
    // Plexus properties
    const PARTICLE_COUNT = 70;
    const CONNECT_DIST = 140;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    
    // Mouse coordinates (normalized -1 to 1)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    // Generate particle texture procedurally
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(229, 196, 131, 1)");
        gradient.addColorStop(0.3, "rgba(229, 196, 131, 0.8)");
        gradient.addColorStop(0.6, "rgba(0, 245, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return canvas;
    };

    const init = async () => {
      const THREE = await import("three");

      // Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030303, 0.0015);

      // Camera
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.z = 250;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x030303, 1);

      if (containerRef.current && mounted) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Initialize positions and velocities
      const aspect = width / height;
      const boxW = 500 * aspect;
      const boxH = 500;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * boxW;
        positions[i * 3 + 1] = (Math.random() - 0.5) * boxH;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        // Velocity
        velocities[i * 3] = (Math.random() - 0.5) * 0.45;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.45;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }

      // 1. Points (Particles)
      const texture = new THREE.CanvasTexture(createCircleTexture());
      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      
      const pointsMat = new THREE.PointsMaterial({
        size: 5,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      
      const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
      scene.add(pointsMesh);

      // 2. Connecting Lines
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xe5c483,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: 1, // WebGL standard only supports 1px anyway
      });
      
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
      const lineColors = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
      
      const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSegments);

      // Interactivity tracking
      const onMouseMove = (event: MouseEvent) => {
        mouse.targetX = (event.clientX - window.innerWidth / 2) * 0.5;
        mouse.targetY = -(event.clientY - window.innerHeight / 2) * 0.5;
      };

      const onScroll = () => {
        const scrollY = window.scrollY;
        // Rotate scene slightly based on scroll
        if (scene) {
          scene.rotation.y = scrollY * 0.0006;
          scene.rotation.x = scrollY * 0.0003;
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("scroll", onScroll);

      // Render Loop
      const tick = () => {
        if (!mounted || !renderer || !scene || !camera) return;

        // Smooth mouse dampening
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Camera follow mouse slightly
        camera.position.x += (mouse.x - camera.position.x) * 0.05;
        camera.position.y += (mouse.y - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Update particle positions
        const posAttr = pointsGeo.getAttribute("position") as any;
        const aspectVal = window.innerWidth / window.innerHeight;
        const limitX = 260 * aspectVal;
        const limitY = 260;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          
          // Add velocity
          positions[idx] += velocities[idx];
          positions[idx + 1] += velocities[idx + 1];
          positions[idx + 2] += velocities[idx + 2];

          // React to cursor attraction
          const dx = mouse.x - positions[idx];
          const dy = mouse.y - positions[idx + 1];
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 200) {
            positions[idx] += (dx / distToMouse) * 0.18;
            positions[idx + 1] += (dy / distToMouse) * 0.18;
          }

          // Boundaries checking (wrap)
          if (Math.abs(positions[idx]) > limitX) {
            positions[idx] = -Math.sign(positions[idx]) * limitX;
          }
          if (Math.abs(positions[idx + 1]) > limitY) {
            positions[idx + 1] = -Math.sign(positions[idx + 1]) * limitY;
          }
        }
        posAttr.needsUpdate = true;

        // Recalculate Plexus lines
        let lineIdx = 0;
        const linePosAttr = lineGeo.getAttribute("position") as any;
        
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const pi = i * 3;
          const x1 = positions[pi];
          const y1 = positions[pi + 1];
          const z1 = positions[pi + 2];

          for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const pj = j * 3;
            const x2 = positions[pj];
            const y2 = positions[pj + 1];
            const z2 = positions[pj + 2];

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dz = z1 - z2;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < CONNECT_DIST) {
              // Add connection segment
              linePositions[lineIdx * 6] = x1;
              linePositions[lineIdx * 6 + 1] = y1;
              linePositions[lineIdx * 6 + 2] = z1;
              linePositions[lineIdx * 6 + 3] = x2;
              linePositions[lineIdx * 6 + 4] = y2;
              linePositions[lineIdx * 6 + 5] = z2;

              // Color fading with distance and subtle mix of gold & cyan
              const alpha = 1.0 - dist / CONNECT_DIST;
              
              // Gold base, touch of cyan for close ones
              const isTechNode = (i + j) % 7 === 0;
              const r = isTechNode ? 0.0 : 0.898; 
              const g = isTechNode ? 0.96 : 0.768;
              const b = isTechNode ? 1.0 : 0.513;

              lineMat.opacity = alpha * 0.14; // soft global opacity scaling

              lineIdx++;
            }
          }
        }
        lineGeo.setDrawRange(0, lineIdx * 2);
        linePosAttr.needsUpdate = true;

        // Render
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(tick);
      };

      tick();

      // Resize handler
      const onResize = () => {
        if (!renderer || !camera) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Return cleanup function
      return () => {
        mounted = false;
        cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        
        pointsGeo.dispose();
        pointsMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        texture.dispose();
        renderer?.dispose();

        if (containerRef.current && renderer?.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch {
            // Already removed
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

  const containerClass = absolute
    ? "pointer-events-none absolute inset-0 overflow-hidden"
    : "pointer-events-none fixed inset-0 -z-20 overflow-hidden";

  return (
    <div
      ref={containerRef}
      className={containerClass}
      data-layer="webgl-background"
      aria-hidden
    />
  );
}
