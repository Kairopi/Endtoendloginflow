import svgPaths from "./svg-nnuvyxyye";
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

function HeroZone() {
  return (
    <div className="h-[500px] overflow-clip relative shrink-0 w-[390px]" data-name="hero-zone">
      <div className="absolute h-[500px] left-0 top-0 w-[390px]" data-name="pip-mascot">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPipMascot} />
      </div>
      <div className="absolute h-[240px] left-0 top-[320px] w-[390px]" style={{ backgroundImage: "linear-gradient(rgba(244, 241, 222, 0) 0%, rgba(244, 241, 222, 0.55) 40%, rgba(244, 241, 222, 0.9) 75%, rgb(244, 241, 222) 100%)" }} data-name="hero-fade-overlay" />
      <StatusBar />
    </div>
  );
}

function TaglineGroup() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="tagline-group">
      <div className="[word-break:break-word] font-['Lexend_Deca:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#3d405b] text-[33px] text-center tracking-[-0.495px] w-full">
        <p className="leading-[1.2] mb-0">Notice your body.</p>
        <p className="leading-[1.2]">Every day.</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.pa77e380} fill="var(--fill-0, #FFC107)" id="Vector" />
          <path d={svgPaths.pad37f80} fill="var(--fill-0, #FF3D00)" id="Vector_2" />
          <path d={svgPaths.p394e5900} fill="var(--fill-0, #4CAF50)" id="Vector_3" />
          <path d={svgPaths.p1396fa00} fill="var(--fill-0, #1976D2)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function GoogleGBadge() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[22px]" data-name="google-g-badge">
      <Frame1 />
    </div>
  );
}

function ButtonContinueWithGoogle() {
  return (
    <div className="bg-[#292524] h-[56px] relative rounded-[14px] shrink-0 w-full" data-name="button-continue-with-google">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[24px] relative size-full">
          <GoogleGBadge />
          <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

function ButtonSignInWithEmail() {
  return (
    <div className="h-[56px] relative rounded-[28px] shrink-0 w-full" data-name="button-sign-in-with-email">
      <div aria-hidden className="absolute border-[1.5px] border-[rgba(224,122,95,0.7)] border-solid inset-0 pointer-events-none rounded-[28px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] relative size-full">
          <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#e07a5f] text-[16px] whitespace-nowrap">Sign in with email</p>
        </div>
      </div>
    </div>
  );
}

function ButtonsGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="buttons-group">
      <ButtonContinueWithGoogle />
      <ButtonSignInWithEmail />
    </div>
  );
}

function FooterGroup() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="footer-group">
      <p className="[word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6e7184] text-[14px] text-center whitespace-nowrap">
        <span className="leading-[normal] text-[rgba(61,64,91,0.85)]">{`New to Pip? `}</span>
        <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[#e07a5f] underline" href="https://app.pip.journal/login" target="_blank">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline" href="https://app.pip.journal/login" target="_blank">
            Create an account
          </span>
        </a>
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="main-content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[40px] pt-[20px] px-[24px] relative size-full">
          <TaglineGroup />
          <ButtonsGroup />
          <FooterGroup />
        </div>
      </div>
    </div>
  );
}

function HomeIndicatorContainer() {
  return (
    <div className="content-stretch flex h-[34px] items-center justify-center relative shrink-0 w-full" data-name="home-indicator-container">
      <div className="bg-[#3d405b] h-[5px] opacity-10 relative rounded-[100px] shrink-0 w-[134px]" data-name="Rectangle" />
    </div>
  );
}

export default function LoginScreenHeroMascot() {
  return (
    <div className="bg-[#f4f1de] content-stretch flex flex-col items-start justify-between relative size-full" data-name="login-screen-hero-mascot">
      <HeroZone />
      <MainContent />
      <HomeIndicatorContainer />
    </div>
  );
}