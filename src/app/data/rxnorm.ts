// Tiny stubbed RxNorm autocomplete + interaction table (R15)
export const RXNORM_LIST = [
  { name: 'Lisinopril', rxcui: '29046' },
  { name: 'Metformin', rxcui: '6809' },
  { name: 'Atorvastatin', rxcui: '83367' },
  { name: 'Amlodipine', rxcui: '17767' },
  { name: 'Levothyroxine', rxcui: '10582' },
  { name: 'Albuterol', rxcui: '435' },
  { name: 'Omeprazole', rxcui: '7646' },
  { name: 'Ibuprofen', rxcui: '5640' },
  { name: 'Acetaminophen', rxcui: '161' },
  { name: 'Sertraline', rxcui: '36437' },
  { name: 'Warfarin', rxcui: '11289' },
  { name: 'Aspirin', rxcui: '1191' },
  { name: 'Simvastatin', rxcui: '36567' },
  { name: 'Losartan', rxcui: '52175' },
  { name: 'Hydrochlorothiazide', rxcui: '5487' },
];

interface InteractionPair {
  a: string;
  b: string;
  flag: string;
}

export const INTERACTIONS: InteractionPair[] = [
  { a: 'Warfarin', b: 'Aspirin', flag: 'increased bleeding risk' },
  { a: 'Warfarin', b: 'Ibuprofen', flag: 'increased bleeding risk' },
  { a: 'Lisinopril', b: 'Ibuprofen', flag: 'reduced blood-pressure benefit and kidney stress' },
  { a: 'Sertraline', b: 'Ibuprofen', flag: 'increased bleeding risk' },
  { a: 'Atorvastatin', b: 'Simvastatin', flag: 'overlapping statin effect' },
];

export function findInteraction(a: string, b: string) {
  const norm = (s: string) => s.toLowerCase().trim();
  return INTERACTIONS.find(
    (p) => (norm(p.a) === norm(a) && norm(p.b) === norm(b)) || (norm(p.a) === norm(b) && norm(p.b) === norm(a)),
  );
}
