interface Props {
  className?: string;
}

export const COMPLIANCE_DISCLAIMER =
  'Pip is not a medical device. Pip does not diagnose, treat, or replace medical advice. In an emergency, call 911.';

export function ComplianceDisclaimer({ className = '' }: Props) {
  return (
    <p
      className={`text-[12px] leading-relaxed ${className}`}
      style={{ color: 'var(--color-text-secondary)' }}
    >
      {COMPLIANCE_DISCLAIMER}
    </p>
  );
}
