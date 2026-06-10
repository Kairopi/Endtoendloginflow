import svgPaths from "./svg-kzcu061u0c";
import imgPipMascot from "./d1c8ba9c0d9e363198cf8ef6365a9a8910b3793b.png";

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

function WifiHigh() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15px]" data-name="wifi-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
        <g id="wifi-high">
          <path d={svgPaths.p37f31600} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Battery() {
  return (
    <div className="h-[12px] relative shrink-0 w-[24px]" data-name="battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 12">
        <g id="battery">
          <path d={svgPaths.p25ffa80} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <SignalHigh />
      <WifiHigh />
      <Battery />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center justify-between left-0 px-[24px] top-0 w-[390px]" data-name="status-bar">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3d405b] text-[14px] whitespace-nowrap">9:41</p>
      <Frame />
    </div>
  );
}

export default function HeroZone() {
  return (
    <div className="relative size-full" data-name="hero-zone">
      <div className="absolute h-[500px] left-0 top-0 w-[390px]" data-name="pip-mascot">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPipMascot} />
      </div>
      <div className="absolute h-[240px] left-0 top-[320px] w-[390px]" style={{ backgroundImage: "linear-gradient(rgba(244, 241, 222, 0) 0%, rgba(244, 241, 222, 0.55) 40%, rgba(244, 241, 222, 0.9) 75%, rgb(244, 241, 222) 100%)" }} data-name="hero-fade-overlay" />
      <StatusBar />
    </div>
  );
}