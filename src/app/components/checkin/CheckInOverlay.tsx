import { useState } from 'react';
import { usePip, newId } from '../../state/PipStore';
import { PipMascot } from '../pip/PipMascot';
import { PipCheckmark } from '../ui/PipCheckmark';

type Band = 'morning' | 'afternoon' | 'evening' | 'night';

interface Props {
  band: Band;
  onClose: () => void;
  onDone: () => void;
}

const PROMPTS: Record<Band, { title: string; chips: string[] }> = {
  morning: {
    title: 'How did you wake up?',
    chips: ['Rested', 'Tired', 'Sore', 'Foggy', 'Anxious', 'Fine'],
  },
  afternoon: {
    title: 'How are you feeling now?',
    chips: ['Energetic', 'Sluggish', 'Hungry', 'Achy', 'Focused', 'Meh'],
  },
  evening: {
    title: 'Anything to note from today?',
    chips: ['Headache', 'Stomach', 'Mood', 'Pain', 'All good', 'Tired'],
  },
  night: {
    title: 'How was today, overall?',
    chips: ['Great', 'Okay', 'Rough', 'Sore', 'Stressed', 'Fine'],
  },
};

export function CheckInOverlay({ band, onClose, onDone }: Props) {
  const { state, dispatch } = usePip();
  const [picked, setPicked] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const cfg = PROMPTS[band];

  const farewell: Record<Band, string> = {
    morning: 'Have a gentle morning.',
    afternoon: 'Have a kind afternoon.',
    evening: 'Have a soft evening.',
    night: 'Rest well tonight.',
  };

  const toggle = (c: string) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const save = () => {
    if (!state.activeProfileId) return onDone();
    if (picked.length) {
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          id: newId(),
          profileId: state.activeProfileId,
          createdAt: Date.now(),
          type: 'check_in',
          text: `${band} check-in: ${picked.join(', ')}`,
          tags: ['check-in', band, ...picked],
        },
      });
    }
    setSaved(true);
    window.setTimeout(onDone, 1100);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div
        className="w-full rounded-t-3xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--color-surface-raised)', maxHeight: '80%' }}
      >
        {saved ? (
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            <PipCheckmark size={56} strokeWidth={2.4} />
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 20,
                color: 'var(--color-text-primary)',
                textAlign: 'center',
              }}
            >
              Noted. {farewell[band]}
            </p>
          </div>
        ) : (
        <>
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>
            {band === 'morning' ? 'Morning check-in' : band === 'afternoon' ? 'Afternoon check-in' : band === 'evening' ? 'Evening check-in' : 'Night check-in'}
          </span>
          <button onClick={onClose} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 13 }}>
            Not now
          </button>
        </div>
        <div className="flex items-center gap-3">
          <PipMascot state="hello" size={64} />
          <p style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20 }}>
            {cfg.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {cfg.chips.map((c) => {
            const on = picked.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                className="px-4 py-2 rounded-full transition"
                style={{
                  background: on ? 'var(--color-brand)' : 'var(--color-surface)',
                  color: on ? '#fff' : 'var(--color-text-primary)',
                  border: `1px solid ${on ? 'var(--color-brand)' : 'var(--color-hairline)'}`,
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: on ? 600 : 500,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
        <button
          onClick={save}
          className="w-full h-12 rounded-2xl active:scale-[0.98] transition mt-2"
          style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}
        >
          {picked.length ? 'Save' : 'Nothing to note'}
        </button>
        </>
        )}
      </div>
    </div>
  );
}
