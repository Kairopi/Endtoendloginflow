import { useMemo } from 'react';
import { motion } from 'motion/react';
import { usePip } from '../../state/PipStore';

interface Props {
  onNav: (k: 'triage' | 'translator' | 'brief' | 'receipt' | 'meds' | 'er') => void;
}

type ToolKey = Parameters<Props['onNav']>[0];

type Palette = 'warm' | 'cool' | 'coral';

interface ToolDef {
  k: ToolKey;
  title: string;
  sub: string;
  palette: Palette;
  icon: JSX.Element;
}

const PALETTES: Record<Palette, { bg: string; iconBg: string; iconColor: string }> = {
  warm: { bg: '#FBF1DC', iconBg: '#F2DCAE', iconColor: '#A8741A' },
  cool: { bg: '#EAF0F4', iconBg: '#C9DAE6', iconColor: '#3F6E8A' },
  coral: { bg: '#FBE6E5', iconBg: '#F4C5C2', iconColor: '#B0473A' },
};

const TRIAGE: ToolDef = {
  k: 'triage',
  title: 'Should I worry?',
  sub: 'A two-minute check, so you know what to do next.',
  palette: 'warm',
  icon: <><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /><path d="M12 8v4" /><path d="M12 16h.01" /></>,
};
const ER: ToolDef = {
  k: 'er',
  title: 'ER card',
  sub: 'Everything an EMT needs, on one screen.',
  palette: 'coral',
  icon: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
};
const BRIEF: ToolDef = {
  k: 'brief',
  title: 'Pre-visit brief',
  sub: 'A one-pager so the doctor sees what matters in 60 seconds.',
  palette: 'warm',
  icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8M10 9H8" /></>,
};
const TRANSLATOR: ToolDef = {
  k: 'translator',
  title: 'Translate',
  sub: 'Doctor-speak, decoded. Plain words, gently.',
  palette: 'cool',
  icon: <><path d="M5 8l4 8 4-8" /><path d="M14 16h7" /><path d="M14 12h7" /><path d="M14 8h7" /></>,
};
const RECEIPT: ToolDef = {
  k: 'receipt',
  title: 'After-visit notes',
  sub: 'What was said, written down before you forget.',
  palette: 'cool',
  icon: <><path d="M20 2v20l-3-2-3 2-3-2-3 2-3-2-3 2V2z" /><path d="M8 7h8M8 11h8M8 15h6" /></>,
};

export function ToolsScreen({ onNav }: Props) {
  const { state } = usePip();
  const meds = useMemo(
    () => state.medications.filter((m) => m.profileId === state.activeProfileId),
    [state.medications, state.activeProfileId],
  );
  const medPhotos = meds.map((m) => m.photoUrl).filter(Boolean) as string[];

  return (
    <div
      className="pip-textured-bg w-full h-full overflow-y-auto"
      style={{
        background: '#F5F2E4',
        paddingBottom: 'calc(max(env(safe-area-inset-bottom, 0px), 8px) + 110px)',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      <header
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 0px), 22px)',
          paddingBottom: 18,
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontWeight: 400,
            fontSize: 32,
            color: '#3D405B',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: 0,
          }}
        >
          When something happens, you'll <span style={{ fontStyle: 'italic' }}>know what to do</span>.
        </h1>
      </header>

      <ToolsSection eyebrow="Right now">
        <HeroToolCard tool={TRIAGE} onNav={onNav} />
        <ToolRow tool={ER} onNav={onNav} />
      </ToolsSection>

      <ToolsSection eyebrow="Around the visit">
        <ToolRow tool={BRIEF} onNav={onNav} />
        <ToolRow tool={TRANSLATOR} onNav={onNav} />
        <ToolRow tool={RECEIPT} onNav={onNav} />
      </ToolsSection>

      <ToolsSection eyebrow="Always with you">
        <MedicationsRow count={meds.length} photos={medPhotos} onOpen={() => onNav('meds')} />
      </ToolsSection>

      <p
        style={{
          margin: '22px 22px 0',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 14',
          fontSize: 12.5,
          color: 'rgba(61,64,91,0.4)',
          lineHeight: 1.5,
        }}
      >
        Pip is a steady second pair of eyes — not a replacement for one.
      </p>
    </div>
  );
}

function ToolsSection({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
        paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
        marginTop: 26,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
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
          {eyebrow}
        </span>
      </div>
      <div className="flex flex-col" style={{ gap: 10 }}>{children}</div>
    </section>
  );
}

