import { useEffect, useState } from 'react';

const MASCOT_URL =
  'https://res.cloudinary.com/dwkaqrjll/image/upload/v1781030722/untitled_SD3_-_Remove_Background_2026-06-08_21-55-39_e3qkly.png';

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#F4F1DE' }}
    >
      {/* warm aura */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 'min(96vw, 480px)',
          height: 'min(96vw, 480px)',
          borderRadius: '50%',
          left: '50%',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle at center, rgba(253,232,212,0.95) 0%, rgba(247,205,180,0.55) 35%, rgba(244,241,222,0) 72%)',
          filter: 'blur(2px)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 900ms ease',
        }}
      />
      {/* tiny decorative dots */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: '17%',
          top: '58%',
          width: 10,
          height: 10,
          borderRadius: 999,
          background: '#81B29A',
          opacity: mounted ? 0.5 : 0,
          transition: 'opacity 1000ms ease 200ms',
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: '14%',
          top: '32%',
          width: 8,
          height: 8,
          borderRadius: 999,
          background: '#E07A5F',
          opacity: mounted ? 0.55 : 0,
          transition: 'opacity 1000ms ease 350ms',
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: '22%',
          top: '34%',
          width: 14,
          height: 14,
          borderRadius: 999,
          border: '2px solid #F2CC8F',
          opacity: mounted ? 0.65 : 0,
          transition: 'opacity 1000ms ease 500ms',
        }}
      />

      <div
        style={{
          position: 'relative',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
          transition: 'opacity 800ms ease, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <img
          src={MASCOT_URL}
          alt=""
          style={{
            width: 'min(72vw, 320px)',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 18px 28px rgba(193,93,69,0.18))',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 56,
            color: '#C95F45',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Pip
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 18',
            fontWeight: 400,
            fontSize: 15,
            color: 'rgba(61,64,91,0.55)',
            letterSpacing: '-0.005em',
            margin: '4px 0 0',
            textAlign: 'center',
          }}
        >
          notice your body, every day.
        </p>
      </div>

      {/* subtle loading shimmer */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 72,
          height: 3,
          borderRadius: 999,
          overflow: 'hidden',
          background: 'rgba(61,64,91,0.08)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 700ms ease 400ms',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #E07A5F, transparent)',
            animation: 'pip-shimmer 1.4s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes pip-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(280%); }
        }
      `}</style>
    </div>
  );
}
