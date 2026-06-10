import type { Note, Profile, Medication } from '../state/PipStore';

const SYMPTOM_DICT: Record<string, { clinical: string; system: string }> = {
  fever: { clinical: 'fever', system: 'general' },
  headache: { clinical: 'headache', system: 'neurological' },
  dizzy: { clinical: 'dizziness', system: 'neurological' },
  dizziness: { clinical: 'dizziness', system: 'neurological' },
  cough: { clinical: 'cough', system: 'respiratory' },
  rash: { clinical: 'cutaneous eruption', system: 'dermatological' },
  itchy: { clinical: 'pruritus', system: 'dermatological' },
  nausea: { clinical: 'nausea', system: 'gastrointestinal' },
  vomit: { clinical: 'emesis', system: 'gastrointestinal' },
  diarrhea: { clinical: 'diarrhea', system: 'gastrointestinal' },
  fatigue: { clinical: 'fatigue', system: 'general' },
  tired: { clinical: 'fatigue', system: 'general' },
  pain: { clinical: 'pain', system: 'musculoskeletal' },
  ache: { clinical: 'pain', system: 'musculoskeletal' },
  breath: { clinical: 'dyspnea', system: 'respiratory' },
  chest: { clinical: 'chest discomfort', system: 'cardiac' },
  palpitation: { clinical: 'palpitations', system: 'cardiac' },
};

const TEMP_RE = /(\d{2,3}(?:\.\d)?)\s*(?:°|deg)?\s*f\b/i;
const BP_RE = /\b(\d{2,3})\s*\/\s*(\d{2,3})\b/;
const DURATION_RE = /(\d+)\s*(min|minute|hour|day|week)s?/i;
const RELIEF_RE = /(tylenol|advil|ibuprofen|acetaminophen|aspirin|motrin|benadryl|zofran)/i;

function relTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export interface SynthesizedSymptom {
  clinical: string;
  system: string;
  episodes: number;
  firstSeen: string;
  lastSeen: string;
  peakTemp?: string;
  bp?: string;
  reliefAgents: string[];
  excerpts: string[];
}

export interface SynthesisResult {
  hpi: string;
  chiefConcern: string;
  symptoms: SynthesizedSymptom[];
  vitalsNoted: string[];
  windowDays: number;
  noteCount: number;
}

export function synthesizeBrief(
  notes: Note[],
  _profile: Profile | null,
  _meds: Medication[],
  windowDays = 14,
): SynthesisResult {
  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  const recent = notes
    .filter((n) => n.createdAt >= cutoff)
    .sort((a, b) => a.createdAt - b.createdAt);

  const buckets = new Map<string, SynthesizedSymptom>();
  const vitalsNoted: string[] = [];

  for (const n of recent) {
    const text = `${n.text ?? ''} ${n.transcript ?? ''}`.toLowerCase();
    if (!text.trim()) continue;

    const matched = new Set<string>();
    for (const [key, def] of Object.entries(SYMPTOM_DICT)) {
      if (text.includes(key)) matched.add(def.clinical);
    }

    const tempMatch = text.match(TEMP_RE);
    const bpMatch = text.match(BP_RE);
    const reliefMatch = text.match(RELIEF_RE);

    if (tempMatch) vitalsNoted.push(`${tempMatch[1]}°F on ${relTime(n.createdAt)}`);
    if (bpMatch) vitalsNoted.push(`${bpMatch[1]}/${bpMatch[2]} on ${relTime(n.createdAt)}`);

    for (const clinical of matched) {
      const def = Object.values(SYMPTOM_DICT).find((d) => d.clinical === clinical)!;
      const existing = buckets.get(clinical) ?? {
        clinical,
        system: def.system,
        episodes: 0,
        firstSeen: relTime(n.createdAt),
        lastSeen: relTime(n.createdAt),
        reliefAgents: [],
        excerpts: [],
      };
      existing.episodes += 1;
      existing.lastSeen = relTime(n.createdAt);
      if (tempMatch && (!existing.peakTemp || parseFloat(tempMatch[1]) > parseFloat(existing.peakTemp))) {
        existing.peakTemp = tempMatch[1];
      }
      if (bpMatch) existing.bp = `${bpMatch[1]}/${bpMatch[2]}`;
      if (reliefMatch && !existing.reliefAgents.includes(reliefMatch[1].toLowerCase())) {
        existing.reliefAgents.push(reliefMatch[1].toLowerCase());
      }
      if (existing.excerpts.length < 2 && (n.text ?? n.transcript)) {
        existing.excerpts.push((n.text ?? n.transcript)!);
      }
      buckets.set(clinical, existing);
    }
  }

  const symptoms = Array.from(buckets.values()).sort((a, b) => b.episodes - a.episodes);

  let chiefConcern = 'No tagged symptoms in the last two weeks.';
  let hpi = '';

  if (symptoms.length > 0) {
    const top = symptoms[0];
    chiefConcern = articulate(top, true);
    const others = symptoms.slice(1, 3).map((s) => articulate(s, false));

    hpi = `${chiefConcern}`;
    if (others.length) {
      hpi += ` Concurrently, ${others.join('; and ')}.`;
    }
    const totalRelief = Array.from(new Set(symptoms.flatMap((s) => s.reliefAgents)));
    if (totalRelief.length) {
      hpi += ` Patient reports symptomatic relief with ${totalRelief.join(', ')}.`;
    }
    hpi += ` Observations logged across ${recent.length} ${recent.length === 1 ? 'entry' : 'entries'} over the last ${windowDays} days.`;
  }

  return {
    hpi,
    chiefConcern,
    symptoms,
    vitalsNoted: Array.from(new Set(vitalsNoted)),
    windowDays,
    noteCount: recent.length,
  };
}

function articulate(s: SynthesizedSymptom, lead: boolean): string {
  const count =
    s.episodes === 1 ? 'a single episode' : `${numWord(s.episodes)} episodes`;
  const window = s.firstSeen === s.lastSeen ? `on ${s.firstSeen}` : `between ${s.firstSeen} and ${s.lastSeen}`;
  let line = lead
    ? `Patient reports ${count} of ${s.clinical} ${window}`
    : `${count} of ${s.clinical} ${window}`;
  if (s.peakTemp) line += ` with peak temperature ${s.peakTemp}°F`;
  if (s.bp) line += ` with blood pressure recorded at ${s.bp}`;
  return line;
}

function numWord(n: number): string {
  return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][n] ?? String(n);
}
