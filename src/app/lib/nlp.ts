// Tiny NLP extractor (R3 #6, R4 #7) — turns free text into rough structured fields
const BODY_SYSTEMS: Record<string, string[]> = {
  respiratory: ['cough', 'breath', 'wheez', 'congest', 'sneeze', 'throat'],
  digestive: ['stomach', 'nausea', 'vomit', 'diarrhea', 'belly', 'reflux', 'heartburn'],
  cardiac: ['chest', 'heart', 'palpit', 'pulse'],
  neuro: ['headache', 'dizz', 'numb', 'tingl', 'migraine'],
  skin: ['rash', 'itch', 'hive', 'swelling', 'bump'],
  pain: ['pain', 'ache', 'sore', 'hurt'],
  sleep: ['sleep', 'tired', 'fatigue'],
  mood: ['anxious', 'sad', 'mood', 'stress'],
  fever: ['fever', 'temperature', 'hot'],
};

export interface Extracted {
  bodySystem?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  symptomPhrase?: string;
  tags: string[];
}

export function extract(text: string): Extracted {
  const lower = text.toLowerCase();
  const tags: string[] = [];
  let bodySystem: string | undefined;
  for (const [system, words] of Object.entries(BODY_SYSTEMS)) {
    if (words.some((w) => lower.includes(w))) {
      tags.push(system);
      bodySystem ??= system;
    }
  }
  let severity: 'mild' | 'moderate' | 'severe' | undefined;
  if (/(severe|worst|terrible|excruciat|10\/10|9\/10)/i.test(text)) severity = 'severe';
  else if (/(moderate|7\/10|6\/10|5\/10)/i.test(text)) severity = 'moderate';
  else if (/(mild|slight|little|2\/10|3\/10)/i.test(text)) severity = 'mild';

  const symptomPhrase = text.split(/[.!?\n]/)[0]?.slice(0, 80);
  return { bodySystem, severity, symptomPhrase, tags };
}
