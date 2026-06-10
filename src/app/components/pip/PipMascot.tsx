import { useEffect, useState } from 'react';

export type PipState = 'hello' | 'listening' | 'thinking' | 'celebrating' | 'supporting';

interface PipMascotProps {
  state?: PipState;
  size?: number;
  className?: string;
}

const COLOR = {
  body: '#3B9BE0',
  bodyShade: '#2E84C4',
  chest: '#FFFFFF',
  beak: '#FFA94D',
  blush: '#FFB6B6',
  eye: '#1A1A1A',
  brow: '#7BB8E8',
  mouth: '#FFB6B6',
};

export function PipMascot({ state = 'hello', size = 120, className = '' }: PipMascotProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const wobble = !reducedMotion && state === 'hello';
  const bounce = !reducedMotion && state === 'celebrating';

  // Per-state expression / pose tweaks
  const headTilt = state === 'listening' ? 12 : state === 'thinking' ? -8 : 0;
  const eyeY = state === 'celebrating' ? 0 : 0;
  const eyesClosed = state === 'celebrating';
  const beakOpen = state === 'celebrating';
  const showSparkles = state === 'celebrating';
  const showThinkDots = state === 'thinking';
  const wingForward = state === 'supporting' || state === 'listening';

  return (
    <div
      role="img"
      aria-label="Pip mascot illustration"
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        animation: bounce
          ? 'pip-celebrate 0.6s ease-out'
          : wobble
          ? 'pip-idle 3.5s ease-in-out infinite'
          : undefined,
      }}
    >
      <style>{`
        @keyframes pip-idle { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        @keyframes pip-celebrate { 0% { transform: translateY(0) scale(1) } 40% { transform: translateY(-8px) scale(1.05) } 100% { transform: translateY(0) scale(1) } }
      `}</style>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#6FB5E8" />
            <stop offset="60%" stopColor={COLOR.body} />
            <stop offset="100%" stopColor={COLOR.bodyShade} />
          </radialGradient>
          <radialGradient id="chestGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F1E0" />
          </radialGradient>
        </defs>

        <g transform={`rotate(${headTilt} 100 95)`}>
          {/* Feet */}
          <ellipse cx="78" cy="178" rx="16" ry="8" fill={COLOR.beak} />
          <ellipse cx="122" cy="178" rx="16" ry="8" fill={COLOR.beak} />

          {/* Body */}
          <ellipse cx="100" cy="125" rx="62" ry="58" fill="url(#bodyGrad)" />

          {/* Wings */}
          {wingForward ? (
            <>
              <ellipse cx="62" cy="130" rx="14" ry="22" fill={COLOR.bodyShade} transform="rotate(-15 62 130)" />
              <ellipse cx="138" cy="130" rx="14" ry="22" fill={COLOR.bodyShade} transform="rotate(15 138 130)" />
            </>
          ) : bounce ? (
            <>
              <ellipse cx="48" cy="95" rx="14" ry="24" fill={COLOR.bodyShade} transform="rotate(-45 48 95)" />
              <ellipse cx="152" cy="95" rx="14" ry="24" fill={COLOR.bodyShade} transform="rotate(45 152 95)" />
            </>
          ) : (
            <>
              <ellipse cx="50" cy="135" rx="14" ry="24" fill={COLOR.bodyShade} transform="rotate(-20 50 135)" />
              <ellipse cx="150" cy="135" rx="14" ry="24" fill={COLOR.bodyShade} transform="rotate(20 150 135)" />
            </>
          )}

          {/* Heart-shaped white chest patch + face */}
          <path
            d="M100 60 C 75 50, 50 70, 55 100 C 60 130, 100 165, 100 165 C 100 165, 140 130, 145 100 C 150 70, 125 50, 100 60 Z"
            fill="url(#chestGrad)"
          />

          {/* Curled feather quiff */}
          <path
            d="M100 50 Q 95 35 105 30 Q 118 28 118 42 Q 118 50 110 52"
            fill={COLOR.body}
            stroke={COLOR.bodyShade}
            strokeWidth="2"
          />

          {/* Eyebrows */}
          <path d="M76 85 Q 82 81 88 85" stroke={COLOR.brow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M112 85 Q 118 81 124 85" stroke={COLOR.brow} strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          {eyesClosed ? (
            <>
              <path d="M72 100 Q 82 92 92 100" stroke={COLOR.eye} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M108 100 Q 118 92 128 100" stroke={COLOR.eye} strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="82" cy={100 + eyeY} r="9" fill={COLOR.eye} />
              <circle cx="118" cy={100 + eyeY} r="9" fill={COLOR.eye} />
              <circle cx="79" cy={97 + eyeY} r="3" fill="#FFF" />
              <circle cx="115" cy={97 + eyeY} r="3" fill="#FFF" />
              <circle cx="85" cy={104 + eyeY} r="1.2" fill="#FFF" />
              <circle cx="121" cy={104 + eyeY} r="1.2" fill="#FFF" />
            </>
          )}

          {/* Blush */}
          <ellipse cx="68" cy="115" rx="6" ry="4" fill={COLOR.blush} opacity="0.75" />
          <ellipse cx="132" cy="115" rx="6" ry="4" fill={COLOR.blush} opacity="0.75" />

          {/* Beak */}
          {beakOpen ? (
            <path d="M93 118 Q 100 132 107 118 Q 100 124 93 118 Z" fill={COLOR.beak} stroke={COLOR.mouth} />
          ) : (
            <path d="M93 116 L 100 124 L 107 116 Z" fill={COLOR.beak} />
          )}
        </g>

        {/* Thinking dots */}
        {showThinkDots && !reducedMotion && (
          <g fill="#FFFFFF" stroke={COLOR.bodyShade} strokeWidth="1.5">
            <circle cx="155" cy="55" r="3" opacity="0.6" />
            <circle cx="165" cy="42" r="4" opacity="0.8" />
            <circle cx="180" cy="32" r="5" />
          </g>
        )}

        {/* Sparkles */}
        {showSparkles && (
          <g fill="#FFF1B8" stroke="#F2CC8F" strokeWidth="1">
            <path d="M40 50 L 42 56 L 48 58 L 42 60 L 40 66 L 38 60 L 32 58 L 38 56 Z" />
            <path d="M160 45 L 162 50 L 168 52 L 162 54 L 160 60 L 158 54 L 152 52 L 158 50 Z" />
            <path d="M30 110 L 32 114 L 36 116 L 32 118 L 30 122 L 28 118 L 24 116 L 28 114 Z" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
