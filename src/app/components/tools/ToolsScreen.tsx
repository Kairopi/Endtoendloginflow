import { useMemo } from 'react';
import { motion } from 'motion/react';
import { usePip } from '../../state/PipStore';

interface Props {
  onNav: (k: 'triage' | 'translator' | 'brief' | 'receipt' | 'meds' | 'er') => void;
}

type ToolKey = Parameters<Props['onNav']>[0];

type Tone = 'amber' | 'slate' | 'coral' | 'sage';

interface LibItem {
  k: ToolKey;
  title: string;
  sub: string;
  tone: Tone;
  icon: JSX.Element;
  illustration?: JSX.Element;
}

const TONES: Record<Tone, { bg: string; stroke: string }> = {
  amber: { bg: '#F6E2BC', stroke: '#A8741A' },
  slate: { bg: '#D9E3EC', stroke: '#3F6E8A' },
  coral: { bg: '#F4C5C2', stroke: '#B0473A' },
  sage: { bg: '#D6E2D6', stroke: '#5E8E74' },
};

// Layered, warm ambient shadow — blends with cream canvas, not muddy grey.
const CARD_SHADOW = '0 2px 4px rgba(0,0,0,0.02), 0 12px 32px rgba(120,110,90,0.08)';
const CARD_INNER_HIGHLIGHT = 'inset 0 1px 0 rgba(255,255,255,0.7)';

/* — Custom icon set — hand-drawn character, paired with Fraunces. — */

// Folded letter with a wax-seal dot — feels editorial, not generic.
const ICON_BRIEF = (
  <>
    <path d="M5.5 3.5 H13.5 L18.5 8.5 V19 a1.5 1.5 0 0 1 -1.5 1.5 H6 a1.5 1.5 0 0 1 -1.5 -1.5 V5 a1.5 1.5 0 0 1 1.5 -1.5 z" />
    <path d="M13.5 3.5 V8.5 H18.5" />
    <path d="M8.5 12.5 H15" />
    <path d="M8.5 15.5 H13" />
    <circle cx="15.5" cy="17" r="1.1" />
  </>
);

// Two speech bubbles with a transformation arrow — "speak → understand".
const ICON_TRANSLATE = (
  <>
    <path d="M3.5 5.5 a1.8 1.8 0 0 1 1.8 -1.8 H10 a1.8 1.8 0 0 1 1.8 1.8 V9 a1.8 1.8 0 0 1 -1.8 1.8 H7.5 L5 12.5 V10.8 H5.3 a1.8 1.8 0 0 1 -1.8 -1.8 z" />
    <path d="M20.5 14.5 a1.8 1.8 0 0 0 -1.8 -1.8 H14 a1.8 1.8 0 0 0 -1.8 1.8 V18 a1.8 1.8 0 0 0 1.8 1.8 H16.5 L19 21.5 V19.8 H18.7 a1.8 1.8 0 0 0 1.8 -1.8 z" />
    <path d="M12.5 6.5 L15 8 L12.5 9.5" strokeOpacity="0.55" />
  </>
);

// Receipt with a torn perforated bottom edge — paper-craft feel.
const ICON_RECEIPT = (
  <>
    <path d="M5.5 3.5 H18.5 V18 L17 16.5 L15.5 18 L14 16.5 L12.5 18 L11 16.5 L9.5 18 L8 16.5 L6.5 18 L5.5 16.5 Z" />
    <path d="M8.5 8 H15.5" />
    <path d="M8.5 11 H14" />
    <path d="M8.5 13.5 H12" />
  </>
);

// Capsule pill with shine + division line — pharmaceutical with warmth.
const ICON_CABINET = (
  <>
    <path d="M9.5 4 a5.5 5.5 0 0 1 5.5 5.5 V14.5 a5.5 5.5 0 0 1 -11 0 V9.5 a5.5 5.5 0 0 1 5.5 -5.5 z" transform="rotate(-35 9.5 12)" />
    <path d="M5.8 13.4 L13.2 6" transform="rotate(-35 9.5 12)" strokeOpacity="0.55" />
    <circle cx="6.8" cy="7.5" r="0.5" transform="rotate(-35 9.5 12)" fill="currentColor" stroke="none" />
  </>
);

