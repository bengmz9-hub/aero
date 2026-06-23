"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Globe, Plane, Navigation, Compass, Globe2, AlertCircle } from "lucide-react";

interface Destination {
  id: string;
  nameKey: string;
  lat: number; // degrees
  lon: number; // degrees
  distance: string;
  duration: string;
  airlinesKey: string;
  terminal: string;
  frequency: string;
  passportKey: "passportRequired" | "passportNotRequired";
  tipKey: string;
  layover?: string;
}

const BCN_COORDS = { lat: 41.2974, lon: 2.0785 };

const DESTINATIONS: Destination[] = [
  {
    id: "newYork",
    nameKey: "newYork",
    lat: 40.6413,
    lon: -73.7781,
    distance: "6,150 km",
    duration: "8h 15m",
    airlinesKey: "newYork",
    terminal: "T1",
    frequency: "21",
    passportKey: "passportRequired",
    tipKey: "newYork",
  },
  {
    id: "buenosAires",
    nameKey: "buenosAires",
    lat: -34.8222,
    lon: -58.5358,
    distance: "10,480 km",
    duration: "12h 45m",
    airlinesKey: "buenosAires",
    terminal: "T1",
    frequency: "9",
    passportKey: "passportRequired",
    tipKey: "buenosAires",
  },
  {
    id: "tokyo",
    nameKey: "tokyo",
    lat: 35.5494,
    lon: 139.7798,
    distance: "10,420 km",
    duration: "13h 30m",
    airlinesKey: "tokyo",
    terminal: "T1",
    frequency: "3",
    passportKey: "passportRequired",
    tipKey: "tokyo",
  },
  {
    id: "dubai",
    nameKey: "dubai",
    lat: 25.2532,
    lon: 55.3657,
    distance: "5,180 km",
    duration: "6h 40m",
    airlinesKey: "dubai",
    terminal: "T1",
    frequency: "14",
    passportKey: "passportRequired",
    tipKey: "dubai",
  },
  {
    id: "miami",
    nameKey: "miami",
    lat: 25.7959,
    lon: -80.2870,
    distance: "7,530 km",
    duration: "9h 50m",
    airlinesKey: "miami",
    terminal: "T1",
    frequency: "10",
    passportKey: "passportRequired",
    tipKey: "miami",
  },
  {
    id: "london",
    nameKey: "london",
    lat: 51.4700,
    lon: -0.4543,
    distance: "1,150 km",
    duration: "2h 15m",
    airlinesKey: "london",
    terminal: "T1 / T2",
    frequency: "45",
    passportKey: "passportRequired",
    tipKey: "london",
  },
  {
    id: "singapore",
    nameKey: "singapore",
    lat: 1.3644,
    lon: 103.9915,
    distance: "10,920 km",
    duration: "13h 10m",
    airlinesKey: "singapore",
    terminal: "T1",
    frequency: "5",
    passportKey: "passportRequired",
    tipKey: "singapore",
  },
  {
    id: "losAngeles",
    nameKey: "losAngeles",
    lat: 33.9416,
    lon: -118.4085,
    distance: "9,680 km",
    duration: "12h 10m",
    airlinesKey: "losAngeles",
    terminal: "T1",
    frequency: "10",
    passportKey: "passportRequired",
    tipKey: "losAngeles",
    layover: "Madrid (MAD) / Londres (LHR)",
  },
  {
    id: "sydney",
    nameKey: "sydney",
    lat: -33.9461,
    lon: 151.1772,
    distance: "17,180 km",
    duration: "22h 30m",
    airlinesKey: "sydney",
    terminal: "T1",
    frequency: "14",
    passportKey: "passportRequired",
    tipKey: "sydney",
    layover: "Dubái (DXB) / Doha (DOH)",
  },
];

