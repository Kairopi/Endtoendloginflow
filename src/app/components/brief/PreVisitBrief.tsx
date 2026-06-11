import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePip, type Note } from '../../state/PipStore';
import { synthesizeBrief, type SynthesisResult } from '../../data/briefSynthesis';
import { SpeakButton } from '../ui/SpeakButton';

interface Props {
  onBack: () => void;
}

// Editorial headline. The story in one sentence.
function buildHeadline(synth: SynthesisResult): string {
  const ss = synth.symptoms;
  if (ss.length === 0) return `A quiet ${synth.windowDays} days. Nothing flagged.`;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const top = ss[0];
  if (top.episodes >= 3 && ss.length === 1) {
    return `${cap(top.clinical)} on ${top.episodes} of the last ${synth.windowDays} days.`;
  }
  if (ss.length >= 3) {
    return `Three patterns over ${synth.windowDays} days: ${top.clinical}, ${ss[1].clinical}, ${ss[2].clinical}.`;
  }
  if (ss.length === 2) {
    return `Two patterns over ${synth.windowDays} days: ${top.clinical}, ${ss[1].clinical}.`;
  }
  return `${cap(top.clinical)}, ${top.episodes} ${top.episodes === 1 ? 'episode' : 'episodes'} in ${synth.windowDays} days.`;
}

// Bucket symptom occurrences by day for a sparkline.
function dailyCounts(notes: Note[], clinicalName: string, days: number): number[] {
  const buckets = new Array<number>(days).fill(0);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startMs = todayStart - (days - 1) * 24 * 60 * 60 * 1000;
  const lc = clinicalName.toLowerCase();
  for (const n of notes) {
    if (n.createdAt < startMs) continue;
    const d = new Date(n.createdAt);
    const dayMs = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const idx = Math.round((dayMs - startMs) / (24 * 60 * 60 * 1000));
    if (idx < 0 || idx >= days) continue;
    const hay = `${(n.tags ?? []).join(' ')} ${n.text ?? ''} ${n.transcript ?? ''}`.toLowerCase();
    if (
      hay.includes(lc) ||
      (lc === 'pruritus' && hay.includes('itch')) ||
      (lc === 'emesis' && hay.includes('vomit')) ||
      (lc === 'cutaneous eruption' && hay.includes('rash'))
    ) {
      buckets[idx]++;
    }
  }
  return buckets;
}

