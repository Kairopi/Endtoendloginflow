# Requirements Document

## Introduction

Pip is a daily voice-, text-, and camera-first health journal for anyone tracking their body. The atomic unit is a **Note**: any moment of body-noticing — a headache, a rash photo, a kid's cough video, a med taken, a forgotten pill — captured in five seconds. Notes accumulate into a **Health Timeline** per Profile, and three killer outputs fall out of the timeline:

1. **The Translator** — paste, speak, or photograph medical jargon and Pip returns a plain-English explanation plus a "watch for" red-flag list.
2. **The Pre-Visit Brief** — a 1-page PDF the doctor reads in 60 seconds: structured timeline, ranked symptoms, dated photos, current meds, three questions to ask.
3. **The After-Visit Receipt** — a printable card summarizing what the doctor said in plain language, meds prescribed, follow-up date, and what to watch for. The keepable artifact.

### The Reframe

Visit-prep apps have been built and have stagnated, because nobody opens an app for an event that happens 2–4 times a year. Pip inverts the problem: the daily habit is **noticing your body**, the visit-prep is one output among several. Cal AI ($30M ARR) won by being a daily camera-pointed-at-meals habit, not a "prep for nutritionist" tool. Pip is the phone-first health journal a normal human will actually open every time they notice their body — voice, typing, photo, or video, whichever feels right at the moment.

### Target Users (in priority order)

1. **Anyone tracking their own health** — the universal solo user; the Free tier is built for them
2. **Adults with chronic conditions** — symptom patterns over time
3. **ADHD adults** who forget medical context between visits
4. **Anyone who has ever been gaslit at a doctor visit**
5. **Caregivers** managing notes for one specific child, parent, partner, or other dependent — the Caregiver onboarding path lands here on the Free tier
6. **Sandwich generation** managing notes for a child and an aging parent simultaneously — the Pip+ Family upgrade tier serves this user

### Hackathon Constraint

Pip ships at the Eazo Global Hackathon 2026 as a 24-hour build. It must be a live, publicly-reachable web app on Eazo Creator, installable as a PWA, and demoable end-to-end on a phone in under three minutes. Anything that cannot ship in 24 hours is explicitly flagged as a stretch goal or excluded as V2.

### FDA General-Wellness Positioning

Pip is positioned as a Patient Organization Tool / general-wellness app under the U.S. FDA's "General Wellness Policy for Low Risk Devices" (FDA-2014-N-1039). Pip never produces a diagnosis, never says "you have X", and never tells a user to start, stop, or change a medication. Every health-relevant surface displays the canonical Compliance Disclaimer and cites its public-domain source.

### Production Readiness — External Data Sources

Pip v1 ships as a production app, not a hackathon demo, and every external data source must work end-to-end for real users. Three external-source decisions reflect this: (1) drug-drug interaction warnings use a curated DailyMed Interaction Table plus OpenFDA, because the NIH RxNav DDI API was discontinued in January 2024; (2) triage rules cite only public-domain references (AAP Bright Futures, MedlinePlus, CDC), because NHS Pathways is a licensed commercial product not redistributable; (3) local infection prevalence ships at state and HHS-region granularity via the Delphi Epidata API, because CDC FluView does not publish a public ZIP-level REST API. These decisions are binding on every external dependency in the spec.

### Eazo Platform Capabilities (V1 Build Assumptions)

Pip v1 is built on confirmed Eazo Creator capabilities: the browser MediaRecorder API for all audio capture, with raw audio persisted to Eazo's built-in object storage; server-side Next.js API routes as the single channel for every external integration (RxNorm, MedlinePlus, OpenFDA, CDC FluView, WastewaterSCAN, ClinicalTrials.gov), so upstream API keys never reach the client; html2canvas plus jsPDF as the client-side rendering pipeline for the Pre_Visit_Brief, After_Visit_Receipt, ER_Card, and Translator exports, with server-side headless rendering as a fallback when pixel-perfect output is required; signed-token URLs at `/view/[token]` for the Doctor_Hand_Off and Clinician_View, requiring no authentication; and the Eazo notifications skill as an optional, OS-backed push channel where supported. Because audio capture and storage are now confirmed end-to-end on the platform, Voice Notes are V1 critical-path, not a stretch goal. The build team SHALL assume Mobile Safari uses server-side PDF rendering exclusively (per Requirement 11 criterion 10), the OpenFDA integration uses a registered API key for the elevated 240-req/min rate limit (per Requirement 25 criterion 8), and offline support is a v2-fast-follow rather than v1 critical-path (per Requirement 26 criterion 1). The build team SHALL implement the canonical 20-token Color System defined in Requirement 32 in light and dark mode on Day 1, with WCAG AA contrast verified at build time.

### Rubric Alignment

Every requirement is tagged with the Eazo rubric dimension(s) it supports:

- **PC** — Product Completeness
- **IN** — Innovation
- **TE** — Technical Execution (Eazo Creator depth)
- **DX** — Design & Experience
- **CP** — Commercial Potential

### Hackathon Track

Pip is submitted to the Eazo Global Hackathon 2026 in the **Body Intelligence** track. The product is also a strong fit for **Superparent** (caregiver and family use cases), and where the hackathon allows secondary track listing Pip SHALL be cross-listed there. Body Intelligence is the primary track because every requirement, every subsystem, and every UI surface in this spec is structured around the body as the data source — daily noticing, photo chronologies, symptom timelines, the Translator, the Triage_Engine, and the Pre_Visit_Brief all operate on body signals.

## Glossary

- **Pip**: The complete product brand AND the illustrated mascot character. Pip the product is the web application, comprising all subsystems below. Pip the mascot is the cobalt-blue plush-chick character defined in Requirement 28, rendered in five canonical states (hello/idle, listening, thinking, celebrating, supporting). When Glossary or requirement text refers to "Pip" alone the meaning is the product; when it refers to "the Pip mascot" or "Pip's [state] state" the meaning is the character. The spec directory remains `pocket-prep` for backwards compatibility.
- **Pip mascot canonical palette**: The five mascot colors locked in Requirement 28 criterion 10 — cobalt blue `#3B9BE0` (back/head/wings), pure white `#FFFFFF` (chest/face), orange `#FFA94D` (beak/feet), soft pink `#FFB6B6` (cheek blush), solid black `#1A1A1A` (eyes). These colors are independent of the app brand color tokens defined in Requirement 32 because the mascot is a self-contained illustration asset.
- **Note**: The atomic unit of capture. A timestamped record attached to one Profile, containing any combination of voice transcript, free text, photo, short video, and optional structured fields.
- **Note_Capture**: The subsystem that records, transcribes, structures, and persists a Note. Note_Capture treats Voice Note, Text Note, Photo Note, and Video Note as co-equal first-class input modes; no input mode is a fallback to another.
- **Voice Note**: A Note whose primary input is hold-to-talk audio of up to 120 seconds, transcribed to text and processed by the NLP_Extractor.
- **Text Note**: A Note whose primary input is typed free text.
- **Photo Note**: A Note containing one or more still images (rash, swelling, pill bottle, paperwork).
- **Video Note**: A Note containing one short clip up to 30 seconds (cough, gait, tremor).
- **NLP_Extractor**: The subsystem that parses Note text/transcript into structured fields (symptom phrase, severity if stated, time references, body system tag).
- **Profile**: A person tracked inside one Pip account. Each account starts with one default Profile created at onboarding. The default Profile's relation is set by the user's chosen onboarding path (Solo → `self`; Caregiver → one of `child`/`parent`/`partner`/`other`; Family → `self` plus the option to add more profiles up to the Pip+ Family limit). All Notes, Patterns, Pre_Visit_Briefs, After_Visit_Receipts, and ER_Cards belong to exactly one Profile.
- **Profile Relation**: One of `self`, `child`, `parent`, `partner`, `other`. Set during onboarding based on the chosen path and editable in Profile settings except for `self` which is fixed for the account owner.
- **Health_Timeline**: The reverse-chronological view of all Notes for one Profile, with auto-grouped Patterns, filterable by symptom, body system, date range, and Note type.
- **Pattern**: An auto-generated cluster of Notes for one Profile that share a symptom signature within a rolling window (e.g., four headache Notes in 14 days become one Headache Pattern).
- **Photo Chronology**: A Pattern subtype that visually sequences repeated photos of the same condition (e.g., rash on day 1, day 3, day 5).
- **Translator**: The subsystem that accepts medical jargon (typed, pasted, spoken, or photographed handout) and returns a plain-English explanation plus a red-flag watch list, citing MedlinePlus/RxNorm.
- **Triage_Engine**: The "Should I Worry" subsystem. Runs rule-based matching against AAP pediatric, MedlinePlus, and CDC guidelines; never diagnostic; outputs "Pattern is usually mild / Watch for X / Call provider or 911 if Y" with citations.
- **Pre_Visit_Brief**: A one-page PDF and PNG generated from the last 90 days of one Profile's Notes: ranked symptom timeline, dated photos, current meds, allergies, conditions, and three questions to ask.
- **Doctor_Hand_Off**: The mechanism by which a Profile's Pre_Visit_Brief or live Clinician View is shared with a clinician via Magic Link or QR Code.
- **Magic Link**: A signed, time-limited URL that opens the Clinician View without requiring a clinician account.
- **QR Code**: A scannable encoding of the Magic Link, displayed in-app for the doctor to scan.
- **Clinician_View**: A clean, read-only web page rendered for a doctor: structured timeline, photos, meds, questions. No Pip chrome, no marketing.
- **After_Visit_Receipt**: A keepable printable card summarizing one visit in plain language: what the doctor said, meds prescribed, follow-up date, what to watch for. User-typed in v1; from recorded audio as a stretch goal.
- **ER_Card**: A per-Profile emergency card containing name, DOB, blood type, allergies, current meds, conditions, emergency contact, and the Compliance Disclaimer. Exportable as PDF/PNG and accessible via a lock-screen-shareable URL.
- **Medication_Manager**: The subsystem that stores meds per Profile, normalizes them via RxNorm, and surfaces interaction warnings via OpenFDA.
- **Allergy_Profile**: The per-Profile list of allergies (substance, severity, reaction).
- **Condition_Profile**: The per-Profile list of diagnosed conditions (label, since-date, notes).
- **Local_Prevalence_Layer**: The subsystem that integrates CDC FluView data via the Delphi Epidata API at state and HHS-region granularity (not ZIP) to surface "flu is currently elevated in your state, the symptoms above are consistent with flu." WastewaterSCAN is V2.
- **Compliance_Layer**: The subsystem responsible for displaying the Compliance Disclaimer and source citations on every health-relevant surface.
- **Compliance Disclaimer**: The canonical string: *"Pip is not a medical device. Pip does not diagnose, treat, or replace medical advice. In an emergency, call 911."*
- **Privacy_Layer**: The subsystem responsible for per-user data partitioning, AES-256 encryption at rest, GPS metadata stripping on media, full export, and full delete.
- **Subscription_Manager**: The subsystem that gates features by tier and processes upgrades.
- **Free Tier**: Up to 2 Profiles (one self-Profile plus one optional cared-for Profile from the Caregiver onboarding path), 30-day rolling Health_Timeline retention, ER_Card, full Triage_Engine, Translator limited to 5 uses per calendar month.
- **Pip+**: $9.99/month tier. Unlimited Translator, unlimited Health_Timeline retention, Pre_Visit_Brief, After_Visit_Receipt, Doctor_Hand_Off.
- **Pip+ Family**: $14.99/month tier. All Pip+ features for up to 6 Profiles.
- **Open_Data_Layer**: The subsystem that calls MedlinePlus Connect, RxNorm, OpenFDA, AAP pediatric guidance, MedlinePlus and CDC adult guidance, CDC FluView (via the Delphi Epidata API at state and HHS-region granularity), and ClinicalTrials.gov, and renders attributions. Drug-drug interaction lookups are NOT performed via the discontinued RxNav DDI API; v1 interaction warnings draw from a curated table sourced from DailyMed labels with adverse-event signal augmentation via OpenFDA.
- **Eazo Creator**: The Eazo hackathon hosting and build platform on which Pip is deployed.
- **PWA**: Progressive Web App; installable to home screen with offline shell.
- **Anti-Streak Mode**: Pip's design stance — zero counters, zero "you missed a day" prompts, gentle "we held this for you" comeback messaging.
- **Stretch Goal**: A requirement explicitly flagged as a v1 reach. If unfinished at the 24-hour mark, the demo path still works without it.
- **V2**: A requirement explicitly excluded from the 24-hour build.
- **Daily_Check_In**: A once-per-local-calendar-day, time-of-day-aware, chip-based conversational greeting that auto-triggers on the user's first home-screen open each day. The Daily_Check_In renders four band variants (Morning, Afternoon, Evening, Night) with band-appropriate copy, sub-question structure, and Pip greeting. Morning, Afternoon, and Evening bands present three sub-questions each (≤15 seconds total when every chip is single-tap); the Night band presents a single open prompt (≤5 seconds). Each chip tap saves a tagged Note attached to the currently active Profile. Skipping or partial completion never causes a same-day re-prompt.
- **Onboarding Path**: One of three first-screen choices a user makes during onboarding per Requirement 1: **Solo** (single self-Profile), **Caregiver** (self-Profile plus one cared-for Profile with relation child / parent / partner / other), or **Family** (self-Profile with the Pip+ Family upgrade prompt surfaced as a dismissible inbox card after onboarding). The chosen path determines the initial Profile set created on the account and the home-screen UI density.
- **DailyMed Interaction Table**: A curated, version-controlled table of drug-drug interaction pairs sourced from DailyMed structured product labels (FDA, public domain). Used as the v1 source of truth for Medication_Manager interaction warnings, since the NIH RxNav Drug Interaction API was discontinued in January 2024.
- **Delphi Epidata API**: The free, public health surveillance API operated by Carnegie Mellon University's Delphi research group, used to access CDC FluView ILINet data at state and HHS-region granularity. The canonical endpoint is `https://api.delphi.cmu.edu/epidata/fluview/`.
- **HHS Region**: One of ten U.S. Department of Health and Human Services administrative regions used by CDC FluView for sub-national surveillance reporting. Used by the Local_Prevalence_Layer when state-level data is missing or sparse for the user's state.
- **Time-of-Day Band**: One of four local-time windows used by the Daily_Check_In to select greeting copy and sub-question structure: Morning (4:00 AM–11:59 AM), Afternoon (12:00 PM–5:59 PM), Evening (6:00 PM–9:59 PM), Night (10:00 PM–3:59 AM).
- **Broadcast Note**: A Note flagged with `broadcast: true` that surfaces in a "From the family" inbox card on the home screen of every account that has been granted view access to the underlying Profile via a read-only share link. *(Stretch goal — depends on Requirement 2 criterion 9.)*
- **Server-Side API Route**: A Next.js API route running on Eazo's server runtime that proxies every external HTTP call (RxNorm, MedlinePlus Connect, OpenFDA, CDC FluView, WastewaterSCAN, ClinicalTrials.gov) so that upstream API keys and request payloads never leave the trusted server boundary.
- **Signed Magic Token**: An opaque, server-signed token persisted in the database against one Pre_Visit_Brief or Profile share record, served at the unauthenticated `/view/[token]` route, revocable by marking the database row invalid.
- **html2canvas Pipeline**: The v1 client-side rendering pipeline that uses html2canvas to rasterize a styled DOM node and jsPDF to package the result as a downloadable PDF or PNG, used for Pre_Visit_Brief, After_Visit_Receipt, ER_Card, and Translator exports.
- **MediaRecorder Pipeline**: The browser-native audio capture path used by Pip: the MediaRecorder API records the microphone stream, the encoded audio file is uploaded to Eazo object storage, and the storage URL is persisted on the Note alongside the transcript.
- **Color System**: The canonical 20-token color system defined in Requirement 32, covering neutrals, surfaces, brand, wellness, illustration, emergency, warning, info, and dark-mode variants. All Pip user-facing surfaces SHALL draw color from this system, never from ad-hoc hex values.
- **Color Token**: A named, semantic color reference (e.g., `--color-text-primary`, `--color-emergency`) used in Pip stylesheets and components. Tokens decouple the visual hex value from the semantic role, so a swap of shade does not require code archaeology.
- **Crimson Alert**: The reserved emergency color, `#C0392B` light / `#FF6B5B` dark, used exclusively for the Triage_Engine 911 affordance, severe-allergy badges on the ER_Card and Pre_Visit_Brief, and red-flag pattern surfaces. Forbidden as a brand, decorative, or non-emergency color.
- **Eggshell**: `#F4F1DE` — the canonical app background color in light mode and the canonical primary text color in dark mode. The most-used color in the system; everything else sits on or near it.
- **OKLCH**: A perceptually uniform color space (CIELAB-derived) used by Pip's design tokens, allowing lightness/chroma/hue to be tuned independently and producing consistent perceived contrast across the palette.
- **Pip Illustration Color**: `#F2CC8F` Apricot Cream is reserved for sticker decorations, photo borders, food chip backgrounds, and other non-mascot decorative surfaces. Apricot Cream SHALL NEVER be used as text on any surface, because its contrast against the Eggshell background is approximately 1.4:1 and fails WCAG AA. Pip mascot illustrations themselves use the canonical mascot palette defined in Requirement 28 criterion 10 (cobalt blue, white, orange, soft pink, black) and are independent of the brand color tokens.

