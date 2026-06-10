import { useState } from 'react';
import { motion } from 'motion/react';
import { usePip } from '../../state/PipStore';
import { synthesizeBrief } from '../../data/briefSynthesis';
import { SpeakButton } from '../ui/SpeakButton';

interface Props {
  onBack: () => void;
}

export function PreVisitBrief({ onBack }: Props) {
  const { state, activeProfile } = usePip();
  const [questions, setQuestions] = useState<string[]>([
    'What might be causing this?',
    'Are there tests we should run?',
    'When should I follow up?',
  ]);

  const notes = state.notes.filter((n) => n.profileId === state.activeProfileId);
  const meds = state.medications.filter((m) => m.profileId === state.activeProfileId);
  const allergies = state.allergies.filter((a) => a.profileId === state.activeProfileId);
  const conditions = state.conditions.filter((c) => c.profileId === state.activeProfileId);

  const synth = synthesizeBrief(notes, activeProfile ?? null, meds, 14);

  const photoNotes = notes.filter((n) => n.type === 'photo' && n.mediaUrls?.length).slice(0, 6);
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#E8E2CC', paddingBottom: 48 }}>
      <header
        className="px-5 flex items-center justify-between"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 18px)', paddingBottom: 12 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 active:opacity-70"
          style={{ color: 'rgba(61,64,91,0.7)', fontFamily: 'Inter', fontWeight: 500, fontSize: 14 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 12L5 8l5-4" />
          </svg>
          Back
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 active:opacity-70"
          style={{ color: '#3D405B', fontFamily: 'Inter', fontWeight: 600, fontSize: 13 }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9V2h10v7M3 13h10v-4H3zM5 6h6" />
          </svg>
          Print · PDF
        </button>
      </header>

      <div className="px-5">
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 10.5,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(61,64,91,0.5)',
          }}
        >
          For your appointment
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontWeight: 400,
            fontSize: 'clamp(34px, 8.5vw, 42px)',
            lineHeight: 0.98,
            letterSpacing: '-0.028em',
            color: '#3D405B',
            margin: '6px 0 0',
          }}
        >
          A one-page <span style={{ fontStyle: 'italic' }}>brief</span>.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontSize: 14.5,
            color: 'rgba(61,64,91,0.6)',
            margin: '10px 0 0',
            lineHeight: 1.4,
            maxWidth: 320,
          }}
        >
          Hand this to your doctor. Everything that matters, nothing that doesn't.
        </p>
      </div>

      {/* Paper sheet */}
      <motion.article
        id="brief-printable"
        initial={{ opacity: 0, y: 20, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-4 mt-6 relative"
        style={{
          background: '#FBF8EC',
          borderRadius: 4,
          padding: '32px 28px 28px',
          color: '#1A1A1A',
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px -24px rgba(61,64,91,0.35), 0 2px 0 rgba(0,0,0,0.04)',
          transformOrigin: 'top center',
        }}
      >
        {/* paper edge tear */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              'repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px)',
          }}
        />

        {/* Letterhead */}
        <div className="flex items-start justify-between" style={{ borderBottom: '0.5px solid rgba(26,26,26,0.18)', paddingBottom: 16 }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontVariationSettings: '"opsz" 144',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 28,
                color: '#3D405B',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              Pip
            </p>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 9.5,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(26,26,26,0.5)',
                marginTop: 4,
              }}
            >
              Pre-Visit Brief
            </p>
          </div>
          <div className="text-right">
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontVariationSettings: '"opsz" 36',
                fontWeight: 400,
                fontSize: 17,
                color: '#1A1A1A',
                lineHeight: 1.1,
              }}
            >
              {activeProfile?.firstName ?? '—'}
            </p>
            <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 11, color: 'rgba(26,26,26,0.55)', marginTop: 2 }}>
              {activeProfile?.dob ?? 'DOB —'} · {activeProfile?.sex ?? '—'}
            </p>
            <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 10.5, color: 'rgba(26,26,26,0.45)', marginTop: 6 }}>
              {today}
            </p>
          </div>
        </div>

        <Section title="History of present illness" subtitle={`last ${synth.windowDays} days`}>
          {synth.symptoms.length === 0 ? (
            <p style={paperItalic}>No tagged symptoms in this window.</p>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontVariationSettings: '"opsz" 24',
                fontWeight: 400,
                fontSize: 15.5,
                lineHeight: 1.55,
                color: '#1A1A1A',
                letterSpacing: '-0.005em',
              }}
            >
              {synth.hpi}
            </p>
          )}
          {synth.hpi && synth.symptoms.length > 0 && (
            <div className="mt-3">
              <SpeakButton text={synth.hpi} label="Read this to me" />
            </div>
          )}
        </Section>

        {synth.symptoms.length > 0 && (
          <Section title="By system">
            <ul className="flex flex-col gap-1.5">
              {synth.symptoms.slice(0, 5).map((s) => (
                <li
                  key={s.clinical}
                  className="flex items-baseline justify-between gap-3"
                  style={paperBody}
                >
                  <span>
                    <strong style={{ fontWeight: 600 }}>{s.clinical}</strong>
                    <span style={{ color: 'rgba(26,26,26,0.5)' }}> · {s.system}</span>
                  </span>
                  <span style={{ ...paperMeta, marginTop: 0, whiteSpace: 'nowrap' }}>
                    {s.episodes}× · {s.firstSeen === s.lastSeen ? s.firstSeen : `${s.firstSeen}–${s.lastSeen}`}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {synth.vitalsNoted.length > 0 && (
          <Section title="Vitals noted">
            <div className="flex flex-wrap gap-1.5">
              {synth.vitalsNoted.map((v) => (
                <span
                  key={v}
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: 11.5,
                    color: '#1A1A1A',
                    background: 'rgba(26,26,26,0.06)',
                    padding: '4px 9px',
                    borderRadius: 4,
                    letterSpacing: '0.005em',
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </Section>
        )}

        {photoNotes.length > 0 && (
          <Section title="Photos">
            <div className="grid grid-cols-3 gap-2">
              {photoNotes.flatMap((n) =>
                (n.mediaUrls ?? []).slice(0, 1).map((src, i) => (
                  <div key={`${n.id}-${i}`}>
                    <img src={src} alt="" className="w-full aspect-square object-cover" style={{ borderRadius: 2 }} />
                    <p style={paperMeta}>{new Date(n.createdAt).toLocaleDateString()}</p>
                  </div>
                )),
              )}
            </div>
          </Section>
        )}

        <Section title="Current medications">
          {meds.length === 0 ? (
            <p style={paperItalic}>None recorded.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {meds.map((m) => (
                <li key={m.id} style={paperBody} className="flex items-baseline gap-2">
                  <span aria-hidden style={{ width: 3, height: 3, borderRadius: 999, background: '#1A1A1A', display: 'inline-block', marginBottom: 3 }} />
                  <span>
                    <strong style={{ fontWeight: 600 }}>{m.name}</strong>
                    {m.dose && ` — ${m.dose}`}
                    {m.frequency && `, ${m.frequency}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Allergies">
          {allergies.length === 0 ? (
            <p style={paperItalic}>None recorded.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {allergies.map((a) => (
                <li
                  key={a.id}
                  style={{
                    ...paperBody,
                    color: a.severity === 'severe' ? '#A8362A' : '#1A1A1A',
                    fontWeight: a.severity === 'severe' ? 600 : 400,
                  }}
                >
                  {a.severity === 'severe' && <span style={{ marginRight: 6 }}>▲</span>}
                  {a.allergen}
                  {a.reaction && <span style={{ fontStyle: 'italic', fontFamily: "var(--font-serif)", color: 'rgba(26,26,26,0.6)' }}> — {a.reaction}</span>}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Conditions">
          {conditions.length === 0 ? (
            <p style={paperItalic}>None recorded.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {conditions.map((c) => (
                <li key={c.id} style={paperBody}>
                  {c.label}
                  {c.sinceDate && <span style={{ color: 'rgba(26,26,26,0.5)' }}> · since {c.sinceDate}</span>}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Questions to ask">
          <div className="flex flex-col gap-2">
            {questions.map((q, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: 'italic',
                    fontVariationSettings: '"opsz" 36',
                    fontSize: 17,
                    color: 'rgba(26,26,26,0.4)',
                  }}
                >
                  Q
                </span>
                <input
                  value={q}
                  onChange={(e) => setQuestions((qs) => qs.map((x, j) => (j === i ? e.target.value : x)))}
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontVariationSettings: '"opsz" 24',
                    fontSize: 16,
                    color: '#1A1A1A',
                    borderBottom: '0.5px dashed rgba(26,26,26,0.25)',
                    paddingBottom: 4,
                  }}
                />
              </div>
            ))}
          </div>
        </Section>

        <div style={{ marginTop: 24, paddingTop: 14, borderTop: '0.5px solid rgba(26,26,26,0.18)' }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 11',
              fontSize: 10.5,
              lineHeight: 1.55,
              color: 'rgba(26,26,26,0.5)',
            }}
          >
            Pip is a journal kept by the patient. It is not a diagnosis or medical advice. For anything urgent, call your provider or 911.
          </p>
          <p
            style={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(26,26,26,0.35)',
              marginTop: 10,
            }}
          >
            pip.health · page 1 of 1
          </p>
        </div>
      </motion.article>
    </div>
  );
}

const paperHeading: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontVariationSettings: '"opsz" 36',
  fontWeight: 400,
  fontSize: 17,
  color: '#1A1A1A',
  letterSpacing: '-0.01em',
};
const paperBody: React.CSSProperties = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 13.5,
  lineHeight: 1.55,
  color: '#1A1A1A',
};
const paperItalic: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: 'italic',
  fontVariationSettings: '"opsz" 14',
  fontSize: 13,
  color: 'rgba(26,26,26,0.5)',
};
const paperMeta: React.CSSProperties = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 10.5,
  color: 'rgba(26,26,26,0.5)',
  marginTop: 3,
};

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 20 }}>
      <div className="flex items-baseline justify-between mb-3">
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 9.5,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(26,26,26,0.55)',
          }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 11',
              fontSize: 11,
              color: 'rgba(26,26,26,0.4)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
