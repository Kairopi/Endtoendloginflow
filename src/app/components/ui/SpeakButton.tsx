import { useEffect, useRef, useState } from 'react';

export function SpeakButton({ text, label = 'Read aloud' }: { text: string; label?: string }) {
  const [speaking, setSpeaking] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  if (!supported) return null;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.pitch = 1;
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    uttRef.current = utt;
    setSpeaking(true);
    synth.speak(utt);
  };

  return (
    <button
      onClick={toggle}
      aria-label={speaking ? 'Stop reading' : label}
      className="inline-flex items-center gap-1.5 active:scale-[0.97] transition"
      style={{
        background: speaking ? '#3D405B' : 'transparent',
        color: speaking ? '#fff' : '#C25E45',
        border: speaking ? 'none' : '0.5px solid rgba(194,94,69,0.4)',
        borderRadius: 999,
        padding: '5px 11px',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 11.5,
        letterSpacing: '0.04em',
        cursor: 'pointer',
      }}
    >
      {speaking ? (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
          <rect x="2" y="2" width="3" height="8" rx="0.5" />
          <rect x="7" y="2" width="3" height="8" rx="0.5" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h2l3-2.5v9L5 9H3z" />
          <path d="M10 5a3 3 0 010 4" />
        </svg>
      )}
      {speaking ? 'Stop' : label}
    </button>
  );
}
