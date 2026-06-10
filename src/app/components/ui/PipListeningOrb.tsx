/**
 * Molten listening orb. Adapted from Uiverse (andrew-manzyk) — recolored
 * onto Pip's coral/amber palette so it reads as a warm "voice is heard"
 * signal inside the giant coral hero panel.
 */
export function PipListeningOrb({ size = 100 }: { size?: number }) {
  const id = `pip-orb-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <span
      aria-hidden
      className={id}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        boxShadow:
          '0 0 25px 0 rgba(255,191,71,0.5), 0 20px 50px 0 rgba(191,74,29,0.5)',
        animation: `${id}-colorize 6s ease-in-out infinite`,
      }}
    >
      <span
        style={{
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          borderTop: '1px solid #ffbf48',
          borderBottom: '1px solid #be4a1d',
          background:
            'linear-gradient(180deg, rgba(255,191,71,0.25), rgba(191,74,29,0.5))',
          boxShadow:
            'inset 0 10px 10px 0 rgba(255,191,71,0.5), inset 0 -10px 10px 0 rgba(191,74,29,0.5)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(180deg, #ffbf48 30%, #be4a1d 70%)',
          WebkitMask: `url(#${id}-clip)`,
          mask: `url(#${id}-clip)`,
        }}
      />
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <mask id={`${id}-clip`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <g style={{ filter: 'contrast(15)', animation: `${id}-roundness 1s linear infinite` }}>
              <polygon points="20,20 80,20 80,80 20,80" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '75% 25%', transform: 'rotate(90deg)' }} />
              <polygon points="30,30 70,30 70,70 30,70" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '50% 50%', animation: `${id}-rot 2s linear infinite reverse` }} />
              <polygon points="35,35 65,35 65,65 35,65" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '50% 60%', animation: `${id}-rot 2s linear -0.66s infinite` }} />
              <polygon points="25,25 60,40 55,75 25,60" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '40% 40%', animation: `${id}-rot 2s linear infinite reverse` }} />
              <polygon points="30,30 65,30 60,70 30,65" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '40% 40%', animation: `${id}-rot 2s linear -1s infinite reverse` }} />
              <polygon points="35,25 65,30 60,65 30,60" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '60% 40%', animation: `${id}-rot 2s linear infinite` }} />
              <polygon points="40,25 70,35 65,70 35,60" fill="white" style={{ filter: 'blur(7px)', transformOrigin: '60% 40%', animation: `${id}-rot 2s linear -1.33s infinite` }} />
            </g>
          </mask>
        </defs>
      </svg>
      <style>{`
        @keyframes ${id}-rot { to { transform: rotate(360deg); } }
        @keyframes ${id}-roundness {
          0%,60%,100% { filter: contrast(15); }
          20%,40% { filter: contrast(3); }
        }
        @keyframes ${id}-colorize {
          0%,100% { filter: hue-rotate(0deg); }
          20% { filter: hue-rotate(-30deg); }
          40% { filter: hue-rotate(-60deg); }
          60% { filter: hue-rotate(-90deg); }
          80% { filter: hue-rotate(-45deg); }
        }
      `}</style>
    </span>
  );
}
