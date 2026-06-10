import svgPaths from "./svg-1z4894i402";

function SignalHigh() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="signal-high">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="signal-high">
          <path d={svgPaths.p1ebcfe40} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[18px]" data-name="Frame">
      <SignalHigh />
    </div>
  );
}

function Wifi() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="wifi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="wifi">
          <path d={svgPaths.pa957140} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[18px]" data-name="Frame">
      <Wifi />
    </div>
  );
}

function Battery() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24px]" data-name="battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 20">
        <g id="battery">
          <path d={svgPaths.p242b1c70} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <Frame2 />
      <Frame3 />
      <Battery />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="status-bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#3d405b] text-[15px] whitespace-nowrap">12:34</p>
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] pb-[16px] pt-[20px] px-[24px] relative size-full whitespace-nowrap">
        <p className="font-['DM_Serif_Display:Regular',sans-serif] not-italic relative shrink-0 text-[#3d405b] text-[32px]">Health Timeline</p>
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[13px] text-[rgba(61,64,91,0.5)]" style={{ fontVariationSettings: '"opsz" 14' }}>
          1 pattern detected
        </p>
      </div>
    </div>
  );
}

function FilterChip() {
  return (
    <div className="bg-[#e07a5f] content-stretch flex items-start px-[16px] py-[10px] relative rounded-[100px] shrink-0" data-name="filter-chip">
      <div aria-hidden className="absolute border border-[#e07a5f] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">All (12)</p>
    </div>
  );
}

function FilterChip1() {
  return (
    <div className="bg-white content-stretch flex items-start px-[16px] py-[10px] relative rounded-[100px] shrink-0" data-name="filter-chip">
      <div aria-hidden className="absolute border border-[rgba(61,64,91,0.08)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3d405b] text-[14px] whitespace-nowrap">Patterns (1)</p>
    </div>
  );
}

function FilterChip2() {
  return (
    <div className="bg-white content-stretch flex items-start px-[16px] py-[10px] relative rounded-[100px] shrink-0" data-name="filter-chip">
      <div aria-hidden className="absolute border border-[rgba(61,64,91,0.08)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3d405b] text-[14px] whitespace-nowrap">Photos (4)</p>
    </div>
  );
}

function FilterChip3() {
  return (
    <div className="bg-white content-stretch flex items-start px-[16px] py-[10px] relative rounded-[100px] shrink-0" data-name="filter-chip">
      <div aria-hidden className="absolute border border-[rgba(61,64,91,0.08)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3d405b] text-[14px] whitespace-nowrap">Voice (3)</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <FilterChip />
      <FilterChip1 />
      <FilterChip2 />
      <FilterChip3 />
    </div>
  );
}

