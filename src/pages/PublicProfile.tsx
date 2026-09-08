/**
 * PUBLIC PROFILE PAGE COMPONENT (Screen 5)
 * -----------------------------------------------------------------------------
 * File: src/pages/PublicProfile.tsx
 * Purpose: Publicly viewable developer footprint at /u/:username.
 * 
 * Strict Read-Only Policy:
 * Under NO circumstances does this view display edit buttons, settings triggers,
 * or account modification controls. It is designed for recruiters and GSoC mentors.
 */

import React from 'react';
import { UserProfile } from '../types';
import { DevScoreCard } from '../components/DevScoreCard';
import { PlatformCard } from '../components/PlatformCard';
import { DeveloperInsight } from '../components/DeveloperInsight';
import { SkillOverview } from '../components/SkillOverview';

interface PublicProfileProps {
  user: UserProfile;
  onSignIn: () => void;
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ user, onSignIn }) => {
  // Check if profile is initialized or enabled for public view
  const isInitialized = user.githubState === 'connected' || user.isPublicProfile;

  return (
    <div className="min-h-screen bg-[#F8FAFC] technical-dot-grid text-[#0F172A] font-sans flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      
      {/* Public View Header */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[19px]">layers</span>
            </div>
            <span className="font-semibold text-base sm:text-lg text-slate-900 tracking-tight">DevAtlas</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-medium text-slate-600">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            >
              <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Public Profile Body */}
      <main className="w-full flex-1 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Profile Header Banner */}
          <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-medium">
                <span className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                <span>{isInitialized ? 'VERIFIED PUBLIC PROFILE' : 'PROFILE NOT INITIALIZED'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isInitialized ? `${user.name} (@${user.githubUsername})` : 'Your Developer Profile'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {isInitialized
                  ? 'Verified developer profile aggregating GitHub, LeetCode, and Codeforces activity.'
                  : 'Sign in with GitHub to create your verified DevAtlas profile and aggregate your coding telemetry.'}
              </p>
            </div>

            {!isInitialized && (
              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onSignIn}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                >
                  <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  <span>Continue with GitHub</span>
                </button>
                <span className="text-xs font-mono text-slate-500">Read-only access. No write permissions required.</span>
              </div>
            )}
          </section>

          {/* DevScore Display */}
          <DevScoreCard user={user} />

          {/* Connected Data Sources Grid (Read-Only) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                Verified Telemetry Sources
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <PlatformCard
                type="github"
                state={user.githubState}
                handle={user.githubUsername}
                githubStats={user.githubStats}
                onSync={() => {}}
                onConnect={() => {}}
              />
              <PlatformCard
                type="leetcode"
                state={user.leetcodeState}
                handle={user.leetcodeUsername}
                leetcodeStats={user.leetcodeStats}
                onSync={() => {}}
                onConnect={() => {}}
              />
              <PlatformCard
                type="codeforces"
                state={user.codeforcesState}
                handle={user.codeforcesHandle}
                codeforcesStats={user.codeforcesStats}
                onSync={() => {}}
                onConnect={() => {}}
              />
            </div>
          </section>

          {/* Insights & Skill Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <DeveloperInsight user={user} />
            <SkillOverview user={user} />
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B]">
          <span>DevAtlas — Verified Developer Footprint</span>
          <span className="font-mono text-[11px]">Read-only public profile route /u/{user.githubUsername}</span>
        </div>
      </footer>

    </div>
  );
};
