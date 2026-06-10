import { usePip } from '../../state/PipStore';
import { ComplianceDisclaimer } from '../pip/ComplianceDisclaimer';
import { PipMascot } from '../pip/PipMascot';

interface Props {
  onBack: () => void;
}

export function ERCard({ onBack }: Props) {
  const { state, activeProfile } = usePip();
  const meds = state.medications.filter((m) => m.profileId === state.activeProfileId);
  const allergies = state.allergies.filter((a) => a.profileId === state.activeProfileId);
  const conditions = state.conditions.filter((c) => c.profileId === state.activeProfileId);

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between p-4 print:hidden">
        <button onClick={onBack} style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          ← Back
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>ER Card</span>
        <button onClick={() => window.print()} style={{ color: 'var(--color-brand)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14 }}>
          PDF
        </button>
      </div>

      <div
        className="mx-4 rounded-2xl p-5"
        style={{ background: '#fff', border: '2px solid var(--color-emergency)', color: '#1A1A1A' }}
      >
        <div
          className="-mx-5 -mt-5 px-5 py-3 mb-4"
          style={{ background: 'var(--color-emergency)', color: '#fff', borderRadius: '14px 14px 0 0' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }}>Emergency information</p>
        </div>

        <div className="border-b pb-3 mb-3 flex items-center justify-between" style={{ borderColor: 'var(--color-hairline)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 24 }}>{activeProfile?.firstName}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555' }}>
              DOB: {activeProfile?.dob ?? '—'} · Sex: {activeProfile?.sex ?? '—'} · Blood: {activeProfile?.bloodType ?? '—'}
            </p>
          </div>
          <div className="print:hidden">
            <PipMascot state="supporting" size={64} />
          </div>
        </div>

        <Block label="ALLERGIES" emphasis>
          {allergies.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666' }}>None known.</p>
          ) : (
            <ul className="pl-4 list-disc">
              {allergies.map((a) => (
                <li
                  key={a.id}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: a.severity === 'severe' ? 800 : 500,
                    color: a.severity === 'severe' ? 'var(--color-emergency-text)' : '#1A1A1A',
                    background: a.severity === 'severe' ? 'var(--color-emergency-whisper)' : 'transparent',
                    padding: a.severity === 'severe' ? '4px 8px' : '0',
                    borderRadius: 4,
                    marginBottom: 2,
                  }}
                >
                  {a.allergen} {a.severity === 'severe' && '⚠ SEVERE'} {a.reaction && `— ${a.reaction}`}
                </li>
              ))}
            </ul>
          )}
        </Block>

        <Block label="CURRENT MEDICATIONS">
          {meds.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666' }}>None.</p>
          ) : (
            <ul className="pl-4 list-disc">
              {meds.map((m) => (
                <li key={m.id} style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>
                  {m.name} {m.dose && `${m.dose}`} {m.frequency && `· ${m.frequency}`}
                </li>
              ))}
            </ul>
          )}
        </Block>

        <Block label="CONDITIONS">
          {conditions.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666' }}>None recorded.</p>
          ) : (
            <ul className="pl-4 list-disc">
              {conditions.map((c) => (
                <li key={c.id} style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>
                  {c.label}
                </li>
              ))}
            </ul>
          )}
        </Block>

        <Block label="EMERGENCY CONTACT">
          {activeProfile?.emergencyContact ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>
              {activeProfile.emergencyContact.name} · {activeProfile.emergencyContact.phone}
            </p>
          ) : (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666' }}>Not set.</p>
          )}
        </Block>

        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
          <ComplianceDisclaimer />
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}

function Block({ label, children, emphasis }: { label: string; children: React.ReactNode; emphasis?: boolean }) {
  return (
    <div className="mb-4">
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: 0.8,
          color: emphasis ? 'var(--color-emergency-text)' : '#444',
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