export function ConnectionsGlobe() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedId, setSelectedId] = useState<string>("newYork");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Globe parameters
  const rotationRef = useRef({ x: 0.2, y: -0.8 }); // initial tilt/spin
  const targetRotationRef = useRef({ x: 0.2, y: -0.8 });
  const selectedIdRef = useRef<string>("newYork");

  // Keep ref in sync
  useEffect(() => {
    selectedIdRef.current = selectedId;
    const dest = DESTINATIONS.find((d) => d.id === selectedId);
    if (dest) {
      // Center on selected destination
      // To center: targetY = -lon, targetX = lat
      const latRad = (dest.lat * Math.PI) / 180;
      const lonRad = (dest.lon * Math.PI) / 180;
      targetRotationRef.current = {
        x: latRad,
        y: -lonRad,
      };
    }
  }, [selectedId]);

  // Selected destination info
  const selectedDest = useMemo(() => {
    return DESTINATIONS.find((d) => d.id === selectedId) || DESTINATIONS[0];
  }, [selectedId]);

  // Grid points (pre-computed circles in 3D for performance)
  const gridLines = useMemo(() => {
    const lines: { x: number; y: number; z: number }[][] = [];
    const R = 175;

    // Latitude circles (parallels)
    const latBands = 8;
    for (let i = 1; i < latBands; i++) {
      const lat = (i / latBands) * Math.PI - Math.PI / 2;
      const ring: { x: number; y: number; z: number }[] = [];
      const segments = 40;
      for (let j = 0; j <= segments; j++) {
        const lon = (j / segments) * Math.PI * 2;
        ring.push({
          x: R * Math.cos(lat) * Math.sin(lon),
          y: R * Math.sin(lat),
          z: R * Math.cos(lat) * Math.cos(lon),
        });
      }
      lines.push(ring);
    }

    // Longitude circles (meridians)
    const lonBands = 12;
    for (let i = 0; i < lonBands; i++) {
      const lon = (i / lonBands) * Math.PI * 2;
      const ring: { x: number; y: number; z: number }[] = [];
      const segments = 40;
      for (let j = 0; j <= segments; j++) {
        const lat = (j / segments) * Math.PI - Math.PI / 2;
        ring.push({
          x: R * Math.cos(lat) * Math.sin(lon),
          y: R * Math.sin(lat),
          z: R * Math.cos(lat) * Math.cos(lon),
        });
      }
      lines.push(ring);
    }

    return lines;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const R = 175; // Sphere radius
    const D = 520; // Camera distance

    // Setup high-DPI canvas resolution
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render step
    const render = () => {
      time += 0.015;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Smoothly interpolate rotation angles
      const rot = rotationRef.current;
      const targetRot = targetRotationRef.current;

      if (!isDragging) {
        // Shortest path interpolation for Y rotation (longitude)
        let diffY = targetRot.y - rot.y;
        diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
        rot.y += diffY * 0.06;

        // X rotation interpolation (latitude)
        rot.x += (targetRot.x - rot.x) * 0.06;

        // Slow auto-spin when no active interaction and not centering
        const isCentering = Math.abs(diffY) > 0.005 || Math.abs(targetRot.x - rot.x) > 0.005;
        if (!isCentering && selectedIdRef.current === "") {
          targetRot.y -= 0.0015;
        }
      }

      // Rotate 3D point helper
      const projectPoint = (x: number, y: number, z: number) => {
        // Rotate Y (longitude spin)
        const x1 = x * Math.cos(rot.y) + z * Math.sin(rot.y);
        const z1 = -x * Math.sin(rot.y) + z * Math.cos(rot.y);
        const y1 = y;

        // Rotate X (latitude tilt)
        const y2 = y1 * Math.cos(rot.x) - z1 * Math.sin(rot.x);
        const z2 = y1 * Math.sin(rot.x) + z1 * Math.cos(rot.x);
        const x2 = x1;

        // Perspective scale
        const scale = D / (D - z2);
        return {
          x: cx + x2 * scale,
          y: cy - y2 * scale,
          z: z2,
          scale,
        };
      };

      // 2. Draw Globe Glow Atmosphere (background)
      ctx.beginPath();
      const bgGlow = ctx.createRadialGradient(cx, cy, R - 10, cx, cy, R + 30);
      bgGlow.addColorStop(0, "rgba(6, 182, 212, 0.03)");
      bgGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.05)");
      bgGlow.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = bgGlow;
      ctx.arc(cx, cy, R + 30, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Grid Lines (separating front and back for depth)
      // Back grid lines (drawn thinner and lower opacity)
      ctx.lineWidth = 0.5;
      gridLines.forEach((line) => {
        ctx.beginPath();
        let first = true;
        line.forEach((p) => {
          const pt = projectPoint(p.x, p.y, p.z);
          if (pt.z < 0) { // Back side
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        });
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.stroke();
      });

      // Front grid lines (drawn with cyan glowing touch)
      ctx.lineWidth = 0.7;
      gridLines.forEach((line) => {
        ctx.beginPath();
        let first = true;
        line.forEach((p) => {
          const pt = projectPoint(p.x, p.y, p.z);
          if (pt.z >= -10) { // Front side (with slight safety margin)
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        });
        ctx.strokeStyle = "rgba(6, 182, 212, 0.07)";
        ctx.stroke();
      });

      // 4. Project Barcelona (BCN)
      const bcnLatRad = (BCN_COORDS.lat * Math.PI) / 180;
      const bcnLonRad = (BCN_COORDS.lon * Math.PI) / 180;
      const bcn3D = {
        x: R * Math.cos(bcnLatRad) * Math.sin(bcnLonRad),
        y: R * Math.sin(bcnLatRad),
        z: R * Math.cos(bcnLatRad) * Math.cos(bcnLonRad),
      };
      const bcn2D = projectPoint(bcn3D.x, bcn3D.y, bcn3D.z);

      // 5. Draw Flight Arcs & Particles
      DESTINATIONS.forEach((dest) => {
        const destLatRad = (dest.lat * Math.PI) / 180;
        const destLonRad = (dest.lon * Math.PI) / 180;
        const dest3D = {
          x: R * Math.cos(destLatRad) * Math.sin(destLonRad),
          y: R * Math.sin(destLatRad),
          z: R * Math.cos(destLatRad) * Math.cos(destLonRad),
        };
        const dest2D = projectPoint(dest3D.x, dest3D.y, dest3D.z);

        const isCurrent = dest.id === selectedIdRef.current;
        const isHovered = dest.id === hoveredId;

        // Quadratic Bezier Arc in 3D
        // Midpoint on sphere surface
        const mx = (bcn3D.x + dest3D.x) / 2;
        const my = (bcn3D.y + dest3D.y) / 2;
        const mz = (bcn3D.z + dest3D.z) / 2;
        const dist = Math.sqrt(
          Math.pow(bcn3D.x - dest3D.x, 2) +
          Math.pow(bcn3D.y - dest3D.y, 2) +
          Math.pow(bcn3D.z - dest3D.z, 2)
        );
        
        // Control point: pushed outwards based on distance
        const len = Math.sqrt(mx*mx + my*my + mz*mz);
        const altitude = R + dist * 0.38; // height factor
        const ctrl3D = {
          x: (mx / len) * altitude,
          y: (my / len) * altitude,
          z: (mz / len) * altitude,
        };

        // Sample points along bezier curve
        const arcPoints: { x: number; y: number; z: number }[] = [];
        const steps = 30;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          // Bezier interpolation
          const px = Math.pow(1 - t, 2) * bcn3D.x + 2 * (1 - t) * t * ctrl3D.x + t * t * dest3D.x;
          const py = Math.pow(1 - t, 2) * bcn3D.y + 2 * (1 - t) * t * ctrl3D.y + t * t * dest3D.y;
          const pz = Math.pow(1 - t, 2) * bcn3D.z + 2 * (1 - t) * t * ctrl3D.z + t * t * dest3D.z;
          arcPoints.push({ x: px, y: py, z: pz });
        }

        // Draw Arc in 2D
        ctx.beginPath();
        let first = true;
        let arcInFront = false;
        
        arcPoints.forEach((p) => {
          const pt = projectPoint(p.x, p.y, p.z);
          if (pt.z >= 0) arcInFront = true;
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        });

        // Styling based on selection/hover
        if (isCurrent) {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.75)";
          ctx.lineWidth = 1.8;
        } else if (isHovered) {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.5)";
          ctx.lineWidth = 1.3;
        } else {
          ctx.strokeStyle = arcInFront ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();

        // Animated Particle/Light along the arc
        const speed = isCurrent ? 0.4 : 0.25;
        const offset = dest.id.charCodeAt(0) * 0.1; // staggered starts
        const tPulse = (time * speed + offset) % 1;
        
        const pulse3D = {
          x: Math.pow(1 - tPulse, 2) * bcn3D.x + 2 * (1 - tPulse) * tPulse * ctrl3D.x + tPulse * tPulse * dest3D.x,
          y: Math.pow(1 - tPulse, 2) * bcn3D.y + 2 * (1 - tPulse) * tPulse * ctrl3D.y + tPulse * tPulse * dest3D.y,
          z: Math.pow(1 - tPulse, 2) * bcn3D.z + 2 * (1 - tPulse) * tPulse * ctrl3D.z + tPulse * tPulse * dest3D.z,
        };
        const pulse2D = projectPoint(pulse3D.x, pulse3D.y, pulse3D.z);

        if (pulse2D.z >= -10) { // Render only if on front side
          // Draw particle with glow rings
          ctx.beginPath();
          ctx.fillStyle = "rgba(6, 182, 212, 0.15)";
          ctx.arc(pulse2D.x, pulse2D.y, isCurrent ? 7 : 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
          ctx.arc(pulse2D.x, pulse2D.y, isCurrent ? 4 : 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.arc(pulse2D.x, pulse2D.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw Destination Markers
      DESTINATIONS.forEach((dest) => {
        const destLatRad = (dest.lat * Math.PI) / 180;
        const destLonRad = (dest.lon * Math.PI) / 180;
        const dest3D = {
          x: R * Math.cos(destLatRad) * Math.sin(destLonRad),
          y: R * Math.sin(destLatRad),
          z: R * Math.cos(destLatRad) * Math.cos(destLonRad),
        };
        const dest2D = projectPoint(dest3D.x, dest3D.y, dest3D.z);

        const isCurrent = dest.id === selectedIdRef.current;
        const isHovered = dest.id === hoveredId;

        if (dest2D.z >= -20) { // Marker visible on front hemisphere
          // Circle marker
          ctx.beginPath();
          if (isCurrent) {
            ctx.fillStyle = "#06b6d4";
            ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
            ctx.lineWidth = 4;
            ctx.arc(dest2D.x, dest2D.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (isHovered) {
            ctx.fillStyle = "#22d3ee";
            ctx.strokeStyle = "rgba(34, 211, 238, 0.2)";
            ctx.lineWidth = 3;
            ctx.arc(dest2D.x, dest2D.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
            ctx.arc(dest2D.x, dest2D.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          // Text Label
          ctx.font = isCurrent ? "bold 10px sans-serif" : "9px sans-serif";
          ctx.fillStyle = isCurrent ? "#06b6d4" : isHovered ? "#22d3ee" : "rgba(255, 255, 255, 0.4)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          
          // Offset text based on position relative to center
          const labelOffset = dest2D.x > cx ? 7 : -7;
          if (dest2D.x < cx) {
            ctx.textAlign = "right";
          }
          
          // Render city name
          const destName = (t.hero.globe.destinations as any)[dest.id]?.name || dest.id;
          const shortName = destName.split("(")[0].trim();
          ctx.fillText(shortName, dest2D.x + labelOffset, dest2D.y);
        }
      });

      // 7. Draw Barcelona Hub Dot (Always on top)
      if (bcn2D.z >= -20) {
        // Pulse ring
        ctx.beginPath();
        const pulseR = 5 + Math.sin(time * 5) * 3;
        ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
        ctx.lineWidth = 1;
        ctx.arc(bcn2D.x, bcn2D.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Hub Core
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(bcn2D.x, bcn2D.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#06b6d4";
        ctx.arc(bcn2D.x, bcn2D.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Hub Text Label
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = bcn2D.x > cx ? "left" : "right";
        ctx.textBaseline = "middle";
        ctx.fillText("BCN (Barcelona)", bcn2D.x + (bcn2D.x > cx ? 8 : -8), bcn2D.y - 6);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDragging, gridLines, hoveredId]);

  // Handle Dragging / Manual Rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Hover detection on city markers (approximate check in 2D space)
    const R = 175;
    const D = 520;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rot = rotationRef.current;

    let foundId: string | null = null;

    for (let dest of DESTINATIONS) {
      const destLatRad = (dest.lat * Math.PI) / 180;
      const destLonRad = (dest.lon * Math.PI) / 180;
      const dest3D = {
        x: R * Math.cos(destLatRad) * Math.sin(destLonRad),
        y: R * Math.sin(destLatRad),
        z: R * Math.cos(destLatRad) * Math.cos(destLonRad),
      };

      // Transform
      const rx1 = dest3D.x * Math.cos(rot.y) + dest3D.z * Math.sin(rot.y);
      const rz1 = -dest3D.x * Math.sin(rot.y) + dest3D.z * Math.cos(rot.y);
      const ry1 = dest3D.y;

      const ry2 = ry1 * Math.cos(rot.x) - rz1 * Math.sin(rot.x);
      const rz2 = ry1 * Math.sin(rot.x) + rz1 * Math.cos(rot.x);
      const rx2 = rx1;

      if (rz2 >= -20) {
        const scale = D / (D - rz2);
        const px = cx + rx2 * scale;
        const py = cy - ry2 * scale;

        // Check distance to mouse cursor
        const dist = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));
        if (dist < 15) {
          foundId = dest.id;
          break;
        }
      }
    }

    setHoveredId(foundId);
    canvas.style.cursor = foundId ? "pointer" : isDragging ? "grabbing" : "grab";

    // 2. Handle Rotation Drag
    if (isDragging) {
      const deltaX = e.clientX - mousePos.x;
      const deltaY = e.clientY - mousePos.y;

      // Update rotation speed factor
      rotationRef.current.y += deltaX * 0.005;
      rotationRef.current.x += deltaY * 0.005;

      // Bound latitude tilt to prevent flip
      rotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotationRef.current.x));

      // Update target to prevent rubber-banding
      targetRotationRef.current = { ...rotationRef.current };
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    
    // If clicked on a city, select it
    if (hoveredId) {
      setSelectedId(hoveredId);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredId(null);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-xl flex flex-col min-h-[640px] shadow-2xl">
      {/* --- Card Header --- */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-950/40">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
            {t.hero.globe.badge}
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 font-medium tracking-wide">
          {t.hero.globe.title}
        </div>
      </div>

      {/* --- Globe Canvas Area --- */}
      <div className="relative flex-1 min-h-[360px] flex items-center justify-center select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[380px] max-w-[440px]"
        />

        {/* Hover drag hint */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-[9px] text-zinc-500 bg-zinc-950/50 px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-md">
            {t.hero.globe.hoverHint}
          </span>
        </div>
      </div>

      {/* --- Destination Pills / Selector --- */}
      <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/20 flex flex-wrap gap-1.5 justify-center">
        {DESTINATIONS.map((dest) => {
          const isSelected = dest.id === selectedId;
          const destName = (t.hero.globe.destinations as any)[dest.id]?.name || dest.id;
          const shortName = destName.split("(")[0].trim();
          
          return (
            <button
              key={dest.id}
              onClick={() => setSelectedId(dest.id)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition-all duration-250 cursor-pointer ${
                isSelected
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm"
                  : "border-white/5 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
              }`}
            >
              {shortName}
            </button>
          );
        })}
      </div>

      {/* --- Detailed Stats Panel --- */}
      <div className="relative p-4 border-t border-white/10 bg-zinc-950/40 min-h-[160px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-between gap-3"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2">
                <Plane className="size-4 text-cyan-400 rotate-90" />
                <h4 className="text-sm font-bold text-zinc-100 leading-none">
                  {(t.hero.globe.destinations as any)[selectedDest.id]?.name}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                {(t.hero.globe.destinations as any)[selectedDest.id]?.tip}
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              {/* Distance */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <Compass className="size-3.5 text-zinc-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-zinc-500 leading-none">{t.hero.globe.stats.distance}</div>
                  <div className="text-zinc-200 font-semibold mt-0.5 truncate">{selectedDest.distance}</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <Navigation className="size-3.5 text-zinc-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-zinc-500 leading-none">{t.hero.globe.stats.duration}</div>
                  <div className="text-zinc-200 font-semibold mt-0.5 truncate">{selectedDest.duration}</div>
                </div>
              </div>

              {/* Terminal / Layover info */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <Globe2 className="size-3.5 text-zinc-500 shrink-0" />
                <div className="min-w-0 w-full">
                  <div className="text-zinc-500 leading-none">
                    {selectedDest.layover ? t.hero.globe.stats.layover : t.hero.globe.stats.terminal}
                  </div>
                  <div className="text-cyan-400 font-bold mt-0.5 truncate" title={selectedDest.layover || selectedDest.terminal}>
                    {selectedDest.layover || selectedDest.terminal}
                  </div>
                </div>
              </div>

              {/* Passport requirement info */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <AlertCircle className="size-3.5 text-zinc-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-zinc-500 leading-none">{t.hero.globe.stats.passport}</div>
                  <div className="text-zinc-200 mt-0.5 truncate font-medium">
                    {selectedDest.passportKey === "passportRequired"
                      ? t.hero.globe.stats.passportRequired
                      : t.hero.globe.stats.passportNotRequired}
                  </div>
                </div>
              </div>
            </div>

            {/* Airlines & Frequency */}
            <div className="flex flex-col gap-1 border-t border-white/5 pt-2 text-[10px]">
              <div className="flex justify-between items-center text-zinc-500">
                <span>{t.hero.globe.stats.airlines}</span>
                <span className="text-zinc-400 font-semibold">
                  {selectedDest.frequency} {t.hero.globe.stats.weekly}
                </span>
              </div>
              <div className="text-zinc-200 truncate font-semibold leading-relaxed">
                {(t.hero.globe.destinations as any)[selectedDest.id]?.airlines}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
