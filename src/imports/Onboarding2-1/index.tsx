import svgPaths from "./svg-frdziktyuv";

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
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="progress-dots">
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
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse" r="4" />
        </svg>
      </div>
    </div>
  );
}

function TextCol() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px overflow-clip relative" data-name="text-col">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium min-h-px relative text-[16px] text-white w-full">Just me - noticing my own health</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.65)] w-full">Personal tracking, just for you</p>
    </div>
  );
}

function ChoiceCard() {
  return (
    <div className="bg-[rgba(255,255,255,0.22)] relative rounded-[16px] shrink-0 w-full" data-name="choice-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.35)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[14px] relative size-full">
          <TextCol />
          <div className="relative shrink-0 size-[20px]" data-name="radio-unselected">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" id="radio-unselected" r="9.25" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextCol1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px overflow-clip relative" data-name="text-col">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium min-h-px relative text-[16px] text-white w-full">Someone I care for</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.65)] w-full">Track health for a loved one</p>
    </div>
  );
}

function ChoiceCard1() {
  return (
    <div className="bg-[rgba(255,255,255,0.22)] relative rounded-[16px] shrink-0 w-full" data-name="choice-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.35)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[14px] relative size-full">
          <TextCol1 />
          <div className="relative shrink-0 size-[20px]" data-name="radio-unselected">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" id="radio-unselected" r="9.25" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextCol2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px overflow-clip relative" data-name="text-col">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium min-h-px relative text-[16px] text-white w-full">My whole family</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.65)] w-full">Multiple people, one place</p>
    </div>
  );
}

function ChoiceCard2() {
  return (
    <div className="bg-[rgba(255,255,255,0.22)] relative rounded-[16px] shrink-0 w-full" data-name="choice-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.35)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[14px] relative size-full">
          <TextCol2 />
          <div className="relative shrink-0 size-[20px]" data-name="radio-unselected">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" id="radio-unselected" r="9.25" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Frame">
      <ChoiceCard />
      <ChoiceCard1 />
      <ChoiceCard2 />
    </div>
  );
}

function Spacer() {
  return <div className="flex-[1_0_0] min-h-px relative w-full" data-name="spacer" />;
}

function PrimaryButton() {
  return (
    <div className="bg-white h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="primary-button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
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
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[48px] pt-[24px] px-[24px] relative size-full">
        <ProgressDots />
        <p className="[word-break:break-word] font-['Lexend_Deca:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[28px] text-white w-full">What brings you here?</p>
        <Frame2 />
        <Spacer />
        <PrimaryButton />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center min-h-px relative w-full" data-name="content">
      <StatusBar />
      <Frame1 />
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#c95f45] items-start justify-between relative size-full to-[#f2cc8f] via-1/2 via-[#e07a5f]" data-name="onboarding-2">
      <Content />
    </div>
  );
}