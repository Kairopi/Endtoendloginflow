import { useEffect, useRef, useState } from 'react';
import { usePip, newId } from '../../state/PipStore';
import { extract } from '../../lib/nlp';
import { PipMascot } from '../pip/PipMascot';

const STUB_TRANSCRIPTS = [
  'kid had a fever of 101 last night, gave tylenol around 8pm.',
  'felt dizzy after standing up this morning, lasted about 30 seconds.',
  'mild headache behind the eyes, day 2 in a row.',
  'rash on right forearm, slightly itchy, no fever.',
];

interface Props {
  onClose: () => void;
}

export function VoiceNoteCapture({ onClose }: Props) {
  const { state, dispatch } = usePip();
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTsRef = useRef(0);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tickWave = () => {
    const a = analyserRef.current;
    if (!a) return;
    const buf = new Uint8Array(a.frequencyBinCount);
    a.getByteFrequencyData(buf);
    const avg = buf.reduce((s, v) => s + v, 0) / buf.length;
    setWaveform((prev) => [...prev.slice(-39), Math.min(1, avg / 128)]);
    setElapsed((Date.now() - startTsRef.current) / 1000);
    rafRef.current = requestAnimationFrame(tickWave);
  };

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      analyserRef.current = analyser;
      const mr = new MediaRecorder(stream);
      recRef.current = mr;
      mr.start();
      setRecording(true);
      startTsRef.current = Date.now();
      tickWave();
      // 120s cap (R3 #3)
      setTimeout(() => stop(), 120_000);
    } catch {
      // fallback: still allow a "fake" recording
      setRecording(true);
      startTsRef.current = Date.now();
      const fake = setInterval(() => {
        setWaveform((p) => [...p.slice(-39), Math.random() * 0.8 + 0.2]);
        setElapsed((Date.now() - startTsRef.current) / 1000);
      }, 80);
      (recRef as any).fakeInterval = fake;
    }
  };

  const stop = () => {
    if (!recording) return;
    setRecording(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if ((recRef as any).fakeInterval) clearInterval((recRef as any).fakeInterval);
    recRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());

    setThinking(true);
    // Stub transcription
    setTimeout(() => {
      const t = STUB_TRANSCRIPTS[Math.floor(Math.random() * STUB_TRANSCRIPTS.length)];
      setTranscript(t);
      setThinking(false);
    }, 1400);
  };

  const save = () => {
    if (!transcript || !state.activeProfileId) return;
    const ex = extract(transcript);
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: newId(),
        profileId: state.activeProfileId,
        createdAt: Date.now(),
        type: 'voice',
        transcript,
        text: transcript,
        tags: ex.tags,
        bodySystem: ex.bodySystem,
        severity: ex.severity,
      },
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'var(--color-surface-raised)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>
          Cancel
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontWeight: 600 }}>Voice Note</span>
        <span className="w-12" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {!recording && !transcript && !thinking && (
          <>
            <PipMascot state="hello" size={140} />
            <p className="text-center" style={{ color: 'var(--color-text-primary)', fontFamily: "var(--font-sans)", fontSize: 18 }}>
              Press and hold to capture what's going on.
            </p>
          </>
        )}
        {recording && (
          <>
            <PipMascot state="listening" size={140} />
            <div className="flex items-end gap-1 h-20">
              {waveform.length === 0 && <span style={{ color: 'var(--color-text-secondary)' }}>listening…</span>}
              {waveform.map((v, i) => (
                <div
                  key={i}
                  style={{ width: 4, height: Math.max(4, v * 70), background: 'var(--color-brand)', borderRadius: 2, transition: 'height 80ms' }}
                />
              ))}
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: "var(--font-sans)", fontSize: 14 }}>
              {elapsed.toFixed(1)}s / 120s
            </p>
          </>
        )}
        {thinking && (
          <>
            <PipMascot state="thinking" size={140} />
            <p style={{ color: 'var(--color-text-secondary)' }}>turning that into a note…</p>
          </>
        )}
        {transcript && !thinking && (
          <>
            <PipMascot state="celebrating" size={140} />
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full rounded-2xl p-4 border outline-none"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-hairline)', color: 'var(--color-text-primary)', minHeight: 120, fontFamily: "var(--font-sans)", fontSize: 15 }}
            />
          </>
        )}
      </div>

      <div className="p-6">
        {!recording && !transcript && !thinking && (
          <button
            onMouseDown={start}
            onTouchStart={start}
            onMouseUp={stop}
            onTouchEnd={stop}
            className="w-[88px] h-[88px] rounded-full mx-auto flex items-center justify-center active:scale-95 transition"
            style={{ background: 'var(--color-brand)', color: '#fff' }}
            aria-label="Hold to record voice note"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="2" width="6" height="12" rx="3" fill="#fff" />
              <path d="M5 11a7 7 0 0014 0" />
              <path d="M12 18v3M9 21h6" />
            </svg>
          </button>
        )}
        {recording && (
          <button
            onClick={stop}
            className="w-full h-14 rounded-2xl active:scale-[0.98] transition"
            style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}
          >
            Stop & transcribe
          </button>
        )}
        {transcript && !thinking && (
          <button
            onClick={save}
            className="w-full h-14 rounded-2xl active:scale-[0.98] transition"
            style={{ background: 'var(--color-brand)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700 }}
          >
            Save note
          </button>
        )}
      </div>
    </div>
  );
}
