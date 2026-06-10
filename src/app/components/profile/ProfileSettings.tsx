import { useState } from 'react';
import { usePip, newId } from '../../state/PipStore';

interface Props {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: Props) {
  const { state, dispatch, activeProfile } = usePip();
  const [allergen, setAllergen] = useState('');
  const [sev, setSev] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [reaction, setReaction] = useState('');
  const [condLabel, setCondLabel] = useState('');

  const allergies = state.allergies.filter((a) => a.profileId === state.activeProfileId);
  const conditions = state.conditions.filter((c) => c.profileId === state.activeProfileId);

  const addAllergy = () => {
    if (!allergen.trim() || !state.activeProfileId) return;
    dispatch({
      type: 'ADD_ALLERGY',
      payload: { id: newId(), profileId: state.activeProfileId, allergen, severity: sev, reaction: reaction || undefined },
    });
    setAllergen('');
    setReaction('');
    setSev('mild');
  };

  const addCondition = () => {
    if (!condLabel.trim() || !state.activeProfileId) return;
    dispatch({
      type: 'ADD_CONDITION',
      payload: { id: newId(), profileId: state.activeProfileId, label: condLabel },
    });
    setCondLabel('');
  };

  const updateProfile = (patch: Partial<typeof activeProfile>) => {
    if (!activeProfile) return;
    dispatch({ type: 'UPDATE_PROFILE', payload: { ...activeProfile, ...patch } as any });
  };

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>
          ← Back
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 700 }}>Profile</span>
        <span className="w-8" />
      </div>

      <div className="px-5 flex flex-col gap-4">
        <Section title="Basics">
          <input
            value={activeProfile?.firstName ?? ''}
            onChange={(e) => updateProfile({ firstName: e.target.value })}
            placeholder="First name"
            className="w-full p-3 rounded-xl border outline-none mb-2"
            style={inputStyle}
          />
          <input
            type="date"
            value={activeProfile?.dob ?? ''}
            onChange={(e) => updateProfile({ dob: e.target.value })}
            className="w-full p-3 rounded-xl border outline-none mb-2"
            style={inputStyle}
          />
          <div className="flex gap-2">
            <select
              value={activeProfile?.sex ?? ''}
              onChange={(e) => updateProfile({ sex: e.target.value as any })}
              className="flex-1 p-3 rounded-xl border outline-none"
              style={inputStyle}
            >
              <option value="">Sex</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <input
              value={activeProfile?.bloodType ?? ''}
              onChange={(e) => updateProfile({ bloodType: e.target.value })}
              placeholder="Blood type"
              className="flex-1 p-3 rounded-xl border outline-none"
              style={inputStyle}
            />
          </div>
        </Section>

        <Section title="Allergies">
          <input
            value={allergen}
            onChange={(e) => setAllergen(e.target.value)}
            placeholder="Allergen (e.g. peanuts)"
            className="w-full p-3 rounded-xl border outline-none mb-2"
            style={inputStyle}
          />
          <div className="flex gap-2 mb-2">
            {(['mild', 'moderate', 'severe'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSev(s)}
                className="flex-1 py-2 rounded-xl capitalize"
                style={{
                  background: sev === s ? 'var(--color-brand)' : 'var(--color-surface-raised)',
                  color: sev === s ? '#fff' : 'var(--color-text-primary)',
                  border: '1px solid var(--color-hairline)',
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            value={reaction}
            onChange={(e) => setReaction(e.target.value)}
            placeholder="Reaction (optional)"
            className="w-full p-3 rounded-xl border outline-none mb-2"
            style={inputStyle}
          />
          <button onClick={addAllergy} className="w-full h-11 rounded-xl" style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
            Add allergy
          </button>
          <div className="mt-3 flex flex-col gap-2">
            {allergies.map((a) => (
              <div
                key={a.id}
                className="rounded-xl p-2 flex items-center justify-between"
                style={{
                  background: a.severity === 'severe' ? 'var(--color-emergency-whisper)' : 'var(--color-surface-raised)',
                  border: `1px solid ${a.severity === 'severe' ? 'var(--color-emergency)' : 'var(--color-hairline)'}`,
                }}
              >
                <span style={{ color: a.severity === 'severe' ? 'var(--color-emergency-text)' : 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: a.severity === 'severe' ? 700 : 500 }}>
                  {a.allergen} · {a.severity}
                </span>
                <button onClick={() => dispatch({ type: 'DELETE_ALLERGY', payload: a.id })} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12 }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Conditions">
          <div className="flex gap-2">
            <input
              value={condLabel}
              onChange={(e) => setCondLabel(e.target.value)}
              placeholder="e.g. asthma"
              className="flex-1 p-3 rounded-xl border outline-none"
              style={inputStyle}
            />
            <button onClick={addCondition} className="px-4 rounded-xl" style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
              Add
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {conditions.map((c) => (
              <div
                key={c.id}
                className="rounded-xl p-2 flex items-center justify-between"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-hairline)' }}
              >
                <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>{c.label}</span>
                <button onClick={() => dispatch({ type: 'DELETE_CONDITION', payload: c.id })} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12 }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Emergency contact">
          <input
            value={activeProfile?.emergencyContact?.name ?? ''}
            onChange={(e) => updateProfile({ emergencyContact: { name: e.target.value, phone: activeProfile?.emergencyContact?.phone ?? '' } })}
            placeholder="Contact name"
            className="w-full p-3 rounded-xl border outline-none mb-2"
            style={inputStyle}
          />
          <input
            value={activeProfile?.emergencyContact?.phone ?? ''}
            onChange={(e) => updateProfile({ emergencyContact: { name: activeProfile?.emergencyContact?.name ?? '', phone: e.target.value } })}
            placeholder="Phone"
            className="w-full p-3 rounded-xl border outline-none"
            style={inputStyle}
          />
        </Section>
      </div>
      <div className="h-24" />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--color-surface-raised)',
  borderColor: 'var(--color-hairline)',
  borderWidth: 1,
  color: 'var(--color-text-primary)',
  fontFamily: "var(--font-sans)",
  fontSize: 15,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700, marginBottom: 8 }}>
        {title}
      </p>
      {children}
    </div>
  );
}
