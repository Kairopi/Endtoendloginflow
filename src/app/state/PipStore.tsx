import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

export type Relation = 'self' | 'child' | 'parent' | 'partner' | 'other';
export type Tier = 'free' | 'plus' | 'family';
export type NoteType = 'voice' | 'text' | 'photo' | 'video' | 'translator' | 'triage' | 'check_in';

export interface Profile {
  id: string;
  firstName: string;
  relation: Relation;
  dob?: string;
  sex?: 'female' | 'male' | 'other';
  bloodType?: string;
  emergencyContact?: { name: string; phone: string };
}

export interface Note {
  id: string;
  profileId: string;
  createdAt: number;
  type: NoteType;
  text?: string;
  transcript?: string;
  tags: string[];
  bodySystem?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  mediaUrls?: string[];
  structured?: Record<string, unknown>;
}

export interface Medication {
  id: string;
  profileId: string;
  name: string;
  rxcui?: string;
  dose?: string;
  frequency?: string;
  startDate?: string;
  photoUrl?: string;
  purpose?: string;
  notes?: string;
}

export interface Allergy {
  id: string;
  profileId: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction?: string;
}

export interface Condition {
  id: string;
  profileId: string;
  label: string;
  sinceDate?: string;
  notes?: string;
}

export interface PipState {
  onboardingComplete: boolean;
  loggedIn: boolean;
  tier: Tier;
  profiles: Profile[];
  activeProfileId: string | null;
  notes: Note[];
  medications: Medication[];
  allergies: Allergy[];
  conditions: Condition[];
  hidePip: boolean;
  disableCheckIn: boolean;
  lastCheckInDate: string | null;
  translatorUsesThisMonth: number;
  translatorMonthKey: string;
  permissions: { mic: boolean; camera: boolean };
}

type Action =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'COMPLETE_ONBOARDING'; payload: { profiles: Profile[]; activeProfileId: string } }
  | { type: 'SET_ACTIVE_PROFILE'; payload: string }
  | { type: 'ADD_PROFILE'; payload: Profile }
  | { type: 'UPDATE_PROFILE'; payload: Profile }
  | { type: 'DELETE_PROFILE'; payload: string }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'ADD_MEDICATION'; payload: Medication }
  | { type: 'UPDATE_MEDICATION'; payload: Medication }
  | { type: 'DELETE_MEDICATION'; payload: string }
  | { type: 'ADD_ALLERGY'; payload: Allergy }
  | { type: 'DELETE_ALLERGY'; payload: string }
  | { type: 'ADD_CONDITION'; payload: Condition }
  | { type: 'DELETE_CONDITION'; payload: string }
  | { type: 'SET_TIER'; payload: Tier }
  | { type: 'TOGGLE_HIDE_PIP' }
  | { type: 'TOGGLE_DISABLE_CHECKIN' }
  | { type: 'MARK_CHECK_IN_DONE'; payload: string }
  | { type: 'INCREMENT_TRANSLATOR' }
  | { type: 'SET_PERMISSION'; payload: { kind: 'mic' | 'camera'; granted: boolean } }
  | { type: 'EXPORT_DATA' }
  | { type: 'WIPE_ALL' }
  | { type: 'HYDRATE'; payload: PipState };

const monthKey = () => new Date().toISOString().slice(0, 7);

const initial: PipState = {
  onboardingComplete: false,
  loggedIn: false,
  tier: 'free',
  profiles: [],
  activeProfileId: null,
  notes: [],
  medications: [],
  allergies: [],
  conditions: [],
  hidePip: false,
  disableCheckIn: false,
  lastCheckInDate: null,
  translatorUsesThisMonth: 0,
  translatorMonthKey: monthKey(),
  permissions: { mic: false, camera: false },
};

function reducer(state: PipState, action: Action): PipState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...action.payload, translatorMonthKey: monthKey(), translatorUsesThisMonth: action.payload.translatorMonthKey === monthKey() ? action.payload.translatorUsesThisMonth : 0 };
    case 'LOGIN':
      return { ...state, loggedIn: true };
    case 'LOGOUT':
      return { ...initial };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true, profiles: action.payload.profiles, activeProfileId: action.payload.activeProfileId };
    case 'SET_ACTIVE_PROFILE':
      return { ...state, activeProfileId: action.payload };
    case 'ADD_PROFILE':
      return { ...state, profiles: [...state.profiles, action.payload] };
    case 'UPDATE_PROFILE':
      return { ...state, profiles: state.profiles.map((p) => (p.id === action.payload.id ? action.payload : p)) };
    case 'DELETE_PROFILE':
      return {
        ...state,
        profiles: state.profiles.filter((p) => p.id !== action.payload),
        notes: state.notes.filter((n) => n.profileId !== action.payload),
        medications: state.medications.filter((m) => m.profileId !== action.payload),
        allergies: state.allergies.filter((a) => a.profileId !== action.payload),
        conditions: state.conditions.filter((c) => c.profileId !== action.payload),
      };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return { ...state, notes: state.notes.map((n) => (n.id === action.payload.id ? action.payload : n)) };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter((n) => n.id !== action.payload) };
    case 'ADD_MEDICATION':
      return { ...state, medications: [...state.medications, action.payload] };
    case 'UPDATE_MEDICATION':
      return { ...state, medications: state.medications.map((m) => (m.id === action.payload.id ? action.payload : m)) };
    case 'DELETE_MEDICATION':
      return { ...state, medications: state.medications.filter((m) => m.id !== action.payload) };
    case 'ADD_ALLERGY':
      return { ...state, allergies: [...state.allergies, action.payload] };
    case 'DELETE_ALLERGY':
      return { ...state, allergies: state.allergies.filter((a) => a.id !== action.payload) };
    case 'ADD_CONDITION':
      return { ...state, conditions: [...state.conditions, action.payload] };
    case 'DELETE_CONDITION':
      return { ...state, conditions: state.conditions.filter((c) => c.id !== action.payload) };
    case 'SET_TIER':
      return { ...state, tier: action.payload };
    case 'TOGGLE_HIDE_PIP':
      return { ...state, hidePip: !state.hidePip };
    case 'TOGGLE_DISABLE_CHECKIN':
      return { ...state, disableCheckIn: !state.disableCheckIn };
    case 'MARK_CHECK_IN_DONE':
      return { ...state, lastCheckInDate: action.payload };
    case 'INCREMENT_TRANSLATOR':
      return state.translatorMonthKey === monthKey()
        ? { ...state, translatorUsesThisMonth: state.translatorUsesThisMonth + 1 }
        : { ...state, translatorMonthKey: monthKey(), translatorUsesThisMonth: 1 };
    case 'SET_PERMISSION':
      return { ...state, permissions: { ...state.permissions, [action.payload.kind]: action.payload.granted } };
    case 'WIPE_ALL':
      return { ...initial };
    default:
      return state;
  }
}

interface Ctx {
  state: PipState;
  dispatch: React.Dispatch<Action>;
  activeProfile: Profile | null;
}

const PipContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'pip-state-v1';

export function PipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, (s) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PipState;
        return { ...s, ...parsed };
      }
    } catch {}
    return s;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const activeProfile = state.profiles.find((p) => p.id === state.activeProfileId) ?? null;

  return <PipContext.Provider value={{ state, dispatch, activeProfile }}>{children}</PipContext.Provider>;
}

const fallbackCtx: Ctx = {
  state: initial,
  dispatch: () => {},
  activeProfile: null,
};

export function usePip() {
  const ctx = useContext(PipContext);
  return ctx ?? fallbackCtx;
}

export function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
