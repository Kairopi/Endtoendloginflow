import { useState } from 'react';
import { usePip } from '../../state/PipStore';
import { ComplianceDisclaimer } from '../pip/ComplianceDisclaimer';

interface Props {
  onBack: () => void;
}

export function AfterVisitReceipt({ onBack }: Props) {
  const { activeProfile } = usePip();
  const [visitDate, setVisitDate] = useState(new Date().toISOString().slice(0, 10));
  const [provider, setProvider] = useState('');
  const [said, setSaid] = useState('');
  const [meds, setMeds] = useState<string[]>([]);
  const [medDraft, setMedDraft] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [watchFor, setWatchFor] = useState<string[]>([]);
  const [wfDraft, setWfDraft] = useState('');

  const addChip = (val: string, list: string[], setter: (v: string[]) => void, clear: () => void) => {
    const v = val.trim();
    if (!v) return;
    setter([...list, v]);
    clear();
  };

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between p-4 print:hidden">
        <button onClick={onBack} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>
          ← Back
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 700 }}>After-Visit Receipt</span>
        <button onClick={() => window.print()} style={{ color: 'var(--color-brand)', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14 }}>
          PDF
        </button>
      </div>

      <div className="px-5 flex flex-col gap-3 print:hidden">
        <Field label="Visit date">
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full p-3 rounded-xl border outline-none"
            style={inputStyle}
          />
        </Field>
        <Field label="Provider (optional)">
          <input
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Dr. Smith"
            className="w-full p-3 rounded-xl border outline-none"
            style={inputStyle}
          />
        </Field>
        <Field label="What the doctor said">
          <textarea
            value={said}
            onChange={(e) => setSaid(e.target.value)}
            placeholder="diagnosis, explanation, next steps…"
            className="w-full p-3 rounded-xl border outline-none"
            style={{ ...inputStyle, minHeight: 100 }}
          />
        </Field>
        <Field label="Prescribed meds">
          <div className="flex gap-2">
            <input
              value={medDraft}
              onChange={(e) => setMedDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addChip(medDraft, meds, setMeds, () => setMedDraft(''))}
              placeholder="e.g. amoxicillin 500mg"
              className="flex-1 p-3 rounded-xl border outline-none"
              style={inputStyle}
            />
            <button
              onClick={() => addChip(medDraft, meds, setMeds, () => setMedDraft(''))}
              className="px-4 rounded-xl"
              style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {meds.map((m, i) => (
              <span key={i} className="px-3 py-1 rounded-full" style={chipStyle}>
                {m}
              </span>
            ))}
          </div>
        </Field>
        <Field label="Follow-up">
          <input
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="e.g. 2 weeks"
            className="w-full p-3 rounded-xl border outline-none"
            style={inputStyle}
          />
        </Field>
        <Field label="Watch for">
          <div className="flex gap-2">
            <input
              value={wfDraft}
              onChange={(e) => setWfDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addChip(wfDraft, watchFor, setWatchFor, () => setWfDraft(''))}
              placeholder="e.g. fever returning"
              className="flex-1 p-3 rounded-xl border outline-none"
              style={inputStyle}
            />
            <button
              onClick={() => addChip(wfDraft, watchFor, setWatchFor, () => setWfDraft(''))}
              className="px-4 rounded-xl"
              style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {watchFor.map((m, i) => (
              <span key={i} className="px-3 py-1 rounded-full" style={chipStyle}>
                {m}
              </span>
            ))}
          </div>
        </Field>
      </div>

      <div
        className="mx-4 mt-4 rounded-2xl p-5"
        style={{ background: '#fff', border: '1px solid var(--color-hairline)', color: '#1A1A1A' }}
      >
        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22 }}>After-Visit Summary</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: '#555', marginBottom: 12 }}>
          {activeProfile?.firstName} · {visitDate} {provider && `· ${provider}`}
        </p>

        <Sec title="What the doctor said">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, whiteSpace: 'pre-wrap' }}>{said || '—'}</p>
        </Sec>
        <Sec title="Prescribed">
          {meds.length === 0 ? <Dash /> : <ul className="pl-4 list-disc">{meds.map((m, i) => <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{m}</li>)}</ul>}
        </Sec>
        <Sec title="Follow-up">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{followUp || '—'}</p>
        </Sec>
        <Sec title="Watch for">
          {watchFor.length === 0 ? <Dash /> : <ul className="pl-4 list-disc">{watchFor.map((m, i) => <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{m}</li>)}</ul>}
        </Sec>

        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
          <ComplianceDisclaimer />
        </div>
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

const chipStyle: React.CSSProperties = {
  background: 'var(--color-pip-accent-soft)',
  color: 'var(--color-text-primary)',
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  fontWeight: 600,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: '#555', marginBottom: 4 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function Dash() {
  return <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: '#666' }}>—</p>;
}
