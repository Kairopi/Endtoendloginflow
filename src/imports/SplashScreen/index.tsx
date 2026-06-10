import svgPaths from "./svg-8ldyhnqpq4";
import imgPipMascotFace from "./2ba6dcf8b1ac66bddbb74401f1182d150c43d040.png";

function Heart() {
  return (
    <div className="h-[14px] relative w-[16px]" data-name="heart">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
        <g id="heart" opacity="0.7">
          <path d={svgPaths.p3531c380} id="Vector" stroke="var(--stroke-0, #F2CC8F)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Sparkle() {
  return (
    <div className="absolute left-[308px] size-[12px] top-[180px]" data-name="sparkle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_3_45)" id="sparkle" opacity="0.5">
          <path d={svgPaths.p3aefa580} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_3_45">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SignalHigh() {
  return (
    <div className="h-[10px] relative shrink-0 w-[18px]" data-name="signal-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 10">
        <g id="signal-high">
          <path d={svgPaths.p3207356f} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Wifi() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15px]" data-name="wifi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
        <g id="wifi">
          <path d={svgPaths.p2c84e800} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function BatteryFull() {
  return (
    <div className="h-[11px] relative shrink-0 w-[24px]" data-name="battery-full">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 11">
        <g id="battery-full">
          <path d={svgPaths.p38b11b80} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <SignalHigh />
      <Wifi />
      <BatteryFull />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center justify-between left-0 px-[24px] top-0 w-[390px]" data-name="status-bar">
      <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#3d405b] text-[14px] whitespace-nowrap">9:41</p>
      <Frame />
    </div>
  );
}

export default function SplashScreen() {
  return (
    <div className="bg-[#f4f1de] content-stretch flex flex-col items-center justify-between relative size-full" data-name="splash-screen">
      <div className="absolute left-[35px] size-[320px] top-[194px]" data-name="warm-aura">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 320">
          <circle cx="160" cy="160" fill="url(#paint0_radial_3_56)" id="warm-aura" r="160" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(160 160) scale(160)" gradientUnits="userSpaceOnUse" id="paint0_radial_3_56" r="1">
              <stop stopColor="#FDE8D4" stopOpacity="0.85" />
              <stop offset="1" stopColor="#F4F1DE" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute flex h-[17.664px] items-center justify-center left-[64.38px] top-[210px] w-[19.078px]">
        <div className="flex-none rotate-15">
          <Heart />
        </div>
      </div>
      <Sparkle />
      <div className="absolute left-[55px] size-[10px] top-[380px]" data-name="deco-circle">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #81B29A)" id="deco-circle" opacity="0.4" r="5" />
        </svg>
      </div>
      <StatusBar />
      <div className="absolute h-[342px] left-[6px] top-[149px] w-[384px]" data-name="pip-mascot-face">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPipMascotFace} />
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Shantell_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[195px] text-[#c95f45] text-[48px] text-center top-[450px] tracking-[-0.48px] w-[390px]" style={{ fontVariationSettings: '"BNCE" 0, "INFM" 0, "SPAC" 0' }}>
        Pip
      </p>
    </div>
  );
}