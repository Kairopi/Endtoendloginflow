interface Props {
  onClose: () => void;
  onNav: (route: string) => void;
}

const ITEMS: Array<{ k: string; label: string; sub: string }> = [
  { k: 'brief', label: 'Pre-Visit Brief', sub: 'One-page summary for your doctor' },
  { k: 'receipt', label: 'After-Visit Receipt', sub: 'Capture what your doctor said' },
  { k: 'er', label: 'ER Card', sub: 'Allergies, meds, conditions at a glance' },
  { k: 'meds', label: 'Medications', sub: 'Manage your meds + interactions' },
  { k: 'profile', label: 'Profile & Allergies', sub: 'Edit profile, allergies, conditions' },
  { k: 'settings', label: 'Settings', sub: 'Display, subscription, privacy' },
];

export function MoreSheet({ onClose, onNav }: Props) {
  return (
    <div className="absolute inset-0 z-40 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5 flex flex-col gap-2"
        style={{ background: 'var(--color-surface-raised)', maxHeight: '80%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 rounded-full mx-auto mb-2" style={{ background: 'var(--color-hairline)' }} />
        {ITEMS.map((it) => (
          <button
            key={it.k}
            onClick={() => {
              onNav(it.k);
              onClose();
            }}
            className="w-full text-left rounded-2xl p-3"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}
          >
            <p style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15 }}>
              {it.label}
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12, marginTop: 2 }}>
              {it.sub}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
