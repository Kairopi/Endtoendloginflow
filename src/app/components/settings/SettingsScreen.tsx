import { useEffect, useState } from 'react';
import { usePip } from '../../state/PipStore';
import { BlobCard } from '../ui/BlobCard';

interface Props {
  onBack: () => void;
}

function useHtmlClassToggle(className: string, storageKey: string): [boolean, () => void] {
  const [on, setOn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(storageKey) === '1';
  });
  useEffect(() => {
    const html = document.documentElement;
    if (on) {
      html.classList.add(className);
      localStorage.setItem(storageKey, '1');
    } else {
      html.classList.remove(className);
      localStorage.setItem(storageKey, '0');
    }
  }, [on, className, storageKey]);
  return [on, () => setOn((v) => !v)];
}

export function SettingsScreen({ onBack }: Props) {
  const { state, dispatch } = usePip();
  const [calmOn, toggleCalm] = useHtmlClassToggle('pip-calm', 'pip:calm');
  const [largeOn, toggleLarge] = useHtmlClassToggle('pip-large', 'pip:large');

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>
          ← Back
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 700 }}>Settings</span>
        <span className="w-8" />
      </div>

      <div className="px-5 flex flex-col gap-3">
        <Section title="Accessibility">
          <Toggle
            label="Larger text"
            on={largeOn}
            onChange={toggleLarge}
            hint="Bumps every size up a notch."
          />
          <Toggle
            label="Calm mode"
            on={calmOn}
            onChange={toggleCalm}
            hint="Quieter color, no motion. For migraine days."
          />
        </Section>

        <Section title="Display">
          <Toggle
            label="Hide Pip mascot"
            on={state.hidePip}
            onChange={() => dispatch({ type: 'TOGGLE_HIDE_PIP' })}
          />
          <Toggle
            label="Disable Daily Check-In"
            on={state.disableCheckIn}
            onChange={() => dispatch({ type: 'TOGGLE_DISABLE_CHECKIN' })}
          />
        </Section>

        <Section title="Subscription">
          {state.tier === 'free' && (
            <BlobCard minHeight={150}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(61,64,91,0.55)', margin: 0 }}>
                  Pip +
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontVariationSettings: '"opsz" 36, "SOFT" 50', fontSize: 24, lineHeight: 1.15, color: '#261F1A', margin: '6px 0 8px', letterSpacing: '-0.01em' }}>
                  Remember <span style={{ fontStyle: 'italic' }}>more</span>.
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: 12.5, lineHeight: 1.5, color: 'rgba(61,64,91,0.72)', margin: 0 }}>
                  Unlimited pre-visit briefs, full year of history, and trends across months.
                </p>
                <button
                  onClick={() => dispatch({ type: 'SET_TIER', payload: 'plus' })}
                  style={{
                    marginTop: 14,
                    background: '#C25E45',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 999,
                    padding: '9px 18px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Try Pip+
                </button>
              </div>
            </BlobCard>
          )}
          <div className="rounded-xl p-3" style={card}>
            <p style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14 }}>
              Current tier: <span style={{ color: 'var(--color-brand-text)' }}>{state.tier}</span>
            </p>
            <div className="flex gap-2 mt-2">
              {(['free', 'plus', 'family'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => dispatch({ type: 'SET_TIER', payload: t })}
                  className="flex-1 py-2 rounded-lg capitalize"
                  style={{
                    background: state.tier === t ? 'var(--color-brand)' : 'var(--color-surface)',
                    color: state.tier === t ? '#fff' : 'var(--color-text-primary)',
                    border: '1px solid var(--color-hairline)',
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Pip {t === 'free' ? 'Free' : t === 'plus' ? '+' : '+ Family'}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Privacy">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'pip-export.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="w-full text-left rounded-xl p-3"
            style={card}
          >
            <p style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14 }}>
              Export my data
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12 }}>
              A JSON file of every note, on this device.
            </p>
          </button>
          <button
            onClick={() => {
              if (confirm('Delete all Pip data on this device? This cannot be undone.')) {
                dispatch({ type: 'WIPE_ALL' });
              }
            }}
            className="w-full text-left rounded-xl p-3"
            style={{ ...card, borderColor: 'var(--color-emergency)' }}
          >
            <p style={{ color: 'var(--color-emergency-text)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14 }}>
              Delete all my data
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12 }}>
              Wipes everything on this device. Can't be undone.
            </p>
          </button>
          <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
            Your notes stay on your device. We never train AI on them.
          </p>
        </Section>
      </div>
      <div className="h-24" />
    </div>
  );
}

const card: React.CSSProperties = {
  background: 'var(--color-surface-raised)',
  border: '1px solid var(--color-hairline)',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function Toggle({ label, on, onChange, hint }: { label: string; on: boolean; onChange: () => void; hint?: string }) {
  return (
    <button onClick={onChange} className="w-full flex items-center justify-between rounded-xl p-3 text-left" style={card}>
      <span className="flex flex-col" style={{ minWidth: 0, paddingRight: 12 }}>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500 }}>{label}</span>
        {hint && (
          <span style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>
            {hint}
          </span>
        )}
      </span>
      <div
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          background: on ? 'var(--color-brand)' : 'var(--color-hairline)',
          position: 'relative',
          transition: 'background 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: on ? 21 : 3,
            width: 20,
            height: 20,
            borderRadius: 10,
            background: '#fff',
            transition: 'left 0.2s',
          }}
        />
      </div>
    </button>
  );
}
