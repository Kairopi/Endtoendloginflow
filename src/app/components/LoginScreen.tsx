import { useState } from 'react';
import { usePip } from '../state/PipStore';
import mascotImg from '../../imports/LoginScreenHeroMascot-2/d1c8ba9c0d9e363198cf8ef6365a9a8910b3793b.png';

export function LoginScreen() {
  const { dispatch } = usePip();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const onLogin = () => dispatch({ type: 'LOGIN' });

  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#F5F2E4' }}>
      <div
        className="relative w-full overflow-hidden shrink-0"
        style={{ height: 'min(62vh, 520px)' }}
      >
        <img
          src={mascotImg}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div
          aria-hidden
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: '48%',
            backgroundImage:
              'linear-gradient(to bottom, rgba(245,242,228,0) 0%, rgba(245,242,228,0.55) 40%, rgba(245,242,228,0.9) 75%, #F5F2E4 100%)',
          }}
        />
      </div>

      <div
        className="flex-1 flex flex-col px-6"
        style={{
          gap: 22,
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 28px)',
          paddingTop: 4,
        }}
      >
        <div className="text-center">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontVariationSettings: '"opsz" 96, "SOFT" 40',
              fontWeight: 400,
              fontSize: 'clamp(32px, 8.5vw, 42px)',
              color: '#3D405B',
              lineHeight: 1.0,
              letterSpacing: '-0.028em',
              margin: 0,
            }}
          >
            Notice your body.
            <br />
            <span style={{ fontStyle: 'italic', color: '#E07A5F' }}>Every day.</span>
          </h1>
        </div>

        {!showEmail ? (
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onLogin}
              className="active:scale-[0.98] transition"
              style={{
                height: 54,
                borderRadius: 14,
                background: '#1F1B16',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '-0.005em',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#fff" d="M17.4 9.2c0-.6 0-1.2-.2-1.7H9v3.3h4.7a4 4 0 01-1.8 2.6v2.1h2.9c1.7-1.5 2.6-3.8 2.6-6.3z" />
                <path fill="#fff" d="M9 17.5c2.4 0 4.4-.8 5.9-2.1l-2.9-2.2c-.8.5-1.8.9-3 .9-2.3 0-4.2-1.5-4.9-3.6H1v2.3A8.5 8.5 0 009 17.5z" />
                <path fill="#fff" d="M4.1 10.5a5 5 0 010-3.2V5H1a8.5 8.5 0 000 7.7l3.1-2.2z" />
                <path fill="#fff" d="M9 4.2c1.3 0 2.4.4 3.3 1.3l2.5-2.5A8.4 8.4 0 009 .5 8.5 8.5 0 001 5l3.1 2.3c.7-2.1 2.6-3.6 4.9-3.6z" />
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => setShowEmail(true)}
              className="active:scale-[0.98] transition"
              style={{
                height: 54,
                borderRadius: 14,
                background: 'transparent',
                color: '#3D405B',
                border: '0.5px solid rgba(61,64,91,0.18)',
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '-0.005em',
              }}
            >
              Sign in with email
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoFocus
              style={{
                height: 54,
                borderRadius: 14,
                padding: '0 18px',
                background: '#fff',
                border: '0.5px solid rgba(61,64,91,0.14)',
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                color: '#3D405B',
                outline: 'none',
              }}
            />
            <button
              onClick={onLogin}
              disabled={email.length < 3}
              className="active:scale-[0.98] transition disabled:opacity-40"
              style={{
                height: 54,
                borderRadius: 14,
                background: '#E07A5F',
                color: '#fff',
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '-0.005em',
              }}
            >
              Continue
            </button>
          </div>
        )}

        <p
          className="text-center mt-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            color: 'rgba(61,64,91,0.45)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          By continuing you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
}
