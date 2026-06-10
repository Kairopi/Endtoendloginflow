interface Props {
  active: 'home' | 'journal' | 'tools' | 'profile';
  onChange: (k: 'home' | 'journal' | 'tools' | 'profile') => void;
}

const TABS: Array<{ k: Props['active']; label: string; icon: JSX.Element }> = [
  {
    k: 'home',
    label: 'Home',
    icon: <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z" />,
  },
  {
    k: 'journal',
    label: 'Journal',
    icon: <path d="M2 4h7a3 3 0 013 3v13a2 2 0 00-2-2H2V4zM22 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V4z" />,
  },
  {
    k: 'tools',
    label: 'Tools',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    k: 'profile',
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </>
    ),
  },
];

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav
      className="absolute bottom-0 left-0 right-0 flex items-stretch justify-around"
      style={{
        background: 'rgba(245,242,228,0.92)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderTop: '0.5px solid rgba(61,64,91,0.08)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
        paddingTop: 10,
      }}
    >
      {TABS.map((t) => {
        const on = active === t.k;
        return (
          <button
            key={t.k}
            onClick={() => onChange(t.k)}
            className="flex flex-col items-center justify-center active:scale-[0.94] transition-transform"
            style={{ flex: 1, gap: 5, padding: '2px 4px', background: 'transparent', border: 'none' }}
            aria-current={on ? 'page' : undefined}
          >
            <span
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 999,
                background: '#FFFDF7',
                boxShadow: on
                  ? '0 8px 18px -8px rgba(193,93,69,0.55), 0 0 0 0.5px rgba(193,93,69,0.25)'
                  : '0 2px 8px -4px rgba(61,64,91,0.18), 0 0 0 0.5px rgba(61,64,91,0.08)',
                transition: 'box-shadow 0.35s ease',
              }}
            >
              {/* Rising fill */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: on ? '100%' : '0%',
                  background: 'linear-gradient(180deg, #F08A6B 0%, #C25E45 100%)',
                  transition: 'height 0.35s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              />
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={on ? '#fff' : '#C25E45'}
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'relative', zIndex: 1, transition: 'stroke 0.3s ease' }}
              >
                {t.icon}
              </svg>
            </span>
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: on ? 600 : 500,
                fontSize: 10.5,
                letterSpacing: '0.01em',
                color: on ? '#C25E45' : 'rgba(61,64,91,0.6)',
                transition: 'color 0.2s ease',
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
