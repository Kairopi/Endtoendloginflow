import { useState } from 'react';
import { usePip, newId, Relation } from '../../state/PipStore';
import { StatusBar } from '../StatusBar';
import { PipMascot } from '../pip/PipMascot';
import { ComplianceDisclaimer } from '../pip/ComplianceDisclaimer';

type Path = 'solo' | 'caregiver' | 'family';

const GRADIENT = 'linear-gradient(180deg, #C95F45 0%, #E07A5F 50%, #F2CC8F 100%)';

function ProgressDots({ active, total }: { active: number; total: number }) {
  return (
    <div className="w-full flex gap-2 items-center justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: '#fff', opacity: i === active ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-14 rounded-2xl bg-white active:scale-[0.98] transition disabled:opacity-50"
      style={{ color: '#8b3d28', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16 }}
    >
      {children}
    </button>
  );
}

function ScreenShell({ progress, children }: { progress: number; children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: GRADIENT }}>
      <StatusBar light />
      <div className="flex-1 flex flex-col px-6 pt-6 pb-12 gap-6">
        <ProgressDots active={progress} total={4} />
        {children}
      </div>
    </div>
  );
}

// Step 1: Value/intro (Onboarding1)
function StepValue({ onNext }: { onNext: () => void }) {
  const Feature = ({ title, sub, icon }: { title: string; sub: string; icon: React.ReactNode }) => (
    <div className="w-full rounded-xl bg-white/25 border-l-[3px] border-white/75 flex items-center gap-3 py-3.5 px-3">
      <div className="w-9 h-9 rounded-[10px] bg-white/40 flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15 }}>{title}</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', fontSize: 11 }}>{sub}</p>
      </div>
    </div>
  );

  return (
    <ScreenShell progress={0}>
      <div className="flex flex-col items-center gap-5 flex-1">
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/45 bg-white/18">
          <span style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 10, letterSpacing: 1 }}>A HEALTH JOURNAL</span>
        </span>

        <div className="flex justify-center">
          <PipMascot state="hello" size={92} />
        </div>

        <p className="text-center" style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 30, lineHeight: 1.15 }}>
          Notice your body.<br />Remember the details.
        </p>

        <div className="w-full flex flex-col gap-2.5 px-1">
          <Feature
            title="Speak, snap, or type"
            sub="Whatever's fastest in the moment."
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                <rect x="6" y="2" width="6" height="11" rx="3" />
                <path d="M3 9a6 6 0 0012 0" />
                <path d="M9 15v2M6 17h6" />
              </svg>
            }
          />
          <Feature
            title="See what's repeating"
            sub="Pip groups the symptoms you mention often."
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 14L6 9L10 11.5L16 4" />
                <path d="M13 4H16V7" />
              </svg>
            }
          />
          <Feature
            title="Walk in prepared"
            sub="One-tap summary for your next appointment."
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                <rect x="3" y="2" width="12" height="14" rx="2" />
                <path d="M6 8h6M6 11h4" />
              </svg>
            }
          />
        </div>

        <div className="flex-1" />

        <PrimaryButton onClick={onNext}>Start</PrimaryButton>
        <ComplianceDisclaimer className="!text-[11px] text-center" />
        <style>{`p[role=disclaimer]{color:rgba(255,255,255,0.8);}`}</style>
      </div>
    </ScreenShell>
  );
}

