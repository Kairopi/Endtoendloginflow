import { useState } from 'react';
import { PipProvider, usePip } from './state/PipStore';
import { PhoneFrame } from './components/PhoneFrame';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { HomeScreen } from './components/home/HomeScreen';
import { HealthTimeline } from './components/timeline/HealthTimeline';
import { ToolsScreen } from './components/tools/ToolsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { TranslatorScreen } from './components/translator/TranslatorScreen';
import { TriageScreen } from './components/triage/TriageScreen';
import { PreVisitBrief } from './components/brief/PreVisitBrief';
import { ERCard } from './components/er-card/ERCard';
import { AfterVisitReceipt } from './components/receipt/AfterVisitReceipt';
import { MedicationManager } from './components/meds/MedicationManager';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { BottomNav } from './components/nav/BottomNav';

type Tab = 'home' | 'journal' | 'tools' | 'profile';
type SubRoute =
  | null
  | 'translator'
  | 'triage'
  | 'brief'
  | 'er'
  | 'receipt'
  | 'meds'
  | 'profile-edit'
  | 'settings';

function Shell() {
  const { state } = usePip();
  const [bootShown, setBootShown] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [sub, setSub] = useState<SubRoute>(null);

  if (!bootShown) {
    return <SplashScreen onDone={() => setBootShown(true)} />;
  }
  if (!state.loggedIn) {
    return <LoginScreen />;
  }
  if (!state.onboardingComplete) {
    return <OnboardingFlow />;
  }

  const back = () => setSub(null);

  return (
    <div className="absolute inset-0">
      {sub === null && tab === 'home' && <HomeScreen onOpenTranslator={() => setSub('translator')} />}
      {sub === null && tab === 'journal' && <HealthTimeline />}
      {sub === null && tab === 'tools' && <ToolsScreen onNav={(k) => setSub(k)} />}
      {sub === null && tab === 'profile' && <ProfileScreen onNav={(k) => setSub(k)} />}

      {sub === 'translator' && <TranslatorScreen onBack={back} />}
      {sub === 'triage' && <TriageScreen onBack={back} />}
      {sub === 'brief' && <PreVisitBrief onBack={back} />}
      {sub === 'er' && <ERCard onBack={back} />}
      {sub === 'receipt' && <AfterVisitReceipt onBack={back} />}
      {sub === 'meds' && <MedicationManager onBack={back} />}
      {sub === 'profile-edit' && <ProfileSettings onBack={back} />}
      {sub === 'settings' && <SettingsScreen onBack={back} />}

      {sub === null && (
        <BottomNav
          active={tab}
          onChange={(k) => {
            setSub(null);
            setTab(k);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PipProvider>
      <PhoneFrame>
        <Shell />
      </PhoneFrame>
    </PipProvider>
  );
}
