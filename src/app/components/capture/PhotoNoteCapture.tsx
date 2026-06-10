import { useState, useRef } from 'react';
import { usePip, newId } from '../../state/PipStore';

interface Props {
  onClose: () => void;
  tagOverride?: string[];
}

// Strip metadata by re-encoding via canvas (R5#4 / R20#3)
async function reencode(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PhotoNoteCapture({ onClose, tagOverride }: Props) {
  const { state, dispatch } = usePip();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState('');

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 10);
    const urls = await Promise.all(files.map(reencode));
    setPreviews((p) => [...p, ...urls].slice(0, 10));
  };

  const save = () => {
    if (previews.length === 0 || !state.activeProfileId) return;
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: newId(),
        profileId: state.activeProfileId,
        createdAt: Date.now(),
        type: 'photo',
        text: caption,
        mediaUrls: previews,
        tags: tagOverride ?? ['photo'],
      },
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'var(--color-surface-raised)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          Cancel
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Photo Note</span>
        <button onClick={save} disabled={!previews.length} style={{ color: 'var(--color-brand)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, opacity: previews.length ? 1 : 0.4 }}>
          Save
        </button>
      </div>

      <div className="flex-1 px-5 py-3 flex flex-col gap-3 overflow-y-auto">
        {previews.length === 0 ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-text-secondary)' }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Tap to add a photo or video</span>
          </button>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`photo ${i + 1}`}
                  className="aspect-square object-cover rounded-xl border"
                  style={{ borderColor: 'var(--color-pip-accent)' }}
                />
              ))}
              {previews.length < 10 && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-text-secondary)' }}
                >
                  +
                </button>
              )}
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="optional caption…"
              className="w-full p-3 rounded-xl border outline-none"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-hairline)', color: 'var(--color-text-primary)', minHeight: 80, fontFamily: 'var(--font-sans)', fontSize: 15 }}
            />
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={onPick}
          className="hidden"
        />
      </div>
    </div>
  );
}
