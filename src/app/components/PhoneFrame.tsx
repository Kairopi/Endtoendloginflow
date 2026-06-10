import { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-root">
      <div className="app-viewport">{children}</div>
      <style>{`
        :root {
          --vh: 100dvh;
        }
        html, body, #root {
          height: 100%;
          margin: 0;
          background: #F5F2E4;
          overscroll-behavior-y: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .app-root {
          position: fixed;
          inset: 0;
          background: #F5F2E4;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .app-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #F5F2E4;
        }
        @media (min-width: 640px) {
          .app-root {
            background:
              radial-gradient(1200px 600px at 20% 0%, rgba(240,138,107,0.10), transparent 60%),
              radial-gradient(900px 700px at 100% 100%, rgba(94,142,116,0.08), transparent 55%),
              #F5F2E4;
            padding: 0;
          }
          .app-viewport {
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
            border: none;
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
