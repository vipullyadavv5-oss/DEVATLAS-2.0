/**
 * DEVATLAS MAIN APPLICATION ROUTER & STATE CONTAINER
 * -----------------------------------------------------------------------------
 * File: src/App.tsx
 * Purpose: Manages global user state, platform credentials, DevScore recalculation,
 *          and screen transitions across Login, Onboarding, Dashboard, Settings,
 *          and Public Profile.
 * 
 * Architecture Note for College Evaluation:
 * Centralized state guarantees single-source-of-truth for telemetry data across all views.
 */

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';
import { ActiveScreen, UserProfile } from './types';
import { createInitialUserProfile, calculateDevScore } from './utils/devScore';
import { Navbar } from './components/Navbar';

// Page Views
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { PublicProfile } from './pages/PublicProfile';

export function App() {
  const { isSignedIn, isLoaded, user: clerkUser } = useUser();
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('login');
  const [user, setUser] = useState<UserProfile>(createInitialUserProfile());

  // Sync Clerk sign-in state → app screen
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setActiveScreen('login');
    } else if (activeScreen === 'login') {
      // Populate user profile from Clerk identity
      handleUpdateProfile({
        githubUsername: clerkUser?.username ||
          clerkUser?.firstName?.toLowerCase().replace(/\s+/g, '') ||
          'developer',
        githubState: 'connected',
        lastSyncedAt: 'Just now',
      });
      setActiveScreen('onboarding');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  // Update profile helper that recalculates DevScore automatically
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const next: UserProfile = { ...prev, ...updated };
      next.devScore = calculateDevScore(next);
      return next;
    });
  };

  // Login handler
  const handleLoginSuccess = () => {
    handleUpdateProfile({
      githubState: 'connected',
      lastSyncedAt: 'Just now'
    });
    setActiveScreen('onboarding');
  };

  // Onboarding completion handler
  const handleOnboardingComplete = (leetcodeUser: string, codeforcesHandle: string) => {
    handleUpdateProfile({
      leetcodeUsername: leetcodeUser || null,
      codeforcesHandle: codeforcesHandle || null,
      leetcodeState: leetcodeUser ? 'connected' : 'not_connected',
      codeforcesState: codeforcesHandle ? 'connected' : 'not_connected',
      lastSyncedAt: 'Just now'
    });
    setActiveScreen('dashboard');
  };

  // Render Screen Content
  const renderContent = () => {
    switch (activeScreen) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;

      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;

      case 'dashboard':
        return (
          <>
            <Navbar activeScreen={activeScreen} onNavigate={setActiveScreen} user={user} />
            <Dashboard
              user={user}
              onUpdateProfile={handleUpdateProfile}
              onNavigateSettings={() => setActiveScreen('settings')}
            />
          </>
        );

      case 'settings':
        return (
          <>
            <Navbar activeScreen={activeScreen} onNavigate={setActiveScreen} user={user} />
            <Settings
              user={user}
              onUpdateProfile={handleUpdateProfile}
              onNavigatePublicProfile={() => setActiveScreen('public_profile')}
            />
          </>
        );

      case 'public_profile':
        return (
          <PublicProfile
            user={user}
            onSignIn={() => setActiveScreen('login')}
          />
        );

      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {renderContent()}
    </div>
  );
}

export default App;
