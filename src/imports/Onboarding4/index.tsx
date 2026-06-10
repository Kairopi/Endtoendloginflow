import svgPaths from "./svg-h1g243srzu";

function Signal() {
  return (
    <div className="h-[10px] relative shrink-0 w-[18px]" data-name="signal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 10">
        <g clipPath="url(#clip0_3_165)" id="signal">
          <path d={svgPaths.p2ace3c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_3_165">
            <rect fill="white" height="10" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WifiHigh() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15px]" data-name="wifi-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
        <g id="wifi-high">
          <path d={svgPaths.p37f31600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Battery() {
  return (
    <div className="h-[11px] relative shrink-0 w-[24px]" data-name="battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 11">
        <g id="battery">
          <path d={svgPaths.p2dd25a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <Signal />
      <WifiHigh />
      <Battery />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="status-bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">9:41</p>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function ProgressDots() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="progress-dots">
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" id="Ellipse" r="4" />
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-center text-white w-full" data-name="Frame">
      <p className="font-['Lexend_Deca:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] w-full">Help Pip help you</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[15px] w-full">{`You're in control - skip anytime.`}</p>
    </div>
  );
}

function Mic() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="mic">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="mic">
          <path d={svgPaths.p26120d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="Frame">
      <Mic />
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative text-white whitespace-nowrap" data-name="Frame">
      <p className="font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[15px]">Microphone</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[13px]">For voice notes</p>
    </div>
  );
}

function PermissionRow() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="permission-row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] relative size-full">
          <Frame4 />
          <Frame5 />
          <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">Allow</p>
        </div>
      </div>
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="camera">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="camera">
          <path d={svgPaths.p22215800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="Frame">
      <Camera />
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative text-white whitespace-nowrap" data-name="Frame">
      <p className="font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[15px]">Camera</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[13px]">For photos and video</p>
    </div>
  );
}

function PermissionRow1() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="permission-row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] relative size-full">
          <Frame6 />
          <Frame7 />
          <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">Allow</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Frame">
      <PermissionRow />
      <PermissionRow1 />
    </div>
  );
}

function Spacer() {
  return <div className="flex-[1_0_0] min-h-px relative w-full" data-name="spacer" />;
}

function PrimaryButton() {
  return (
    <div className="bg-white h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="primary-button">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] relative size-full">
          <p className="[word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8b3d28] text-[16px] whitespace-nowrap">Get started →</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Frame">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center pb-[48px] pt-[24px] px-[24px] relative size-full">
          <ProgressDots />
          <Frame2 />
          <Frame3 />
          <Spacer />
          <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-center text-white w-full">Skip for now</p>
          <PrimaryButton />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px relative w-full" data-name="content">
      <StatusBar />
      <Frame1 />
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#c95f45] items-start justify-between relative size-full to-[#f2cc8f] via-1/2 via-[#e07a5f]" data-name="onboarding-4">
      <Content />
    </div>
  );
}