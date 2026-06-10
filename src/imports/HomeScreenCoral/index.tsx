import svgPaths from "./svg-mws4jtxspw";

function Frame() {
  return (
    <div className="h-[14px] relative shrink-0 w-[66px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 14">
        <g id="Frame">
          <path d={svgPaths.p1539b180} fill="var(--fill-0, #3D405B)" id="Vector" />
          <path d={svgPaths.p31dd6800} fill="var(--fill-0, #3D405B)" id="Vector_2" />
          <path d={svgPaths.p3719f980} fill="var(--fill-0, #3D405B)" id="Vector_3" />
          <path d={svgPaths.p7f93780} fill="var(--fill-0, #3D405B)" id="Vector_4" opacity="0.3" />
          <path d="M26 9.5C28 7.5 30 7.5 32 9.5" id="Vector_5" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.5" />
          <path d={svgPaths.p2d5c1c40} id="Vector_6" opacity="0.5" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.5" />
          <path d={svgPaths.pb442f00} fill="var(--fill-0, #3D405B)" id="Vector_7" />
          <path d={svgPaths.p2f229a00} id="Vector_8" stroke="var(--stroke-0, #3D405B)" strokeWidth="1.3" />
          <path d={svgPaths.p9c10600} fill="var(--fill-0, #3D405B)" id="Vector_9" opacity="0.4" />
          <path d={svgPaths.p3777fe80} fill="var(--fill-0, #3D405B)" id="Vector_10" />
        </g>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center justify-between left-0 overflow-clip pb-[10px] pt-[14px] px-[24px] top-0 w-[390px]" data-name="status-bar">
      <p className="[word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3d405b] text-[15px] whitespace-nowrap">9:41</p>
      <Frame />
    </div>
  );
}

function Home() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="home">
          <path d={svgPaths.p1e6ad500} id="Vector" stroke="var(--stroke-0, #E07A5F)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Home />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(224,121,95,0.12)] content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[14px] py-[7px] relative rounded-[100px] shrink-0" data-name="Frame">
      <Frame2 />
      <p className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#e0795f] text-[12px] whitespace-nowrap">Home</p>
    </div>
  );
}

function NavHome() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-home">
      <Frame1 />
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

function Frame3() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <BookOpen />
    </div>
  );
}

function NavJournal() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-journal">
      <Frame3 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Journal</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="grid">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="grid">
          <path d={svgPaths.p10635e00} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <Grid />
    </div>
  );
}

function NavInsights() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-insights">
      <Frame4 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Tools</p>
    </div>
  );
}

function User() {
  return (
    <div className="absolute left-0 size-[22px] top-0" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="user">
          <path d={svgPaths.p19c2490} id="Vector" stroke="var(--stroke-0, #3D405B)" strokeLinecap="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="opacity-35 overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <User />
    </div>
  );
}

function NavProfile() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center overflow-clip p-[4px] relative shrink-0" data-name="nav-profile">
      <Frame5 />
      <p className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#474752] text-[11px] whitespace-nowrap">Profile</p>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="absolute bg-[rgba(244,242,227,0.96)] content-stretch flex h-[76px] items-center justify-between left-0 overflow-clip p-[8px] shadow-[0px_-1px_0px_0px_rgba(61,64,91,0.07)] top-[768px] w-[390px]" data-name="bottom-nav">
      <NavHome />
      <NavJournal />
      <NavInsights />
      <NavProfile />
    </div>
  );
}

function PipFace() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="pip-face">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="pip-face">
          <rect fill="var(--fill-0, #F7E0D6)" height="36" rx="18" width="36" />
          <ellipse cx="8" cy="21.5" fill="var(--fill-0, #F2AD99)" fillOpacity="0.55" id="Ellipse" rx="4" ry="2.5" />
          <ellipse cx="28" cy="21.5" fill="var(--fill-0, #F2AD99)" fillOpacity="0.55" id="Ellipse_2" rx="4" ry="2.5" />
          <ellipse cx="11.5" cy="14" fill="var(--fill-0, #733826)" id="Ellipse_3" rx="2.5" ry="3" />
          <ellipse cx="24.5" cy="14" fill="var(--fill-0, #733826)" id="Ellipse_4" rx="2.5" ry="3" />
          <rect fill="var(--fill-0, #733826)" height="3" id="Rectangle" rx="1.5" width="16" x="10" y="22" />
        </g>
      </svg>
    </div>
  );
}

function Greeting() {
  return (
    <div className="absolute content-stretch flex h-[52px] items-center justify-between left-0 overflow-clip px-[20px] top-[44px] w-[390px]" data-name="greeting">
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#261f1a] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Hey Sarah
      </p>
      <PipFace />
    </div>
  );
}

function MicIcon() {
  return (
    <div className="absolute h-[44px] left-[32px] top-[26px] w-[32px]" data-name="mic-icon">
      <div className="absolute bg-white h-[22px] left-[11px] rounded-[5px] top-0 w-[10px]" data-name="Rectangle" />
      <div className="absolute bg-white h-[10px] left-[4px] rounded-[1px] top-[18px] w-[2.5px]" data-name="Rectangle" />
      <div className="absolute bg-white h-[10px] left-[25.5px] rounded-[1px] top-[18px] w-[2.5px]" data-name="Rectangle" />
      <div className="absolute bg-white h-[2.5px] left-[4px] rounded-[1.25px] top-[27px] w-[24px]" data-name="Rectangle" />
      <div className="absolute bg-white h-[8px] left-[14.5px] rounded-[1.5px] top-[29.5px] w-[3px]" data-name="Rectangle" />
      <div className="absolute bg-white h-[3px] left-0 rounded-[1.5px] top-[41px] w-[32px]" data-name="Rectangle" />
    </div>
  );
}

function MicButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[44px] shrink-0 size-[96px]" data-name="mic-button">
      <MicIcon />
    </div>
  );
}

function GiantVoicePanel() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] h-[490px] items-center justify-center left-0 overflow-clip pb-[36px] pt-[40px] px-[32px] rounded-bl-[36px] rounded-br-[36px] top-[96px] w-[390px]" style={{ backgroundImage: "linear-gradient(128.517deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 24.752%, rgba(0, 0, 0, 0.07) 70.721%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 390 490' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(15 0 0 22.273 195 245)'><stop stop-color='rgba(240,138,107,1)' offset='0'/><stop stop-color='rgba(224,122,95,1)' offset='0.45'/><stop stop-color='rgba(194,94,69,1)' offset='1'/></radialGradient></defs></svg>\")" }} data-name="giant-voice-panel">
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[11px] text-[rgba(255,255,255,0.65)] tracking-[2px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        HOLD TO SPEAK
      </p>
      <div className="[word-break:break-word] font-['DM_Serif_Display:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[40px] text-center text-white whitespace-nowrap">
        <p className="leading-[44px] mb-0">What are you</p>
        <p className="leading-[44px]">noticing?</p>
      </div>
      <MicButton />
      <p className="[word-break:break-word] font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[13px] text-[rgba(255,255,255,0.6)] text-center whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>{`Tap & speak naturally — up to 2 minutes`}</p>
    </div>
  );
}

function IconWrite() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon-write">
      <div className="absolute bg-[#e07a5f] h-[2.5px] left-0 rounded-[1.25px] top-0 w-[16px]" data-name="Rectangle" />
      <div className="absolute bg-[#e07a5f] h-[2.5px] left-0 rounded-[1.25px] top-[6.5px] w-[12px]" data-name="Rectangle" />
      <div className="absolute bg-[#e07a5f] h-[2.5px] left-0 rounded-[1.25px] top-[13px] w-[14px]" data-name="Rectangle" />
    </div>
  );
}

function TextStack() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="text-stack">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#261f1a] text-[14px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Write a note
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[11px] text-[rgba(102,56,41,0.55)]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Headache, fatigue, rash...
      </p>
    </div>
  );
}

function WriteANote() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex gap-[8px] items-center px-[20px] py-[11px] relative rounded-[100px] shrink-0 w-[163px]" data-name="✏  Write a note">
      <div aria-hidden className="absolute border border-[rgba(240,138,107,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <IconWrite />
      <TextStack />
    </div>
  );
}

function IconCamera() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon-camera">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon-camera">
          <rect fill="var(--fill-0, #E07A5F)" height="4" id="Rectangle" rx="2" width="6" x="5" />
          <rect fill="var(--fill-0, #E07A5F)" height="12" id="Rectangle_2" rx="3" width="16" y="3" />
          <circle cx="8" cy="9" fill="var(--fill-0, white)" id="Ellipse" r="4" />
          <circle cx="8" cy="9" fill="var(--fill-0, #E07A5F)" id="Ellipse_2" r="2" />
        </g>
      </svg>
    </div>
  );
}

function TextStack1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="text-stack">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#261f1a] text-[14px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Take a photo
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[11px] text-[rgba(102,56,41,0.55)]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Rash, swelling, med labels...
      </p>
    </div>
  );
}

function TakeAPhoto() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex gap-[8px] items-center px-[20px] py-[11px] relative rounded-[100px] shrink-0 w-[163px]" data-name="📷  Take a photo">
      <div aria-hidden className="absolute border border-[rgba(240,138,107,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <IconCamera />
      <TextStack1 />
    </div>
  );
}

function PillRow() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center justify-center left-[29px] overflow-clip top-[636px]" data-name="pill-row">
      <WriteANote />
      <TakeAPhoto />
    </div>
  );
}

export default function HomeScreenCoral() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(-58.3622deg, rgba(246, 214, 208, 0.18) 35.714%, rgba(246, 214, 208, 0) 67.857%, rgba(246, 214, 208, 0) 107.14%), linear-gradient(121.638deg, rgba(249, 223, 213, 0) 10.714%, rgba(249, 223, 213, 0) 53.571%, rgba(246, 215, 205, 0.4) 82.143%), linear-gradient(90deg, rgb(244, 242, 227) 0%, rgb(244, 242, 227) 100%)" }} data-name="home-screen — coral">
      <StatusBar />
      <div className="absolute left-[170px] size-[300px] top-[-60px]" data-name="bg-orb-top">
        <div className="absolute inset-[-24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 444 444">
            <g filter="url(#filter0_f_3_533)" id="bg-orb-top">
              <circle cx="222" cy="222" fill="var(--fill-0, #FBCCBD)" fillOpacity="0.32" r="150" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="444" id="filter0_f_3_533" width="444" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_3_533" stdDeviation="36" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[-40px] size-[240px] top-[620px]" data-name="bg-orb-bottom">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 360">
            <g filter="url(#filter0_f_3_535)" id="bg-orb-bottom">
              <circle cx="180" cy="180" fill="var(--fill-0, #F7D6C7)" fillOpacity="0.26" r="120" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="360" id="filter0_f_3_535" width="360" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_3_535" stdDeviation="30" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <BottomNav />
      <Greeting />
      <GiantVoicePanel />
      <PillRow />
    </div>
  );
}