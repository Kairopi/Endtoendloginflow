# Plan: Pip v1 Demo Critical Path

## Context

The user is building **Pip** — a voice/text/camera-first health journal — for the Eazo Global Hackathon 2026 (24h build). The 707-line spec covers 32 requirements; the demo path that judges actually walk through is:

> Onboarding → first Note (voice + text) → Health Timeline → Translator → Triage → Pre-Visit Brief → ER Card → After-Visit Receipt

The codebase today is a bare Vite+React+Tailwind scaffold with shadcn/Radix primitives in `src/app/components/ui/`. No feature screens exist. The current `theme.css` is the generic shadcn token set, **not** the canonical Pip 20-token OKLCH system from Requirement 32.

This plan delivers the demo path end-to-end as a polished frontend with mocked data and stubbed external integrations (Translator returns canned plain-English output, Triage runs against a tiny in-memory rule set, Pre-Visit Brief / ER Card generate via html2canvas + jsPDF on the client). Backend, Supabase, real APIs, FHIR export, offline PWA, Family broadcast, and audio-driven After-Visit Receipt are **out of scope** for this pass (V2 / stretch goals per R26, R27).

## Approach

### 1. Foundation — color tokens + mascot (Requirements 28, 32)

- Rewrite `src/styles/theme.css` with the canonical 20-token Pip system (light + dark) defined in R32 criterion 1–2. Map shadcn semantic vars (`--background`, `--primary`, `--destructive`, etc.) onto Pip tokens so existing shadcn UI components keep working.
- Add `src/app/components/pip/PipMascot.tsx` — single component rendering the five canonical states (`hello`, `listening`, `thinking`, `celebrating`, `supporting`) as inline SVG using the locked mascot palette (cobalt `#3B9BE0`, white, orange `#FFA94D`, pink `#FFB6B6`, black `#1A1A1A`). One SVG, props swap pose/expression. Respect `prefers-reduced-motion`.
- Add `src/app/components/pip/ComplianceDisclaimer.tsx` — single source of truth for the canonical disclaimer string (R19 criterion 2).

### 2. App shell + global state (lightweight, no external store)

- `src/app/App.tsx` becomes a small router using **react-router** (already installed) with routes: `/` (onboarding gate → home), `/timeline`, `/translator`, `/triage`, `/brief`, `/er-card`, `/receipt`, `/settings`.
- `src/app/state/PipStore.tsx` — single React Context + `useReducer` holding `{ profiles, activeProfileId, notes, medications, allergies, conditions, tier, onboardingComplete }`. Persist to `localStorage` on every change (good enough for demo).
- Seed empty store; onboarding populates profiles; subsequent screens read/write notes.

### 3. Splash + Login + Onboarding — wire up the imported Figma frames

The user has already imported and edited the Figma designs into `src/imports/`. We **reuse those frames as the visual layer** and wrap them with stateful logic instead of re-skinning from scratch. Files:

- `src/imports/SplashScreen/index.tsx` — splash with Pip mascot face PNG + "Pip" wordmark in Shantell Sans.
- `src/imports/LoginScreenHeroMascot/index.tsx` — hero mascot + "Notice your body. Every day." + Continue with Google / Sign in with email.
- `src/imports/Onboarding1/index.tsx` — DAILY HEALTH JOURNAL pill, "Notice your body. Tend yourself." tagline, three feature rows, "Sounds good" CTA, compliance footer. User edited this file.
- `src/imports/Onboarding2/index.tsx` — "What brings you here?" + 3 radio-style choice cards (Solo / Caregiver / Family) + Continue.
- `src/imports/Onboarding3/index.tsx` — "What's your first name?" input + Continue.
- `src/imports/Onboarding4/index.tsx` — Microphone + Camera permission rows + "Skip for now" + "Get started →". User edited this file.

**Flow order observed in the design:** Splash → Login → Onboarding1 (value/intro) → Onboarding2 (path) → Onboarding3 (name) → Onboarding4 (permissions) → Home.