## Requirements

### Requirement 1: Onboarding

**User Story:** As a first-time visitor, I want a four-screen onboarding that asks me upfront whether I'm tracking my own health solo, caring for one specific person, or managing a whole family, and routes the rest of the setup based on my answer, so that the app feels like it was built for whichever role I'm actually in within sixty seconds of landing on Pip. *[PC, DX]*

#### Acceptance Criteria

1. WHEN a user opens Pip for the first time, Pip SHALL present exactly four onboarding screens before the home screen.
2. THE Onboarding flow SHALL display, on screen one, a single welcoming question — "What brings you here?" — and exactly three path choices rendered as full-width buttons of equal visual weight: (a) "Just me — I'm tracking my own health" (Solo path), (b) "Someone I care for — a child, parent, partner, or someone else" (Caregiver path), (c) "My whole family — multiple people in one account" (Family path).
3. WHEN the user taps the Solo path on screen one, THE Onboarding flow SHALL navigate to screen two and SHALL render a single field "What's your first name?" without any relation prompt; on save, Pip SHALL create one Profile with relation `self` for the account owner.
4. WHEN the user taps the Caregiver path on screen one, THE Onboarding flow SHALL navigate to screen two and SHALL render three fields in order: (a) "What's your first name?" for the account owner, (b) "Who are you caring for?" with a chip selector offering child / parent / partner / other, (c) "What's their first name?" for the person being cared for; on save, Pip SHALL create one Profile with relation `self` for the account owner AND one additional Profile with the chosen relation for the person being cared for, with the cared-for Profile set as the active Profile by default. The Caregiver path SHALL NOT trigger a paywall on screen two; the second Profile is granted on the Free tier as the user's chosen onboarding context.
5. WHEN the user taps the Family path on screen one, THE Onboarding flow SHALL navigate to screen two and SHALL render two fields: (a) "What's your first name?" for the account owner, (b) a one-sentence explanation "You can add up to six profiles on Pip+ Family ($14.99/mo). Start with yourself now and add the rest after onboarding."; on save, Pip SHALL create one Profile with relation `self` for the account owner AND SHALL surface the Pip+ Family upgrade affordance on the home screen as the first dismissible inbox card after onboarding completes. The Family path SHALL NOT charge or paywall during onboarding itself; the user lands on the home screen with a clear next step to add more profiles.
6. THE Onboarding flow SHALL display, on screen three, a one-sentence value statement tailored to the chosen path (Solo: "Notice your body. Tend yourself."; Caregiver: "One place for the person you care for."; Family: "One account. Everyone's health.") AND the canonical Compliance Disclaimer verbatim per Requirement 19 criterion 2.
7. THE Onboarding flow SHALL request, on screen four, microphone and camera permissions with plain-language rationale and a "Skip for now" option.
8. WHEN the user completes screen four, Pip SHALL navigate directly to the home screen with both the Voice Note microphone button and the Text Note input affordance rendered at equal visual weight per Requirement 3 criterion 1 and Requirement 4 criterion 1, without auto-focusing either input mode (auto-focus would violate the co-equal capture-mode rule).
9. IF the user denies microphone permission on screen four, THEN Pip SHALL still allow Text Note, Photo Note, and Video Note capture without re-prompting.
10. WHEN the user reopens Pip after completing onboarding, Pip SHALL skip onboarding and load the home screen directly.
11. WHEN screen one is rendered, THE Onboarding flow SHALL display the Pip mascot in the hello state above the path-choice question, with the mascot's accessible name set to "Pip mascot illustration" per Requirement 28 criterion 9.
12. WHEN screen two is rendered for any of the three paths, THE Onboarding flow SHALL display the Pip mascot in the listening state alongside the form fields, signaling attentiveness while the user types.
13. THE Onboarding flow SHALL inform the user, on screen three or in Settings, that the Pip mascot can be hidden at any time from Settings → Display → Hide Pip and that all Pip functionality remains available without the mascot, per Requirement 28 criterion 7.

### Requirement 2: Profile Management

**User Story:** As a caregiver in the sandwich generation, I want one account that holds Notes for myself, my kids, and my aging parents, so that I never have to remember which app or which login goes with which person. *[PC, IN, CP]*

#### Acceptance Criteria

