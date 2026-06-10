export interface TranslationEntry {
  match: RegExp;
  term: string;
  plain: string;
  watchFor: string[];
}

export const TRANSLATIONS: TranslationEntry[] = [
  {
    match: /\bhypertension\b|\bhigh blood pressure\b|\bbp\s*1[4-9]\d\b|\bbp\s*[2-9]\d{2}\b/i,
    term: 'Hypertension / high blood pressure',
    plain:
      'This means the pressure of blood pushing against your artery walls is higher than normal. Over time, that extra force can wear on the heart and blood vessels.',
    watchFor: [
      'sudden severe headache',
      'chest pain or pressure',
      'shortness of breath you can\'t explain',
      'vision changes',
    ],
  },
  {
    match: /\bmetformin\b/i,
    term: 'Metformin',
    plain:
      'A medicine commonly prescribed to help the body use insulin better and bring blood sugar levels closer to a healthy range.',
    watchFor: ['ongoing nausea or stomach upset', 'unusual muscle pain or weakness', 'feeling very tired or short of breath'],
  },
  {
    match: /\btachycardia\b/i,
    term: 'Tachycardia',
    plain: 'This means your heart is beating faster than usual — typically over 100 beats per minute at rest.',
    watchFor: ['chest pain', 'feeling like you might faint', 'shortness of breath'],
  },
  {
    match: /\bhba1c\b|\ba1c\b/i,
    term: 'HbA1c',
    plain:
      'A blood test that estimates your average blood sugar level over the past 2-3 months. It helps your provider track how blood sugar is trending.',
    watchFor: ['very high or low blood sugar episodes', 'frequent thirst or urination', 'unexplained tiredness'],
  },
  {
    match: /\bedema\b/i,
    term: 'Edema',
    plain: 'Swelling caused by fluid trapped in body tissues — most often in feet, ankles, or legs.',
    watchFor: ['sudden swelling on one side only', 'swelling with chest pain or trouble breathing', 'skin that\'s hot or red'],
  },
  {
    match: /\bgerd\b|\breflux\b/i,
    term: 'GERD / acid reflux',
    plain:
      'A condition where stomach acid frequently flows back up into the food pipe (esophagus), causing irritation and that familiar burning feeling.',
    watchFor: ['trouble swallowing', 'vomiting blood', 'unintentional weight loss'],
  },
];