This differs from the spec ordering (R1 says screen 1 = path, screen 2 = name/relation, screen 3 = value, screen 4 = permissions). **We follow the design order**, treating Onboarding1 as the value statement (R1 criterion 6) shown *before* the path picker, and Onboarding2 as the path picker (R1 criterion 2). The compliance disclaimer already appears on Onboarding1 per the design.

**How to wire them:**

- `src/app/App.tsx` becomes a small router (react-router, already installed) with routes `/splash`, `/login`, `/onboarding`, and the post-onboarding app routes. Boot route logic: no onboarding-complete → `/splash` → auto-advance after 1.5s → `/login`; mock login auto-completes for the demo (any input → onboarded false → onboarding).
- `src/app/components/onboarding/OnboardingFlow.tsx` — controller component holding `{ step, path, firstName, caredForName, caredForRelation, micGranted, cameraGranted }`. Renders the imported Figma frame for the current step inside a fixed 390-wide phone shell on desktop.
- For each imported frame, we **wrap with a thin interactive layer** rather than editing the imports themselves: the imported component renders the visual; the wrapper attaches click handlers to the choice cards / input field / buttons by overlaying transparent buttons or by lifting the import's static JSX into a forked-but-locally-stateful version under `src/app/components/onboarding/screens/`. For Onboarding3 specifically (input field), we fork the visual into `OnboardingNameStep.tsx` and replace the static placeholder paragraph with a real `<input>` bound to state — the input is the only interactive element so the fork is minimal.
- Caregiver path needs an extra mini-screen for relation chips + cared-for name (R1 criterion 4). Insert it as `OnboardingCaregiverStep.tsx` between path-pick and name, reusing Onboarding3's visual styling.
- Family path needs the Pip+ Family explainer (R1 criterion 5). Render it as a small block inside the Onboarding3 view when `path === 'family'`.

**Fonts** (referenced by every imported frame): Lexend Deca (Bold), Manrope (Regular/Medium/SemiBold/Bold), Inter (Regular/SemiBold), Shantell Sans (SemiBold). Add the four `@import` lines from Google Fonts at the top of `src/styles/fonts.css` per the project's font-import rule.

**Permissions** (Onboarding4): tapping "Allow" calls `navigator.mediaDevices.getUserMedia({ audio: true })` / `{ video: true }`, on success flips the row UI to a granted state. "Skip for now" advances without prompting.

**On completion**, dispatch `COMPLETE_ONBOARDING` with profiles per R1 criterion 3/4/5 → navigate to `/`.

### 4. Home + Note Capture (Requirements 3, 4, 5, 6, 7, 29)

`src/app/components/home/HomeScreen.tsx`:
- Active profile switcher pill at top (R2 criterion 8).
- Pip mascot in `hello` state.
- **Co-equal** capture row: large mic button (88×88) + text input affordance (88×56) — same visual weight (R3 criterion 1, R4 criterion 1).
- Camera affordance + "+ Add detail" structured-fields button (R6).
- Below: Health_Timeline preview (last 5 notes for active profile).
- On first home open per local calendar day → Daily_Check_In overlay (R29) — implement Morning/Afternoon/Evening/Night band selection with chip flows. One reusable `<CheckInOverlay band={...} />`.

Note capture components:
- `VoiceNoteCapture.tsx` — hold-to-record using `MediaRecorder` API, live waveform via `AnalyserNode`, 120s cap, stub transcription with a canned response after 1.5s (real server-side proxy is V2).
- `TextNoteCapture.tsx` — full-screen composer, 2000-char cap, 500ms debounced draft persistence to localStorage, embedded mic toggle (R4 criterion 11).
- `PhotoVideoCapture.tsx` — `<input type="file" accept="image/*,video/*" capture>` for cross-platform camera access; up to 10 stills, 30s video cap; strip EXIF client-side via canvas re-encode (R5 criterion 4 / R20 criterion 3).
- On every save, Pip transitions to `celebrating` for 2s then back to `hello`.

### 5. Health Timeline (Requirement 7, 8)

