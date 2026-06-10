/**
 * Editorial blob card. Adapted from Uiverse (dylanharriscameron) — recolored
 * to Pip coral on cream, swapped neumorphic shadow for the warm editorial
 * shadow we use elsewhere. The blob drifts behind frosted glass so the card
 * feels quietly alive without demanding attention.
 */
export function BlobCard({
  children,
  blobColor = '#E07A5F',
  width = '100%',
  minHeight = 180,
}: {
  children: React.ReactNode;
  blobColor?: string;
  width?: number | string;
  minHeight?: number;
}) {
  const id = `blob-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div
      style={{
        position: 'relative',
        width,
        minHeight,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow:
          '0 18px 36px -22px rgba(193,93,69,0.35), 0 1px 0 rgba(255,255,255,0.6) inset',
        background: '#F4F2E3',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          width: 160,
          height: 160,
          borderRadius: '50%',
          backgroundColor: blobColor,
          opacity: 0.65,
          filter: 'blur(28px)',
          animation: `${id}-bounce 7s infinite ease`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 5,
          left: 5,
          right: 5,
          bottom: 5,
          zIndex: 2,
          background: 'rgba(255,253,247,0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 14,
          outline: '1px solid rgba(255,255,255,0.7)',
          padding: 18,
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes ${id}-bounce {
          0%   { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
          25%  { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
          50%  { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
          75%  { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
          100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}
