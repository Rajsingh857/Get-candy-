import React, { useEffect, useRef } from 'react';

interface SpookyBackdropProps {
  confettiActive?: boolean;
  largeMoon?: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

interface FogPuff {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  alpha: number;
}

interface ConfettiPiece {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  color: string;
  size: number;
}

const CONFETTI_COLORS = ['#F26B21', '#FDF6E2', '#F59E0B', '#A855F7', '#10B981', '#EC4899'];

export const SpookyBackdrop: React.FC<SpookyBackdropProps> = ({
  confettiActive = false,
  largeMoon = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<boolean>(confettiActive);

  useEffect(() => {
    confettiRef.current = confettiActive;
  }, [confettiActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pre-allocate stars (zero-GC inside loop)
    const stars: Star[] = Array.from({ length: 52 }, (_, i) => ({
      x: ((i * 197) % 1000) / 1000,
      y: ((i * 313) % 680) / 1000,
      r: 1.3 + (i % 3) * 0.85,
      phase: (i * 0.7) % (Math.PI * 2),
      speed: 1.2 + (i % 5) * 0.45,
    }));

    // Pre-allocate drifting fog bands
    const fogs: FogPuff[] = Array.from({ length: 7 }, (_, i) => ({
      x: (i / 7) * 1.3 - 0.15,
      y: 0.74 + (i % 3) * 0.08,
      w: 0.34 + (i % 4) * 0.07,
      h: 0.055 + (i % 2) * 0.025,
      speed: 0.012 + (i % 3) * 0.005,
      alpha: 0.055 + (i % 3) * 0.02,
    }));

    // Pre-allocate pooled confetti ring buffer
    const confettiPool: ConfettiPiece[] = Array.from({ length: 75 }, (_, i) => ({
      active: false,
      x: ((i * 73) % 100) / 100,
      y: -0.1 - ((i * 29) % 100) / 100,
      vx: ((i % 7) - 3) * 28,
      vy: 110 + (i % 5) * 45,
      rot: i * 0.5,
      vrot: ((i % 5) - 2) * 3.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 7 + (i % 4) * 3,
    }));

    let timerId: number | null = null;
    let lastTime = performance.now();
    let elapsed = 0;
    let disposed = false;

    const renderFrame = () => {
      if (disposed) return;
      const now = performance.now();
      const rawDt = (now - lastTime) / 1000;
      const dt = Math.min(Math.max(rawDt, 0), 0.05);
      lastTime = now;
      elapsed += dt;

      ctx.clearRect(0, 0, width, height);

      // 1. Twinkling cream stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(elapsed * s.speed + s.phase));
        ctx.fillStyle = `rgba(253, 246, 226, ${twinkle.toFixed(2)})`;
        const sx = s.x * width;
        const sy = s.y * height;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Wavy cloud streaks drifting slowly across the sky
      for (let c = 0; c < 4; c++) {
        const cy = height * (0.16 + c * 0.12);
        const cx = ((elapsed * (14 + c * 4) + c * 360) % (width + 500)) - 250;
        ctx.fillStyle =
          c % 2 === 0 ? 'rgba(19, 37, 51, 0.52)' : 'rgba(253, 246, 226, 0.07)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 170 + c * 25, 16 + c * 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Slow drifting fog layers at bottom (fast flat ellipse fills, zero per-frame allocations)
      for (let i = 0; i < fogs.length; i++) {
        const f = fogs[i];
        f.x += f.speed * dt;
        if (f.x - f.w > 1.15) {
          f.x = -f.w - 0.1;
        }
        const fx = f.x * width;
        const fy = f.y * height;
        const fw = f.w * width;
        const fh = f.h * height;

        ctx.fillStyle = `rgba(253, 246, 226, ${f.alpha})`;
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 0.55, fh, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Confetti when active
      if (confettiRef.current) {
        for (let i = 0; i < confettiPool.length; i++) {
          const p = confettiPool[i];
          if (!p.active) {
            p.active = true;
            p.x = (((i * 97) % 100) / 100) * width;
            p.y = -20 - (i % 15) * 35;
          }
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vrot * dt;
          if (p.y > height + 30) {
            p.y = -20;
            p.x = (((i * 131 + Math.floor(elapsed * 40)) % 100) / 100) * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      }

      // Schedule next frame after draw completes so CPU is never saturated in headless browsers
      timerId = window.setTimeout(renderFrame, 45);
    };

    renderFrame();
    return () => {
      disposed = true;
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Hand-painted style night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 34%, #2A4D66 0%, #1F3A4D 48%, #122330 88%, #0D161E 100%)',
        }}
      />

      {/* Big cream moon */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDF6E2" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#FDF6E2" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FDF6E2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#162938" />
            <stop offset="100%" stopColor="#0D161E" />
          </linearGradient>
          <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#11202C" />
            <stop offset="100%" stopColor="#091016" />
          </linearGradient>
        </defs>

        {/* Moon glow & cream disc */}
        <g
          transform={
            largeMoon ? 'translate(720, 405) scale(1.22)' : 'translate(1140, 210) scale(0.72)'
          }
        >
          <circle cx="0" cy="0" r="300" fill="url(#moonHalo)" />
          <circle
            cx="0"
            cy="0"
            r="175"
            fill="#FDF6E2"
            stroke="#F5E6BE"
            strokeWidth="6"
          />
          {/* Subtle hand-painted moon craters */}
          <circle cx="-55" cy="-42" r="26" fill="#F3E5C2" opacity="0.65" />
          <circle cx="68" cy="-18" r="18" fill="#F3E5C2" opacity="0.55" />
          <circle cx="32" cy="64" r="34" fill="#F3E5C2" opacity="0.5" />
          <circle cx="-74" cy="48" r="15" fill="#F3E5C2" opacity="0.5" />

          {/* Wavy cloud streaks across moon */}
          <path
            d="M-240,-35 Q-110,-62 10,-32 T240,-40 Q140,-15 -10,-20 T-240,-35 Z"
            fill="#1F3A4D"
            opacity="0.45"
          />
          <path
            d="M-210,75 Q-60,50 75,78 T260,65 Q150,95 20,90 T-210,75 Z"
            fill="#1F3A4D"
            opacity="0.55"
          />
        </g>

        {/* Distant spooky hills & crooked silhouettes */}
        <path
          d="M0,690 Q240,600 540,665 T1120,630 Q1300,610 1440,675 L1440,900 L0,900 Z"
          fill="url(#hillBack)"
        />

        {/* Distant crooked haunted house silhouettes on the horizon */}
        <g fill="#0E1A24" opacity="0.75">
          <polygon points="180,650 172,585 215,550 255,590 245,650" />
          <rect x="198" y="598" width="12" height="16" fill="#F26B21" opacity="0.55" />
          <polygon points="1220,645 1232,570 1270,532 1308,575 1295,645" />
          <rect x="1256" y="582" width="14" height="18" fill="#F26B21" opacity="0.55" />
        </g>

        {/* Foreground rolling dark hill */}
        <path
          d="M0,765 Q380,690 740,755 T1440,735 L1440,900 L0,900 Z"
          fill="url(#hillFront)"
        />

        {/* Left Gnarled Bare Tree */}
        <path
          d="M-10,900 L-10,420 Q35,445 62,400 Q95,355 155,330 Q100,375 82,425 Q130,420 178,395 Q125,442 75,465 Q48,560 65,780 L95,900 Z"
          fill="#0B131A"
        />
        <path
          d="M25,520 Q78,490 125,498 Q78,512 42,548 Z"
          fill="#0B131A"
        />

        {/* Right Gnarled Bare Tree */}
        <path
          d="M1450,900 L1450,410 Q1405,435 1372,385 Q1335,340 1275,315 Q1330,365 1352,415 Q1300,410 1255,388 Q1310,435 1360,460 Q1390,560 1375,780 L1340,900 Z"
          fill="#0B131A"
        />
      </svg>

      {/* Animated stars, clouds, fog & confetti canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
