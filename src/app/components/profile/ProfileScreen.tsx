import { usePip } from '../../state/PipStore';

interface Props {
  onNav: (k: 'profile-edit' | 'meds' | 'settings' | 'er') => void;
}

interface Row {
  k: Parameters<Props['onNav']>[0];
  title: string;
  sub: string;
  iconBg: string;
  iconColor: string;
  icon: JSX.Element;
}

export function ProfileScreen({ onNav }: Props) {
  const { state, activeProfile } = usePip();
  const profile = activeProfile;
  const meds = state.medications.filter((m) => m.profileId === profile?.id);
  const allergies = state.allergies.filter((a) => a.profileId === profile?.id);
  const conditions = state.conditions.filter((c) => c.profileId === profile?.id);

  const rows: Row[] = [
    {
      k: 'profile-edit',
      title: 'Health info',
      sub: `${allergies.length} allergies · ${conditions.length} conditions`,
      iconBg: '#E9F0F5',
      iconColor: '#5480B2',
      icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
    },
    {
      k: 'meds',
      title: 'Medications',
      sub: `${meds.length} active`,
      iconBg: '#F2F1ED',
      iconColor: '#6B7280',
      icon: <path d="M10.5 20.5a7 7 0 1110-10l-10 10z M8.5 8.5l7 7" />,
    },
    {
      k: 'er',
      title: 'ER card',
      sub: 'Emergency info',
      iconBg: '#FDECEE',
      iconColor: '#E07A5F',
      icon: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" />,
    },
    {
      k: 'settings',
      title: 'Settings',
      sub: 'Privacy + subscription',
      iconBg: '#EAF5F2',
      iconColor: '#5E8E74',
      icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    },
  ];

  const initials = profile?.firstName?.slice(0, 1)?.toUpperCase() ?? '?';

  return (
    <div className="pip-textured-bg w-full h-full overflow-y-auto" style={{ background: '#F5F2E4', paddingBottom: 90 }}>
      <header className="px-6" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 22px)', paddingBottom: 18 }}>
        <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(61,64,91,0.5)', margin: 0 }}>
          You
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontVariationSettings: '"opsz" 96, "SOFT" 40', fontWeight: 400, fontSize: 36, color: '#3D405B', lineHeight: 1, letterSpacing: '-0.028em', margin: '6px 0 0' }}>
          Your <span style={{ fontStyle: 'italic' }}>quiet</span> file.
        </h1>
      </header>

      <div className="px-5 mb-5">
        <div
          className="rounded-[20px] p-5 flex items-center gap-4"
          style={{ background: '#fff', boxShadow: '0 4px 6px rgba(61,64,91,0.05)' }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 56, height: 56, background: '#F7E0D6', color: '#C25E45', fontFamily: "var(--font-serif)", fontStyle: 'italic', fontVariationSettings: '"opsz" 48', fontWeight: 500, fontSize: 28, letterSpacing: '-0.03em' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 16.5, color: '#3D405B', letterSpacing: '-0.005em' }}>
              {profile?.firstName ?? 'You'}
            </p>
            <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: 'rgba(61,64,91,0.55)', letterSpacing: '0.04em' }}>
              {state.tier === 'family' ? 'Pip · Family' : 'Pip'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-2.5">
        {rows.map((r) => (
          <button
            key={r.k}
            onClick={() => onNav(r.k)}
            className="rounded-[20px] p-[18px] flex items-center gap-4 text-left active:scale-[0.99] transition"
            style={{ background: '#fff', boxShadow: '0 4px 6px rgba(61,64,91,0.05)' }}
          >
            <div className="rounded-[24px] flex items-center justify-center" style={{ width: 48, height: 48, background: r.iconBg }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={r.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {r.icon}
              </svg>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 16.5, color: '#3D405B', letterSpacing: '-0.005em' }}>{r.title}</p>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: 'italic', fontVariationSettings: '"opsz" 14', fontSize: 13.5, color: 'rgba(61,64,91,0.55)' }}>{r.sub}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#3D405B" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round">
              <path d="M6 12L10 8L6 4" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
