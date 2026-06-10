export interface TriageOutput {
  usually: string;
  watchFor: string[];
  callIf: string[];
  is911: boolean;
  citation: string;
}

interface Rule {
  match: (text: string, age: number) => boolean;
  output: (age: number) => TriageOutput;
}

const has = (t: string, ...words: string[]) => words.some((w) => t.toLowerCase().includes(w));

export const RULES: Rule[] = [
  // 911-tier: difficulty breathing
  {
    match: (t) => has(t, "can't breathe", 'difficulty breathing', 'cannot breathe', 'gasping', 'blue lips'),
    output: (age) => ({
      usually: 'Trouble breathing is something we always want a clinician to look at right away.',
      watchFor: ['lips or fingertips turning blue or gray', 'using neck or chest muscles hard to breathe', 'too breathless to speak in full sentences'],
      callIf: ['breathing is fast, hard, or labored', 'lips or skin look blue', 'the person is hard to wake'],
      is911: true,
      citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
  // 911-tier: infant under 3 months with fever
  {
    match: (t, age) => age < 0.25 && has(t, 'fever', '100', '101', '102', '103', '104'),
    output: () => ({
      usually: 'A fever in a baby under 3 months is something we always want a clinician to evaluate right away.',
      watchFor: ['unusual sleepiness or floppiness', 'refusing to feed', 'fewer wet diapers'],
      callIf: ['the baby is under 3 months and has any fever (100.4°F / 38°C or higher)'],
      is911: true,
      citation: 'Based on AAP Bright Futures pediatric guidance',
    }),
  },
  // 911-tier: stroke signs
  {
    match: (t) => has(t, 'stroke', 'face drooping', 'slurred speech', 'one side numb', 'sudden weakness'),
    output: () => ({
      usually: 'Sudden weakness, drooping, or speech changes are signs we always want to act on quickly.',
      watchFor: ['arm or leg weakness on one side', 'sudden confusion', 'sudden severe headache'],
      callIf: ['face drooping, arm weakness, or speech difficulty appear suddenly'],
      is911: true,
      citation: 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
  // Fever (child or adult, not 911)
  {
    match: (t) => has(t, 'fever', 'temperature', '100', '101', '102'),
    output: (age) => ({
      usually:
        age < 18
          ? "A fever is the body's normal way of fighting off an infection — most are mild and pass in a few days."
          : 'A fever usually means the immune system is responding to something — most pass in a few days with rest and fluids.',
      watchFor: ['fever lasting more than 3 days', 'unusual sleepiness or confusion', 'stiff neck', 'rash that doesn\'t fade with pressure', 'dehydration'],
      callIf: [
        age < 18 ? 'a baby under 3 months has any fever' : 'fever stays above 103°F (39.4°C) for over 24 hours',
        'breathing becomes fast or labored',
        'severe headache, neck stiffness, or seizure occurs',
      ],
      is911: false,
      citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
  // Cough
  {
    match: (t) => has(t, 'cough', 'coughing'),
    output: (age) => ({
      usually: 'Coughs from common colds and viruses usually peak in a few days and improve over 1-2 weeks.',
      watchFor: ['cough lasting more than 3 weeks', 'coughing up blood', 'wheezing or whistling sound when breathing', 'chest pain'],
      callIf: ['breathing becomes hard or fast', 'lips look blue', 'cough produces blood'],
      is911: false,
      citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
  // Rash
  {
    match: (t) => has(t, 'rash', 'hives', 'itchy'),
    output: (age) => ({
      usually: 'Most rashes are reactions to something the skin touched or a passing virus, and clear up on their own.',
      watchFor: ['rash with fever', 'rash that doesn\'t fade when pressed', 'swelling of the face, lips, or tongue', 'spreading quickly'],
      callIf: ['swelling around mouth or throat', 'trouble breathing or swallowing', 'rash with high fever and stiff neck'],
      is911: false,
      citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
  // Headache
  {
    match: (t) => has(t, 'headache', 'head hurts', 'migraine'),
    output: (age) => ({
      usually: 'Most headaches are tension or migraine type and improve with rest, water, and time.',
      watchFor: ['worst headache of your life', 'headache with fever and stiff neck', 'headache after a head injury'],
      callIf: ['sudden severe headache', 'headache with weakness, vision change, or trouble speaking'],
      is911: false,
      citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
    }),
  },
];

export function triage(text: string, age: number): TriageOutput {
  for (const r of RULES) {
    if (r.match(text, age)) return r.output(age);
  }
  return {
    usually: "We don't have a pattern for what you described — that doesn't mean it's nothing, just that this tool can't tell.",
    watchFor: ['any symptom that worsens quickly', 'new symptoms appearing'],
    callIf: ['you feel something is seriously wrong', 'symptoms come on suddenly and severely'],
    is911: false,
    citation: age < 18 ? 'Based on AAP Bright Futures pediatric guidance' : 'Based on MedlinePlus + CDC adult guidance',
  };
}
