/**
 * SETTINGS PAGE COMPONENT (Screen 4)
 * -----------------------------------------------------------------------------
 * File: src/pages/Settings.tsx
 * Purpose: Manages connected developer handles (LeetCode, Codeforces) and profile visibility.
 * 
 * Default Visibility Rule:
 * Public Profile defaults to PRIVATE until explicitly enabled by the developer.
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigatePublicProfile: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  user,
  onUpdateProfile,
  onNavigatePublicProfile
}) => {
  const [leetcodeInput, setLeetcodeInput] = useState(user.leetcodeUsername || '');
  const [codeforcesInput, setCodeforcesInput] = useState(user.codeforcesHandle || '');
  const [isPublic, setIsPublic] = useState(user.isPublicProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLeetcode = leetcodeInput.trim() || null;
    const newCodeforces = codeforcesInput.trim() || null;

    onUpdateProfile({
      leetcodeUsername: newLeetcode,
      codeforcesHandle: newCodeforces,
      leetcodeState: newLeetcode ? 'connected' : 'not_connected',
      codeforcesState: newCodeforces ? 'connected' : 'not_connected',
      isPublicProfile: isPublic
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-slate-800 font-sans space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your developer profiles and public visibility.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-md shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Config Ready</span>
        </div>
      </div>

      {/* Save Success Alert Banner */}
      {saveSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
            <span>Settings saved successfully. Profile metrics updated.</span>
          </div>
        </div>
      )}

      {/* Settings Form Container */}
      <form onSubmit={handleSaveSettings} className="space-y-6">

        {/* 1. GitHub Account Section */}
        <section className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs">
          <div className="flex items-start justify-between flex-wrap gap-4 pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">GitHub Account</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary authentication provider and verified developer identity.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Connected
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50/70 border border-slate-200/70">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-slate-900">GitHub</span>
                  <span className="font-mono text-xs text-slate-600 font-medium">@{user.githubUsername}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  GitHub is used to verify your developer identity and retrieve public commit telemetry.
                </p>
              </div>
            </div>

            <div className="flex items-center shrink-0">
              <span className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-xs">
                <span className="material-symbols-outlined text-[14px] text-slate-500">lock</span>
                <span>Read-only access</span>
              </span>
            </div>
          </div>
        </section>

        {/* 2. Coding Profiles Section */}
        <section className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Coding Profiles</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Link algorithm &amp; competitive programming handles to calculate your DevScore.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* LeetCode Input */}
            <div className="space-y-1.5">
              <label htmlFor="leetcodeInput" className="block text-xs font-semibold text-slate-900">
                LeetCode Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[18px] text-amber-600">code</span>
                </div>
                <input
                  type="text"
                  id="leetcodeInput"
                  value={leetcodeInput}
                  onChange={(e) => setLeetcodeInput(e.target.value)}
                  placeholder="e.g. alexdev_leetcode"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            {/* Codeforces Input */}
            <div className="space-y-1.5">
              <label htmlFor="codeforcesInput" className="block text-xs font-semibold text-slate-900">
                Codeforces Handle
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[18px] text-sky-600">bar_chart</span>
                </div>
                <input
                  type="text"
                  id="codeforcesInput"
                  value={codeforcesInput}
                  onChange={(e) => setCodeforcesInput(e.target.value)}
                  placeholder="e.g. alexdev_cf"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 3. Public Profile Visibility Toggle */}
        <section className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-md">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">Public Profile</h2>
                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                  isPublic 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {isPublic ? 'PUBLIC' : 'PRIVATE (DEFAULT)'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enable to allow recruiters &amp; GSoC mentors to view your verified DevAtlas profile at <span className="font-mono text-slate-700">/u/{user.githubUsername}</span>.
              </p>
            </div>

            {/* Custom Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              onClick={() => setIsPublic(!isPublic)}
              className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${
                isPublic ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  isPublic ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {isPublic && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Public profile link is active.</span>
              <button
                type="button"
                onClick={onNavigatePublicProfile}
                className="text-[#2563EB] hover:underline font-medium flex items-center gap-1"
              >
                <span>Preview Public Route</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
            </div>
          )}
        </section>

        {/* Save Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Save Settings
          </button>
        </div>

      </form>

    </main>
  );
};
