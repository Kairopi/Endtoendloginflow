import { useEffect, useState } from 'react';
import { usePip, newId } from '../../state/PipStore';
import { extract } from '../../lib/nlp';

const DRAFT_KEY = 'pip-text-draft';

interface Props {
  onClose: () => void;
  initial?: string;
  tagOverride?: string[];
}

export function TextNoteCapture({ onClose, initial = '', tagOverride }: Props) {
  const { state, dispatch } = usePip();
  const [text, setText] = useState(initial || (typeof localStorage !== 'undefined' ? localStorage.getItem(DRAFT_KEY) ?? '' : ''));

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, text);
      } catch {}
    }, 500);
    return () => clearTimeout(id);
  }, [text]);

  const save = () => {
    if (!text.trim() || !state.activeProfileId) return;
    const ex = extract(text);
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: newId(),
        profileId: state.activeProfileId,
        createdAt: Date.now(),
        type: 'text',
        text,
        tags: tagOverride ?? ex.tags,
        bodySystem: ex.bodySystem,
        severity: ex.severity,
      },
    });
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'var(--color-surface-raised)' }}>
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          Cancel
        </button>
        <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>What's going on?</span>
        <button
          onClick={save}
          disabled={!text.trim()}
          style={{ color: 'var(--color-brand)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, opacity: text.trim() ? 1 : 0.4 }}
        >
          Save
        </button>
      </div>
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 2000))}
        placeholder="type whatever you noticed…"
        className="flex-1 w-full p-5 outline-none resize-none"
        style={{ background: 'transparent', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.5 }}
      />
      {text.length > 1800 && (
        <div className="px-5 py-2 text-right" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 12 }}>
          {text.length} / 2000
        </div>
      )}
    </div>
  );
}
