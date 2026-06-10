import { useState } from 'react';
import { PipMascot } from '../pip/PipMascot';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onClose: () => void;
  onCapture: (text: string) => void;
}

export function OCRCameraOverlay({ onClose, onCapture }: Props) {
  const [step, setStep] = useState<'camera' | 'scanning'>('camera');

  const takePhoto = () => {
    setStep('scanning');
    setTimeout(() => {
      onCapture("Impression: Acute suppurative otitis media.\nPlan: Amoxicillin 400mg BID x10 days.");
    }, 2500);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between p-4 z-10">
        <button onClick={onClose} style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          Cancel
        </button>
        <span style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Scan Document</span>
        <span className="w-12" />
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
        {step === 'camera' && (
          <>
            {/* Viewfinder frame */}
            <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-2xl pointer-events-none" />
            <div className="absolute inset-x-8 top-1/4 bottom-1/3 border border-white/50 rounded-lg pointer-events-none" />
            
            <p style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, marginTop: 'auto', marginBottom: 32 }} className="px-8 text-center text-white/80">
              Position the medical handout in the frame.
            </p>
          </>
        )}

        <AnimatePresence>
          {step === 'scanning' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm"
            >
              <PipMascot state="thinking" size={100} />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mt-6 text-white/90 text-center"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 16 }}
              >
                Reading text...
              </motion.div>
              
              {/* Scanning laser line */}
              <motion.div
                initial={{ top: '20%' }}
                animate={{ top: '80%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute left-1/4 right-1/4 h-[2px] bg-[var(--color-brand)] shadow-[0_0_8px_var(--color-brand)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-32 flex items-center justify-center pb-8 z-10 bg-black/50">
        {step === 'camera' && (
          <button
            onClick={takePhoto}
            className="w-16 h-16 rounded-full border-4 border-white/80 flex items-center justify-center active:scale-95 transition"
          >
            <div className="w-12 h-12 rounded-full bg-white" />
          </button>
        )}
      </div>
    </div>
  );
}
