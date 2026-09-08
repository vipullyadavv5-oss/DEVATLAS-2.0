/**
 * ONBOARDING PAGE COMPONENT (Screen 2)
 * -----------------------------------------------------------------------------
 * File: src/pages/Onboarding.tsx
 * Purpose: First-time setup flow after GitHub OAuth login.
 *          Allows developers to connect LeetCode and Codeforces handles.
 */

import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (leetcodeUser: string, codeforcesHandle: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [leetcode, setLeetcode] = useState('');
  const [codeforces, setCodeforces] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(leetcode.trim(), codeforces.trim());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] technical-dot-grid text-[#0F172A] font-sans flex flex-col justify-between p-4 sm:p-6 select-none">
      <div className="flex-1 flex items-center justify-center py-6 sm:py-10">
        
        <main className="w-full max-w-[540px] bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_2px_0_rgba(15,23,42,0.04)] p-6 sm:p-8 transition-all">
          
          {/* Top Bar: Brand Mark & Step Badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shadow-sm shrink-0">
                <svg className="w-4 h-4 text-slate-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <span className="font-semibold text-base tracking-tight text-[#0F172A]">DevAtlas</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-mono font-medium text-[#475569]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              STEP 1 OF 1
            </div>
          </div>

          {/* Heading & Instructions */}
          <div className="space-y-1.5 mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              Complete your developer profile
            </h1>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Connect your coding profiles to build your verified DevScore.
            </p>
          </div>

          {/* Connected GitHub Badge Status */}
          <div className="mb-6 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#0F172A] flex items-center gap-1.5">
                  <span>GitHub</span>
                  <span className="font-mono text-[11px] text-[#64748B]">telemetry verified</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
              <span className="material-symbols-outlined text-[14px]">check</span>
              Connected
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* LeetCode Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="leetcode" className="block text-xs font-semibold text-[#0F172A]">
                  LeetCode Username
                </label>
                <span className="text-[11px] font-mono text-[#94A3B8]">Optional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                  <span className="material-symbols-outlined text-[18px] text-amber-600">code</span>
                </div>
                <input
                  type="text"
                  id="leetcode"
                  value={leetcode}
                  onChange={(e) => setLeetcode(e.target.value)}
                  placeholder="Enter your LeetCode username"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Used to include LeetCode problem data in your DevScore.
              </p>
            </div>

            {/* Codeforces Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="codeforces" className="block text-xs font-semibold text-[#0F172A]">
                  Codeforces Handle
                </label>
                <span className="text-[11px] font-mono text-[#94A3B8]">Optional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                  <span className="material-symbols-outlined text-[18px] text-sky-600">bar_chart</span>
                </div>
                <input
                  type="text"
                  id="codeforces"
                  value={codeforces}
                  onChange={(e) => setCodeforces(e.target.value)}
                  placeholder="Enter your Codeforces handle"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Used to include contest rating and ranking statistics.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Continue to Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

          </form>

        </main>

      </div>
    </div>
  );
};