// Step 2: Path picker (Onboarding2)
function StepPath({ value, onChange, onNext }: { value: Path | null; onChange: (p: Path) => void; onNext: () => void }) {
  const Choice = ({ id, title, sub }: { id: Path; title: string; sub: string }) => {
    const selected = value === id;
    return (
      <button
        onClick={() => onChange(id)}
        className="w-full rounded-2xl border bg-white/22 px-4 py-3.5 flex items-center justify-between text-left active:scale-[0.99] transition"
        style={{ borderColor: selected ? '#fff' : 'rgba(255,255,255,0.35)', background: selected ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)' }}
      >
        <div className="flex-1 pr-3">
          <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 16 }}>{title}</p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter', fontSize: 11 }}>{sub}</p>
        </div>
        <span
          className="w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center"
          style={{ borderColor: '#fff' }}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
        </span>
      </button>
    );
  };

  return (
    <ScreenShell progress={1}>
      <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 28 }}>Who is Pip for?</p>
      <div className="flex flex-col gap-3">
        <Choice id="solo" title="Just me" sub="Track your own health." />
        <Choice id="caregiver" title="Someone I care for" sub="A child, parent, or partner." />
        <Choice id="family" title="The whole family" sub="Up to six people, one app." />
      </div>
      <div className="flex-1" />
      <PrimaryButton onClick={onNext} disabled={!value}>Continue</PrimaryButton>
    </ScreenShell>
  );
}

function StepCaregiverDetail({
  relation,
  caredForName,
  setRelation,
  setCaredForName,
  onNext,
}: {
  relation: Relation;
  caredForName: string;
  setRelation: (r: Relation) => void;
  setCaredForName: (s: string) => void;
  onNext: () => void;
}) {
  const chips: Relation[] = ['child', 'parent', 'partner', 'other'];
  return (
    <ScreenShell progress={1}>
      <div className="flex flex-col gap-2">
        <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 26 }}>Who are you caring for?</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "var(--font-sans)", fontSize: 14 }}>You can change this later.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = relation === c;
          return (
            <button
              key={c}
              onClick={() => setRelation(c)}
              className="px-4 h-11 rounded-full border capitalize"
              style={{
                background: active ? '#fff' : 'rgba(255,255,255,0.22)',
                color: active ? '#8b3d28' : '#fff',
                borderColor: 'rgba(255,255,255,0.45)',
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
      <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, marginTop: 8 }}>Their first name</p>
      <input
        value={caredForName}
        onChange={(e) => setCaredForName(e.target.value)}
        placeholder="Their first name"
        className="w-full rounded-2xl px-5 py-4 border-[1.5px] outline-none placeholder-white/70"
        style={{ background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.45)', color: '#fff', fontFamily: "var(--font-sans)", fontSize: 16 }}
      />
      <div className="flex-1" />
      <PrimaryButton onClick={onNext} disabled={caredForName.trim().length < 1}>Continue</PrimaryButton>
    </ScreenShell>
  );
}

function StepName({
  firstName,
  setFirstName,
  path,
  onNext,
}: {
  firstName: string;
  setFirstName: (s: string) => void;
  path: Path;
  onNext: () => void;
}) {
  return (
    <ScreenShell progress={2}>
      <div className="flex justify-center">
        <PipMascot state="listening" size={84} />
      </div>
      <div className="flex flex-col gap-2">
        <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 26 }}>What should Pip call you?</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "var(--font-sans)", fontSize: 14 }}>First name only.</p>
      </div>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoFocus
        placeholder="Your first name"
        className="w-full rounded-2xl px-5 py-4 border-[1.5px] outline-none placeholder-white/70"
        style={{ background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.45)', color: '#fff', fontFamily: "var(--font-sans)", fontSize: 16 }}
      />
      {path === 'family' && (
        <div className="rounded-xl bg-white/15 border border-white/30 p-3">
          <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13 }}>Pip+ Family — $14.99/mo</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: 1.5 }}>
            You can add up to six profiles. Start with yourself now and add the rest after onboarding.
          </p>
        </div>
      )}
      <p className="text-center" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter', fontSize: 11 }}>
        You can change this later in Settings.
      </p>
      <div className="flex-1" />
      <PrimaryButton onClick={onNext} disabled={firstName.trim().length < 1}>Continue</PrimaryButton>
    </ScreenShell>
  );
}

