import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { usePip, newId } from '../../state/PipStore';
import { TextNoteCapture } from '../capture/TextNoteCapture';
import { PhotoNoteCapture } from '../capture/PhotoNoteCapture';
import { CheckInOverlay } from '../checkin/CheckInOverlay';
import { PipCheckmark } from '../ui/PipCheckmark';
import { PipListeningOrb } from '../ui/PipListeningOrb';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LISTENING_LOTTIE = 'https://lottie.host/a84a8724-2d7c-41d1-96f0-d64196a62488/CKm3BMhfkg.lottie';

type Capture = null | 'text' | 'photo';

const STUB_TRANSCRIPTS = [
  'kid had a fever of 101 last night, gave tylenol around 8pm.',
  'felt dizzy after standing up this morning, lasted about 30 seconds.',
  'mild headache behind the eyes, day 2 in a row.',
  'rash on right forearm, slightly itchy, no fever.',
];

function bandForNow(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  if (h < 21) return 'evening';
  return 'night';
}

interface Props {
  onOpenTranslator: () => void;
}

export function HomeScreen({ onOpenTranslator }: Props) {
  const { state, dispatch, activeProfile } = usePip();
  const [capture, setCapture] = useState<Capture>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [holding, setHolding] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showHelper, setShowHelper] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowDisclaimer(false), 5000);
    const t2 = setTimeout(() => setShowHelper(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startTs = useRef(0);
  const tickRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!state.disableCheckIn && state.lastCheckInDate !== today && state.onboardingComplete) {
      const t = setTimeout(() => setShowCheckIn(true), 1200);
      return () => clearTimeout(t);
    }
  }, [state.disableCheckIn, state.lastCheckInDate, today, state.onboardingComplete]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, []);

  const startRecord = async () => {
    setHolding(true);
    startTs.current = Date.now();
    tickRef.current = window.setInterval(() => setElapsed((Date.now() - startTs.current) / 1000), 100);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      recRef.current = mr;
      mr.start();
    } catch {
      /* visual-only fallback */
    }
  };

  const stopRecord = () => {
    if (!holding) return;
    setHolding(false);
    if (tickRef.current) window.clearInterval(tickRef.current);
    recRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setThinking(true);
    setTimeout(() => {
      const transcript = STUB_TRANSCRIPTS[Math.floor(Math.random() * STUB_TRANSCRIPTS.length)];
      if (state.activeProfileId) {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            id: newId(),
            profileId: state.activeProfileId,
            createdAt: Date.now(),
            type: 'voice',
            transcript,
            text: transcript,
            tags: ['voice'],
          },
        });
      }
      setThinking(false);
      setElapsed(0);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1600);
    }, 1200);
  };

  const greetName = activeProfile?.firstName ?? 'friend';

  return (
    <div
      className="pip-textured-bg relative w-full h-full overflow-x-hidden overflow-y-auto"
      style={{
        backgroundImage:
          'linear-gradient(-58deg, rgba(246,214,208,0.18) 35%, rgba(246,214,208,0) 68%), linear-gradient(122deg, rgba(249,223,213,0) 11%, rgba(249,223,213,0) 54%, rgba(246,215,205,0.4) 82%), linear-gradient(#F4F2E3, #F4F2E3)',
        paddingBottom: 96,
      }}
    >
      {/* Decorative blurred orbs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '40%',
          top: -100,
          width: 320,
          height: 320,
          borderRadius: 999,
          background: 'rgba(251,204,189,0.32)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: -60,
          top: 560,
          width: 260,
          height: 260,
          borderRadius: 999,
          background: 'rgba(247,214,199,0.30)',
          filter: 'blur(42px)',
          pointerEvents: 'none',
        }}
      />

      {/* Greeting row */}
      <header
        className="flex items-center justify-between relative"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 0px), 14px)',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
          height: 56,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 24, "SOFT" 30',
            fontWeight: 500,
            fontSize: 22,
            color: '#261F1A',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Hey <span style={{ fontStyle: 'italic' }}>{greetName}</span>
        </p>
        <button
          onClick={onOpenTranslator}
          aria-label="Open translator"
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            background: '#EFE7D2',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            overflow: 'hidden',
            boxShadow:
              '4px 4px 10px rgba(120,75,55,0.20), -3px -3px 8px rgba(255,250,235,0.7), inset 0 1px 0 rgba(255,250,235,0.55), inset 0 0 0 0.5px rgba(120,75,55,0.10)',
          }}
        >
          <img
            src="https://res.cloudinary.com/dwkaqrjll/image/upload/v1781030722/untitled_SD3_-_Remove_Background_2026-06-08_21-55-39_e3qkly.png"
            alt="Pip"
            style={{ width: '110%', height: '110%', objectFit: 'cover', display: 'block' }}
          />
        </button>
      </header>

      {/* Giant voice panel */}
      <section
        className="mt-1 relative"
        style={{
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 16px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 16px)',
        }}
      >
        <motion.button
          onMouseDown={startRecord}
          onTouchStart={startRecord}
          onMouseUp={stopRecord}
          onTouchEnd={stopRecord}
          onMouseLeave={() => holding && stopRecord()}
          disabled={thinking}
          whileTap={{ scale: 0.99 }}
          className="w-full text-left relative overflow-hidden"
          style={{
            display: 'block',
            width: '100%',
            minHeight: 'clamp(320px, 48vh, 440px)',
            border: 'none',
            borderRadius: 28,
            padding: 'clamp(22px, 4vw, 32px) clamp(18px, 4vw, 24px) clamp(20px, 3.5vw, 28px)',
            color: '#fff',
            backgroundImage:
              'radial-gradient(80% 60% at 30% 18%, rgba(255,220,200,0.55) 0%, rgba(255,220,200,0) 60%), radial-gradient(70% 70% at 78% 86%, rgba(120,40,28,0.45) 0%, rgba(120,40,28,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.10) 78%), radial-gradient(120% 100% at 50% 50%, #F39A7C 0%, #E07A5F 48%, #B1502D 100%)',
            boxShadow:
              '14px 18px 40px rgba(120,40,28,0.32), -10px -10px 28px rgba(255,245,235,0.55), 0 40px 80px -28px rgba(120,40,28,0.50), 0 2px 0 rgba(255,255,255,0.24) inset, 0 -28px 60px -28px rgba(80,20,12,0.42) inset, 0 0 0 0.5px rgba(120,40,28,0.18) inset',
            cursor: 'pointer',
          }}
        >
          {/* Specular highlight */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: -40,
              left: '8%',
              right: '8%',
              height: 140,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />
          {/* Inner vignette ring */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 32,
              boxShadow:
                'inset 0 0 0 0.5px rgba(255,255,255,0.18), inset 0 -120px 120px -60px rgba(80,20,12,0.35)',
              pointerEvents: 'none',
            }}
          />
          {/* Gradient grain */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 32,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: '220px 220px',
              opacity: 0.18,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
            }}
          />
          <div className="h-full flex flex-col items-center justify-center relative" style={{ gap: 18, zIndex: 1 }}>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.72)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {holding ? 'Listening' : thinking ? 'Saving' : celebrate ? 'Saved' : 'Hold to speak'}
            </p>
            {!holding && (
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontVariationSettings: '"opsz" 96, "SOFT" 50',
                  fontWeight: 400,
                  fontSize: 'clamp(36px, 10vw, 44px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.015em',
                  color: '#fff',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                What are you
                <br />
                <span style={{ fontStyle: 'italic' }}>noticing?</span>
              </h1>
            )}

            {/* Mic button with breathing rings */}
            <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
              {holding && (
                <>
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      right: '100%',
                      marginRight: 18,
                      width: 110,
                      height: 110,
                      pointerEvents: 'none',
                      mixBlendMode: 'screen',
                      opacity: 0.95,
                    }}
                  >
                    <DotLottieReact src={LISTENING_LOTTIE} autoplay loop />
                  </div>
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: '100%',
                      marginLeft: 18,
                      width: 110,
                      height: 110,
                      pointerEvents: 'none',
                      mixBlendMode: 'screen',
                      opacity: 0.95,
                      transform: 'scaleX(-1)',
                    }}
                  >
                    <DotLottieReact src={LISTENING_LOTTIE} autoplay loop />
                  </div>
                </>
              )}
              {!reduced && holding && (
                <>
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.7 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      border: '1.5px solid rgba(255,255,255,0.5)',
                    }}
                  />
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.3, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      border: '1.5px solid rgba(255,255,255,0.4)',
                    }}
                  />
                </>
              )}
              {holding ? (
                <PipListeningOrb size={96} />
              ) : (
                <motion.div
                  animate={reduced ? undefined : { scale: 1 }}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <svg width="34" height="44" viewBox="0 0 24 32" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="2" width="8" height="16" rx="4" fill="#fff" stroke="none" />
                    <path d="M4 14a8 8 0 0016 0" />
                    <path d="M12 22v6" />
                    <path d="M8 28h8" />
                  </svg>
                </motion.div>
              )}
            </div>

            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 13,
                color: 'rgba(255,255,255,0.72)',
                textAlign: 'center',
                margin: 0,
                opacity: holding || showHelper ? 1 : 0,
                maxHeight: holding || showHelper ? 24 : 0,
                overflow: 'hidden',
                transition: 'opacity 500ms ease, max-height 500ms ease',
              }}
            >
              {holding
                ? `${elapsed.toFixed(1)}s · release to save`
                : 'Hold and speak — up to two minutes.'}
            </p>

            {holding && !reduced && (
              <div className="flex items-end gap-1" style={{ height: 22, marginTop: 2 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [0.3, 1, 0.4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
                    style={{
                      width: 3,
                      height: 22,
                      background: 'rgba(255,255,255,0.85)',
                      borderRadius: 2,
                      transformOrigin: 'bottom',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.button>
      </section>

      {/* Pill row */}
      <section
        className="mt-4 flex items-center justify-center gap-2.5"
        style={{
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 16px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 16px)',
        }}
      >
        <PillButton
          onClick={() => setCapture('text')}
          icon={
            <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2.5 }}>
              <span style={{ width: 16, height: 2.5, background: '#E07A5F', borderRadius: 2 }} />
              <span style={{ width: 12, height: 2.5, background: '#E07A5F', borderRadius: 2 }} />
              <span style={{ width: 14, height: 2.5, background: '#E07A5F', borderRadius: 2 }} />
            </span>
          }
          title="Type a note"
          subtitle="Headaches, fatigue..."
        />
        <PillButton
          onClick={() => setCapture('photo')}
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="6" y="0" width="6" height="4" rx="2" fill="#E07A5F" />
              <rect x="0" y="3" width="18" height="14" rx="3" fill="#E07A5F" />
              <circle cx="9" cy="11" r="4" fill="#fff" />
              <circle cx="9" cy="11" r="2" fill="#E07A5F" />
            </svg>
          }
          title="Add a photo"
          subtitle="Rash, pill, paperwork..."
        />
      </section>

      <p
        className="px-6 text-center"
        style={{
          marginTop: 22,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 12',
          fontWeight: 400,
          fontSize: 12.5,
          lineHeight: 1.5,
          color: 'rgba(61,64,91,0.42)',
          opacity: showDisclaimer ? 1 : 0,
          maxHeight: showDisclaimer ? 60 : 0,
          marginBottom: showDisclaimer ? 0 : -22,
          overflow: 'hidden',
          transition: 'opacity 600ms ease, max-height 600ms ease, margin 600ms ease',
          pointerEvents: showDisclaimer ? 'auto' : 'none',
        }}
      >
        Pip helps you remember. For anything urgent, call your provider or 911.
      </p>

      <AnimatePresence>
        {capture === 'text' && <TextNoteCapture onClose={() => setCapture(null)} />}
        {capture === 'photo' && <PhotoNoteCapture onClose={() => setCapture(null)} />}
        {showCheckIn && (
          <CheckInOverlay
            band={bandForNow()}
            onClose={() => setShowCheckIn(false)}
            onDone={() => {
              dispatch({ type: 'MARK_CHECK_IN_DONE', payload: today });
              setShowCheckIn(false);
            }}
          />
        )}
        {celebrate && (
          <motion.div
            key="celebrate"
            className="pointer-events-none absolute inset-x-0 flex flex-col items-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ top: '38%' }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 999,
                padding: '14px 22px 14px 16px',
                border: '0.5px solid rgba(194,94,69,0.18)',
                boxShadow: '0 18px 36px -18px rgba(193,93,69,0.40)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <PipCheckmark size={32} strokeWidth={2.4} />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 18',
                  fontSize: 15.5,
                  color: '#3D405B',
                  letterSpacing: '-0.005em',
                }}
              >
                Resting it next to the others.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PillButton({
  onClick,
  icon,
  title,
  subtitle,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className="pip-pill group flex-1 flex items-center gap-2 active:scale-[0.97] transition-transform"
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#EFE7D2',
        border: 'none',
        borderRadius: 100,
        padding: '12px 16px',
        boxShadow:
          '5px 5px 12px rgba(120,75,55,0.20), -4px -4px 10px rgba(255,250,235,0.7), inset 0 1px 0 rgba(255,250,235,0.55), inset 0 0 0 0.5px rgba(120,75,55,0.10)',
        minWidth: 0,
        flex: '1 1 0',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <span
        aria-hidden
        className="pip-pill__fill"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: 0,
          borderRadius: 100,
          backgroundImage: 'linear-gradient(to right, #F39A7C 0%, #E07A5F 55%, #C25E45 100%)',
          transition: 'width 0.5s ease',
          zIndex: -1,
        }}
      />
      <span className="shrink-0 flex items-center justify-center" style={{ width: 18, height: 18, position: 'relative' }}>
        {icon}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, minWidth: 0, position: 'relative' }}>
        <span
          className="pip-pill__title"
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 13.5,
            color: '#261F1A',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            transition: 'color 0.4s ease',
          }}
        >
          {title}
        </span>
        <span
          className="pip-pill__subtitle"
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: 10.5,
            color: 'rgba(102,56,41,0.6)',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.4s ease',
          }}
        >
          {subtitle}
        </span>
      </span>
    </button>
  );
}

function PipFace() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="18" fill="#F7E0D6" />
      <ellipse cx="8" cy="21.5" rx="4" ry="2.5" fill="#F2AD99" fillOpacity="0.55" />
      <ellipse cx="28" cy="21.5" rx="4" ry="2.5" fill="#F2AD99" fillOpacity="0.55" />
      <ellipse cx="11.5" cy="14" rx="2.5" ry="3" fill="#733826" />
      <ellipse cx="24.5" cy="14" rx="2.5" ry="3" fill="#733826" />
      <rect x="10" y="22" width="16" height="3" rx="1.5" fill="#733826" />
    </svg>
  );
}
