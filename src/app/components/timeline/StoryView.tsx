import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Note } from '../../state/PipStore';

interface Props {
  notes: Note[];
  onClose: () => void;
  title: string;
}

export function StoryView({ notes, onClose, title }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= notes.length) {
      onClose();
    }
  }, [index, notes.length, onClose]);

  const advance = () => setIndex((i) => i + 1);
  const retreat = () => setIndex((i) => Math.max(0, i - 1));

  if (!notes.length || index >= notes.length) return null;
  const current = notes[index];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-0 inset-x-0 pt-12 pb-4 px-4 bg-gradient-to-b from-black/60 to-transparent z-10">
        <div className="flex gap-1 mb-4">
          {notes.map((n, i) => (
            <div key={n.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: i < index ? '100%' : '0%' }}
                animate={{ width: i === index ? '100%' : i < index ? '100%' : '0%' }}
                transition={{ duration: i === index ? 5 : 0, ease: 'linear' }}
                onAnimationComplete={() => {
                  if (i === index) advance();
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-white">
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16 }}>{title}</h2>
            <p style={{ opacity: 0.8, fontSize: 13 }}>{new Date(current.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="p-2 opacity-80 active:opacity-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-y-0 left-0 w-1/3 z-20" onClick={retreat} />
        <div className="absolute inset-y-0 right-0 w-2/3 z-20" onClick={advance} />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex flex-col items-center justify-center p-4"
          >
            {current.mediaUrls && current.mediaUrls.length > 0 ? (
              <img src={current.mediaUrls[0]} alt="Note media" className="w-full max-h-[70vh] object-contain rounded-2xl" />
            ) : (
              <div className="text-white text-center text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                {current.text || "No content"}
              </div>
            )}
            {current.text && current.mediaUrls?.length && (
              <p className="text-white mt-8 text-lg font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                {current.text}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}