function AlertTriangle1() {
  return (
    <div className="absolute left-0 size-[13px] top-0" data-name="alert-triangle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g clipPath="url(#clip0_3_693)" id="alert-triangle">
          <path d={svgPaths.p26548a00} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_3_693">
            <rect fill="white" height="13" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AlertTriangle() {
  return (
    <div className="overflow-clip relative shrink-0 size-[13px]" data-name="alert-triangle">
      <AlertTriangle1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Frame">
      <AlertTriangle />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <Frame7 />
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e07a5f] text-[11px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Recurring Pattern
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="Frame">
      <p className="font-['DM_Serif_Display:Regular',sans-serif] relative shrink-0 text-[#3d405b] text-[24px]">Headache</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(61,64,91,0.5)]">2 notes · May 24 - May 24</p>
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="absolute left-0 size-[11px] top-0" data-name="chevron-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="chevron-right">
          <path d={svgPaths.p1a78e480} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="overflow-clip relative shrink-0 size-[11px]" data-name="chevron-right">
      <ChevronRight1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Frame">
      <ChevronRight />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#e07a5f] text-[14px] whitespace-nowrap">Check triage</p>
      <Frame11 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#e07a5f] text-[14px] whitespace-nowrap">View 2 notes</p>
      <Frame10 />
    </div>
  );
}

function PatternCard() {
  return (
    <div className="bg-[#fdf9f0] drop-shadow-[0px_4px_6px_rgba(61,64,91,0.05)] relative rounded-[20px] shrink-0 w-full" data-name="pattern-card">
      <div aria-hidden className="absolute border-[#e07a5f] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Frame6 />
        <Frame8 />
        <Frame9 />
      </div>
    </div>
  );
}

function FileText1() {
  return (
    <div className="absolute left-0 size-[11px] top-0" data-name="file-text">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="file-text">
          <path d={svgPaths.p34cd9190} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function FileText() {
  return (
    <div className="opacity-60 overflow-clip relative shrink-0 size-[11px]" data-name="file-text">
      <FileText1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Frame">
      <FileText />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#f5f2e4] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <Frame15 />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#3d405b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Text
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Frame">
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[11px] text-[rgba(61,64,91,0.5)] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        MAY 24 AT 10:15 PM
      </p>
      <Frame14 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[rgba(129,178,154,0.1)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5e8e74] text-[12px] whitespace-nowrap">headache</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-start flex flex-wrap gap-y-[8px] items-start relative shrink-0" data-name="Frame">
      <Frame17 />
    </div>
  );
}

function EntryCard() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(61,64,91,0.05)] relative rounded-[20px] shrink-0 w-full" data-name="entry-card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame13 />
        <p className="[word-break:break-word] font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#3d405b] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
          My head has been hurting all morning
        </p>
        <Frame16 />
      </div>
    </div>
  );
}

function FileText3() {
  return (
    <div className="absolute left-0 size-[11px] top-0" data-name="file-text">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="file-text">
          <path d={svgPaths.p34cd9190} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function FileText2() {
  return (
    <div className="opacity-60 overflow-clip relative shrink-0 size-[11px]" data-name="file-text">
      <FileText3 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Frame">
      <FileText2 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#f5f2e4] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <Frame20 />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#3d405b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Text
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Frame">
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[11px] text-[rgba(61,64,91,0.5)] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        MAY 24 AT 10:13 PM
      </p>
      <Frame19 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(129,178,154,0.1)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5e8e74] text-[12px] whitespace-nowrap">{`can't sleep`}</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[rgba(129,178,154,0.1)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5e8e74] text-[12px] whitespace-nowrap">drowsy</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Frame">
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function EntryCard1() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(61,64,91,0.05)] relative rounded-[20px] shrink-0 w-full" data-name="entry-card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame18 />
        <p className="[word-break:break-word] font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#3d405b] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>{`Can't sleep, I feel drowsy`}</p>
        <Frame21 />
      </div>
    </div>
  );
}

function FileText5() {
  return (
    <div className="absolute left-0 size-[11px] top-0" data-name="file-text">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="file-text">
          <path d={svgPaths.p34cd9190} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function FileText4() {
  return (
    <div className="opacity-60 overflow-clip relative shrink-0 size-[11px]" data-name="file-text">
      <FileText5 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Frame">
      <FileText4 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#f5f2e4] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <Frame26 />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#3d405b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Text
      </p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Frame">
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[11px] text-[rgba(61,64,91,0.5)] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        MAY 24 AT 10:08 PM
      </p>
      <Frame25 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[rgba(129,178,154,0.1)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5e8e74] text-[12px] whitespace-nowrap">massive headache</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-start flex flex-wrap gap-y-[8px] items-start relative shrink-0" data-name="Frame">
      <Frame28 />
    </div>
  );
}

function EntryCard2() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(61,64,91,0.05)] relative rounded-[20px] shrink-0 w-full" data-name="entry-card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame24 />
        <p className="[word-break:break-word] font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#3d405b] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
          Woke up with a massive headache
        </p>
        <Frame27 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <EntryCard />
      <EntryCard1 />
      <EntryCard2 />
    </div>
  );
}

