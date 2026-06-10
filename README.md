# Pip — a voice-first health journal

> *When something happens, you'll know what to do.*

Pip is a warm, editorial health-journal PWA — built for the **Figma Config Makeathon 2026**. It captures the small things (a rash on a Tuesday, a 3am cough, "the doctor said something with a Z") in the moment, and turns the noise into a story you can hand to a clinician.

This README is the end-to-end map of what's been built so far, why each decision was made, and where the code lives.

---

## 1. The problem we're solving

People — especially parents, partners, and caregivers — try to keep health journals and **abandon them within two weeks**. The #1 reason isn't laziness: it's that journals demand data entry without giving back pattern recognition. You log faithfully for a month, and the app shows you... your own logs. Data-collection theater.

Pip flips that contract:

- **Capture in any modality** (voice, text, photo, video) in under 5 seconds.
- **Detect patterns automatically** across multiple time windows (14d / 30d / 365d).
- **Hand the story back** — to you, to a doctor, to an EMT — in formats they can use in 60 seconds.

The voice is warm-editorial, not clinical. Fraunces serif + Inter sans, coral-on-cream palette. The app should feel like *a steady second pair of eyes, not a replacement for one*.

---

## 2. What's built

### Onboarding & shell
- **Splash → Login → Onboarding** flow with profile creation (self / child / parent / partner / other).
- **Multi-profile support** — a parent can journal for themselves *and* a child; switching profile re-scopes every screen.
- **PipStore** — single source of truth, `useReducer` + `localStorage` persistence, hydration with month-rolling counters.

`src/app/state/PipStore.tsx`

### Home
- Soft, immediate capture surface — Voice / Text / Photo / Triage starting points.
- Daily check-in (optional, can be disabled).

`src/app/components/home/HomeScreen.tsx`

### Journal (Health Timeline)  ⭐ flagship
This is the heart of the app. It's where Pip earns the user's trust.

- **Heatmap** with calendar-style intensity, sticky sparkline strip when collapsed.
- **Drag-to-select range** — pointer-event dominance detection so vertical scrolling on touch is never hijacked.
- **Multi-window pattern detection** — separates *recent* (< 30d), *ongoing* (30–90d), and *long-arc* (90d+) patterns with editorial duration labels.
- **Bidirectional pattern ↔ heatmap highlight** — tap a pattern, the heatmap days light up; the Range Summary rewrites itself to name the pattern in plain English ("'headache' showed up on 12 of these 30 days").
- **Lightbox** for photo notes — keyboard nav (← → Esc), body scroll lock, dark blurred backdrop.
- **Scroll bottom-padding** sized to clear FAB + tab bar — 10+ entries in a single day are reachable.

`src/app/components/timeline/HealthTimeline.tsx`

### Tools  ⭐ moments-based IA
Rebuilt from a flat 6-card grid into a **moment-of-care** architecture:

- **RIGHT NOW** — Triage (hero with pulsing animation) + ER card
- **AROUND THE VISIT** — Pre-visit brief, Translator, After-visit notes
- **ALWAYS WITH YOU** — Medicine cabinet

Palette restrained to **three hues** (warm amber, cool slate, coral-alarm) so ER stays visually urgent and the rest stays calm. One hero per screen — Triage carries the urgency, everything else is a confident row.

`src/app/components/tools/ToolsScreen.tsx`

### Medications — photo-first cabinet
Real insight driving the design: **users don't remember drug names — they recognize bottles**. Brand variants look different, generics look different, and an ER nurse asks "what does it look like?", not "what's the active ingredient?".

So the cabinet is photo-first:

- **2-column grid** of MedCard tiles (0.82 aspect ratio), photo as hero, frosted name/dose strip.
- **Capture flow** uses `<input capture="environment">` for camera-first, falls back to gallery; FileReader → data URL (no backend needed yet).
- **PharmacyWall** — full-screen dark grid for showing a pharmacist or EMT.
- **Editorial empty state** — *"A photograph remembers, so you don't have to."*

Infrastructure is in place for later OCR/RxCUI lookup via the photo.

`src/app/components/meds/MedicationManager.tsx`

