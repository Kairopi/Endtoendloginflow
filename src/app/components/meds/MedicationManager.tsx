import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePip, newId, Medication } from '../../state/PipStore';
import { findInteraction } from '../../data/rxnorm';
import { ComplianceDisclaimer } from '../pip/ComplianceDisclaimer';

interface Props {
  onBack: () => void;
}

export function MedicationManager({ onBack }: Props) {
  const { state, dispatch } = usePip();
  const [capture, setCapture] = useState<{ mode: 'new' } | { mode: 'edit'; med: Medication } | null>(null);
  const [detailMed, setDetailMed] = useState<Medication | null>(null);
  const [wall, setWall] = useState(false);

  const profileMeds = useMemo(
    () => state.medications.filter((m) => m.profileId === state.activeProfileId),
    [state.medications, state.activeProfileId],
  );

  const interactions = useMemo(() => {
    const flags: Array<{ a: string; b: string; flag: string }> = [];
    for (let i = 0; i < profileMeds.length; i++) {
      for (let j = i + 1; j < profileMeds.length; j++) {
        const f = findInteraction(profileMeds[i].name, profileMeds[j].name);
        if (f) flags.push({ a: profileMeds[i].name, b: profileMeds[j].name, flag: f.flag });
      }
    }
    return flags;
  }, [profileMeds]);

  const withPhotos = profileMeds.filter((m) => m.photoUrl).length;
  const withoutPhotos = profileMeds.length - withPhotos;

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
      {/* Header */}
      <header
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 0px), 18px)',
          paddingBottom: 12,
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
          <button
            onClick={onBack}
            aria-label="Back"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px 6px 6px',
              background: 'rgba(61,64,91,0.06)',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 13,
              color: '#3D405B',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4l-4 4 4 4" />
            </svg>
            Back
          </button>
          {profileMeds.length > 1 && (
            <button
              onClick={() => setWall(true)}
              style={{
                background: 'rgba(224,122,95,0.10)',
                border: 'none',
                borderRadius: 999,
                padding: '6px 12px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 12,
                color: '#E07A5F',
                letterSpacing: '-0.005em',
                cursor: 'pointer',
              }}
            >
              Show pharmacy
            </button>
          )}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontWeight: 400,
            fontSize: 36,
            color: '#3D405B',
            lineHeight: 1.02,
            letterSpacing: '-0.028em',
            margin: 0,
          }}
        >
          Your <span style={{ fontStyle: 'italic' }}>cabinet</span>.
        </h1>
        {profileMeds.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 18',
              fontSize: 14.5,
              color: 'rgba(61,64,91,0.55)',
              margin: '8px 0 0',
              lineHeight: 1.5,
              letterSpacing: '-0.005em',
            }}
          >
            {profileMeds.length} {profileMeds.length === 1 ? 'medication' : 'medications'}
            {withoutPhotos > 0 ? ` · ${withoutPhotos} still need a photo` : ' · all photographed'}
          </p>
        )}
      </header>

      {/* Interactions whisper */}
      {interactions.length > 0 && (
        <div
          style={{
            paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
            paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {interactions.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#FDF4E3',
                borderRadius: 16,
                padding: '12px 14px',
                border: '0.5px solid rgba(178,122,26,0.22)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: 2,
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: '#B27A1A',
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 12,
                    color: '#B27A1A',
                    margin: 0,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {f.a} + {f.b}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontVariationSettings: '"opsz" 14',
                    fontSize: 13,
                    color: 'rgba(61,64,91,0.7)',
                    margin: '3px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  Sometimes flagged for {f.flag}. Worth asking your doctor.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state OR grid */}
      <div
        style={{
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
          marginTop: 20,
        }}
      >
        {profileMeds.length === 0 ? (
          <EmptyCabinet onAdd={() => setCapture({ mode: 'new' })} />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
            }}
          >
            {profileMeds.map((m) => (
              <MedCard key={m.id} med={m} onTap={() => setDetailMed(m)} />
            ))}
            <AddMedTile onClick={() => setCapture({ mode: 'new' })} />
          </div>
        )}
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <ComplianceDisclaimer />
      </div>

      {/* Floating add button when grid is non-empty (alternative to the tile) */}
      <AnimatePresence>
        {capture && (
          <MedicationCapture
            initial={capture.mode === 'edit' ? capture.med : undefined}
            onClose={() => setCapture(null)}
            onSave={(med) => {
              if (capture.mode === 'edit') dispatch({ type: 'UPDATE_MEDICATION', payload: med });
              else dispatch({ type: 'ADD_MEDICATION', payload: med });
              setCapture(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailMed && (
          <MedicationDetail
            med={detailMed}
            onClose={() => setDetailMed(null)}
            onEdit={() => {
              setCapture({ mode: 'edit', med: detailMed });
              setDetailMed(null);
            }}
            onDelete={() => {
              dispatch({ type: 'DELETE_MEDICATION', payload: detailMed.id });
              setDetailMed(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wall && <PharmacyWall meds={profileMeds} onClose={() => setWall(false)} />}
      </AnimatePresence>
    </div>
  );
}

function EmptyCabinet({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      style={{
        background: '#FBF8EE',
        borderRadius: 24,
        border: '0.5px solid rgba(61,64,91,0.08)',
        padding: '28px 22px',
        textAlign: 'center',
        boxShadow: '0 1px 2px rgba(61,64,91,0.04), 0 14px 32px rgba(61,64,91,0.06)',
      }}
    >
      {/* Soft illustration — stacked bottles */}
      <div
        aria-hidden
        style={{
          width: 96,
          height: 96,
          margin: '0 auto 16px',
          borderRadius: 999,
          background: 'radial-gradient(circle at 30% 30%, rgba(224,122,95,0.18), transparent 70%), radial-gradient(circle at 70% 70%, rgba(178,122,26,0.18), transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#E07A5F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="12" height="4" rx="1" />
          <path d="M8 7v13a1 1 0 001 1h6a1 1 0 001-1V7" />
          <path d="M10 12h4M10 16h4" />
        </svg>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontVariationSettings: '"opsz" 48',
          fontStyle: 'italic',
          fontSize: 22,
          color: '#3D405B',
          margin: 0,
          letterSpacing: '-0.02em',
        }}
      >
        A photograph remembers, so you don't have to.
      </p>
      <p
        style={{
          fontFamily: 'Inter',
          fontSize: 13.5,
          color: 'rgba(61,64,91,0.6)',
          margin: '10px auto 0',
          maxWidth: 280,
          lineHeight: 1.5,
        }}
      >
        Brands change. Generics look different. Snap each bottle once — Pip keeps the picture, so you always know which is which.
      </p>

      <button
        onClick={onAdd}
        style={{
          marginTop: 18,
          background: '#E07A5F',
          color: '#fff',
          border: 'none',
          padding: '12px 22px',
          borderRadius: 999,
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: '-0.005em',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(193,93,69,0.28)',
        }}
      >
        Snap your first one
      </button>
    </div>
  );
}

function MedCard({ med, onTap }: { med: Medication; onTap: () => void }) {
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.985 }}
      className="relative overflow-hidden text-left"
      style={{
        background: '#FBF8EE',
        borderRadius: 20,
        border: '0.5px solid rgba(61,64,91,0.08)',
        boxShadow: '0 1px 2px rgba(61,64,91,0.04), 0 10px 22px rgba(61,64,91,0.05)',
        cursor: 'pointer',
        aspectRatio: '0.82',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          background: med.photoUrl
            ? `url(${med.photoUrl}) center/cover`
            : 'linear-gradient(135deg, rgba(224,122,95,0.10) 0%, rgba(178,122,26,0.08) 100%)',
          position: 'relative',
        }}
      >
        {!med.photoUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(224,122,95,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 12',
                fontSize: 11,
                color: 'rgba(224,122,95,0.7)',
              }}
            >
              add a photo
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          padding: '10px 12px 12px',
          background: 'rgba(251,248,238,0.92)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 13.5,
            color: '#3D405B',
            margin: 0,
            letterSpacing: '-0.005em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {med.name || 'Untitled'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 12',
            fontSize: 11.5,
            color: 'rgba(61,64,91,0.55)',
            margin: '2px 0 0',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {[med.dose, med.frequency].filter(Boolean).join(' · ') || med.purpose || '—'}
        </p>
      </div>
    </motion.button>
  );
}

function AddMedTile({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className="flex flex-col items-center justify-center"
      style={{
        background: 'transparent',
        borderRadius: 20,
        border: '1.5px dashed rgba(224,122,95,0.4)',
        cursor: 'pointer',
        aspectRatio: '0.82',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          background: 'rgba(224,122,95,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 18',
          fontSize: 14,
          color: '#E07A5F',
          letterSpacing: '-0.005em',
        }}
      >
        Add a medication
      </span>
    </motion.button>
  );
}

function MedicationCapture({
  initial,
  onClose,
  onSave,
}: {
  initial?: Medication;
  onClose: () => void;
  onSave: (m: Medication) => void;
}) {
  const { state } = usePip();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(initial?.photoUrl);
  const [name, setName] = useState(initial?.name ?? '');
  const [purpose, setPurpose] = useState(initial?.purpose ?? '');
  const [dose, setDose] = useState(initial?.dose ?? '');
  const [frequency, setFrequency] = useState(initial?.frequency ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result as string);
    reader.readAsDataURL(f);
  };

  const canSave = (name.trim().length > 0 || !!photoUrl) && !!state.activeProfileId;

  const save = () => {
    if (!canSave) return;
    const med: Medication = {
      id: initial?.id ?? newId(),
      profileId: initial?.profileId ?? state.activeProfileId!,
      name: name.trim() || 'Untitled',
      dose: dose.trim() || undefined,
      frequency: frequency.trim() || undefined,
      purpose: purpose.trim() || undefined,
      notes: notes.trim() || undefined,
      photoUrl,
      rxcui: initial?.rxcui,
      startDate: initial?.startDate,
    };
    onSave(med);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(20,18,14,0.55)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#F5F2E4',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '14px 22px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 14,
              color: 'rgba(61,64,91,0.6)',
            }}
          >
            Cancel
          </button>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 18',
              fontSize: 15,
              color: '#3D405B',
            }}
          >
            {initial ? 'Edit medication' : 'Add medication'}
          </span>
          <button
            onClick={save}
            disabled={!canSave}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: canSave ? 'pointer' : 'not-allowed',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 14,
              color: canSave ? '#E07A5F' : 'rgba(61,64,91,0.3)',
            }}
          >
            Save
          </button>
        </div>

        <div
          style={{
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '4px 22px calc(max(env(safe-area-inset-bottom, 0px), 12px) + 24px)',
          }}
        >
          {/* Photo zone — the hero */}
          <div
            style={{
              borderRadius: 22,
              overflow: 'hidden',
              background: photoUrl ? '#000' : '#FBF8EE',
              border: '0.5px solid rgba(61,64,91,0.08)',
              aspectRatio: '4/3',
              position: 'relative',
              marginBottom: 14,
            }}
          >
            {photoUrl ? (
              <>
                <img src={photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => setPhotoUrl(undefined)}
                  aria-label="Remove photo"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: 'rgba(0,0,0,0.55)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: 'rgba(224,122,95,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E07A5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontVariationSettings: '"opsz" 24',
                    fontSize: 17,
                    color: '#3D405B',
                    margin: 0,
                    textAlign: 'center',
                    letterSpacing: '-0.005em',
                    maxWidth: 260,
                    lineHeight: 1.35,
                  }}
                >
                  Show Pip what the bottle looks like.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => cameraRef.current?.click()}
                    style={primaryButtonStyle()}
                  >
                    Take a photo
                  </button>
                  <button
                    onClick={() => galleryRef.current?.click()}
                    style={ghostButtonStyle()}
                  >
                    From library
                  </button>
                </div>
              </div>
            )}
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {photoUrl && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <button onClick={() => cameraRef.current?.click()} style={ghostButtonStyle()}>
                Retake
              </button>
              <button onClick={() => galleryRef.current?.click()} style={ghostButtonStyle()}>
                Replace
              </button>
            </div>
          )}

          {/* Fields */}
          <FieldLabel>Name</FieldLabel>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lisinopril, the round white one…"
            style={fieldStyle()}
          />

          <FieldLabel>What it's for</FieldLabel>
          <input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. Blood pressure"
            style={fieldStyle()}
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <FieldLabel>Dose</FieldLabel>
              <input
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                placeholder="10 mg"
                style={fieldStyle()}
              />
            </div>
            <div style={{ flex: 1 }}>
              <FieldLabel>When</FieldLabel>
              <input
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="Morning"
                style={fieldStyle()}
              />
            </div>
          </div>

          <FieldLabel>Notes</FieldLabel>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything you want to remember — side effects, why it changed…"
            rows={3}
            style={{ ...fieldStyle(), resize: 'none', fontFamily: 'Inter' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function MedicationDetail({
  med,
  onClose,
  onEdit,
  onDelete,
}: {
  med: Medication;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(20,18,14,0.6)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#F5F2E4',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          maxHeight: '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'rgba(245,242,228,0.92)',
            backdropFilter: 'blur(10px)',
            padding: '14px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
            borderBottom: '0.5px solid rgba(61,64,91,0.06)',
          }}
        >
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: 'rgba(61,64,91,0.6)' }}>
            Close
          </button>
          <button
            onClick={onEdit}
            style={{
              background: 'rgba(224,122,95,0.12)',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 13,
              color: '#E07A5F',
            }}
          >
            Edit
          </button>
        </div>

        {/* Hero photo */}
        <div
          style={{
            aspectRatio: '4/3',
            background: med.photoUrl ? '#000' : '#FBF8EE',
            position: 'relative',
          }}
        >
          {med.photoUrl ? (
            <img src={med.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(224,122,95,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontVariationSettings: '"opsz" 14', fontSize: 13, color: 'rgba(224,122,95,0.7)' }}>
                No photo yet
              </span>
            </div>
          )}
        </div>

        <div style={{ padding: '22px 22px 32px' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontVariationSettings: '"opsz" 48',
              fontSize: 28,
              color: '#3D405B',
              margin: 0,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}
          >
            {med.name}
          </p>
          {med.purpose && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 18',
                fontSize: 15,
                color: 'rgba(61,64,91,0.65)',
                margin: '6px 0 0',
              }}
            >
              for {med.purpose.toLowerCase()}
            </p>
          )}

          <div style={{ display: 'flex', gap: 28, marginTop: 22 }}>
            <DetailFact label="Dose" value={med.dose} />
            <DetailFact label="When" value={med.frequency} />
          </div>

          {med.notes && (
            <div style={{ marginTop: 22 }}>
              <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: 'rgba(61,64,91,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
                Notes
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#3D405B', margin: '6px 0 0', lineHeight: 1.55, letterSpacing: '-0.005em', whiteSpace: 'pre-wrap' }}>
                {med.notes}
              </p>
            </div>
          )}

          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 13,
                  color: 'rgba(177,74,55,0.7)',
                }}
              >
                Remove from cabinet
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontVariationSettings: '"opsz" 14',
                    fontSize: 13,
                    color: 'rgba(61,64,91,0.6)',
                  }}
                >
                  Sure?
                </span>
                <button onClick={() => setConfirmDelete(false)} style={ghostButtonStyle()}>
                  Keep
                </button>
                <button
                  onClick={onDelete}
                  style={{
                    background: '#B14A37',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PharmacyWall({ meds, onClose }: { meds: Medication[]; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: '#1A1612',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 'max(env(safe-area-inset-top, 0px), 18px) 22px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Show pharmacy
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontVariationSettings: '"opsz" 24', fontSize: 18, color: '#fff', margin: '4px 0 0', letterSpacing: '-0.005em' }}>
            What I'm taking.
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.10)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '8px 16px calc(max(env(safe-area-inset-bottom, 0px), 16px) + 16px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
          }}
        >
          {meds.map((m) => (
            <div
              key={m.id}
              style={{
                background: '#241F19',
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '0.78',
                display: 'flex',
                flexDirection: 'column',
                border: '0.5px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: m.photoUrl ? `url(${m.photoUrl}) center/cover` : 'rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!m.photoUrl && (
                  <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontVariationSettings: '"opsz" 14', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    no photo
                  </span>
                )}
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#fff', margin: 0, letterSpacing: '-0.005em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.name}
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontVariationSettings: '"opsz" 12', fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {[m.dose, m.frequency].filter(Boolean).join(' · ') || m.purpose || '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 10,
        color: 'rgba(61,64,91,0.55)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        margin: '14px 0 6px',
      }}
    >
      {children}
    </p>
  );
}

function fieldStyle(): React.CSSProperties {
  return {
    width: '100%',
    background: '#FBF8EE',
    border: '0.5px solid rgba(61,64,91,0.12)',
    borderRadius: 14,
    padding: '11px 14px',
    fontFamily: 'Inter',
    fontSize: 14.5,
    color: '#3D405B',
    letterSpacing: '-0.005em',
    outline: 'none',
  };
}

function primaryButtonStyle(): React.CSSProperties {
  return {
    background: '#E07A5F',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: 999,
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 13.5,
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(193,93,69,0.28)',
  };
}

function ghostButtonStyle(): React.CSSProperties {
  return {
    background: 'rgba(61,64,91,0.06)',
    color: '#3D405B',
    border: 'none',
    padding: '9px 16px',
    borderRadius: 999,
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 13.5,
    cursor: 'pointer',
  };
}

function DetailFact({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: 'rgba(61,64,91,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontVariationSettings: '"opsz" 24',
          fontSize: 22,
          color: '#3D405B',
          margin: '6px 0 0',
          letterSpacing: '-0.015em',
        }}
      >
        {value || <span style={{ fontStyle: 'italic', color: 'rgba(61,64,91,0.4)', fontSize: 16 }}>not set</span>}
      </p>
    </div>
  );
}
