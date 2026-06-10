import svgPaths from "./svg-9ly3oqkvsj";

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

function CategoryPill() {
  return (
    <div className="bg-[rgba(255,255,255,0.18)] relative rounded-[100px] shrink-0" data-name="category-pill">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[14px] py-[6px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[10px] text-white tracking-[1px] whitespace-nowrap">DAILY HEALTH JOURNAL</p>
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.45)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function HeaderGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-name="header-group">
      <p className="[word-break:break-word] font-['Lexend_Deca:Bold',sans-serif] font-bold leading-[1.15] relative shrink-0 text-[34px] text-center text-white w-full">Notice your body. Tend yourself.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="icon">
      <div className="absolute inset-[0_0_-1.39%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18.25">
          <g id="icon">
            <path d={svgPaths.p16e4f040} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d={svgPaths.p30d0f218} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M9 15.5V17.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M6 17.5H12" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-name="Frame">
      <Icon />
    </div>
  );
}

function TextGroup() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px relative" data-name="text-group">
      <p className="flex-[1_0_0] font-['Manrope:SemiBold',sans-serif] font-semibold min-h-px relative text-[15px] text-white w-full">Voice, snap, or type — your way</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.6)] w-full">Speak naturally, take a photo, or just type</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(255,255,255,0.28)] content-stretch flex gap-[12px] items-center py-[14px] relative rounded-[12px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.75)] border-l-3 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame4 />
      <TextGroup />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="icon">
          <path d="M2 14L6 9L10 11.5L16 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 4H16V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-name="Frame">
      <Icon1 />
    </div>
  );
}

function TextGroup1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px relative" data-name="text-group">
      <p className="flex-[1_0_0] font-['Manrope:SemiBold',sans-serif] font-semibold min-h-px relative text-[15px] text-white w-full">Spot patterns your doctor might miss</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.6)] w-full">AI surfaces trends across your entries</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(255,255,255,0.28)] content-stretch flex gap-[12px] items-center py-[14px] relative rounded-[12px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.75)] border-l-3 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame6 />
      <TextGroup1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="icon">
      <div className="absolute inset-[-1.39%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18.25">
          <g id="icon">
            <path d={svgPaths.p165f7d40} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M6 8.75H12" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M6 11.75H10" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[36px]" data-name="Frame">
      <Icon2 />
    </div>
  );
}

function TextGroup2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[normal] min-w-px relative" data-name="text-group">
      <p className="flex-[1_0_0] font-['Manrope:SemiBold',sans-serif] font-semibold min-h-px relative text-[15px] text-white w-full">Walk in prepared, every time</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.6)] w-full">Generate a summary before any appointment</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(255,255,255,0.28)] content-stretch flex gap-[12px] items-center py-[14px] relative rounded-[12px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.75)] border-l-3 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame8 />
      <TextGroup2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-col gap-[10px] items-start px-[12px] py-[8px] relative size-full">
        <Frame3 />
        <Frame5 />
        <Frame7 />
      </div>
    </div>
  );
}

function PrimaryButtonInline() {
  return (
    <div className="bg-white h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="primary-button-inline">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[32px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8b3d28] text-[16px] whitespace-nowrap">Sounds good</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Frame">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center pb-[52px] pt-[36px] px-[24px] relative size-full">
          <CategoryPill />
          <HeaderGroup />
          <Frame2 />
          <PrimaryButtonInline />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.8)] text-center w-[min-content]">Pip is not a medical device. Pip does not diagnose, treat, or replace medical advice. In an emergency, call your local country line.</p>
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
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#c95f45] items-start relative size-full to-[#f2cc8f] via-1/2 via-[#e07a5f]" data-name="onboarding-1">
      <Content />
    </div>
  );
}