### Other tools (functional, polished iteration TBD)
- **Triage** — two-minute symptom check (`src/app/components/triage/TriageScreen.tsx`)
- **Translator** — doctor-speak → plain language (`src/app/components/translator/TranslatorScreen.tsx`)
- **Pre-visit Brief** — one-pager generator (`src/app/components/brief/PreVisitBrief.tsx`)
- **After-visit Receipt** — capture what was said (`src/app/components/receipt/AfterVisitReceipt.tsx`)
- **ER Card** — emergency info on one screen (`src/app/components/er-card/ERCard.tsx`)

### Profile & settings
- Profile editor, multi-profile switcher
- Settings — hide pip, disable check-in, permissions, wipe data
- Privacy-respecting export/wipe flow

`src/app/components/profile/`, `src/app/components/settings/`

---

## 3. Design system

- **Typography** — Fraunces variable (opsz, SOFT axes) for serif; Inter for sans. All headings and editorial copy use Fraunces with `fontVariationSettings`.
- **Palette** — `#F5F2E4` cream background, `#3D405B` ink, `#E07A5F` coral accent, warm amber / cool slate / coral-alarm for tool categories.
- **Motion** — `motion/react` with editorial easing `[0.22, 1, 0.36, 1]`. Animations are short and confident, never bouncy.
- **Phone frame** — `PhoneFrame` component sets a fixed-height viewport with iOS-style safe-area insets.

`src/styles/theme.css`, `src/styles/fonts.css`, `src/app/components/PhoneFrame.tsx`

---

## 4. Tech stack

- **React 19** + **TypeScript**
- **Vite** (managed by Figma Make — do not run `vite build` locally; the Make harness handles it)
- **Tailwind CSS v4** (no `tailwind.config.js` — tokens in `src/styles/theme.css`)
- **motion/react** for animation
- **pnpm** for package management

Entrypoint: `src/app/App.tsx` (default export). The runtime auto-generates `__figma__entrypoint__.ts` — do not modify.

---

## 5. Project structure

```
src/
  app/
    App.tsx                          # shell, routing
    state/PipStore.tsx               # reducer + context + localStorage
    components/
      PhoneFrame.tsx                 # viewport + safe-area
      SplashScreen.tsx
      LoginScreen.tsx
      onboarding/OnboardingFlow.tsx
      home/HomeScreen.tsx
      timeline/HealthTimeline.tsx    # flagship — heatmap, patterns, lightbox
      tools/ToolsScreen.tsx          # moments-based IA
      meds/MedicationManager.tsx     # photo-first cabinet
      triage/TriageScreen.tsx
      translator/TranslatorScreen.tsx
      brief/PreVisitBrief.tsx
      receipt/AfterVisitReceipt.tsx
      er-card/ERCard.tsx
      profile/                       # profile screens + settings
      settings/SettingsScreen.tsx
      nav/BottomNav.tsx
  styles/
    theme.css                        # design tokens
    fonts.css                        # @import for Fraunces + Inter
```

---

## 6. Decisions worth knowing

- **No backend yet.** All state is `localStorage`. Photos are stored as data URLs in the same store. This is deliberate — Pip's privacy story is *"your story stays on your phone"*. A future paid tier will offer encrypted cloud sync.
- **`usePip` falls back gracefully** if the provider context is briefly missing (Figma Make HMR re-evaluations can transiently drop context). Production renders always have the provider; the fallback prevents a blank-preview crash during hot reloads.
- **Patterns are computed in `useMemo`**, not stored. The journal is the truth; patterns are a derived view. This keeps the data model simple and lets pattern detection evolve without migrations.
- **Drag-to-select uses pointer-movement dominance** (`|dy| > 8 && |dy| > |dx|` cancels drag on touch) so vertical scrolling always wins on mobile.

---

## 7. What's next

- Editorial polish pass on remaining tools (Triage, Translator, Brief, Receipt, ER Card) to match the Journal/Tools/Medications quality bar.
- Voice capture wired to a transcription API (offline whisper or OpenAI).
- Photo OCR → RxCUI lookup for medication auto-fill.
- Encrypted cloud sync for Plus/Family tiers.
- Share-to-clinician flow — secure one-time link.

---

## 8. The makeathon context

Built for **Figma Config Makeathon 2026** — $50k grand prize. Judges include Gui Seiz, Nolan Perkins, Agatha Richards, Jhanvi Bhatia, Jan Mráz, Sergio Cardenas, Michelle, Jarar Malik, and Tran Mau Tri Tam. Goal: make them say *wow* not at the feature list, but at how organized, useful, and quietly humane the whole thing feels.

---

*Pip is a steady second pair of eyes — not a replacement for one.*
