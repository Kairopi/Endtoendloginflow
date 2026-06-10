import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { usePip, newId } from '../../state/PipStore';
import { TRANSLATIONS, TranslationEntry } from '../../data/translatorData';
import { PipMascot } from '../pip/PipMascot';
import { OCRCameraOverlay } from '../capture/OCRCameraOverlay';

interface Props {
  onBack: () => void;
}

interface Result {
  matches: TranslationEntry[];
  unknown: boolean;
  input: string;
}

const SAMPLE = 'BP 140/90, prescribed metformin 500mg twice daily';

export function TranslatorScreen({ onBack }: Props) {
  const { state, dispatch } = usePip();
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const reduced = useReducedMotion();

  const run = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    if (text) setInput(text);
    setThinking(true);
    setResult(null);
    setTimeout(() => {
      const matches = TRANSLATIONS.filter((t) => t.match.test(value));
      const res: Result = { matches, unknown: matches.length === 0, input: value };
      setResult(res);
      setThinking(false);
      dispatch({ type: 'INCREMENT_TRANSLATOR' });
      if (state.activeProfileId && matches.length > 0) {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            id: newId(),
            profileId: state.activeProfileId,
            createdAt: Date.now(),
            type: 'translator',
            text: `Translated: ${matches.map((m) => m.term).join(', ')}`,
            tags: ['translator', ...matches.map((m) => m.term.split(/[\s/]/)[0].toLowerCase())],
          },
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#F5F2E4', paddingBottom: 48 }}>
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
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(61,64,91,0.5)',
          }}
        >
          Unlimited
        </span>
      </header>

      <div className="px-6 mt-2">
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
          The Translator
        </p>
        <h1
          style={{
            fontFamily: 'Fraunces',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontWeight: 400,
            fontSize: 'clamp(38px, 9.2vw, 48px)',
            lineHeight: 0.96,
            letterSpacing: '-0.028em',
            color: '#3D405B',
            margin: '6px 0 0',
          }}
        >
          Doctor-speak,
          <br />
          <span style={{ fontStyle: 'italic', color: '#C25E45' }}>decoded</span>.
        </h1>
        <p
          style={{
            fontFamily: 'Fraunces',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontWeight: 400,
            fontSize: 15,
            color: 'rgba(61,64,91,0.6)',
            margin: '14px 0 0',
            lineHeight: 1.4,
            maxWidth: 320,
          }}
        >
          Paste a lab value, a prescription, a discharge note — anything that left you guessing.
        </p>
      </div>

      <div className="px-5 mt-7">
        <div
          className="relative"
          style={{
            background: '#FBF8EC',
            borderRadius: 22,
            border: '0.5px solid rgba(61,64,91,0.12)',
            padding: 18,
            boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 28px -16px rgba(61,64,91,0.18)',
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE}
            className="w-full bg-transparent outline-none resize-none"
            style={{
              minHeight: 110,
              fontFamily: 'Fraunces',
              fontVariationSettings: '"opsz" 18',
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.45,
              color: '#3D405B',
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => run(SAMPLE)}
                className="active:opacity-70"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 13,
                  color: 'rgba(61,64,91,0.5)',
                }}
              >
                Try an example
              </button>
              <button className="active:opacity-70 cursor-pointer flex items-center gap-1.5"
                onClick={() => setShowCamera(true)}
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 13,
                  color: 'rgba(61,64,91,0.5)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 9a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
                Scan Handout
              </button>
            </div>
            <button
              onClick={() => {
                const sample = "The doctor said I have acute suppurative otitis media and prescribed Amoxicillin 400mg BID x10 days.";
                setInput(sample);
                run(sample);
              }}
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 12.5,
                color: 'rgba(61,64,91,0.55)',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: 3,
              }}
            >
              try a sample
            </button>
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 11,
                color: 'rgba(61,64,91,0.4)',
              }}
            >
              {input.length} / 1000
            </span>
          </div>
        </div>

        <button
          onClick={() => run()}
          disabled={!input.trim() || thinking}
          className="w-full mt-3 active:scale-[0.99] transition disabled:opacity-40"
          style={{
            height: 54,
            borderRadius: 16,
            background: '#3D405B',
            color: '#fff',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 14.5,
            letterSpacing: '-0.005em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {thinking ? (
            <>
              <motion.span
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                style={{ width: 14, height: 14, borderRadius: 999, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', display: 'inline-block' }}
              />
              Reading carefully
            </>
          ) : (
            <>
              Translate
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </>
          )}
        </button>

      </div>

      <div className="px-5 mt-7">
        <AnimatePresence mode="wait">
          {thinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center py-4"
            >
              <PipMascot state="thinking" size={80} />
              <p
                style={{
                  marginTop: 10,
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 14',
                  fontSize: 14,
                  color: 'rgba(61,64,91,0.55)',
                }}
              >
                Pip is looking that up…
              </p>
            </motion.div>
          )}

          {/* ... existing code down here ... */}


          {result && result.unknown && (
            <motion.div
              key="unknown"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#FBF8EC',
                borderRadius: 22,
                border: '0.5px solid rgba(61,64,91,0.12)',
                padding: 22,
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 10.5,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(61,64,91,0.5)',
                }}
              >
                Not confident
              </p>
              <p
                style={{
                  fontFamily: 'Fraunces',
                  fontVariationSettings: '"opsz" 36',
                  fontSize: 22,
                  lineHeight: 1.15,
                  color: '#3D405B',
                  margin: '8px 0 6px',
                  letterSpacing: '-0.015em',
                }}
              >
                <span style={{ fontStyle: 'italic' }}>Pip couldn't read this one cleanly.</span>
              </p>
              <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: 'rgba(61,64,91,0.7)' }}>
                Try simpler terms, or ask your provider directly.
              </p>
            </motion.div>
          )}

          {result && result.matches.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4"
            >
              {result.matches.map((m, idx) => (
                <motion.article
                  key={m.term}
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                  style={{
                    background: '#FBF8EC',
                    borderRadius: 24,
                    border: '0.5px solid rgba(61,64,91,0.12)',
                    padding: '24px 22px',
                    boxShadow: '0 16px 36px -22px rgba(61,64,91,0.22)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: 'linear-gradient(90deg, #C25E45 0%, #E07A5F 60%, #F4A48A 100%)',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: '#C25E45',
                    }}
                  >
                    {m.term}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Fraunces',
                      fontVariationSettings: '"opsz" 48, "SOFT" 30',
                      fontWeight: 400,
                      fontSize: 22,
                      lineHeight: 1.22,
                      letterSpacing: '-0.018em',
                      color: '#3D405B',
                      margin: '8px 0 0',
                    }}
                  >
                    {m.plain}
                  </p>

                  <div className="mt-5" style={{ borderTop: '0.5px dashed rgba(61,64,91,0.18)', paddingTop: 14 }}>
                    <p
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        color: 'rgba(61,64,91,0.5)',
                      }}
                    >
                      Watch for
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {m.watchFor.map((w) => (
                        <li
                          key={w}
                          className="flex items-start gap-2.5"
                          style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: 1.45, color: '#3D405B' }}
                        >
                          <span
                            aria-hidden
                            style={{
                              marginTop: 7,
                              width: 4,
                              height: 4,
                              borderRadius: 999,
                              background: '#E07A5F',
                              flexShrink: 0,
                            }}
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'Fraunces',
                      fontStyle: 'italic',
                      fontVariationSettings: '"opsz" 11',
                      fontSize: 11.5,
                      color: 'rgba(61,64,91,0.45)',
                    }}
                  >
                    Source — MedlinePlus Connect
                  </p>
                </motion.article>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="px-2"
                style={{
                  fontFamily: 'Fraunces',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 12',
                  fontSize: 12.5,
                  lineHeight: 1.55,
                  color: 'rgba(61,64,91,0.45)',
                  textAlign: 'center',
                }}
              >
                Pip explains, never diagnoses. For anything urgent, call your provider or 911.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {showCamera && (
        <OCRCameraOverlay 
          onClose={() => setShowCamera(false)} 
          onCapture={(text) => {
            setShowCamera(false);
            setInput(text);
            run(text);
          }} 
        />
      )}
    </div>
  );
}
