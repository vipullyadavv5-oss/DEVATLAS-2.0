/**
 * MAIN DASHBOARD PAGE COMPONENT (Screen 3)
 * -----------------------------------------------------------------------------
 * File: src/pages/Dashboard.tsx
 * Purpose: Primary developer workbench displaying DevScore, platform telemetry cards,
 *          insights, skill breakdown, and sync controls.
 * 
 * Strict Product Rule:
 * Brand-new users display real 0 values. DevAtlas never fabricates developer statistics.
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DevScoreCard } from '../components/DevScoreCard';
import { PlatformCard } from '../components/PlatformCard';
import { DeveloperInsight } from '../components/DeveloperInsight';
import { SkillOverview } from '../components/SkillOverview';
import { SyncBar } from '../components/SyncBar';

interface DashboardProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateSettings: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateProfile, onNavigateSettings }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync / Refresh Data Handler
  const handleGlobalRefresh = () => {
    setIsSyncing(true);
    
    // Set loading states for connected platforms
    onUpdateProfile({
      githubState: 'loading',
      leetcodeState: user.leetcodeUsername ? 'loading' : 'not_connected',
      codeforcesState: user.codeforcesHandle ? 'loading' : 'not_connected'
    });

    // Simulate API responses with verified data
    setTimeout(() => {
      setIsSyncing(false);
      onUpdateProfile({
        githubState: 'connected',
        leetcodeState: user.leetcodeUsername ? 'connected' : 'not_connected',
        codeforcesState: user.codeforcesHandle ? 'connected' : 'not_connected',
        lastSyncedAt: 'Just now'
      });
    }, 1100);
  };

  // Sync individual platform trigger
  const handleSyncPlatform = (platform: 'github' | 'leetcode' | 'codeforces') => {
    if (platform === 'github') {
      onUpdateProfile({ githubState: 'loading' });
      setTimeout(() => {
        onUpdateProfile({ githubState: 'connected', lastSyncedAt: 'Just now' });
      }, 1000);
    } else if (platform === 'leetcode') {
      if (!user.leetcodeUsername) {
        onNavigateSettings();
        return;
      }
      onUpdateProfile({ leetcodeState: 'loading' });
      setTimeout(() => {
        onUpdateProfile({ leetcodeState: 'connected', lastSyncedAt: 'Just now' });
      }, 1000);
    } else if (platform === 'codeforces') {
      if (!user.codeforcesHandle) {
        onNavigateSettings();
        return;
      }
      onUpdateProfile({ codeforcesState: 'loading' });
      setTimeout(() => {
        onUpdateProfile({ codeforcesState: 'connected', lastSyncedAt: 'Just now' });
      }, 1000);
    }
  };

  const connectedCount = [user.githubState, user.leetcodeState, user.codeforcesState]
    .filter(s => s === 'connected').length;

  return (
    <main className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-800 space-y-6">
      
      {/* 1. Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold text-[#0F172A] tracking-tight">
              Developer Overview
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
              {user.devScore === 0 ? 'FRESH ACCOUNT' : 'VERIFIED'}
            </span>
          </div>
          <p className="text-sm text-[#64748B]">
            Your verified coding activity across GitHub, LeetCode, and Codeforces.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[#64748B] shadow-xs">
            <span className={`w-2 h-2 rounded-full ${user.lastSyncedAt ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            <span>{user.lastSyncedAt ? `Synced ${user.lastSyncedAt}` : 'Not synced yet'}</span>
          </div>
          <button
            type="button"
            onClick={handleGlobalRefresh}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-medium transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70"
          >
            <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Syncing…' : 'Refresh Data'}</span>
          </button>
        </div>
      </section>

      {/* 2. DevScore Hero Card */}
      <DevScoreCard user={user} />

      {/* 3. Connected Data Sources Grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
            Connected Data Sources
          </h2>
          <span className="text-xs font-mono text-[#64748B]">
            {connectedCount} of 3 authorized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* GitHub Card */}
          <PlatformCard
            type="github"
            state={user.githubState}
            handle={user.githubUsername}
            githubStats={user.githubStats}
            onSync={() => handleSyncPlatform('github')}
            onConnect={() => handleSyncPlatform('github')}
          />

          {/* LeetCode Card */}
          <PlatformCard
            type="leetcode"
            state={user.leetcodeState}
            handle={user.leetcodeUsername}
            leetcodeStats={user.leetcodeStats}
            onSync={() => handleSyncPlatform('leetcode')}
            onConnect={onNavigateSettings}
          />

          {/* Codeforces Card */}
          <PlatformCard
            type="codeforces"
            state={user.codeforcesState}
            handle={user.codeforcesHandle}
            codeforcesStats={user.codeforcesStats}
            onSync={() => handleSyncPlatform('codeforces')}
            onConnect={onNavigateSettings}
          />

        </div>
      </section>

      {/* 4. Insights & Skill Overview Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DeveloperInsight user={user} />
        <SkillOverview user={user} />
      </section>

      {/* 5. Bottom Sync Status Bar */}
      <SyncBar
        lastSyncedAt={user.lastSyncedAt}
        onRefresh={handleGlobalRefresh}
        isSyncing={isSyncing}
      />

    </main>
  );
};