`src/app/components/timeline/HealthTimeline.tsx`:
- Reverse-chronological list of notes for active profile.
- Filters: body-system tag, note type, date range.
- Pattern auto-grouping: when ≥4 notes share a symptom tag in rolling 14d window, collapse into a single Pattern row (R7 criterion 4–6).
- Photo Chronology: group photo notes sharing tag + caption keyword within 14d (R8).
- Free-tier 30-day cutoff (R7 criterion 7) — show "Upgrade to Pip+ for full history" card at the cutoff line.

### 6. Translator (Requirement 9)

`src/app/components/translator/TranslatorScreen.tsx`:
- Input: textarea + paste + mic button + photo upload (OCR stubbed).
- On submit, simulate 1.5s "thinking" with Pip in `thinking` state, then return a mocked plain-English explanation + "Watch for…" red-flag list keyed off a small local lookup table (e.g., 5–10 common terms: `hypertension`, `tachycardia`, `metformin`, `BP 140/90`, …) — anything unknown returns the "We couldn't translate this confidently" fallback (R9 criterion 12).
- Outputs include source citation ("Source: MedlinePlus Connect") + Compliance Disclaimer.
- Save every translation as a Note on the active profile (R9 criterion 13).
- Free tier: 5/month counter persisted in store; soft upgrade prompt on cap.

### 7. Triage Engine (Requirement 10)

`src/app/components/triage/TriageScreen.tsx`:
- Symptom textarea + Pip in `supporting` state.
- Tiny hand-written rule set in `src/app/data/triageRules.ts` keyed off keywords (fever, cough, difficulty breathing, rash) and active profile's age → returns three sections: "Pattern is usually…", "Watch for…", "Call your provider or 911 if…".
- 911-tier triggers elevate the "Call 911 if" section using `--color-emergency-text` on `--color-emergency-whisper`, plus a Call 911 button styled per R10 criterion 8 / R32 criterion 8.
- Citation line (AAP pediatric vs MedlinePlus+CDC adult) per profile age.
- Save as Note (R10 criterion 7).

### 8. Pre-Visit Brief (Requirement 11)

`src/app/components/brief/PreVisitBrief.tsx`:
- One-page A4-styled card laid out as the demo PDF: profile header, top-3 ranked symptoms timeline, dated photo thumbnails, current meds, allergies, conditions, three editable "questions to ask".
- "Download PDF" + "Download PNG" buttons → use **html2canvas + jsPDF** on the rendered DOM node (R11 criterion 10, R31 criterion 4). Skip Mobile Safari server-side fallback for this pass (note it as V2 in code comment).
- Free-tier path: render a teaser + Pip+ upgrade sheet (R11 criterion 8).
- For demo: drop in a "Share with doctor" button that opens a fake QR code + a magic-link copy affordance (Doctor_Hand_Off teaser — full Clinician_View route is a stretch within this pass).

### 9. ER Card (Requirement 14)

`src/app/components/er-card/ERCard.tsx`:
- Per-profile card: name, DOB, sex, blood type, allergies (severe rows in `--color-emergency`), current meds, conditions, emergency contact, Compliance Disclaimer.
- PDF + PNG export via html2canvas/jsPDF.
- Available on all tiers (R14 criterion 1).

### 10. After-Visit Receipt (Requirement 13)

`src/app/components/receipt/AfterVisitReceipt.tsx`:
- Form: visit date, provider (optional), "what the doctor said" (textarea), prescribed meds (chips), follow-up date, "watch for" (chips).
- Rendered as a printable card matching brief styling; PDF/PNG export.
- Audio-driven path is a V2 stretch — manual entry only (R13 criterion 7).
- Free tier: upgrade prompt (R13 criterion 8).

### 11. Medication Manager + Allergy/Condition Profiles (Requirements 15, 16)

`src/app/components/meds/MedicationManager.tsx` — list/add/edit meds for active profile. RxNorm autocomplete stubbed with a 30-entry local list. Interaction check stubbed against a 5-pair local DailyMed-style table — when a flagged pair is added, show the "This combination is sometimes flagged for X. Ask your provider before changing anything." card with disclaimer.

Allergy + Condition profile editors are small forms inside `src/app/components/profile/ProfileSettings.tsx`.

