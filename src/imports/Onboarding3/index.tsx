import svgPaths from "./svg-k605x40yiz";

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
          <circle cx="4" cy="4" fill="var(--fill-0, white)" id="Ellipse" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse" r="4" />
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-white w-full" data-name="Frame">
      <p className="font-['Lexend_Deca:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[26px] w-full">{`What's your first name?`}</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full">{`We'll use this to make Pip feel like yours.`}</p>
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-[rgba(255,255,255,0.22)] relative rounded-[16px] shrink-0 w-full" data-name="input-field">
      <div aria-hidden className="absolute border-[1.5px] border-[rgba(255,255,255,0.45)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] py-[18px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-[rgba(255,255,255,0.7)]">Your first name</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Frame">
      <InputField />
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
          <p className="[word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8b3d28] text-[16px] whitespace-nowrap">Continue</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Frame">
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[48px] pt-[28px] px-[24px] relative size-full">
        <ProgressDots />
        <Frame2 />
        <Frame3 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.5)] text-center w-full">You can change this anytime in settings.</p>
        <Spacer />
        <PrimaryButton />
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
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#c95f45] items-start justify-between relative size-full to-[#f2cc8f] via-1/2 via-[#e07a5f]" data-name="onboarding-3">
      <Content />
    </div>
  );
}