function HeroToolCard({ tool, onNav }: { tool: ToolDef; onNav: (k: ToolKey) => void }) {
  const p = PALETTES[tool.palette];
  return (
    <motion.button
      onClick={() => onNav(tool.k)}
      whileTap={{ scale: 0.985 }}
      className="text-left relative overflow-hidden"
      style={{
        background: p.bg,
        borderRadius: 22,
        padding: '22px 22px 24px',
        border: '0.5px solid rgba(61,64,91,0.06)',
        boxShadow: '0 1px 2px rgba(61,64,91,0.04), 0 12px 28px rgba(61,64,91,0.06)',
        cursor: 'pointer',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: -60,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 200,
          background: `radial-gradient(circle, ${p.iconBg}99 0%, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: p.iconBg, borderRadius: 14, marginBottom: 14 }}>
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.45, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: 14, background: p.iconBg }}
        />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
          {tool.icon}
        </svg>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontVariationSettings: '"opsz" 48, "SOFT" 40',
          fontWeight: 400,
          fontSize: 28,
          color: '#3D405B',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          margin: 0,
        }}
      >
        {tool.title.replace('?', '')}
        <span style={{ fontStyle: 'italic', color: p.iconColor }}>?</span>
      </p>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 18',
          fontSize: 14.5,
          color: 'rgba(61,64,91,0.6)',
          margin: '8px 0 0',
          lineHeight: 1.45,
          letterSpacing: '-0.005em',
          maxWidth: '90%',
        }}
      >
        {tool.sub}
      </p>
    </motion.button>
  );
}

function ToolRow({ tool, onNav }: { tool: ToolDef; onNav: (k: ToolKey) => void }) {
  const p = PALETTES[tool.palette];
  return (
    <motion.button
      onClick={() => onNav(tool.k)}
      whileTap={{ scale: 0.99 }}
      className="flex items-center text-left"
      style={{
        background: p.bg,
        borderRadius: 18,
        padding: '14px 16px',
        border: '0.5px solid rgba(61,64,91,0.05)',
        cursor: 'pointer',
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: 42, height: 42, background: p.iconBg, borderRadius: 12, marginRight: 14 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {tool.icon}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 15,
            color: '#3D405B',
            letterSpacing: '-0.005em',
            margin: 0,
          }}
        >
          {tool.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontSize: 13,
            color: 'rgba(61,64,91,0.55)',
            margin: '2px 0 0',
            lineHeight: 1.4,
            letterSpacing: '-0.005em',
          }}
        >
          {tool.sub}
        </p>
      </div>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={p.iconColor} strokeWidth="1.9" strokeLinecap="round" aria-hidden>
        <path d="M5 12L10 8L5 4" />
      </svg>
    </motion.button>
  );
}

function MedicationsRow({ count, photos, onOpen }: { count: number; photos: string[]; onOpen: () => void }) {
  const p = PALETTES.warm;
  return (
    <motion.button
      onClick={onOpen}
      whileTap={{ scale: 0.99 }}
      className="text-left"
      style={{
        background: p.bg,
        borderRadius: 18,
        padding: '14px 16px',
        border: '0.5px solid rgba(61,64,91,0.05)',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <div className="flex items-center">
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 42, height: 42, background: p.iconBg, borderRadius: 12, marginRight: 14 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 20.5L20.5 10.5a4.95 4.95 0 00-7-7L3.5 13.5a4.95 4.95 0 007 7z" />
            <path d="M8.5 8.5l7 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 15,
              color: '#3D405B',
              letterSpacing: '-0.005em',
              margin: 0,
            }}
          >
            Medicine cabinet
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 14',
              fontSize: 13,
              color: 'rgba(61,64,91,0.55)',
              margin: '2px 0 0',
              lineHeight: 1.4,
              letterSpacing: '-0.005em',
            }}
          >
            {count === 0
              ? 'Snap a photo of each bottle — recognize them at a glance.'
              : `${count} ${count === 1 ? 'medication' : 'medications'} · tap to view`}
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={p.iconColor} strokeWidth="1.9" strokeLinecap="round" aria-hidden>
          <path d="M5 12L10 8L5 4" />
        </svg>
      </div>

      {photos.length > 0 && (
        <div className="flex" style={{ gap: 6, marginTop: 12, paddingLeft: 56 }}>
          {photos.slice(0, 5).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                objectFit: 'cover',
                border: '0.5px solid rgba(61,64,91,0.08)',
                boxShadow: '0 1px 2px rgba(61,64,91,0.06)',
              }}
            />
          ))}
          {photos.length > 5 && (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(168,116,26,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 18',
                fontSize: 13,
                color: p.iconColor,
              }}
            >
              +{photos.length - 5}
            </div>
          )}
        </div>
      )}
    </motion.button>
  );
}