// Soft shield with a steady cross — protective, not alarming.
const ICON_ER = (
  <>
    <path d="M12 3.5 L19 6 V12 C19 16.5 15.8 19.2 12 20.5 C8.2 19.2 5 16.5 5 12 V6 Z" />
    <path d="M12 9.5 V14.5" />
    <path d="M9.5 12 H14.5" />
  </>
);

// Hero — abstract eye/lens, the "second pair of eyes" metaphor.
const ICON_TRIAGE = (
  <>
    <path d="M3 12 C5.5 7.5 8.5 5.5 12 5.5 C15.5 5.5 18.5 7.5 21 12 C18.5 16.5 15.5 18.5 12 18.5 C8.5 18.5 5.5 16.5 3 12 Z" />
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="11" cy="11" r="0.6" fill="currentColor" stroke="none" />
  </>
);

/* — Editorial hand-drawn illustrations — emotional anchors, not icons. — */

// TRIAGE — a watchful, hand-drawn eye. The second pair of eyes, literally.
const ILLUST_TRIAGE = (
  <svg width="104" height="104" viewBox="0 0 100 100" fill="none" aria-hidden>
    <path d="M 28 30 L 25 20" stroke="#3D405B" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 40 26 L 38 16" stroke="#3D405B" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 52 25 L 53 15" stroke="#3D405B" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 64 26 L 66 16" stroke="#3D405B" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 75 30 L 79 21" stroke="#3D405B" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 12 51 C 26 31, 74 29, 88 50 C 75 72, 26 70, 12 51 Z" stroke="#3D405B" strokeWidth="1.8" strokeLinejoin="round" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="13.5" fill="#F4C5C2" />
    <circle cx="50" cy="50" r="13.5" stroke="#3D405B" strokeWidth="1.5" />
    <circle cx="48" cy="48" r="4.2" fill="#3D405B" />
    <circle cx="45" cy="45" r="1.4" fill="#FBE4C7" />
    <path d="M 19 43 L 23 39" stroke="#3D405B" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
    <path d="M 22 47 L 26 43" stroke="#3D405B" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
    <path d="M 25 51 L 29 47" stroke="#3D405B" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
    <circle cx="86" cy="76" r="2.2" fill="#E07A5F" />
    <path d="M 80 76 Q 86 82, 92 76" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.55" />
  </svg>
);

// CABINET — a still-life of a bottle and a capsule. Quiet, domestic, recognizable.
const ILLUST_CABINET = (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden>
    <ellipse cx="30" cy="58" rx="20" ry="1.8" fill="#3D405B" opacity="0.1" />
    <path d="M 21 13 H 39 V 22 H 21 Z" fill="#F6E2BC" stroke="#3D405B" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M 24 9 H 36 V 13 H 24 Z" fill="#F6E2BC" stroke="#3D405B" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M 19 22 H 41 V 51 a 4 4 0 0 1 -4 4 H 23 a 4 4 0 0 1 -4 -4 Z" fill="#FFFFFF" stroke="#3D405B" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 23 32 H 37 V 43 H 23 Z" stroke="#3D405B" strokeWidth="0.9" opacity="0.45" />
    <path d="M 26 36 H 34" stroke="#3D405B" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
    <path d="M 26 39.5 H 32" stroke="#3D405B" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
    <path d="M 38 25 L 40 27" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <path d="M 38 29 L 40 31" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <path d="M 38 33 L 40 35" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <g transform="translate(42 52) rotate(-26)">
      <rect x="-13" y="-4.5" width="26" height="9" rx="4.5" fill="#FFFFFF" stroke="#3D405B" strokeWidth="1.4" />
      <rect x="-13" y="-4.5" width="13" height="9" rx="4.5" fill="#F4C5C2" stroke="#3D405B" strokeWidth="1.4" />
      <path d="M 0 -4.5 V 4.5" stroke="#3D405B" strokeWidth="1.3" />
      <circle cx="-9" cy="-1.5" r="0.7" fill="#FBE4C7" opacity="0.7" />
    </g>
  </svg>
);