function ContentScroll() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="content-scroll">
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[100px] px-[20px] relative size-full">
        <Frame5 />
        <PatternCard />
        <Frame12 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="Frame">
      <StatusBar />
      <Frame4 />
      <ContentScroll />
    </div>
  );
}

function Plus1() {
  return (
    <div className="absolute inset-[20.83%]" data-name="plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0846 11.0846">
        <g id="plus">
          <path d={svgPaths.p32fb5180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Plus() {
  return (
    <div className="overflow-clip relative shrink-0 size-[19px]" data-name="plus">
      <Plus1 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Frame">
      <Plus />
    </div>
  );
}

function Fab() {
  return (
    <div className="absolute bg-[#e07a5f] bottom-[112px] content-stretch drop-shadow-[0px_4px_6px_rgba(61,64,91,0.05)] flex items-center justify-center right-[24px] rounded-[28px] size-[56px]" data-name="fab">
      <Frame29 />
    </div>
  );
}

function Home() {
  return (
    <div className="absolute inset-[9.09%_9.09%_4.55%_9.09%]" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
        <g id="home">
          <path d={svgPaths.p3feaed00} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Home />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[14px] py-[7px] relative rounded-[100px] shrink-0" data-name="Frame">
      <Frame31 />
      <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#8c8c94] text-[12px] whitespace-nowrap">Home</p>
    </div>
  );
}

function NavHome() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-home">
      <Frame30 />
    </div>
  );
}

function BookOpen() {
  return (
    <div className="absolute inset-[9.09%_18.18%]" data-name="book-open">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
        <g id="book-open">
          <path d={svgPaths.p1c61e910} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function BookOpen1() {
  return (
    <div className="absolute inset-[36.36%_36.36%_63.64%_36.36%]" data-name="book-open">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 0.0001">
        <g clipPath="url(#clip0_3_684)" id="book-open">
          <path d={svgPaths.p3f6ed680} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_3_684">
            <rect fill="white" height="0.0001" width="6" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BookOpen2() {
  return (
    <div className="absolute inset-[54.55%_45.45%_45.45%_36.36%]" data-name="book-open">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 0.0001">
        <g clipPath="url(#clip0_3_669)" id="book-open">
          <path d={svgPaths.p9d09980} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_3_669">
            <rect fill="white" height="0.0001" width="4" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <BookOpen />
      <BookOpen1 />
      <BookOpen2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-[rgba(224,122,95,0.12)] content-stretch flex gap-[4px] h-[36px] items-center justify-center left-[4px] overflow-clip px-[12px] rounded-[18px] top-[-5.5px] w-[90px]" data-name="Frame">
      <Frame33 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e07a5f] text-[11px] whitespace-nowrap">Journal</p>
    </div>
  );
}

function NavJournal() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-[98px]" data-name="nav-journal">
      <Frame32 />
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute inset-[31.82%_9.09%_22.73%_13.64%]" data-name="grid">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10">
        <g id="grid">
          <path d={svgPaths.p27e77480} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Grid />
    </div>
  );
}

function NavInsights() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-insights">
      <Frame34 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Tools</p>
    </div>
  );
}

function User() {
  return (
    <div className="absolute bottom-1/2 left-[34.09%] right-[34.09%] top-[18.18%]" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
        <g clipPath="url(#clip0_3_675)" id="user">
          <path d={svgPaths.p1119ff00} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
        <defs>
          <clipPath id="clip0_3_675">
            <rect fill="white" height="7" width="7" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function User1() {
  return (
    <div className="absolute inset-[59.09%_18.18%_9.09%_18.18%]" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 7">
        <g clipPath="url(#clip0_3_681)" id="user">
          <path d={svgPaths.p3d1b4832} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
        <defs>
          <clipPath id="clip0_3_681">
            <rect fill="white" height="7" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame35() {
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
      <Frame35 />
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

export default function JournalScreen() {
  return (
    <div className="bg-[#f5f2e4] content-stretch flex flex-col items-start justify-between relative size-full" data-name="journal-screen">
      <Frame />
      <Fab />
      <BottomNav />
    </div>
  );
}