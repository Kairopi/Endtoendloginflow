interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
}

/**
 * Editorial path-draw checkmark. Plays once on mount.
 * Adapted from Uiverse (PriyanshuGupta28) — recolored to Pip coral,
 * sized for inline use, and rewritten as a React component so the
 * animation key resets on remount (re-plays when a celebration fires).
 */
export function PipCheckmark({
  size = 56,
  color = '#C25E45',
  strokeWidth = 2.4,
  duration = 0.55,
  delay = 0.05,
}: Props) {
  const id = `pip-check-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <circle
          cx="28"
          cy="28"
          r="25"
          stroke={color}
          strokeOpacity="0.18"
          strokeWidth={strokeWidth * 0.6}
        />
        <circle
          cx="28"
          cy="28"
          r="25"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 157,
            strokeDashoffset: 157,
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            animation: `${id}-ring ${duration + 0.15}s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s forwards`,
          }}
        />
        <path
          d="M17 29.5 L25 37 L40 21"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 36,
            strokeDashoffset: 36,
            animation: `${id}-check ${duration}s cubic-bezier(0.65, 0, 0.35, 1) ${delay + duration * 0.6}s forwards`,
          }}
        />
        <style>{`
          @keyframes ${id}-ring { to { stroke-dashoffset: 0; } }
          @keyframes ${id}-check { to { stroke-dashoffset: 0; } }
        `}</style>
      </svg>
    </span>
  );
}