// ER — a single steady candle. A light kept on, in case you need it.
const ILLUST_ER = (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden>
    <ellipse cx="32" cy="58" rx="15" ry="1.6" fill="#3D405B" opacity="0.12" />
    <path d="M 17 50 H 47 L 44.5 56 H 19.5 Z" fill="#F4C5C2" stroke="#3D405B" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M 19 52 H 45" stroke="#3D405B" strokeWidth="0.8" opacity="0.35" />
    <path d="M 24 23 V 50 H 40 V 23 Z" fill="#FFFFFF" stroke="#3D405B" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 24 30 Q 21.6 34, 24 38" stroke="#3D405B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
    <path d="M 40 28 L 38 31" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <path d="M 40 34 L 38 37" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <path d="M 40 40 L 38 43" stroke="#3D405B" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <path d="M 32 16 V 23" stroke="#3D405B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 32 5 C 26 11, 26 19, 32 19 C 38 19, 38 11, 32 5 Z" fill="#E07A5F" stroke="#3D405B" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M 32 9 C 29 13, 29 17, 32 17 C 35 17, 35 13, 32 9 Z" fill="#FBE4C7" opacity="0.85" />
    <path d="M 13 13 L 18 11" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    <path d="M 51 13 L 46 11" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    <path d="M 12 21 L 17 20" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M 52 21 L 47 20" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export function ToolsScreen({ onNav }: Props) {
  const { state, activeProfile } = usePip();

  const meds = useMemo(
    () => state.medications.filter((m) => m.profileId === state.activeProfileId),
    [state.medications, state.activeProfileId],
  );
  const profileNotes = useMemo(
    () => state.notes.filter((n) => n.profileId === state.activeProfileId),
    [state.notes, state.activeProfileId],
  );

  const medsMissingPhoto = meds.filter((m) => !m.photoUrl).length;

  // Data-aware subtitles — Pip remembers things for you.
  const items = useMemo<{ brief: LibItem; translate: LibItem; receipt: LibItem; meds: LibItem; er: LibItem }>(() => {
    const now = Date.now();
    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    const notesLast14 = profileNotes.filter((n) => n.createdAt >= fourteenDaysAgo).length;
    const translatorCount = profileNotes.filter((n) => n.type === 'translator').length;
    const notesLast30 = profileNotes.filter((n) => n.createdAt >= thirtyDaysAgo).length;

    // ER readiness — emergency contact, blood type, at least one allergy, at least one condition
    const erReady = [
      !!activeProfile?.emergencyContact?.phone,
      !!activeProfile?.bloodType,
      state.allergies.some((a) => a.profileId === state.activeProfileId),
      state.conditions.some((c) => c.profileId === state.activeProfileId),
    ];
    const erMissing = erReady.filter((x) => !x).length;

    return {
      brief: {
        k: 'brief',
        title: 'Pre-visit brief',
        sub:
          notesLast14 === 0
            ? 'A one-pager for the doctor.'
            : `${notesLast14} ${notesLast14 === 1 ? 'note' : 'notes'} ready to summarize.`,
        tone: 'amber',
        icon: ICON_BRIEF,
      },
      translate: {
        k: 'translator',
        title: 'Translate',
        sub:
          translatorCount === 0
            ? 'Doctor-speak, decoded.'
            : `${translatorCount} ${translatorCount === 1 ? 'term' : 'terms'} decoded so far.`,
        tone: 'slate',
        icon: ICON_TRANSLATE,
      },
      receipt: {
        k: 'receipt',
        title: 'After-visit notes',
        sub: notesLast30 === 0 ? 'Before you forget.' : `${notesLast30} captured this month.`,
        tone: 'sage',
        icon: ICON_RECEIPT,
      },
      meds: {
        k: 'meds',
        title: 'Medicine cabinet',
        sub:
          meds.length === 0
            ? 'Recognized by photo.'
            : medsMissingPhoto === 0
              ? `${meds.length} ${meds.length === 1 ? 'medication' : 'medications'} · all photographed.`
              : `${meds.length} ${meds.length === 1 ? 'medication' : 'medications'} · ${medsMissingPhoto} need ${medsMissingPhoto === 1 ? 'a photo' : 'photos'}.`,
        tone: 'amber',
        icon: ICON_CABINET,
        illustration: ILLUST_CABINET,
      },
      er: {
        k: 'er',
        title: 'ER card',
        sub:
          erMissing === 0 ? 'Ready for an EMT.' : `${erMissing} ${erMissing === 1 ? 'detail' : 'details'} still to complete.`,
        tone: 'coral',
        icon: ICON_ER,
        illustration: ILLUST_ER,
      },
    };
  }, [profileNotes, meds, medsMissingPhoto, activeProfile, state.allergies, state.conditions, state.activeProfileId]);

  const whisper: { text: string; cta: string; onTap: () => void } | null =
    medsMissingPhoto > 0
      ? {
          text: `${medsMissingPhoto} ${medsMissingPhoto === 1 ? 'medication is' : 'medications are'} still missing a photo.`,
          cta: 'Add now',
          onTap: () => onNav('meds'),
        }
      : null;

  return (
    <div
      className="pip-textured-bg w-full h-full overflow-y-auto pip-no-scrollbar"
      style={{
        background: '#F5F2E4',
        backgroundAttachment: 'local',
        paddingBottom: 'calc(max(env(safe-area-inset-bottom, 0px), 8px) + 140px)',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      <style>{`
        .pip-no-scrollbar::-webkit-scrollbar { width: 0; height: 0; }
        .pip-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* HERO — Triage */}
      <section
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 0px), 22px)',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
        }}
      >
        <TriageHero onTap={() => onNav('triage')} />
      </section>

      {/* CONTEXTUAL WHISPER */}
      {whisper && (
        <motion.button
          onClick={whisper.onTap}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-left flex items-center"
          style={{
            margin: '14px 20px 0',
            padding: '11px 14px',
            background: 'rgba(224,122,95,0.07)',
            border: '0.5px solid rgba(224,122,95,0.2)',
            borderRadius: 14,
            cursor: 'pointer',
            width: 'calc(100% - 40px)',
          }}
        >
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: 6, background: '#E07A5F', marginRight: 10, flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 18',
              fontSize: 13.5,
              color: 'rgba(61,64,91,0.78)',
              flex: 1,
              lineHeight: 1.4,
            }}
          >
            {whisper.text}
          </span>
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#E07A5F',
              marginLeft: 8,
              flexShrink: 0,
            }}
          >
            {whisper.cta}
          </span>
        </motion.button>
      )}

      {/* LIBRARY — bento rhythm */}
      <section
        style={{
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
          marginTop: 22,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingLeft: 4 }}>
          <span style={{ height: 1, width: 18, background: 'rgba(61,64,91,0.25)', display: 'inline-block' }} />
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(61,64,91,0.55)',
            }}
          >
            The library
          </span>
        </div>

        <div style={{ marginBottom: 10 }}>
          <LibraryWideCard item={items.brief} onTap={() => onNav(items.brief.k)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <LibraryWideCard item={items.translate} onTap={() => onNav(items.translate.k)} />
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 10 }}>
          <LibrarySquareCard item={items.receipt} onTap={() => onNav(items.receipt.k)} />
          <LibrarySquareCard item={items.meds} onTap={() => onNav(items.meds.k)} />
        </div>
        <LibraryWideCard item={items.er} onTap={() => onNav(items.er.k)} />
      </section>

      <p
        style={{
          margin: '32px 22px 0',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 14',
          fontSize: 12.5,
          color: 'rgba(61,64,91,0.72)',
          lineHeight: 1.5,
          textAlign: 'center',
          letterSpacing: '-0.005em',
        }}
      >
        A steady second pair of eyes — not a replacement for one.
      </p>
    </div>
  );
}

function TriageHero({ onTap }: { onTap: () => void }) {
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.99 }}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="text-left relative overflow-hidden w-full"
      style={{
        background: 'linear-gradient(135deg, #FBE4C7 0%, #FDF0DA 55%, #F8E8E5 100%)',
        borderRadius: 28,
        padding: '24px 24px 26px',
        border: '0.5px solid rgba(176,71,58,0.08)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02), 0 18px 40px rgba(176,71,58,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
        cursor: 'pointer',
        minHeight: 158,
      }}
    >
      <div className="flex items-start" style={{ gap: 12 }}>
        <div style={{ flex: 1, paddingRight: 4 }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontVariationSettings: '"opsz" 96, "SOFT" 40',
              fontWeight: 400,
              fontSize: 26,
              color: '#3D405B',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Should I worry<span style={{ fontStyle: 'italic', color: '#B0473A' }}>?</span>
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 18',
              fontSize: 14,
              color: 'rgba(61,64,91,0.62)',
              margin: '8px 0 20px',
              lineHeight: 1.45,
              letterSpacing: '-0.005em',
              maxWidth: '92%',
            }}
          >
            A two-minute check, so you know what to do next.
          </p>
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.06em',
              color: '#B0473A',
              borderBottom: '1px solid rgba(176,71,58,0.4)',
              paddingBottom: 1,
            }}
          >
            Start the check →
          </span>
        </div>

        <div className="relative shrink-0 flex items-center justify-center" style={{ width: 108, height: 108 }}>
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.25, 0.5] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 6,
              borderRadius: 999,
              background: 'radial-gradient(circle, rgba(244,197,194,0.55) 0%, rgba(244,197,194,0) 70%)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'relative' }}
          >
            {ILLUST_TRIAGE}
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}

function LibraryWideCard({ item, onTap }: { item: LibItem; onTap: () => void }) {
  const t = TONES[item.tone];
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.992 }}
      whileHover={{ scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="text-left flex items-center w-full"
      style={{
        background: '#FFFFFF',
        borderRadius: 20,
        padding: '14px 18px 14px 14px',
        border: '0.5px solid rgba(61,64,91,0.08)',
        boxShadow: `${CARD_SHADOW}, ${CARD_INNER_HIGHLIGHT}`,
        cursor: 'pointer',
      }}
    >
      {item.illustration ? (
        <motion.div
          className="flex items-center justify-center shrink-0"
          style={{ width: 56, height: 56, marginRight: 12 }}
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {item.illustration}
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center shrink-0"
          style={{ width: 46, height: 46, borderRadius: 999, background: t.bg, marginRight: 14 }}
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.stroke} strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {item.icon}
          </svg>
        </motion.div>
      )}
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 24, "SOFT" 30',
            fontWeight: 500,
            fontSize: 17,
            color: '#3D405B',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            margin: 0,
          }}
        >
          {item.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontSize: 13,
            color: 'rgba(61,64,91,0.58)',
            margin: '2px 0 0',
            lineHeight: 1.35,
            letterSpacing: '-0.005em',
          }}
        >
          {item.sub}
        </p>
      </div>
    </motion.button>
  );
}

function LibrarySquareCard({ item, onTap }: { item: LibItem; onTap: () => void }) {
  const t = TONES[item.tone];
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.99 }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="text-center flex flex-col items-center w-full"
      style={{
        background: '#FFFFFF',
        borderRadius: 20,
        padding: '20px 16px 22px',
        border: '0.5px solid rgba(61,64,91,0.08)',
        boxShadow: `${CARD_SHADOW}, ${CARD_INNER_HIGHLIGHT}`,
        cursor: 'pointer',
        minHeight: 140,
      }}
    >
      {item.illustration ? (
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 60, height: 60, marginBottom: 8 }}
        >
          {item.illustration}
        </div>
      ) : (
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 44, height: 44, borderRadius: 999, background: t.bg, marginBottom: 12 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.stroke} strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {item.icon}
          </svg>
        </div>
      )}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontVariationSettings: '"opsz" 24, "SOFT" 30',
          fontWeight: 500,
          fontSize: 16,
          color: '#3D405B',
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          margin: 0,
          textAlign: 'center',
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 14',
          fontSize: 11.5,
          color: 'rgba(61,64,91,0.58)',
          margin: '3px 0 0',
          lineHeight: 1.35,
          letterSpacing: '-0.005em',
          textAlign: 'center',
        }}
      >
        {item.sub}
      </p>
    </motion.button>
  );
}