function Sparkline({ data, baseDelay = 0 }: { data: number[]; baseDelay?: number }) {
  const max = Math.max(1, ...data);
  return (
    <div className="flex items-end" style={{ height: 18, gap: 1.5 }}>
      {data.map((v, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: baseDelay + i * 0.022, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 3,
            height: Math.max(2, (v / max) * 18),
            background: v === 0 ? 'rgba(26,26,26,0.18)' : '#1A1A1A',
            opacity: v === 0 ? 1 : 0.72,
            transformOrigin: 'bottom',
            display: 'inline-block',
            borderRadius: 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function PreVisitBrief({ onBack }: Props) {
  const { state, activeProfile } = usePip();
  const [doctorName, setDoctorName] = useState('');
  const [questions, setQuestions] = useState<string[]>([
    'What might be causing this?',
    'Are there tests we should run?',
    'When should I follow up?',
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const notes = useMemo(
    () => state.notes.filter((n) => n.profileId === state.activeProfileId),
    [state.notes, state.activeProfileId],
  );
  const meds = useMemo(
    () => state.medications.filter((m) => m.profileId === state.activeProfileId),
    [state.medications, state.activeProfileId],
  );
  const allergies = useMemo(
    () => state.allergies.filter((a) => a.profileId === state.activeProfileId),
    [state.allergies, state.activeProfileId],
  );
  const conditions = useMemo(
    () => state.conditions.filter((c) => c.profileId === state.activeProfileId),
    [state.conditions, state.activeProfileId],
  );

  const synth = useMemo(
    () => synthesizeBrief(notes, activeProfile ?? null, meds, 14),
    [notes, activeProfile, meds],
  );

  const headline = useMemo(() => buildHeadline(synth), [synth]);
  const photoNotes = useMemo(
    () => notes.filter((n) => n.type === 'photo' && n.mediaUrls?.length).slice(0, 4),
    [notes],
  );
  const today = useMemo(
    () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    [],
  );
  const stampDate = useMemo(
    () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
    [],
  );
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const onShare = async () => {
    const lines: string[] = [];
    lines.push(`Pre-Visit Brief — ${activeProfile?.firstName ?? '—'}`);
    lines.push(today);
    lines.push('');
    lines.push(headline);
    lines.push('');
    if (synth.hpi) {
      lines.push('History of Present Illness');
      lines.push(synth.hpi);
      lines.push('');
    }
    if (meds.length) {
      lines.push('Medications');
      meds.forEach((m) =>
        lines.push(`• ${m.name}${m.dose ? `, ${m.dose}` : ''}${m.frequency ? `, ${m.frequency}` : ''}`),
      );
      lines.push('');
    }
    if (allergies.length) {
      lines.push('Allergies');
      allergies.forEach((a) =>
        lines.push(`• ${a.allergen}${a.reaction ? `, ${a.reaction}` : ''} (${a.severity})`),
      );
      lines.push('');
    }
    if (conditions.length) {
      lines.push('Conditions');
      conditions.forEach((c) =>
        lines.push(`• ${c.label}${c.sinceDate ? ` (since ${c.sinceDate})` : ''}`),
      );
      lines.push('');
    }
    lines.push('Generated by Pip');

    const text = lines.join('\n');
    try {
      if (typeof navigator !== 'undefined' && (navigator as Navigator).share) {
        await (navigator as Navigator).share({ title: 'Pre-Visit Brief', text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setToast('Copied — paste anywhere.');
      }
    } catch {
      // user cancelled native share — silent
    }
  };

  const sections: Array<{ key: string; node: React.ReactNode }> = [];

  sections.push({
    key: 'hpi',
    node: (
      <Section title="History of present illness" subtitle={`last ${synth.windowDays} days`}>
        {synth.symptoms.length === 0 ? (
          <p style={paperItalic}>A quiet fortnight. No tagged symptoms in this window.</p>
        ) : (
          <>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
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
            <div className="mt-3">
              <SpeakButton text={synth.hpi} label="Read this to me" />
            </div>
          </>
        )}
      </Section>
    ),
  });

  if (synth.symptoms.length > 0) {
    sections.push({
      key: 'bysystem',
      node: (
        <Section title="By system" subtitle="14-day trend">
          <ul className="flex flex-col" style={{ gap: 12 }}>
            {synth.symptoms.slice(0, 5).map((s, i) => {
              const data = dailyCounts(notes, s.clinical, 14);
              return (
                <li key={s.clinical} className="flex items-center justify-between" style={{ gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ ...paperBody, margin: 0 }}>
                      <strong style={{ fontWeight: 600 }}>{s.clinical}</strong>
                      <span style={{ color: 'rgba(26,26,26,0.5)' }}> · {s.system}</span>
                    </p>
                    <p style={{ ...paperMeta, marginTop: 1 }}>
                      {s.episodes}× · {s.firstSeen === s.lastSeen ? s.firstSeen : `${s.firstSeen}–${s.lastSeen}`}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <Sparkline data={data} baseDelay={0.45 + i * 0.06} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      ),
    });
  }

  if (synth.vitalsNoted.length > 0) {
    sections.push({
      key: 'vitals',
      node: (
        <Section title="Vitals noted">
          <div className="flex flex-wrap" style={{ gap: 6 }}>
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
      ),
    });
  }

  if (photoNotes.length > 0) {
    sections.push({
      key: 'photos',
      node: (
        <Section title="Photo plates">
          <div className="grid grid-cols-2" style={{ gap: 10 }}>
            {photoNotes.flatMap((n) =>
              (n.mediaUrls ?? []).slice(0, 1).map((src, i) => (
                <figure key={`${n.id}-${i}`} style={{ margin: 0 }}>
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      border: '0.5px solid rgba(26,26,26,0.18)',
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full"
                      style={{ aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <figcaption
                    style={{
                      ...paperMeta,
                      marginTop: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 6,
                    }}
                  >
                    <span>
                      {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    {n.bodySystem && (
                      <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{n.bodySystem}</span>
                    )}
                  </figcaption>
                </figure>
              )),
            )}
          </div>
        </Section>
      ),
    });
  }

  sections.push({
    key: 'meds',
    node: (
      <Section title="Current medications">
        {meds.length === 0 ? (
          <p style={paperItalic}>Nothing.</p>
        ) : (
          <ul className="flex flex-col" style={{ gap: 6 }}>
            {meds.map((m) => (
              <li key={m.id} className="flex items-baseline gap-2" style={paperBody}>
                <span
                  aria-hidden
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 999,
                    background: '#1A1A1A',
                    display: 'inline-block',
                    marginBottom: 3,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ fontWeight: 600 }}>{m.name}</strong>
                  {m.dose && `, ${m.dose}`}
                  {m.frequency && `, ${m.frequency}`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    ),
  });

  sections.push({
    key: 'allergies',
    node: (
      <Section title="Allergies">
        {allergies.length === 0 ? (
          <p style={paperItalic}>Nothing.</p>
        ) : (
          <ul className="flex flex-col" style={{ gap: 6 }}>
            {allergies.map((a) => {
              const isSevere = a.severity === 'severe';
              return (
                <li
                  key={a.id}
                  style={{
                    ...paperBody,
                    color: isSevere ? '#A8362A' : '#1A1A1A',
                    fontWeight: isSevere ? 600 : 400,
                    borderLeft: isSevere ? '2px solid #B0473A' : 'none',
                    paddingLeft: isSevere ? 8 : 0,
                  }}
                >
                  {isSevere && <span style={{ marginRight: 6 }}>▲</span>}
                  {a.allergen}
                  {a.reaction && (
                    <span
                      style={{
                        fontStyle: 'italic',
                        fontFamily: 'var(--font-serif)',
                        color: 'rgba(26,26,26,0.6)',
                      }}
                    >
                      {', '}
                      {a.reaction}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    ),
  });

  sections.push({
    key: 'conditions',
    node: (
      <Section title="Conditions">
        {conditions.length === 0 ? (
          <p style={paperItalic}>Nothing.</p>
        ) : (
          <ul className="flex flex-col" style={{ gap: 6 }}>
            {conditions.map((c) => (
              <li key={c.id} style={paperBody}>
                {c.label}
                {c.sinceDate && <span style={{ color: 'rgba(26,26,26,0.5)' }}> · since {c.sinceDate}</span>}
              </li>
            ))}
          </ul>
        )}
      </Section>
    ),
  });

  sections.push({
    key: 'questions',
    node: (
      <Section title="Questions to ask">
        <div className="flex flex-col" style={{ gap: 10 }}>
          {questions.map((q, i) => (
            <div key={i} className="flex items-baseline" style={{ gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 36',
                  fontSize: 17,
                  color: 'rgba(168,116,26,0.85)',
                  fontWeight: 500,
                  flexShrink: 0,
                  letterSpacing: '-0.01em',
                  minWidth: 18,
                }}
              >
                {i + 1}.
              </span>
              <input
                value={q}
                onChange={(e) => setQuestions((qs) => qs.map((x, j) => (j === i ? e.target.value : x)))}
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontVariationSettings: '"opsz" 24',
                  fontSize: 15.5,
                  color: '#1A1A1A',
                  borderBottom: '0.5px dashed rgba(26,26,26,0.28)',
                  paddingBottom: 4,
                }}
              />
            </div>
          ))}
        </div>
      </Section>
    ),
  });

  return (
    <div
      className="w-full h-full overflow-y-auto pip-no-scrollbar"
      style={{ background: '#E8E2CC', paddingBottom: 130 }}
    >
      <style>{`
        .pip-no-scrollbar::-webkit-scrollbar { width: 0; height: 0; }
        .pip-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        @media print {
          .pip-no-print { display: none !important; }
          body, html { background: #FFFFFF !important; }
          #brief-printable { box-shadow: none !important; border: 0.5px solid rgba(0,0,0,0.12); }
        }
      `}</style>

      <header
        className="px-5 flex items-center pip-no-print"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 18px)', paddingBottom: 12 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 active:opacity-70"
          style={{ color: 'rgba(61,64,91,0.7)', fontFamily: 'Inter', fontWeight: 500, fontSize: 14 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M10 12L5 8l5-4" />
          </svg>
          Back
        </button>
      </header>

      <div className="px-5 pip-no-print">
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontWeight: 400,
            fontSize: 'clamp(34px, 8.5vw, 42px)',
            lineHeight: 0.98,
            letterSpacing: '-0.028em',
            color: '#3D405B',
            margin: 0,
          }}
        >
          A one-page <span style={{ fontStyle: 'italic' }}>brief</span>.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontSize: 14.5,
            color: 'rgba(61,64,91,0.6)',
            margin: '8px 0 0',
            lineHeight: 1.4,
          }}
        >
          For your doctor.
        </p>
      </div>

      {/* Paper sheet */}
      <motion.article
        id="brief-printable"
        initial={{ opacity: 0, y: 24, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-4 mt-6 relative"
        style={{
          background: '#FBF8EC',
          borderRadius: 4,
          padding: '36px 28px 28px',
          color: '#1A1A1A',
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.85) inset, 0 28px 60px -20px rgba(61,64,91,0.32), 0 2px 0 rgba(0,0,0,0.04)',
          transformOrigin: 'top center',
        }}
      >
        {/* perforated top edge */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              'repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.05) 6px, rgba(0,0,0,0.05) 7px)',
          }}
        />

        {/* Letterhead */}
        <div
          className="flex items-start justify-between relative"
          style={{ borderBottom: '0.5px solid rgba(26,26,26,0.18)', paddingBottom: 18 }}
        >
          <div style={{ flex: 1, paddingRight: 70 }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 44,
                color: '#3D405B',
                letterSpacing: '-0.035em',
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Pip
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 18',
                fontSize: 13,
                color: 'rgba(26,26,26,0.55)',
                marginTop: 2,
                letterSpacing: '-0.005em',
              }}
            >
              Pre-visit brief
            </p>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 18',
                  fontSize: 12.5,
                  color: 'rgba(26,26,26,0.5)',
                  flexShrink: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                For Dr.
              </span>
              <input
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="bg-transparent outline-none"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 24',
                  fontSize: 15,
                  color: '#1A1A1A',
                  borderBottom: '0.5px dashed rgba(26,26,26,0.28)',
                  width: 140,
                  paddingBottom: 2,
                }}
              />
            </div>
          </div>
          <div className="text-right" style={{ paddingLeft: 12 }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontVariationSettings: '"opsz" 36',
                fontWeight: 500,
                fontSize: 18,
                color: '#1A1A1A',
                lineHeight: 1.1,
                letterSpacing: '-0.012em',
                margin: 0,
              }}
            >
              {activeProfile?.firstName ?? '—'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 14',
                fontSize: 11.5,
                color: 'rgba(26,26,26,0.55)',
                marginTop: 3,
                letterSpacing: '-0.003em',
              }}
            >
              {activeProfile?.dob ?? 'DOB unset'} · {activeProfile?.sex ?? 'sex unset'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 11',
                fontSize: 10.5,
                color: 'rgba(26,26,26,0.42)',
                marginTop: 6,
                letterSpacing: '-0.003em',
              }}
            >
              {today}
            </p>
          </div>

          {/* Wax-seal stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -22 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            style={{
              position: 'absolute',
              right: -6,
              bottom: -10,
              width: 68,
              height: 68,
              pointerEvents: 'none',
            }}
          >
            <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
              <defs>
                <path id="stamp-arc-top" d="M 9 32 A 23 23 0 0 1 55 32" />
                <path id="stamp-arc-bottom" d="M 9 32 A 23 23 0 0 0 55 32" />
              </defs>
              <circle
                cx="32"
                cy="32"
                r="27"
                stroke="#B0473A"
                strokeWidth="1.4"
                opacity="0.55"
                fill="none"
                strokeDasharray="2 1.6"
              />
              <circle cx="32" cy="32" r="22" stroke="#B0473A" strokeWidth="1" opacity="0.5" fill="none" />
              <text fill="#B0473A" opacity="0.75" fontFamily="Inter" fontWeight="600" fontSize="4.6" letterSpacing="1.2">
                <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
                  PIP · CONFIDENTIAL
                </textPath>
              </text>
              <text fill="#B0473A" opacity="0.6" fontFamily="Inter" fontWeight="500" fontSize="4.2" letterSpacing="1.2">
                <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
                  FOR THE PATIENT
                </textPath>
              </text>
              <text
                x="32"
                y="35"
                textAnchor="middle"
                fill="#B0473A"
                opacity="0.82"
                fontFamily="var(--font-serif)"
                fontStyle="italic"
                fontSize="9"
                fontWeight="500"
              >
                {stampDate}
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Editorial headline with drop cap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 26 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontVariationSettings: '"opsz" 96, "SOFT" 50',
              fontStyle: synth.symptoms.length === 0 ? 'italic' : 'normal',
              fontWeight: 400,
              fontSize: 27,
              lineHeight: 1.15,
              letterSpacing: '-0.022em',
              color: '#1A1A1A',
              margin: 0,
            }}
          >
            <span
              style={{
                float: 'left',
                fontFamily: 'var(--font-serif)',
                fontVariationSettings: '"opsz" 144, "SOFT" 60',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 64,
                lineHeight: 0.86,
                color: '#B0473A',
                marginRight: 6,
                marginTop: 2,
                paddingRight: 2,
              }}
            >
              {headline.charAt(0)}
            </span>
            {headline.slice(1)}
          </p>
        </motion.div>

        {sections.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.node}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + sections.length * 0.08 + 0.1, duration: 0.5 }}
          style={{ marginTop: 24, paddingTop: 14, borderTop: '0.5px solid rgba(26,26,26,0.18)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 11',
              fontSize: 10.5,
              lineHeight: 1.55,
              color: 'rgba(26,26,26,0.5)',
            }}
          >
            Not medical advice. For emergencies, call 911.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 14',
              fontSize: 11,
              color: 'rgba(26,26,26,0.4)',
              marginTop: 6,
              letterSpacing: '-0.005em',
            }}
          >
            pip.health
          </p>
        </motion.div>
      </motion.article>

      {/* Floating action bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 pip-no-print"
        style={{
          bottom: 'max(env(safe-area-inset-bottom, 0px), 22px)',
          transform: 'translateX(-50%)',
          background: 'rgba(251,248,236,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 999,
          border: '0.5px solid rgba(61,64,91,0.12)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 36px rgba(120,110,90,0.16)',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          zIndex: 50,
        }}
      >
        <FloatingAction
          onClick={onShare}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4L8 1 5 4M8 1v9M3 9v4a1 1 0 001 1h8a1 1 0 001-1V9" />
            </svg>
          }
          label="Share"
        />
        <span style={{ width: 0.5, height: 18, background: 'rgba(61,64,91,0.15)' }} />
        <FloatingAction
          onClick={() => window.print()}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9V2h10v7M3 13h10v-4H3zM5 6h6" />
            </svg>
          }
          label="Print · PDF"
          primary
        />
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 pip-no-print"
            style={{
              bottom: 'calc(max(env(safe-area-inset-bottom, 0px), 22px) + 68px)',
              transform: 'translateX(-50%)',
              background: '#3D405B',
              color: '#FBF8EC',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 12,
              padding: '8px 14px',
              borderRadius: 999,
              boxShadow: '0 12px 28px rgba(61,64,91,0.28)',
              zIndex: 60,
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingAction({
  onClick,
  icon,
  label,
  primary = false,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="flex items-center"
      style={{
        gap: 6,
        padding: '8px 14px',
        borderRadius: 999,
        background: primary ? '#3D405B' : 'transparent',
        color: primary ? '#FBF8EC' : '#3D405B',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: '0.01em',
        cursor: 'pointer',
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

const paperBody: React.CSSProperties = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 13.5,
  lineHeight: 1.55,
  color: '#1A1A1A',
};
const paperItalic: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
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

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 26 }}>
      <div
        className="flex items-baseline justify-between"
        style={{
          marginBottom: 12,
          borderBottom: '0.5px solid rgba(26,26,26,0.18)',
          paddingBottom: 6,
          gap: 12,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 24, "SOFT" 40',
            fontWeight: 400,
            fontSize: 15,
            color: '#3D405B',
            letterSpacing: '-0.008em',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 11',
              fontSize: 11,
              color: 'rgba(26,26,26,0.42)',
              whiteSpace: 'nowrap',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
