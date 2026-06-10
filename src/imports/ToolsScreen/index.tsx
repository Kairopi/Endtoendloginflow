import svgPaths from "./svg-89pqjbqjya";

function Plus() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="plus">
          <path d={svgPaths.p3f673880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Fab() {
  return (
    <div className="absolute bg-[#e07a5f] bottom-[92px] content-stretch drop-shadow-[0px_4px_8px_rgba(0,0,0,0.15)] flex items-center justify-center right-[24px] rounded-[30px] size-[60px]" data-name="fab">
      <Plus />
    </div>
  );
}

function SignalHigh() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20px]" data-name="signal-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
        <g id="signal-high">
          <path d={svgPaths.pa38e400} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function WifiHigh() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20px]" data-name="wifi-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
        <g id="wifi-high">
          <path d={svgPaths.p35356b80} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function BatteryFull() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24px]" data-name="battery-full">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 20">
        <g id="battery-full">
          <path d={svgPaths.p1144c080} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <SignalHigh />
      <WifiHigh />
      <BatteryFull />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="status-bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3d405b] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
            12:34
          </p>
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="header">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start pb-[20px] pt-[24px] px-[24px] relative size-full">
        <p className="font-['DM_Serif_Display:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#3d405b] text-[36px] w-full">Health Tools</p>
        <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[15px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
          Everything you need before, during, and after a visit.
        </p>
      </div>
    </div>
  );
}

function Stethoscope() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="stethoscope">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="stethoscope">
          <path d={svgPaths.p2f465440} id="Vector" stroke="var(--stroke-0, #D97706)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[#fce8c7] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <Stethoscope />
    </div>
  );
}

function TextContent() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Should I Worry?
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Check a symptom instantly
      </p>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard() {
  return (
    <div className="bg-[#fdf4e3] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#fce8c7] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer />
          <TextContent />
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

function Languages() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="languages">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="languages">
          <path d={svgPaths.p2722080} id="Vector" stroke="var(--stroke-0, #5480B2)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[#d1dfeb] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <Languages />
    </div>
  );
}

function TextContent1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Jargon Translator
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Doctor-speak → plain English
      </p>
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard1() {
  return (
    <div className="bg-[#e9f0f5] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#d1dfeb] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer1 />
          <TextContent1 />
          <ChevronRight1 />
        </div>
      </div>
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="file-text">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="file-text">
          <path d={svgPaths.p2fc0c500} id="Vector" stroke="var(--stroke-0, #C95F45)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="bg-[#fbdde3] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <FileText />
    </div>
  );
}

function TextContent2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Pre-Visit Brief
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        90-day summary for your doctor
      </p>
    </div>
  );
}

function ChevronRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard2() {
  return (
    <div className="bg-[#fdeef1] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#fbdde3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer2 />
          <TextContent2 />
          <ChevronRight2 />
        </div>
      </div>
    </div>
  );
}

function Receipt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="receipt">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="receipt">
          <path d={svgPaths.p2133c200} id="Vector" stroke="var(--stroke-0, #5E8E74)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="bg-[#d1ebe7] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <Receipt />
    </div>
  );
}

function TextContent3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        After-Visit Receipt
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        What the doctor said, in plain English
      </p>
    </div>
  );
}

function ChevronRight3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard3() {
  return (
    <div className="bg-[#eaf5f2] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#d1ebe7] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer3 />
          <TextContent3 />
          <ChevronRight3 />
        </div>
      </div>
    </div>
  );
}

function Pill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pill">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pill">
          <path d={svgPaths.p9cf8040} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer4() {
  return (
    <div className="bg-[#e2e1d9] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <Pill />
    </div>
  );
}

function TextContent4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Medications
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Track meds + check interactions
      </p>
    </div>
  );
}

function ChevronRight4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard4() {
  return (
    <div className="bg-[#f2f1ed] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#e2e1d9] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer4 />
          <TextContent4 />
          <ChevronRight4 />
        </div>
      </div>
    </div>
  );
}

function AlertTriangle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="alert-triangle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="alert-triangle">
          <path d={svgPaths.p3fa64f80} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer5() {
  return (
    <div className="bg-[#fcd9da] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="icon-container">
      <AlertTriangle />
    </div>
  );
}

function TextContent5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="text-content">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[#3d405b] text-[17px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        ER Card
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Always-accessible emergency info
      </p>
    </div>
  );
}

function ChevronRight5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeOpacity="0.501961" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ToolCard5() {
  return (
    <div className="bg-[#fdecee] relative rounded-[20px] shrink-0 w-full" data-name="tool-card">
      <div aria-hidden className="absolute border-[#fcd9da] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <IconContainer5 />
          <TextContent5 />
          <ChevronRight5 />
        </div>
      </div>
    </div>
  );
}

function ToolStack() {
  return (
    <div className="relative shrink-0 w-full" data-name="tool-stack">
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[8px] px-[20px] relative size-full">
        <ToolCard />
        <ToolCard1 />
        <ToolCard2 />
        <ToolCard3 />
        <ToolCard4 />
        <ToolCard5 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col h-[768px] items-start overflow-clip relative shrink-0 w-full" data-name="Frame">
      <StatusBar />
      <Header />
      <ToolStack />
    </div>
  );
}

function Home() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="home">
          <path d={svgPaths.p1e6ad500} id="Vector" stroke="var(--stroke-0, #8C8C94)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Home />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[14px] py-[7px] relative rounded-[100px] shrink-0" data-name="Frame">
      <Frame3 />
      <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#8c8c94] text-[12px] whitespace-nowrap">Home</p>
    </div>
  );
}

function NavHome() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-home">
      <Frame2 />
    </div>
  );
}

function BookOpen() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="book-open">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="book-open">
          <path d={svgPaths.p36698480} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <BookOpen />
    </div>
  );
}

function NavJournal() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-journal">
      <Frame4 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Journal</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="grid">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="grid">
          <path d={svgPaths.p10635e00} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Grid />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-[rgba(224,122,95,0.12)] content-stretch flex gap-[4px] h-[36px] items-center justify-center left-[4px] overflow-clip px-[12px] rounded-[18px] top-[-5.5px] w-[90px]" data-name="Frame">
      <Frame6 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e07a5f] text-[11px] whitespace-nowrap">Tools</p>
    </div>
  );
}

function NavInsights() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-[98px]" data-name="nav-insights">
      <Frame5 />
    </div>
  );
}

function User() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="user">
          <path d={svgPaths.p19c2490} id="Vector" stroke="var(--stroke-0, #8C8C94)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function User1() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="user">
          <path d={svgPaths.p19c2490} id="Vector" stroke="var(--stroke-0, #8C8C94)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <User />
      <User1 />
    </div>
  );
}

function NavProfile() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-profile">
      <Frame7 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Profile</p>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="bg-[rgba(244,242,227,0.96)] content-stretch flex h-[76px] items-center justify-between overflow-clip p-[8px] relative shadow-[0px_-1px_0px_0px_rgba(61,64,91,0.07)] shrink-0 w-[390px]" data-name="bottom-nav">
      <NavHome />
      <NavJournal />
      <NavInsights />
      <NavProfile />
    </div>
  );
}

export default function ToolsScreen() {
  return (
    <div className="bg-[#f5f2e4] content-stretch flex flex-col items-start relative size-full" data-name="tools-screen">
      <Fab />
      <Frame />
      <BottomNav />
    </div>
  );
}