function StepPermissions({ onFinish }: { onFinish: () => void }) {
  const { state, dispatch } = usePip();
  const grant = async (kind: 'mic' | 'camera') => {
    try {
      const constraints: MediaStreamConstraints = kind === 'mic' ? { audio: true } : { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach((t) => t.stop());
      dispatch({ type: 'SET_PERMISSION', payload: { kind, granted: true } });
    } catch {
      dispatch({ type: 'SET_PERMISSION', payload: { kind, granted: false } });
    }
  };
  const PermRow = ({ kind, title, sub, icon }: { kind: 'mic' | 'camera'; title: string; sub: string; icon: React.ReactNode }) => {
    const granted = state.permissions[kind];
    return (
      <div className="w-full h-16 rounded-xl flex items-center gap-3 px-4 border" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}>
        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">{icon}</div>
        <div className="flex-1">
          <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>{title}</p>
          <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontSize: 13 }}>{sub}</p>
        </div>
        <button
          onClick={() => grant(kind)}
          className="px-3 h-8 rounded-full"
          style={{ background: granted ? 'rgba(129,178,154,0.9)' : 'rgba(255,255,255,0.25)', color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13 }}
        >
          {granted ? 'Granted' : 'Allow'}
        </button>
      </div>
    );
  };

  return (
    <ScreenShell progress={3}>
      <div className="text-center flex flex-col gap-3">
        <p style={{ color: '#fff', fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24 }}>Two quick permissions</p>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5 }}>Skip either — you can grant them later.</p>
      </div>
      <div className="flex flex-col gap-3">
        <PermRow
          kind="mic"
          title="Microphone"
          sub="So you can speak notes."
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <rect x="7" y="2" width="6" height="11" rx="3" />
              <path d="M3 10a7 7 0 0014 0" />
              <path d="M10 17v2M7 19h6" />
            </svg>
          }
        />
        <PermRow
          kind="camera"
          title="Camera"
          sub="For photos of symptoms or paperwork."
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7a2 2 0 012-2h2l1-1.5h6L16 5h0a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
              <circle cx="10" cy="11" r="3" />
            </svg>
          }
        />
      </div>
      <div className="flex-1" />
      <button onClick={onFinish} className="w-full text-center" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15 }}>
        Skip for now
      </button>
      <PrimaryButton onClick={onFinish}>Open Pip</PrimaryButton>
    </ScreenShell>
  );
}

export function OnboardingFlow() {
  const { dispatch } = usePip();
  const [step, setStep] = useState<'value' | 'path' | 'caregiver' | 'name' | 'perm'>('value');
  const [path, setPath] = useState<Path | null>(null);
  const [firstName, setFirstName] = useState('');
  const [caredForName, setCaredForName] = useState('');
  const [relation, setRelation] = useState<Relation>('child');

  const finish = () => {
    const profiles = [];
    const selfId = newId();
    profiles.push({ id: selfId, firstName: firstName.trim() || 'You', relation: 'self' as Relation });
    let activeId = selfId;
    if (path === 'caregiver' && caredForName.trim()) {
      const caredId = newId();
      profiles.push({ id: caredId, firstName: caredForName.trim(), relation });
      activeId = caredId;
    }
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: { profiles, activeProfileId: activeId } });
  };

  if (step === 'value') return <StepValue onNext={() => setStep('path')} />;
  if (step === 'path')
    return (
      <StepPath
        value={path}
        onChange={setPath}
        onNext={() => setStep(path === 'caregiver' ? 'caregiver' : 'name')}
      />
    );
  if (step === 'caregiver')
    return (
      <StepCaregiverDetail
        relation={relation}
        caredForName={caredForName}
        setRelation={setRelation}
        setCaredForName={setCaredForName}
        onNext={() => setStep('name')}
      />
    );
  if (step === 'name')
    return <StepName firstName={firstName} setFirstName={setFirstName} path={path!} onNext={() => setStep('perm')} />;
  return <StepPermissions onFinish={finish} />;
}