### 12. Bottom Nav + Settings

`src/app/components/nav/BottomNav.tsx` — 5 tabs: Home / Timeline / Translator / Triage / More (More opens a sheet with Brief, Receipt, ER Card, Meds, Settings).

`src/app/components/settings/SettingsScreen.tsx` — Display (Hide Pip toggle R28#7, theme override R32#12, Disable Daily Check-in R29#14), Subscription (tier display + upgrade sheet R21), Privacy (Export, Delete, "We don't train AI on your data." R20).

## Reused / installed dependencies

- Already installed: `react-router`, `motion`, `lucide-react`, `sonner` (toasts), `recharts` (Pattern sparklines if time), `date-fns`, `react-hook-form`, `canvas-confetti` (celebrating state), all shadcn primitives in `src/app/components/ui/`.
- **Install**: `html2canvas`, `jspdf`, `qrcode.react` (for the Doctor_Hand_Off QR teaser).
- No `@make-kits/*` packages in this project — confirmed by package.json scan — so the design-system mandate does not apply; we lean on the local shadcn primitives.

## Color tokens — critical file

Rewrite `src/styles/theme.css` so that:
- All 20 tokens from R32 criterion 1 live on `:root` as CSS custom props with the canonical hex values.
- The R32 criterion 2 dark-mode overrides live inside `@media (prefers-color-scheme: dark) { :root { ... } }`.
- The existing shadcn semantic vars (`--background`, `--foreground`, `--primary`, `--card`, `--destructive`, etc.) are remapped to Pip tokens (`--background: var(--color-bg)`, `--primary: var(--color-brand)`, `--destructive: var(--color-emergency)`, …) so all shadcn UI components inherit Pip styling for free.

## Out of scope this pass (explicit)

- Real backend / Supabase persistence — everything in `localStorage`.
- Server-side Next.js API routes (R31) — there's no Next backend; this is a Vite client app for the demo.
- Real MedlinePlus / RxNorm / OpenFDA / CDC FluView calls (R25) — all stubbed.
- Magic Link Clinician_View at `/view/[token]` (R12) — only a QR teaser on the Brief.
- FHIR R4 export (R12 #9), Audio After-Visit Receipt (R13 #7), Local Prevalence (R17), Offline PWA shell (R24 #3–4), Family Broadcast Note (R30) — all V2.
- Build-time WCAG contrast verifier (R32 #10) — token values are spec-correct; automated check is V2.

## Verification

1. From the project root, the Vite dev server is already running — load the preview surface.
2. Walk the demo path in this order, confirming each step renders and persists:
   - Fresh load → splash (1.5s) → login → tap Continue with Google → Onboarding1 (value) → Onboarding2 (Caregiver path) → caregiver detail step → Onboarding3 (name) → Onboarding4 (permissions, tap Skip) → home with active cared-for profile.
   - Daily Check-In overlay auto-opens (force band via local time or a dev override).
   - Voice Note: hold mic, see waveform, release → see canned transcript + Pip celebrating.
   - Text Note: type, save → see in timeline.
   - Photo Note: upload an image → see thumbnail in timeline.
   - Translator: paste "BP 140/90, prescribed metformin 500mg" → see plain-English output + Watch-for + citation + disclaimer.
   - Triage: type "child fever 103 difficulty breathing" → see 911 elevation styled in emergency tokens.
   - Pre-Visit Brief: tap "I have an appointment" → see one-page card → Download PDF works.
   - ER Card: open ER Card → severe-allergy row renders in emergency color → Download PDF works.
   - After-Visit Receipt: fill form → render printable card → Download PDF works.
3. Toggle OS dark mode → confirm every surface re-themes via the `prefers-color-scheme` media query, no component-level changes.
4. Toggle Settings → Hide Pip → confirm mascot vanishes everywhere; toggle off → returns.
5. `prefers-reduced-motion`: enable in OS → confirm mascot idle bounce + celebration animation disable.

The demo path SHALL complete end-to-end in under 3 minutes on a phone (R24 criterion 6).