1. Pip SHALL create the initial Profile(s) for every new account at onboarding based on the path chosen in Requirement 1: Solo creates one self-Profile; Caregiver creates one self-Profile and one cared-for Profile with the chosen relation; Family creates one self-Profile.
2. WHEN the user taps "Add Profile", Pip SHALL prompt for first name, relation (one of `self`, `child`, `parent`, `partner`, `other`), date of birth, and biological sex.
3. Pip SHALL persist the Profile and make them selectable in Note_Capture and Health_Timeline within two seconds of save.
4. Pip SHALL allow the user to edit any Profile field except `self` relation, which is fixed for the account owner.
5. WHEN the user deletes a non-self Profile, Pip SHALL require an explicit confirmation and SHALL delete all that member's Notes, photos, videos, and profile fields within 24 hours.
6. WHILE on the Free tier, THE Subscription_Manager SHALL limit the account to two Profiles maximum (to support the Caregiver onboarding path's self + cared-for pair); attempting to add a third Profile SHALL surface the Pip+ Family upgrade prompt.
7. WHILE on Pip+ Family, THE Subscription_Manager SHALL allow up to six Profiles.
8. WHEN the user is composing or viewing data, Pip SHALL display the currently active Profile at the top of the screen with a one-tap switcher.
9. WHERE the user invites another adult to view a specific Profile, Pip SHALL generate a read-only share link, scoped to that one Profile, revocable at any time. *(Stretch goal — read+write collaboration is V2.)*

### Requirement 3: Voice Note Capture

**User Story:** As a parent at 2am, I want to hold a single button and talk for five seconds — "kid's fever 102, gave Tylenol at 7" — and have it captured as a structured Note, so that capturing a moment of body-noticing has the lowest possible activation energy. *[PC, IN, TE, DX]*

#### Acceptance Criteria

1. THE Note_Capture SHALL display two co-equal capture controls on the home screen: one large microphone button (sized at least 88 by 88 CSS pixels) for Voice Note Capture, and one large text input affordance (sized at least 88 by 56 CSS pixels) for Text Note Capture, both rendered above the Health_Timeline at equal visual weight.
2. WHEN the user presses and holds the microphone button, THE Note_Capture SHALL begin recording audio and SHALL display a live waveform.
3. THE Note_Capture SHALL cap a single Voice Note recording at 120 seconds and SHALL stop and save automatically at the cap.
4. WHEN the user releases the microphone button, THE Note_Capture SHALL stop recording and SHALL transmit the audio for transcription.
5. THE Note_Capture SHALL return a transcribed text result within 5 seconds of release for recordings of 30 seconds or less.
6. WHEN transcription completes, THE NLP_Extractor SHALL extract symptom phrases, stated severity, body-system tags, and any time references, and SHALL attach them to the Note as structured fields.
7. THE Note_Capture SHALL save the Note to the currently active Profile's Health_Timeline.
8. THE Note_Capture SHALL allow the user to edit the transcript and structured fields before or after save.
9. IF transcription fails or times out, THEN THE Note_Capture SHALL still save the raw audio and the Note, and SHALL display a "tap to retry transcription" affordance.
10. THE Note_Capture SHALL retain the original audio file until the user explicitly deletes it.
11. THE Note_Capture SHALL use the browser MediaRecorder API as the recording mechanism and SHALL persist the encoded audio file to Eazo object storage, storing the resulting storage URL on the Note record.
12. THE Note_Capture SHALL submit recorded audio for transcription via a server-side Next.js API route, and SHALL never expose the upstream transcription provider's API key to the client.

### Requirement 4: Text Note Capture

**User Story:** As a user in a quiet room, in a meeting, with hearing or speech preferences, in public, or with a personal preference for typing, I want to capture a Note by typing — at the same speed and quality as voice — without the text input feeling like a fallback, so that text Notes are a first-class part of the daily noticing habit. *[PC, IN, TE, DX]*

#### Acceptance Criteria

1. THE Note_Capture SHALL display the text input affordance on the home screen at equal visual weight to the microphone button, with a placeholder prompt such as "what's going on?" and a one-tap focus interaction that opens the full text composer.
2. WHEN the user taps the text input affordance or the placeholder prompt, THE Note_Capture SHALL open a full-screen text composer within 200 milliseconds and SHALL focus the keyboard automatically on platforms where focus is permitted.
3. THE Note_Capture SHALL accept up to 2,000 characters of free text in the composer, with a visible character counter that surfaces only after the user has typed 1,800 characters.
4. THE Note_Capture SHALL allow the user to attach optional photos and short video to a Text Note from within the composer, sharing the same Photo and Video Note constraints defined in Requirement 5.
5. THE Note_Capture SHALL persist the in-progress text Note as a local draft after every keystroke pause of 500 milliseconds or longer, so that closing the app or losing focus mid-compose does not lose the user's text.
6. WHEN the user reopens the home screen with an active text-Note draft persisted, THE Note_Capture SHALL surface a "continue your draft" affordance at the top of the home screen until the user either saves or explicitly discards the draft.
7. WHEN the user taps "Save" in the text composer, THE NLP_Extractor SHALL extract symptom phrases, stated severity, body-system tags, and any time references identically to a Voice Note, and SHALL attach them to the Note as structured fields.
8. WHEN the user saves a Text Note, THE Note_Capture SHALL save the Note to the currently active Profile's Health_Timeline within 1 second.
9. WHEN a Text Note is successfully saved, Pip SHALL display Pip in the celebrating state for no longer than 2 seconds before returning to the hello state, identical to the Voice Note save behavior defined in Requirement 28 criterion 4.
10. THE Note_Capture SHALL allow the user to edit the saved Text Note's content, attached media, and structured fields at any time.
11. WHILE the user is in the text composer, THE Note_Capture SHALL display a microphone affordance inside the composer that, when tapped, switches the input mode to Voice Note Capture without losing the typed text — the typed text SHALL remain in the composer and SHALL be appended to (not replaced by) the transcribed result.
12. WHILE the active band is the Daily_Check_In, the Text Note path SHALL be available from any chip that offers a Text option (the body-status chip in Morning, Afternoon, and Evening bands; the open prompt in the Night band), opening the same full-screen text composer defined in this requirement.

### Requirement 5: Photo and Video Note Capture

**User Story:** As a parent, I want to snap a photo of a rash or a 10-second video of my baby's cough and have it stored as a Note tied to my child's timeline, so that I have visual evidence the doctor can see. *[PC, IN, TE]*

#### Acceptance Criteria

1. THE Note_Capture SHALL provide a camera affordance on the home screen that opens the device camera in photo or video mode.
2. THE Note_Capture SHALL accept up to 10 still images per Note.
3. THE Note_Capture SHALL cap Video Note clips at 30 seconds.
4. WHEN the user saves a Photo Note or Video Note, THE Privacy_Layer SHALL strip GPS and other location metadata from the file before persistence.
5. THE Note_Capture SHALL allow the user to add an optional voice or text caption to any Photo Note or Video Note.
6. WHEN the user saves a Photo Note, THE NLP_Extractor SHALL suggest body-system tags from the caption and SHALL allow the user to confirm or edit the tags.
7. THE Note_Capture SHALL display a thumbnail preview within the Health_Timeline within two seconds of save.
8. WHERE two or more Photo Notes share a body-system tag and a similar caption within a 14-day window, THE Health_Timeline SHALL auto-group them into a Photo Chronology.

### Requirement 6: Optional Structured Fields

**User Story:** As a user who wants to track meds, food, blood pressure, exercise, sleep, or mood alongside my Notes, I want optional structured fields available on demand, so that I get more structure when I want it without ever being forced into a clinical form. *[PC, DX, CP]*

#### Acceptance Criteria

1. THE Note_Capture SHALL hide all optional structured fields behind a single "+ Add detail" affordance.
2. WHERE the user taps "+ Add detail", THE Note_Capture SHALL offer at minimum: medication, food, blood pressure, exercise, sleep, mood.
3. THE Note_Capture SHALL never make any structured field required to save a Note.
4. THE Note_Capture SHALL save any structured fields entered as part of the Note's metadata for later filtering and reporting.
5. WHEN the user has not used any structured field for 30 days, Pip SHALL not surface a prompt or nudge encouraging structured tracking.

### Requirement 7: Health Timeline per Profile

**User Story:** As a user, I want a reverse-chronological timeline of every Note for one Profile, with similar Notes auto-grouped into Patterns, so that I can see the shape of what is happening to a person over time. *[PC, IN, TE, DX]*

#### Acceptance Criteria

1. THE Health_Timeline SHALL display Notes in reverse-chronological order for the currently active Profile.
2. THE Health_Timeline SHALL render each Note with its date, time, primary type icon (voice, text, photo, video), summary text, and any auto-extracted symptom tags.
3. THE Health_Timeline SHALL provide filters for body-system tag, Note type, and date range.
4. WHEN four or more Notes for the same Profile share a symptom tag within a rolling 14-day window, THE Health_Timeline SHALL auto-create a Pattern grouping them.
5. THE Health_Timeline SHALL display each Pattern as a single collapsible row showing the symptom name, count, first and most recent date, and a one-tap expand to view all member Notes.
6. WHEN the user adds a new Note that matches an existing Pattern, THE Health_Timeline SHALL attach the Note to that Pattern automatically.
7. WHILE on the Free Tier, THE Health_Timeline SHALL display only the most recent 30 days of Notes.
8. WHILE on Pip+ or Pip+ Family, THE Health_Timeline SHALL display the full unlimited history.
9. THE Health_Timeline SHALL load the first screen of Notes within 1 second on a 4G connection for timelines with 500 Notes or fewer.

### Requirement 8: Photo and Video Chronology

**User Story:** As a parent tracking a worsening rash or a swelling joint, I want repeated photos of the same area auto-sequenced into a "this rash, over four days" view, so that the progression is obvious to me and to my doctor. *[PC, IN, DX]*

#### Acceptance Criteria

1. WHEN two or more Photo Notes share a body-system tag and overlap in caption keywords within 14 days, THE Health_Timeline SHALL auto-group them into a Photo Chronology Pattern.
2. THE Photo Chronology SHALL render the photos in chronological order with each photo's date and any caption.
3. THE Photo Chronology SHALL allow the user to manually add or remove a Photo Note from the chronology.
4. THE Photo Chronology SHALL be exportable as a single PDF page included in the Pre_Visit_Brief when the Pattern falls within the brief's 90-day window.

### Requirement 9: The Translator (paste/speak/photograph)

**User Story:** As a user who just left a doctor's office holding a sheet of jargon, I want to speak it, paste it, or photograph it and get a plain-English explanation plus a watch list, so that I understand what my doctor told me before I forget. *[PC, IN, TE, DX, CP]*

#### Acceptance Criteria

1. THE Translator SHALL accept input as typed text, pasted text, microphone audio recording, or photograph of a printed handout via OCR.
2. THE Translator SHALL return a plain-English explanation of medical terms, conditions, lab values, or medications recognized in the input.
3. THE Translator SHALL return a "Watch for" red-flag list derived from MedlinePlus and RxNorm content.
4. THE Translator SHALL never produce a diagnosis, never say "you have X", and never tell the user to start, stop, or change a medication.
5. THE Translator SHALL phrase outputs as "this means…" / "watch for…" / "call your provider if…".
6. THE Translator SHALL display the source citation (e.g., "Source: MedlinePlus Connect") below every output.
7. THE Translator SHALL display the Compliance Disclaimer below every output.
8. THE Translator SHALL return a result within 5 seconds for typed or pasted input under 500 characters.
9. WHILE on the Free Tier, THE Subscription_Manager SHALL limit Translator usage to 5 successful translations per calendar month.
10. WHILE on Pip+ or Pip+ Family, THE Subscription_Manager SHALL allow unlimited Translator usage.
11. WHEN the user reaches the Free Tier monthly limit, THE Translator SHALL display a soft, anti-shame upgrade prompt and SHALL still allow the user to view past translations.
12. IF the input cannot be confidently translated, THEN THE Translator SHALL return "We couldn't translate this confidently. Please ask your provider to clarify."
13. THE Translator SHALL save every translation as a Note attached to the currently active Profile, so that translated jargon enters the Health_Timeline.
14. THE Translator SHALL route every upstream MedlinePlus Connect and RxNorm request through a server-side Next.js API route, and SHALL never issue those calls directly from the browser client.
15. WHERE the user exports a Translator output as a downloadable artifact, THE Translator SHALL render the export using the html2canvas plus jsPDF pipeline.

### Requirement 10: "Should I Worry" Gentle Triage

**User Story:** As a parent at 2am wondering whether the fever needs the ER, I want to describe a symptom and get an action-oriented "usually mild / watch for X / call 911 if Y" answer with a citation, so that I have a defensible next step that is not a diagnosis. *[PC, IN, DX, CP]*

#### Acceptance Criteria

1. THE Triage_Engine SHALL accept a symptom description as text or transcribed voice and the active Profile's age and biological sex.
2. THE Triage_Engine SHALL select its rule set based on the Profile's age: the curated AAP Bright Futures pediatric guidance for ages under 18, and the curated MedlinePlus + CDC adult guidance for ages 18 and older. Triage rules are a curated, version-controlled internal rule set sourced from these public-domain references; no licensed third-party triage product is redistributed.
3. THE Triage_Engine SHALL return an output structured as three sections: "Pattern is usually…", "Watch for…", and "Call your provider or 911 if…".
4. THE Triage_Engine SHALL never return a diagnosis, never name a condition the user has, and never recommend a specific medication.
5. THE Triage_Engine SHALL display the source citation for the rule set used (e.g., "Based on AAP Bright Futures pediatric guidance" or "Based on MedlinePlus + CDC adult guidance").
6. THE Triage_Engine SHALL display the Compliance Disclaimer on every output.
7. THE Triage_Engine SHALL save every triage check as a Note attached to the active Profile.
8. WHEN the rule set indicates a 911-tier symptom (e.g., difficulty breathing, infant under 3 months with fever, stroke signs), THE Triage_Engine SHALL elevate the "Call 911 if" line to the top of the output, render that section using `--color-emergency-text` on `--color-emergency-whisper` background per Requirement 32 criterion 7, and SHALL display a one-tap "Call 911" affordance button rendered as `--color-emergency` fill with white foreground.
9. THE Triage_Engine SHALL return a result within 3 seconds.
10. THE Triage_Engine SHALL be available on all tiers, including Free.

### Requirement 11: Pre-Visit Brief Generation

**User Story:** As a user about to see a doctor, I want a one-tap one-page PDF summarizing the last 90 days for one Profile, so that the doctor reads it in 60 seconds and the visit is finally about me. *[PC, IN, TE, DX, CP]*

#### Acceptance Criteria

1. WHEN the user taps "I have an appointment" for a Profile, THE Pre_Visit_Brief SHALL generate a one-page PDF and a one-page PNG covering the last 90 days of that member's Notes.
2. THE Pre_Visit_Brief SHALL include, in order: header with Profile's name, age, and sex; ranked symptom timeline (top 3 symptoms by frequency or severity with first/last date); dated photo thumbnails for any Photo Chronology in window; current medications from the Medication_Manager; allergies from the Allergy_Profile; conditions from the Condition_Profile; three "questions to ask" suggested by the user.
3. THE Pre_Visit_Brief SHALL display the Compliance Disclaimer in the footer.
4. THE Pre_Visit_Brief SHALL display source citations for any Open_Data_Layer content used.
5. THE Pre_Visit_Brief SHALL generate within 10 seconds for a 90-day window containing up to 100 Notes.
6. THE Pre_Visit_Brief SHALL allow the user to edit the three "questions to ask" before generation.
7. THE Pre_Visit_Brief SHALL be downloadable, printable, and shareable as PDF and PNG.
8. WHILE on the Free Tier, THE Subscription_Manager SHALL block Pre_Visit_Brief generation and SHALL display a soft upgrade prompt.
9. WHILE on Pip+ or Pip+ Family, THE Subscription_Manager SHALL allow unlimited Pre_Visit_Brief generation.
10. THE Pre_Visit_Brief SHALL render the v1 PDF and PNG using the html2canvas plus jsPDF pipeline on the client when the user agent is NOT Mobile Safari. WHEN the detected user agent is Mobile Safari (iOS 15 or later), THE Pre_Visit_Brief SHALL skip the client-side pipeline entirely and render via the server-side headless pipeline. IF either pipeline fails or exceeds the 10-second budget defined in criterion 5, THEN THE Pre_Visit_Brief SHALL surface a "Generation took longer than expected — tap to retry" affordance and SHALL retain any in-progress draft so the user does not lose data.

### Requirement 12: Doctor Hand-Off (Magic Link, QR Code, Clinician View)

**User Story:** As a user in the exam room, I want to tap "share with my doctor" and have the doctor scan a QR code that opens a clean clinician web page with my last 90 days, so that the hand-off is friction-free for the doctor. *[PC, IN, TE, DX, CP]*

#### Acceptance Criteria

1. WHEN the user taps "Share with doctor" on a Pre_Visit_Brief, THE Doctor_Hand_Off SHALL generate a signed Magic Link and SHALL render a QR Code encoding it on screen.
2. THE Magic Link SHALL be valid for a default of 24 hours and SHALL be revocable by the user at any time.
3. WHEN the Magic Link is opened, THE Clinician_View SHALL render a read-only web page with the Pre_Visit_Brief content, no Pip marketing, no upgrade prompts, no chrome unrelated to clinical hand-off.
4. THE Clinician_View SHALL display the Compliance Disclaimer at the bottom.
5. THE Clinician_View SHALL be optimized for desktop browsers and SHALL render legibly on tablets.
6. THE Clinician_View SHALL allow the clinician to download the Pre_Visit_Brief PDF.
7. THE Doctor_Hand_Off SHALL log every Magic Link access (timestamp, IP-derived region) and SHALL display this log to the user.
8. WHILE on the Free Tier, THE Subscription_Manager SHALL block Doctor_Hand_Off and SHALL display a soft upgrade prompt.
9. WHERE the user requests, THE Doctor_Hand_Off SHALL export the Pre_Visit_Brief as a FHIR R4 bundle for ingestion by an EHR. *(Stretch goal — if not done, PDF download is the fallback.)*
10. THE Doctor_Hand_Off SHALL implement the Magic Link as a Signed Magic Token persisted in the database against the Pre_Visit_Brief record, and SHALL serve the Clinician_View at the unauthenticated route `/view/[token]`.
11. WHEN the user revokes a Magic Link, THE Doctor_Hand_Off SHALL mark the corresponding token row invalid in the database, and any subsequent request to `/view/[token]` SHALL render a friendly "this link is no longer active" page without exposing any Pre_Visit_Brief content.

### Requirement 13: After-Visit Receipt

**User Story:** As a user leaving an appointment, I want a beautiful printable card that captures what the doctor said in plain English, the meds prescribed, the follow-up date, and what to watch for, so that I have a keepable artifact I can read in two minutes a week later. *[PC, IN, DX, CP]*

#### Acceptance Criteria

1. WHEN the user taps "Capture After-Visit Receipt" for a Profile, THE After_Visit_Receipt SHALL prompt the user to type or paste a plain-language summary of what the doctor said.
2. THE After_Visit_Receipt SHALL collect the following fields: visit date, provider name (optional), what the doctor said in plain language, medications prescribed (with RxNorm normalization), follow-up date or window, and "watch for" items.
3. THE After_Visit_Receipt SHALL render as a printable card (PDF and PNG) styled to match Pip's warm aesthetic.
4. THE After_Visit_Receipt SHALL display the Compliance Disclaimer in the footer.
5. THE After_Visit_Receipt SHALL be saved as a Note attached to the Profile.
6. THE After_Visit_Receipt SHALL update the Medication_Manager and Condition_Profile if the user confirms changes.
7. WHERE the user has consented and recorded visit audio, THE After_Visit_Receipt SHALL transcribe and pre-fill the receipt fields. *(Stretch goal — if not done in 24 hours, user types the receipt manually.)*
8. WHILE on the Free Tier, THE Subscription_Manager SHALL block After_Visit_Receipt generation and SHALL display a soft upgrade prompt.

### Requirement 14: ER Companion Card

**User Story:** As a caregiver in an emergency, I want every Profile to have an always-accessible card with name, DOB, blood type, allergies, current meds, conditions, and emergency contact, so that an ER team has the basics in 10 seconds. *[PC, IN, DX, CP]*

#### Acceptance Criteria

1. THE ER_Card SHALL be available for every Profile regardless of subscription tier.
2. THE ER_Card SHALL display: name, date of birth, biological sex, blood type (if entered), allergies, current medications, conditions, and one emergency contact (name and phone).
3. THE ER_Card SHALL display the Compliance Disclaimer at the bottom.
4. THE ER_Card SHALL be exportable as PDF and PNG.
5. THE ER_Card SHALL be available at a stable per-Profile URL that the user can save to their phone's lock-screen as a shortcut or wallpaper image.
6. WHEN the ER_Card URL is opened without authentication, THE ER_Card SHALL render a read-only minimal view containing only the fields above and SHALL not link into the rest of Pip.
7. THE ER_Card SHALL load within 2 seconds on a 4G connection.

### Requirement 15: Medication Manager with RxNorm Interaction Warnings

**User Story:** As a user managing my own and a parent's meds, I want to add a med, see it normalized to RxNorm, and get a soft warning if a new med interacts with an existing one — without ever being told to stop a med. *[PC, IN, TE, CP]*

#### Acceptance Criteria

1. THE Medication_Manager SHALL allow the user to add a medication per Profile with name, dose, frequency, and start date.
2. WHEN the user types a medication name, THE Medication_Manager SHALL autocomplete from RxNorm.
3. WHEN a medication is saved, THE Medication_Manager SHALL store its RxNorm RxCUI.
4. WHEN a new medication is added, THE Medication_Manager SHALL check for known interactions with existing meds against the curated DailyMed Interaction Table, augmented with adverse-event signals from OpenFDA, and SHALL display any interaction warnings as informational text.
5. THE Medication_Manager SHALL phrase every interaction warning as "This combination is sometimes flagged for X. Ask your provider before changing anything."
6. THE Medication_Manager SHALL never instruct the user to start, stop, or change a medication.
7. THE Medication_Manager SHALL display the Compliance Disclaimer on every interaction warning surface.
8. THE Medication_Manager SHALL surface current medications on the ER_Card and Pre_Visit_Brief.
9. IF the OpenFDA service is unavailable or the DailyMed Interaction Table cannot be loaded, THEN THE Medication_Manager SHALL still save the medication as free text, SHALL display "Interaction check unavailable; we'll retry," AND SHALL retry the interaction check on the next successful network reachability event.
10. THE DailyMed Interaction Table SHALL ship with the v1 build as a server-side static dataset, version-stamped, containing at minimum 50 high-prevalence interaction pairs sourced from DailyMed structured product labels (FDA, public domain). The table SHALL be updateable server-side without a client release.

### Requirement 16: Allergy and Condition Profiles

**User Story:** As a user, I want a place to store allergies and diagnosed conditions per Profile so that they show up on the ER_Card and the Pre_Visit_Brief. *[PC]*

#### Acceptance Criteria

1. THE Allergy_Profile SHALL allow the user to add per Profile: allergen, severity (mild, moderate, severe), and reaction.
2. THE Condition_Profile SHALL allow the user to add per Profile: condition label, since-date, and free-text notes.
3. THE Allergy_Profile and Condition_Profile SHALL surface their entries on the ER_Card and Pre_Visit_Brief.
4. Pip SHALL never auto-populate the Condition_Profile from Notes or Translator output without explicit user confirmation.

### Requirement 17: Local Prevalence Layer (CDC FluView, WastewaterSCAN)

**User Story:** As a user, when my kid has a sore throat and I check Pip, I want to see "flu is high in your state or HHS region, your symptoms are consistent" so that I have local context, not just a generic answer. *[IN, TE, CP]*

#### Acceptance Criteria

1. WHERE the user has shared their state or HHS region, THE Local_Prevalence_Layer SHALL fetch current CDC FluView ILINet data for that state via the Delphi Epidata API and SHALL fall back to the corresponding HHS region when state-level data for the most recent reporting week is not available.
2. WHEN a Triage_Engine output's symptom signature aligns with a current locally-elevated infection (CDC ILINet "high" or "very high" intensity for the relevant week), THE Triage_Engine SHALL append a one-line note such as "Flu is currently elevated in your state; the symptoms above are consistent with flu."
3. THE Local_Prevalence_Layer SHALL display the source "Source: CDC FluView via Delphi Epidata, U.S. National Center for Health Statistics" and the data's CDC reporting week (MMWR week and year).
4. THE Local_Prevalence_Layer SHALL never use ZIP for any purpose, SHALL only request state or HHS region from the user, and SHALL not store geographic identifiers in any record-level Note metadata.
5. IF the Delphi Epidata API is unavailable or the cached weekly data is older than 14 days, THEN THE Triage_Engine SHALL still return its core output without the prevalence line.
6. THE Local_Prevalence_Layer SHALL cache successful Delphi Epidata responses for 24 hours per state and per HHS region.

### Requirement 18: Anti-Streak / Anti-Shame Behavior

**User Story:** As a user who has been guilt-tripped by other tracking apps, I want Pip to never count my streaks, never shame me for missing days, and always welcome me back warmly, so that I keep coming back. *[DX, CP]*

#### Acceptance Criteria

1. Pip SHALL never display a streak counter, missed-day counter, or compliance percentage anywhere in the UI.
2. Pip SHALL never send a notification, prompt, or in-app message that uses negative framing (e.g., "you haven't logged in 3 days").
3. WHEN the user returns after seven or more days of inactivity, Pip SHALL display a single warm comeback message such as "Welcome back. We held everything for you" and SHALL not list days missed.
4. Pip SHALL allow any optional bonus prompt ("log this meal?", "log evening meds?") to be dismissed permanently in one tap.

### Requirement 19: Compliance Disclaimers

**User Story:** As Pip's operator, I want every health-relevant surface to display the canonical Compliance Disclaimer with its source citation, so that we sit cleanly inside the FDA General Wellness Policy. *[PC, CP]*

#### Acceptance Criteria

1. THE Compliance_Layer SHALL display the canonical Compliance Disclaimer string verbatim on the following surfaces: every Translator output, every Triage_Engine output, every Pre_Visit_Brief, every After_Visit_Receipt, every ER_Card, every Medication_Manager interaction warning, every Clinician_View.
2. THE canonical Compliance Disclaimer string SHALL be: *"Pip is not a medical device. Pip does not diagnose, treat, or replace medical advice. In an emergency, call 911."*
3. THE Compliance_Layer SHALL render the Compliance Disclaimer at minimum 12 CSS-pixel font size and at WCAG AA contrast against its background, drawing color from `--color-text-secondary` against the surface's background token per Requirement 32.
4. THE Compliance_Layer SHALL never collapse, hide behind a tooltip, or require a tap to reveal the Compliance Disclaimer on any surface listed in criterion 1.
5. WHEN Pip produces any output sourced from an Open_Data_Layer endpoint, THE Compliance_Layer SHALL render an attribution line (e.g., "Source: MedlinePlus Connect, U.S. National Library of Medicine") adjacent to the content.
6. Pip SHALL never use the words "diagnose", "diagnosis", or "you have" in any user-facing output addressed to the patient.
7. Pip SHALL never use the words "start", "stop", "increase", or "decrease" in any user-facing output that addresses a specific medication.

### Requirement 20: Privacy and Data Ownership

**User Story:** As a user, I want my data partitioned per account, encrypted at rest, never used to train AI, and exportable or deletable on demand, so that I can trust Pip with the most sensitive thing I have. *[PC, TE, CP]*

#### Acceptance Criteria

1. THE Privacy_Layer SHALL store every account's Notes, photos, videos, audio, and profile fields in a per-user partition such that no query returns another user's data.
2. THE Privacy_Layer SHALL encrypt all Notes, photos, videos, and audio at rest using AES-256.
3. THE Privacy_Layer SHALL strip GPS and other location metadata from every uploaded photo and video before persistence.
4. THE Privacy_Layer SHALL provide a one-tap "Export all my data" action that delivers a ZIP containing every Note, every media file, every profile, and every Pre_Visit_Brief and After_Visit_Receipt as JSON plus original media.
5. THE Privacy_Layer SHALL provide a one-tap "Delete my account" action that, after explicit confirmation, deletes all user data within 24 hours.
6. Pip SHALL display, on the privacy screen, the explicit statement: "We don't train AI on your data."
7. Pip SHALL not use any user Note, photo, video, or audio for model training, fine-tuning, or evaluation.
8. WHEN Pip sends user content to a third-party transcription, OCR, or LLM service, THE Privacy_Layer SHALL minimize the payload to the necessary fields and SHALL not include identifiers tying the content to the user account.

### Requirement 21: Free Tier, Pip+, and Pip+ Family

**User Story:** As Pip's operator, I want a Free tier that delivers daily value, a Pip+ tier at $9.99 that unlocks the visit-prep moat, and a Pip+ Family tier at $14.99 that captures the sandwich generation, so that the product converts. *[CP]*

#### Acceptance Criteria

1. THE Free Tier SHALL include: up to 2 Profiles (one self-Profile plus one optional cared-for Profile to support the Caregiver onboarding path defined in Requirement 1 criterion 4, consistent with Requirement 2 criterion 6), 30-day rolling Health_Timeline retention, ER_Card, full Triage_Engine, and Translator limited to 5 successful translations per calendar month.
2. THE Pip+ tier SHALL cost $9.99 per month and SHALL include: unlimited Translator, unlimited Health_Timeline retention, Pre_Visit_Brief, After_Visit_Receipt, Doctor_Hand_Off, and Photo Chronology export.
3. THE Pip+ Family tier SHALL cost $14.99 per month and SHALL include all Pip+ features for up to 6 Profiles.
4. WHEN a user attempts to use a Pip+ feature on the Free Tier, THE Subscription_Manager SHALL display a soft, anti-shame upgrade prompt with one-tap upgrade.
5. WHEN a Free Tier user reaches the Translator monthly cap, THE Subscription_Manager SHALL display the upgrade prompt and SHALL still allow viewing of past translations.
6. THE Subscription_Manager SHALL allow the user to downgrade or cancel at any time without contacting support.
7. WHEN a user downgrades to Free, THE Subscription_Manager SHALL retain all data and SHALL only enforce the Free tier's display and feature gates; data is never deleted on downgrade.

### Requirement 22: Accessibility

**User Story:** As a user with motor, vision, vestibular, or cognitive needs, I want Pip to meet WCAG AA, support reduced motion, expose voice as an accessibility input, and have generous touch targets, so that the product works for me. *[PC, DX]*

#### Acceptance Criteria

1. Pip SHALL render every interactive control with a minimum touch target size of 44 by 44 CSS pixels.
2. Pip SHALL meet WCAG 2.1 Level AA color contrast on every text and meaningful icon, drawing color exclusively from the canonical Color System defined in Requirement 32, and SHALL verify the AA contrast ratios at build time per Requirement 32 criterion 10.
3. Pip SHALL respect the `prefers-reduced-motion` media query and SHALL disable non-essential animations when set.
4. Pip SHALL expose every interactive control to assistive technology with a meaningful accessible name.
5. Pip SHALL position both the Voice Note hold-to-talk button and the Text Note text input affordance as co-equal primary inputs on the home screen, so that no user — including users with hearing, speech, motor, or environmental constraints, and users who simply prefer typing — is forced into a fallback path to capture a Note.
6. Pip SHALL support full keyboard navigation of every interactive control on every screen.
7. Pip SHALL display visible focus indicators on every focusable element.
8. Pip SHALL avoid color-only information, providing icon, text, or shape redundancy on any colored signal.

### Requirement 23: Performance

**User Story:** As a user, I want fast first paint, fast voice transcription, fast Pre_Visit_Brief generation, and 60 fps animations, so that Pip feels like a phone-native habit. *[PC, TE, DX]*

#### Acceptance Criteria

1. Pip SHALL render a meaningful first paint within 3 seconds on a 4G connection on a mid-range mobile device.
2. THE Note_Capture SHALL return a transcription result within 5 seconds for Voice Notes of 30 seconds or less.
3. THE Pre_Visit_Brief SHALL generate within 10 seconds for a 90-day window containing up to 100 Notes.
4. THE Triage_Engine SHALL return a result within 3 seconds.
5. THE Translator SHALL return a result within 5 seconds for typed or pasted input under 500 characters.
6. Pip SHALL maintain 60 frames per second during the home-screen mic-button press, the Health_Timeline scroll, and the photo carousel scroll on a 2023-or-newer mid-range mobile device.

### Requirement 24: Live Eazo Deployment and PWA Installable

**User Story:** As a hackathon judge, I want to open the app on my phone, install it to my home screen, and complete the demo path end-to-end in under three minutes, so that Pip is a real shippable product, not a slide deck. *[PC, TE, CP]*

#### Acceptance Criteria

1. Pip SHALL be deployed as a publicly-reachable web app on the Eazo Creator platform at a stable URL by the end of the 24-hour hackathon window.
2. Pip SHALL be installable as a Progressive Web App on iOS Safari and Android Chrome with a valid web manifest and service worker.
3. Pip SHALL provide an offline application shell that loads the home screen and renders previously-cached Notes when the device is offline. *(Stretch goal — see Requirement 26.)*
4. WHEN a Voice Note, Text Note, Photo Note, or Video Note is created offline, Pip SHALL queue the Note locally and SHALL sync it on next connectivity. *(Stretch goal — see Requirement 26.)*
5. Pip SHALL pass a Lighthouse PWA audit on Mobile Chrome with no critical failures.
6. Pip SHALL be demoable end-to-end (onboarding → first Voice Note → Translator → Pre_Visit_Brief → Doctor_Hand_Off → After_Visit_Receipt → ER_Card) on a single phone in under 3 minutes.

### Requirement 25: Open Data Layer Integration and Attribution

**User Story:** As Pip's operator, I want every public-domain data source integrated with citations and graceful degradation, so that the Translator and Triage_Engine are defensible and the demo never blanks out when an API blips. *[PC, TE, CP]*

#### Acceptance Criteria

1. THE Open_Data_Layer SHALL integrate the following sources for v1: MedlinePlus Connect, RxNorm (for medication name standardization only — drug-drug interaction lookups are handled by the DailyMed Interaction Table per Requirement 15), OpenFDA, the curated AAP Bright Futures pediatric guidance, the curated MedlinePlus + CDC adult guidance, and CDC FluView via the Delphi Epidata API at state and HHS-region granularity.
2. THE Open_Data_Layer SHALL NOT include WastewaterSCAN in v1; WastewaterSCAN integration is V2.
3. THE Open_Data_Layer SHALL render an attribution string on every surface that uses content from a source, naming the source (e.g., "Source: MedlinePlus Connect, U.S. National Library of Medicine").
4. WHEN any Open_Data_Layer endpoint returns an error or times out, Pip SHALL render a neutral fallback message ("Reference data temporarily unavailable") and SHALL still allow the user to save the underlying Note.
5. THE Open_Data_Layer SHALL cache responses for at least 24 hours to reduce demo-time API failure risk.
6. THE Open_Data_Layer SHALL surface ClinicalTrials.gov trial matching as a stretch / V2 feature and SHALL not include it in the v1 demo path.
7. WHERE the Doctor_Hand_Off FHIR R4 export is shipped, THE Open_Data_Layer SHALL emit a valid FHIR R4 bundle representing the Pre_Visit_Brief content. *(Stretch goal.)*
8. THE Open_Data_Layer SHALL register and use a free OpenFDA API key on every server-side request to OpenFDA, raising the rate limit from the 40 req/min anonymous default to 240 req/min authenticated, consistent with Requirement 31 criterion 3 server-side-only API key handling.
9. THE Open_Data_Layer SHALL document the canonical endpoints, expected payloads, and rate limits for every external source in the design document, so that the build team can implement the server-side proxy routes without ambiguity.

### Requirement 26: Stretch Goals (Explicitly Flagged)

**User Story:** As Pip's operator, I want every stretch goal explicitly flagged so that the 24-hour team knows what to drop first if behind schedule, and the demo path never depends on a stretch goal. *[PC, CP]*

#### Acceptance Criteria

1. THE following requirements SHALL be explicitly designated as Stretch Goals: Requirement 2 criterion 9 (read-only family share link); Requirement 12 criterion 9 (FHIR R4 export); Requirement 13 criterion 7 (audio-driven After_Visit_Receipt); Requirement 24 criterion 3 (offline application shell); Requirement 24 criterion 4 (offline Note queueing); Requirement 25 criterion 7 (FHIR R4 bundle); Requirement 30 in its entirety (Family Broadcast Note).
2. THE demo path SHALL function end-to-end without any Stretch Goal completed.
3. WHERE a Stretch Goal is unfinished at the 24-hour mark, Pip SHALL hide its UI affordance entirely rather than displaying a broken or "coming soon" surface.
4. IF the Pip mascot illustration assets are not finished by hour 22 of the 24-hour build, THEN Pip SHALL ship without Pip enabled by default and the Daily_Check_In and all other surfaces SHALL still function as a clean text-driven experience without any illustrations.

### Requirement 27: V2 Exclusions (Explicitly Out of Scope)

**User Story:** As Pip's operator, I want the V2 exclusions written into the spec so that scope creep during the 24-hour build is impossible. *[PC]*

#### Acceptance Criteria

1. Pip v1 SHALL NOT include wearable integration with Apple Health, Google Fit, Oura, or Whoop.
2. Pip v1 SHALL NOT include direct telehealth booking.
3. Pip v1 SHALL NOT include insurance claim appeal letter generation.
4. Pip v1 SHALL NOT include any UI language other than English.
5. Pip v1 SHALL NOT include native iOS or Android applications; the product is web-first via Eazo.
6. Pip v1 SHALL NOT include pet or veterinary support.
7. Pip v1 SHALL NOT include real-time clinician chat.
8. Pip v1 SHALL NOT include live caregiver collaboration with role-based access; v1 ships read-only PNG/PDF and Magic Link share only.
9. Pip v1 SHALL NOT include vaccine record OCR import.
10. Pip v1 SHALL NOT surface ClinicalTrials.gov trial matching in the user-facing UI; trial matching is V2.
11. Pip v1 SHALL NOT include AI calorie estimation from breakfast photos captured during the Daily_Check_In; the photo is stored as a Note tagged with `food` and the relevant body-system tag, and calorie counting is V2 (Cal AI's lane, not Pip's).
12. Pip v1 SHALL NOT include any Pip voice or text generation that exceeds the curated warmth-line library; Pip SHALL never speak dynamically generated content in v1.
13. Pip v1 SHALL NOT include WastewaterSCAN integration; this is V2.
14. Pip v1 SHALL NOT include NHS Pathways triage content or any other licensed third-party triage product; v1 triage rules are sourced exclusively from public-domain references (AAP Bright Futures, MedlinePlus, CDC).
15. Pip v1 SHALL NOT include the discontinued NIH RxNav Drug-Drug Interaction API; medication interaction warnings in v1 use the DailyMed Interaction Table augmented by OpenFDA adverse-event signals.

### Requirement 28: Pip Mascot

**User Story:** As a user who finds clinical software cold and intimidating, I want a single warm, non-anthropomorphic illustrated companion who shows up at the right moments without ever giving me medical advice, so that Pip feels like an ally rather than a chart. *[DX, IN]*

#### Acceptance Criteria

1. Pip SHALL render Pip in exactly five still states: hello/idle, listening, thinking, celebrating, and supporting, and SHALL select the state from the surface context (home greeting, microphone engaged, processing, Note saved, alongside triage output).
2. THE Pip SHALL never produce, display, or speak clinical content; Pip's lines SHALL be drawn from a curated warmth-and-UI-copy library only, and the Translator and Triage_Engine SHALL remain the sole producers of any health-relevant output.
3. WHEN the home screen is rendered, Pip SHALL display Pip in the hello state above the Note_Capture surface.
4. WHEN a Note of any type (Voice, Text, Photo, Video) is successfully saved, Pip SHALL display Pip in the celebrating state for no longer than 2 seconds before returning to the hello state, with no visual difference in celebration between Note types.
5. WHEN a Triage_Engine output is rendered, Pip SHALL display Pip in the supporting state alongside the output without overlapping the Compliance Disclaimer or the citation line.
6. WHEN a Translator request is in flight, Pip SHALL display Pip in the thinking state, and on result delivery SHALL transition Pip to the celebrating state for no longer than 2 seconds.
7. Pip SHALL provide a "Hide Pip" toggle in Settings → Display that, when enabled, SHALL immediately remove Pip from every surface and SHALL persist the preference across sessions and devices for the same account.
8. WHILE the user's device reports `prefers-reduced-motion`, Pip SHALL render Pip as a static illustration with no idle bounce or transition animation.
9. Pip SHALL set Pip's accessible name to the string "Pip mascot illustration" on every render, so that screen readers describe Pip consistently.
10. Pip mascot illustrations SHALL be rendered using the mascot's canonical color palette: cobalt blue `#3B9BE0` for back/head/wings, pure white `#FFFFFF` for the heart-shaped chest patch and face, orange `#FFA94D` for the beak and feet, soft pink `#FFB6B6` for the cheek blush, and solid black `#1A1A1A` for the eyes. Pip mascot illustrations SHALL NEVER be tinted in `--color-emergency` to preserve the emergency-color reservation defined in Requirement 32 criterion 7.
11. Pip mascot illustrations SHALL conform to a fixed anatomical specification at every state and surface, locked to the mascot already generated for v1: a soft chibi-bird silhouette with an egg-shaped fluffy body slightly taller than wide; a curled blue feather quiff hooking forward on top of the head shaped like a soft question mark; a white heart-shaped chest patch that extends upward to surround the face; two large round solid-black eyes sized 15-20% of face area, positioned in the lower 40% of the face, each with one large specular highlight at the upper-left and one tiny dot highlight at the lower-right; two thin light-blue eyebrow strokes above the eyes; a small orange triangular beak shorter than wide, centered between and slightly below the eyes; two soft pink circular blush patches on the cheeks; two short rounded mitten-shaped wings in cobalt blue with no individual feather definition; two oversized chibi three-toed orange feet planted flat. Head height SHALL be approximately 55-60% of total figure height. Pip the mascot SHALL have no human features, no nose, no visible teeth or tongue (except the soft pink mouth interior visible only in the celebrating state), and no eyeglasses or accessories. These proportions encode the Kindchenschema baby-schema that drives the cute-affect response.
12. Pip mascot assets SHALL be rendered as soft 3D plush illustrations with a fluffy fur shader, subsurface scattering, warm studio key lighting from the upper-left, soft fill from the right, and gentle ambient occlusion, on a transparent or solid-color background as required by the surface. Pip mascot assets SHALL be delivered as PNG at @1x (200×200), @2x (400×400), and @3x (600×600) for hero surfaces and as PNG at 80×80 for inline surfaces (chip rows, citation lines, inbox cards). AI-generated rendering is permitted for v1 provided every shipped asset passes the character consistency checklist in criterion 11 (curled blue feather quiff, heart-shaped white chest patch, dual eye highlights, beak proportions, color zones, plush fur texture). Every Pip mascot asset shipped in v1 SHALL be reviewed against criterion 11 before commit; assets that fail the consistency checklist SHALL be regenerated and SHALL NOT be merged.
13. THE Pip SHALL never be rendered, posed, animated, or copy-written in any of the following tones: aggressive, sarcastic, sad, urgent, medical, diagnostic, clinical, sleepy, anxious, or judgmental; the warmth-and-UI-copy library cited in criterion 2 SHALL be reviewed against this banned-tone list before each release, and any string that reads in any of the banned tones SHALL be rejected from the library.
14. THE Pip SHALL be implemented as a silent-witness companion archetype: THE Pip SHALL NOT have a voice, a name beyond "Pip", a backstory, opinions, preferences, or any anthropomorphic personality traits; THE Pip's only verbal contributions SHALL be the curated warmth-and-UI-copy strings drawn from the library cited in criterion 2; THE Pip SHALL NEVER appear to address the user as a peer, give advice of any kind, or claim agency over any Pip subsystem output, preserving the contract that the Translator and Triage_Engine remain the sole producers of any health-relevant content per criterion 2.
15. THE five canonical Pip mascot states defined in criterion 1 SHALL each have a fixed pose specification, a canonical set of surface triggers, and a canonical maximum on-screen duration, listed below. These specifications are binding on every Pip mascot asset shipped in v1 and on every surface that renders the mascot.

    **(a) hello/idle** — Pose: standing upright on both feet, weight evenly distributed, body still and grounded, both wings resting naturally at the sides; subtle 3/4 turn toward camera; expression is a gentle closed-beak smile, beak tipped slightly upward in a content curve, eyes open and calm looking softly forward, eyebrows neutral. Mood: warm hello, present, unhurried. Triggers: home screen default render (R3, R4); onboarding screen one (R1#11); after the celebrating state's 2-second cap elapses and the mascot auto-returns; after the user dismisses any modal that previously rendered Pip in another state. Maximum duration: indefinite (this is the resting state).

    **(b) listening** — Pose: head tilted gently to the right by approximately 15 degrees, body still and quietly attentive, both wings tucked close in front of the chest in a soft listening posture; expression is eyes slightly wider and brighter than idle with the highlights more visible, beak closed in a small soft smile, eyebrows raised just slightly conveying interest. Mood: attentive, focused, undivided. Triggers: microphone button engaged during Voice Note recording (R3#2); Daily_Check_In Voice / Photo / Text shortcut chip opened (R29#15); onboarding screen two while the user is typing (R1#12); the moment the Translator audio input is recording (R9#1). Maximum duration: indefinite while the trigger is active; transitions back to hello/idle when the trigger ends.

    **(c) thinking** — Pose: head tilted upward and slightly to the left, gaze directed up-left as if looking at a thought; one wing lifted up and lightly touching the side of the head/cheek in a soft "hmm" gesture, the other wing relaxed at the side; above the head, three small soft fluffy white dots float in a gentle ascending curve; expression is beak in a small thoughtful pucker, eyes looking up-left following the dots, eyebrows softly furrowed in concentration. Mood: working on it, patient, kind. Triggers: Translator request in flight (R9#8, R28#6); Pre_Visit_Brief generation in flight (R11#5); After_Visit_Receipt generation in flight (R13); NLP_Extractor running on a saved Note (R3#6, R4#7); Triage_Engine processing (R10#9). Maximum duration: bounded by the upstream operation's timeout (5 seconds for Translator, 10 seconds for Pre_Visit_Brief, 3 seconds for Triage_Engine); transitions to celebrating on success or hello/idle on failure.

    **(d) celebrating** — Pose: both wings raised up and outward in a wide victory cheer, body leaned slightly back mid-bounce with feet appearing to just barely lift off the ground; expression is beak open in a wide delighted smile revealing a small soft pink mouth interior, eyes squinted into happy upward closed-arc curves resembling a `^_^` shape, pink cheek blush slightly more prominent; around the head, three to five soft white four-point sparkle motifs float in a gentle arc at varying sizes. Mood: joyful, proud-of-you, warm. Triggers: any Note successfully saved (Voice / Text / Photo / Video per R28#4); Translator result delivered (R28#6); Pre_Visit_Brief generated; After_Visit_Receipt saved; Daily_Check_In final answer saved (R29#15); ER_Card first generated. Maximum duration: 2 seconds, then auto-return to hello/idle (R28#4, R28#6, R29#15).

    **(e) supporting** — Pose: standing grounded with feet planted, one wing extended forward and slightly toward the viewer in an open palm-up offering gesture as if holding out a hand, the other wing rests gently across the chest over the heart area; head bowed very slightly forward and down; expression is a soft warm closed-beak smile with the beak tipped slightly downward, eyes gentle and steady (open, not squinted, with soft highlights), eyebrows neutral with a hint of tenderness. Mood: present-with-you, caring, steady. Triggers: alongside Triage_Engine output, including the 911-tier elevation surface (R10#8, R28#5); alongside any red-flag pattern card surface; alongside a "we held this for you" comeback message after seven or more days of inactivity (R18#3). Maximum duration: indefinite while the trigger surface is on screen; transitions to hello/idle when the surface is dismissed.

### Requirement 29: Daily Conversational Check-in (Time-of-Day Aware)

**User Story:** As a parent or caregiver who opens Pip at unpredictable times — morning coffee, afternoon slump, evening wind-down, or 2am with a sick kid — I want a single chip-based conversation whose greeting, sub-questions, and pacing adapt to whichever time-of-day band I open the app in, so that the daily noticing habit happens once per day, on my schedule, without ever feeling like a quiz at the wrong moment. *[PC, IN, DX, CP]*

#### Acceptance Criteria

1. THE Daily_Check_In SHALL define exactly four Time-of-Day Bands evaluated against the user's local device time: Morning (4:00 AM–11:59 AM), Afternoon (12:00 PM–5:59 PM), Evening (6:00 PM–9:59 PM), and Night (10:00 PM–3:59 AM, where any open between 12:00 AM and 3:59 AM SHALL be treated as belonging to the previous calendar day's check-in if that previous day's check-in has not yet been completed).
2. WHEN the user opens the home screen for the first time on a new local calendar day, THE Daily_Check_In SHALL automatically present an overlay above the Note_Capture surface, regardless of which Time-of-Day Band the open falls in.
3. WHEN the Daily_Check_In overlay first opens on a given calendar day, THE Daily_Check_In SHALL select its Time-of-Day Band from the user's local device time at that moment of first open and SHALL freeze that band selection for the duration of that day's check-in, so that a check-in started at 5:55 PM completes as Afternoon even if the user finishes after 6:00 PM.
4. WHILE the active band is Morning, Afternoon, or Evening, THE Daily_Check_In SHALL render exactly three sub-questions in order; WHILE the active band is Night, THE Daily_Check_In SHALL render exactly one open prompt and SHALL NOT render the multi-step three-sub-question flow.
5. WHILE the active band is Morning, THE Daily_Check_In SHALL render Pip's greeting line as a personalized wake-up — "morning, [name] — how are we starting?" — with the Pip mascot in the hello state, and SHALL present exactly three sub-questions in order: (a) "how did you sleep?" with chips rough / ok / great / skip, saving a Note tagged `sleep` and saving the chosen quality value as a structured field on the Note; (b) "any breakfast yet?" with chips yes / not yet / skip, AND when the user taps yes Pip SHALL surface a one-tap "tap to add a photo" affordance (which when used opens the camera per Requirement 5 and saves a Note tagged `food` with the photo attached) AND when the user taps "not yet" Pip SHALL save a Note tagged `food` with structured field `state: skipped_breakfast` and SHALL NOT surface a follow-up nudge; (c) "anything weird in your body today?" with chips all-good / Voice / Text / Photo / skip, where (i) the all-good chip saves a Note tagged `morning_check` with structured field `body_status: all_good` and Pip displays the celebrating state for ≤2 seconds, (ii) the Voice chip transitions Pip to the listening state and opens hold-to-talk Voice Note Capture per Requirement 3 with the resulting Note tagged `morning_check`, (iii) the Text chip transitions Pip to the listening state and opens the full-screen text composer per Requirement 4 with the resulting Note tagged `morning_check`, (iv) the Photo chip transitions Pip to the listening state and opens the device camera per Requirement 5 with the resulting Note tagged `morning_check`, (v) the skip chip dismisses the sub-question without saving anything. The full Morning flow when answered with single taps and no media attachment SHALL complete in 15 seconds or less per criterion 11.
6. WHILE the active band is Afternoon, THE Daily_Check_In SHALL render Pip's greeting line as "hey [name], how's the day going?" and SHALL present (a) "how are you feeling right now?" with chips rough / meh / good / great / skip saving a Note tagged `mood`, (b) "had lunch?" with chips yes / no / skip and an optional photo attachment when the user taps yes saving a Note tagged `food`, and (c) "anything to log?" with chips all-good / Voice / Text / Photo / skip saving a Note tagged `afternoon_check`.
7. WHILE the active band is Evening, THE Daily_Check_In SHALL render Pip's greeting line as "evening, [name] — how was today?" and SHALL present (a) "how did today go?" with chips rough / mixed / good / great / skip saving a Note tagged `day_recap`, (b) "what did you eat today?" with chips tap to add a photo / type a quick list / skip saving a Note tagged `food`, and (c) "anything to add before bed?" with chips all-good / Voice / Text / Photo / skip saving a Note tagged `evening_check`.
8. WHILE the active band is Night, THE Daily_Check_In SHALL render Pip's greeting line as "winding down, [name]" and SHALL present a single prompt "anything to add before sleep?" with chips Voice / Photo / Text / skip saving a Note tagged `night_check`.
9. WHEN the active band is Evening or Night, THE Daily_Check_In SHALL frame its language as a recap of the day already lived (e.g., "how did today go?") and SHALL NOT use forward-looking phrasing such as "how is today going?"; WHEN the active band is Morning, THE Daily_Check_In SHALL frame its language as a just-starting day (e.g., "how'd you sleep?") and SHALL NOT use retrospective phrasing such as "how was last night?".
10. WHEN the user taps any answer chip in any band, THE Daily_Check_In SHALL save a Note attached to the currently active Profile with the appropriate tag listed in criteria 5–8 within 1 second.
11. THE Daily_Check_In SHALL complete the full three-sub-question flow in 15 seconds or less in the Morning, Afternoon, and Evening bands when every sub-question is answered with a single tap and no media attachment is added, and SHALL complete the Night band single-prompt flow in 5 seconds or less when answered with a single tap.
12. THE Daily_Check_In SHALL allow the user to skip any sub-question with a single tap and SHALL allow the user to close the overlay at any step; WHEN the user closes the overlay before completing all sub-questions, THE Daily_Check_In SHALL persist any answers already given and SHALL NOT re-prompt for any remaining sub-questions for the rest of the same local calendar day, regardless of any subsequent app opens within that day.
13. THE Daily_Check_In SHALL respect the active Profile context: switching the active Profile before the check-in begins SHALL attach all resulting Notes to the newly active member, and switching the active Profile mid-flow SHALL pause the check-in, allow the user to switch members, and resume on the same step or be cancelable by the user.
14. Pip SHALL provide a "Disable daily check-in" toggle in Settings → Display that, when enabled, SHALL prevent the Daily_Check_In from auto-presenting on any subsequent day until the toggle is disabled again.
15. THE Daily_Check_In SHALL render every chip with a minimum touch target of 44 by 44 CSS pixels and SHALL announce each chip's label and current state to assistive technology, consistent with Requirement 22; Pip SHALL display Pip in the hello state when the overlay opens, transition Pip to the listening state when a Voice, Photo, or Text Note shortcut is opened from a chip, and transition Pip to the celebrating state for no longer than 2 seconds after the final answer is saved before returning to the hello state on the home screen, consistent with Requirement 28.
16. THE Daily_Check_In SHALL NEVER use the words "diagnose", "you have", "start a med", or "stop a med" in any chip label, greeting line, or sub-question copy across any band, consistent with Requirement 19's banned-vocabulary rules; every Daily_Check_In Note that captures health-relevant content (mood, sleep, food photo, body status) SHALL inherit the same Compliance_Layer guarantees as any other health-relevant Note.

### Requirement 30: Family Broadcast Note (STRETCH)

**Stretch Goal Preamble:** This requirement is a Stretch Goal and is gated on Requirement 2 criterion 9 (the read-only family share link) shipping. IF the underlying family share link feature does not ship in v1, THEN the Family Broadcast Note feature SHALL be hidden entirely from the UI and SHALL NOT be referenced in any user-facing copy.

**User Story:** As a parent who wants to tell my partner "Sarah's checkup is at 3pm today" without writing it twice, I want any Note I save to be optionally broadcast to every account that has view access to that Profile, so that one capture surface serves the whole family. *[IN, CP, DX]*

#### Acceptance Criteria

1. WHERE the active Profile has at least one active read-only share link granted under Requirement 2 criterion 9, THE Note_Capture SHALL display a `broadcast` toggle on the Note composer; in all other cases, the toggle SHALL be hidden.
2. WHEN the user saves a Note with `broadcast` set to true, Pip SHALL display that Note inside a "From the family" inbox card on the home screen of every account that holds an active share link to the underlying Profile.
3. THE recipient accounts SHALL be able to view the contents of a Broadcast Note but SHALL NOT be able to edit, delete, or alter its tags.
4. Pip SHALL apply the same Privacy_Layer per-user partitioning, AES-256 encryption, and payload-minimization rules to Broadcast Notes as to all other Notes, consistent with Requirement 20.
5. WHEN the original Profile's share link is revoked, Pip SHALL remove every previously-delivered Broadcast Note from the revoked recipient's "From the family" inbox card within 5 minutes of revocation.
6. IF Requirement 2 criterion 9 is not shipped in v1, THEN THE entire Broadcast Note UI (composer toggle, inbox card, settings copy) SHALL be hidden and SHALL NOT render any "coming soon" surface, consistent with Requirement 26 criterion 3.
7. THE Broadcast Note inbox card SHALL place keyboard focus on its first item when opened and SHALL meet the touch-target and contrast requirements of Requirement 22.

### Requirement 31: Eazo Platform Capabilities and Server-Side Integration

**User Story:** As Pip's build team, I want one consolidated requirement that names the confirmed Eazo platform capabilities the v1 build depends on, so that every other requirement can reference a single source of truth for the implementation pattern. *[TE, PC]*

#### Acceptance Criteria

1. Pip SHALL use the browser MediaRecorder API as the single mechanism for all browser audio capture, including Voice Notes, Translator audio input, and any future v2 visit recording.
2. Pip SHALL persist every uploaded audio, photo, and video file in Eazo object storage and SHALL store the resulting storage URL on the associated Note record.
3. Pip SHALL route every external API call to RxNorm, MedlinePlus Connect, OpenFDA, CDC FluView, WastewaterSCAN, and ClinicalTrials.gov through a server-side Next.js API route, and SHALL never embed any upstream API key in client-delivered code.
4. Pip SHALL render every v1 PDF and PNG artifact for the Pre_Visit_Brief, After_Visit_Receipt, ER_Card, and any Translator export using the html2canvas plus jsPDF pipeline running on the client.
5. WHERE pixel-perfect rendering is required or client rendering fails, Pip SHALL fall back to a server-side headless rendering path and SHALL still deliver the artifact to the user.
6. Pip SHALL implement every Magic Link Clinician_View access using the Signed Magic Token pattern at the unauthenticated route `/view/[token]`, with no authentication and no Pip chrome.
7. WHERE the Eazo notifications skill is available on the user's device and the user has granted permission, Pip SHALL deliver optional push notifications via that skill.
8. IF push notification delivery fails for any reason, THEN Pip SHALL still surface the equivalent message inside the in-app inbox card and the Today timeline, which SHALL remain the canonical source of truth for any user-facing message.
9. Pip SHALL apply the Privacy_Layer payload-minimization rule from Requirement 20 criterion 8 to every server-side API route, so that no upstream third-party request includes account-level identifiers.
10. Pip SHALL document the server-side API route, MediaRecorder pipeline, html2canvas pipeline, Signed Magic Token pattern, and Eazo notifications integration in the design document referenced from this requirement.
11. Pip SHALL detect the user agent on every PDF/PNG render request; WHEN the user agent is Mobile Safari (iOS 15 or later), Pip SHALL route the render through the server-side headless pipeline rather than the client-side html2canvas pipeline, consistent with Requirement 11 criterion 10.
12. Pip SHALL register and store a free OpenFDA API key in server-side environment configuration, never embedded in client-delivered code, and SHALL include the key on every server-side request to OpenFDA endpoints.

### Requirement 32: Color System and Visual Tokens

**User Story:** As Pip's build team, I want one canonical, version-controlled color system that names every color, locks each color to its semantic role, and proves WCAG AA contrast on every text/background pair, so that no surface in the app is colored by ad-hoc judgment and the brand reads as warm, trustworthy, anti-clinical, and accessible by default. *[DX, PC, TE]*

#### Acceptance Criteria

1. Pip SHALL define and ship the following canonical light-mode color tokens, expressed as OKLCH and rendered as the indicated hex values:

   | Token | Hex | OKLCH | Role |
   |---|---|---|---|
   | `--color-text-primary` | `#3D405B` | `oklch(0.30 0.04 270)` | Primary text |
   | `--color-text-secondary` | `#6E7184` | `oklch(0.50 0.03 270)` | Secondary text, captions |
   | `--color-text-tertiary` | `#B5B0A0` | `oklch(0.72 0.02 80)` | Tertiary text, dividers (large/UI only) |
   | `--color-bg` | `#F4F1DE` | `oklch(0.95 0.02 90)` | App background |
   | `--color-surface` | `#FBF8EE` | `oklch(0.97 0.02 90)` | Cards, ER_Card, Pre_Visit_Brief paper |
   | `--color-surface-raised` | `#FEFCF5` | `oklch(0.99 0.01 90)` | Modals, raised overlays |
   | `--color-surface-recessed` | `#EDE8D2` | `oklch(0.92 0.03 90)` | Input fields, sunken zones |
   | `--color-hairline` | `#E5DFC9` | `oklch(0.89 0.03 90)` | Card borders, dividers |
   | `--color-brand` | `#E07A5F` | `oklch(0.65 0.13 35)` | Primary CTA, brand mark, hero buttons (large only) |
   | `--color-brand-text` | `#C95F45` | `oklch(0.55 0.13 35)` | Brand color used as body text on cream surfaces |
   | `--color-brand-whisper` | `#FCF4F0` | `oklch(0.97 0.02 35)` | Brand-tinted hover backgrounds, light bands |
   | `--color-positive` | `#81B29A` | `oklch(0.70 0.05 165)` | Wellness state fills, "all good" pills, illustration |
   | `--color-positive-text` | `#558870` | `oklch(0.52 0.05 165)` | Wellness/positive body text on cream surfaces |
   | `--color-positive-whisper` | `#F0F6F2` | `oklch(0.96 0.02 165)` | Positive-state card backgrounds |
   | `--color-accent` | `#F2CC8F` | `oklch(0.85 0.10 75)` | Pip illustration, decorative surfaces, sticker accents — illustration-only |
   | `--color-emergency` | `#C0392B` | `oklch(0.50 0.18 30)` | 911 affordance, severe-allergy badges (large/UI only) |
   | `--color-emergency-text` | `#9C2A1F` | `oklch(0.40 0.18 30)` | Emergency body text on cream surfaces |
   | `--color-emergency-whisper` | `#FBE8E5` | `oklch(0.94 0.04 30)` | Alert card backgrounds |
   | `--color-warning` | `#D4933F` | `oklch(0.65 0.12 65)` | "Watch for" headings, amber state surfaces (large/UI only) |
   | `--color-warning-text` | `#9E6620` | `oklch(0.48 0.10 65)` | "Watch for" body text on cream surfaces |
   | `--color-info` | `#5478A3` | `oklch(0.55 0.10 250)` | Citation links, info chips, source attributions |

2. Pip SHALL define and ship the following canonical dark-mode color tokens, applied via the `prefers-color-scheme: dark` media query, expressed as OKLCH and rendered as the indicated hex values:

   | Token | Hex | OKLCH | Role |
   |---|---|---|---|
   | `--color-bg` | `#1A1B2E` | `oklch(0.20 0.04 270)` | Dark app background (warm indigo, NOT pure black) |
   | `--color-surface` | `#252740` | `oklch(0.25 0.04 270)` | Dark cards |
   | `--color-surface-raised` | `#2E3148` | `oklch(0.28 0.04 270)` | Dark modals |
   | `--color-surface-recessed` | `#161726` | `oklch(0.18 0.04 270)` | Dark input fields |
   | `--color-hairline` | `#3D405B` | `oklch(0.30 0.04 270)` | Dark borders (the light-mode primary text becomes structure) |
   | `--color-text-primary` | `#F4F1DE` | `oklch(0.95 0.02 90)` | Dark primary text (the light-mode background becomes text) |
   | `--color-text-secondary` | `#C5C0A8` | `oklch(0.78 0.03 90)` | Dark secondary text |
   | `--color-text-tertiary` | `#8E8A78` | `oklch(0.58 0.02 80)` | Dark tertiary text |
   | `--color-brand` | `#F49B82` | `oklch(0.75 0.12 35)` | Dark mode brand CTA, lifted for legibility |
   | `--color-positive` | `#A8D5BD` | `oklch(0.82 0.06 165)` | Dark mode wellness fills |
   | `--color-accent` | `#FFE1AB` | `oklch(0.90 0.08 75)` | Dark mode Pip illustration glow |
   | `--color-emergency` | `#FF6B5B` | `oklch(0.70 0.18 30)` | Dark mode 911 / severe-allergy |
   | `--color-warning` | `#E8B567` | `oklch(0.78 0.10 65)` | Dark mode amber |
   | `--color-info` | `#7FA0CC` | `oklch(0.68 0.10 250)` | Dark mode info / citation links |

3. Pip SHALL guarantee WCAG 2.1 AA contrast on every text/background pair shipped in any user-facing surface, with the following minimum ratios verified at build time: 4.5:1 for body text, 3:1 for large text (≥18pt or 14pt bold) and UI components.

4. Pip SHALL NEVER use `--color-accent` (Apricot Cream `#F2CC8F`) as text on any surface, because its contrast against `--color-bg` is approximately 1.4:1 and fails WCAG AA. `--color-accent` is reserved for Pip mascot illustrations, sticker decorations, photo borders, and other purely decorative surfaces.

5. Pip SHALL NEVER use `--color-positive` (Muted Teal `#81B29A`) as body text on `--color-bg` or `--color-surface`, because its contrast is approximately 2.1:1 and fails WCAG AA for body text. WHERE wellness/positive content is rendered as text, Pip SHALL use `--color-positive-text` (`#558870`) instead.

6. Pip SHALL NEVER use `--color-brand` (Burnt Peach `#E07A5F`) as body text on `--color-bg` or `--color-surface`, because its contrast is approximately 3.5:1, which passes for large text and UI components but fails for body text. WHERE brand-color content is rendered as body text, Pip SHALL use `--color-brand-text` (`#C95F45`) instead.

7. Pip SHALL reserve `--color-emergency` (`#C0392B` light / `#FF6B5B` dark) exclusively for: the Triage_Engine 911 affordance defined in Requirement 10 criterion 8; severe and anaphylaxis-tier allergy badges rendered on the ER_Card and Pre_Visit_Brief; the red-flag pattern card surface for 911-tier rule firings. Pip SHALL NEVER use `--color-emergency` for the brand mark, primary CTAs, decorative surfaces, or any non-emergency content.

8. Pip SHALL apply the following token-to-surface mappings in v1, listed by surface:

   - **Onboarding screens** (R1): background `--color-bg`, primary text `--color-text-primary`, primary button `--color-brand`, Pip outline `--color-text-primary`
   - **Home screen Note_Capture** (R3, R4): background `--color-bg`, microphone button fill `--color-brand`, text input affordance background `--color-surface`, text input border `--color-hairline`, placeholder text `--color-text-secondary`
   - **Health_Timeline cards** (R7): card background `--color-surface`, card border `--color-hairline`, primary text `--color-text-primary`, timestamp `--color-text-tertiary`, body-system tag chips `--color-positive-whisper` background with `--color-positive-text` foreground
   - **Translator output** (R9): card background `--color-surface`, jargon term `--color-text-primary`, plain-English explanation `--color-text-primary`, "Watch for" heading `--color-warning`, "Call your provider if" heading `--color-warning-text`, source citation `--color-info`, Compliance Disclaimer `--color-text-secondary` on `--color-bg`
   - **Triage_Engine output** (R10): "Pattern is usually" section `--color-positive-text` heading on `--color-positive-whisper` background; "Watch for" section `--color-warning-text` heading on `--color-bg` background; "Call your provider or 911 if" section `--color-emergency-text` heading on `--color-emergency-whisper` background; the 911 affordance button `--color-emergency` fill with white foreground (R10 criterion 8 button)
   - **Pre_Visit_Brief** (R11): paper `--color-surface`, header `--color-text-primary`, ranked symptom rows `--color-text-primary` on `--color-surface`, severe-allergy badge `--color-emergency` background with white foreground, current medications list `--color-text-primary`, three "questions to ask" `--color-brand-text`, footer Compliance Disclaimer `--color-text-secondary`
   - **Clinician_View** (R12): clinical white background `#FFFFFF` (one exception to the cream system; clinicians expect white paper), text `--color-text-primary`, source citations `--color-info`, no brand color
   - **After_Visit_Receipt** (R13): paper `--color-surface`, header `--color-brand-text`, "what the doctor said" body `--color-text-primary`, prescribed medications `--color-text-primary`, follow-up date `--color-positive-text`, "watch for" `--color-warning-text`
   - **ER_Card** (R14): paper `--color-surface`, name `--color-text-primary`, severe and anaphylaxis allergy rows `--color-emergency` fill with white foreground, all other allergies `--color-warning-text` on `--color-bg`, current medications `--color-text-primary`, emergency contact `--color-info`, Compliance Disclaimer `--color-text-secondary`
   - **Daily_Check_In overlay** (R29): overlay background `--color-surface-raised`, Pip illustration tinted with `--color-accent`, greeting line `--color-text-primary`, chip background `--color-surface-recessed`, chip text `--color-text-primary`, "all good" chip background `--color-positive-whisper` with `--color-positive-text` foreground, "skip" chip `--color-text-tertiary` text on `--color-bg` background
   - **Paywall upsell sheets** (R21): sheet background `--color-surface-raised`, headline `--color-text-primary`, "Upgrade" button `--color-brand`, "Maybe later" link `--color-text-secondary`
   - **Pip mascot states** (R28): all five states rendered using the mascot's canonical color palette per Requirement 28 criterion 10 — cobalt blue `#3B9BE0` body, white `#FFFFFF` chest and face, orange `#FFA94D` beak and feet, soft pink `#FFB6B6` cheek blush, solid black `#1A1A1A` eyes — independent of the app's brand color tokens because the mascot is a self-contained illustration asset; Pip mascot illustrations SHALL NEVER be tinted in `--color-emergency` to preserve the emergency-color reservation; `--color-accent` (Apricot Cream `#F2CC8F`) remains reserved for non-mascot decorative surfaces such as sticker accents, food chip backgrounds, and photo borders

9. Pip SHALL implement all color tokens as CSS custom properties on the `:root` selector, with dark-mode tokens applied via the `prefers-color-scheme: dark` media query inside `@media (prefers-color-scheme: dark) { :root { ... } }`, so that switching color schemes does not require any component-level code change.

10. Pip SHALL include an automated build-time check that verifies WCAG AA contrast on every text/background token pair documented in criterion 8, and SHALL fail the build if any pair regresses below the required ratio.

11. Pip SHALL ship dark mode in v1, not as a fast-follow, because the Night band of the Daily_Check_In (Requirement 29 criterion 8) is the time-of-day when users are most likely to be in low-light conditions and need a dark surface.

12. WHERE the operating system reports `prefers-color-scheme: dark`, Pip SHALL render every surface in dark-mode tokens by default, and SHALL provide a Settings → Display toggle ("Always light" / "Always dark" / "Match system") so users can override the OS preference.

13. Pip SHALL NEVER introduce ad-hoc hex values, inline `style="color: #..."` attributes, or component-local color constants outside the canonical token system; every color in the codebase SHALL reference one of the tokens defined in this requirement.
