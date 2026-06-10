import { useState } from 'react';
import { usePip, newId } from '../../state/PipStore';
import { triage, TriageOutput } from '../../data/triageRules';
import { PipMascot } from '../pip/PipMascot';
import { ComplianceDisclaimer } from '../pip/ComplianceDisclaimer';

interface Props {
  onBack: () => void;
}

function ageFromDob(dob?: string): number {
  if (!dob) return 35;
  const diff = Date.now() - new Date(dob).getTime();
  return diff / (1000 * 60 * 60 * 24 * 365.25);
}

export function TriageScreen({ onBack }: Props) {
  const { state, dispatch, activeProfile } = usePip();
  const [text, setText] = useState('');
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<TriageOutput | null>(null);

  const run = () => {
    if (!text.trim()) return;
    setThinking(true);
    setResult(null);
    setTimeout(() => {
      const age = ageFromDob(activeProfile?.dob);
      const out = triage(text, age);
      setResult(out);
      setThinking(false);
      if (state.activeProfileId) {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            id: newId(),
            profileId: state.activeProfileId,
            createdAt: Date.now(),
            type: 'triage',
            text: `Triage: ${text}`,
            tags: ['triage', out.is911 ? 'urgent' : 'routine'],
          },
        });
      }
    }, 1200);
  };

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          ← Back
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>Triage</span>
        <span className="w-8" />
      </div>

      <div className="px-5 flex flex-col items-center gap-3 mb-3">
        <PipMascot state="supporting" size={96} />
        <p className="text-center" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18 }}>
          tell me what's happening
        </p>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. child has fever of 103, breathing fast"
          className="w-full p-4 rounded-2xl border outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            borderColor: 'var(--color-hairline)',
            color: 'var(--color-text-primary)',
            minHeight: 120,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
          }}
        />
        <button
          onClick={run}
          disabled={!text.trim() || thinking}
          className="h-12 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2"
          style={{
            background: 'var(--color-brand)',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            opacity: !text.trim() || thinking ? 0.5 : 1,
          }}
        >
          {thinking && <PipMascot state="thinking" size={24} />}
          {thinking ? 'Thinking…' : 'Help me think this through'}
        </button>
      </div>

      <div className="px-5 mt-5 flex flex-col gap-3">
        {result && (
          <>
            <div
              className="rounded-2xl p-4"
              style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-hairline)' }}
            >
              <span style={{ color: 'var(--color-pip-accent)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                Pattern is usually
              </span>
              <p style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.5, marginTop: 6 }}>
                {result.usually}
              </p>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: 'var(--color-warning-whisper)', border: '1px solid var(--color-warning)' }}
            >
              <span style={{ color: 'var(--color-warning-text)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                Watch for
              </span>
              <ul className="mt-2 pl-4 list-disc" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
                {result.watchFor.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{
                background: result.is911 ? 'var(--color-emergency-whisper)' : 'var(--color-surface-raised)',
                border: `1px solid ${result.is911 ? 'var(--color-emergency)' : 'var(--color-hairline)'}`,
              }}
            >
              <span
                style={{
                  color: result.is911 ? 'var(--color-emergency-text)' : 'var(--color-text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                }}
              >
                Call your provider or 911 if
              </span>
              <ul
                className="mt-2 pl-4 list-disc"
                style={{ color: result.is911 ? 'var(--color-emergency-text)' : 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}
              >
                {result.callIf.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              {result.is911 && (
                <a
                  href="tel:911"
                  className="mt-3 block w-full h-12 rounded-xl text-center"
                  style={{
                    background: 'var(--color-emergency)',
                    color: '#fff',
                    fontFamily: 'Manrope',
                    fontWeight: 800,
                    fontSize: 16,
                    lineHeight: '48px',
                  }}
                >
                  Call 911
                </a>
              )}
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'Manrope', fontSize: 11 }}>
              {result.citation}
            </p>
            <ComplianceDisclaimer />
          </>
        )}
      </div>
      <div className="h-24" />
    </div>
  );
}
