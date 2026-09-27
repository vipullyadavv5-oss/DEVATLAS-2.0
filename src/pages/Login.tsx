/**
 * LOGIN PAGE COMPONENT (Screen 1)
 * -----------------------------------------------------------------------------
 * File: src/pages/Login.tsx
 * Purpose: Authenticates developers using GitHub as the primary OAuth provider.
 * 
 * Security & Trust Policy:
 * DevAtlas strictly enforces read-only OAuth permissions.
 * No password login or external non-developer providers are permitted.
 */

import React from 'react';
import { SignInButton } from '@clerk/react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = () => {

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-center items-center select-none overflow-hidden m-0 p-4 bg-[#F8FAFC]">
      {/* Background Radial Ambient Glow & Technical Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.03),rgba(248,250,252,0)_70%)]"></div>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <main className="relative z-10 w-full mx-auto flex flex-col justify-center items-stretch" style={{ maxWidth: '460px' }}>
        <div className="flex flex-col w-full">
          
          {/* Interactive Auth Card Wrapper */}
          <div className="w-full bg-white rounded-xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] border border-[#E2E8F0] overflow-hidden">
            
            {/* Top Ambient Glow Line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              
              {/* Brand Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center relative shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-semibold text-[#0F172A] tracking-tight">DevAtlas</span>
                  </div>
                </div>
              </div>

              {/* Main Tagline & Hierarchy */}
              <div className="flex flex-col gap-1">
                <h1 className="text-xl sm:text-2xl text-[#0F172A] font-semibold tracking-tight">
                  One verified profile.
                </h1>
                <p className="text-sm text-[#475569]">
                  Real GitHub, LeetCode &amp; Codeforces telemetry.
                </p>
              </div>

              {/* Verified Data Sources Strip */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-medium">
                    Unified Data Sources
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-[#059669] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Sync Ready
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* GitHub Source Badge */}
                  <div className="bg-white border border-[#E2E8F0] rounded p-2 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <svg className="w-3.5 h-3.5 text-[#0F172A] shrink-0 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      <span className="font-mono text-xs text-[#1E293B] font-medium truncate">GitHub</span>
                    </div>
                    <span className="material-symbols-outlined text-[#059669] text-xs shrink-0">check</span>
                  </div>

                  {/* LeetCode Source Badge */}
                  <div className="bg-white border border-[#E2E8F0] rounded p-2 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-[#EA580C] text-xs shrink-0">code</span>
                      <span className="font-mono text-xs text-[#1E293B] font-medium truncate">LeetCode</span>
                    </div>
                    <span className="material-symbols-outlined text-[#059669] text-xs shrink-0">check</span>
                  </div>

                  {/* Codeforces Source Badge */}
                  <div className="bg-white border border-[#E2E8F0] rounded p-2 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-[#2563EB] text-xs shrink-0">equalizer</span>
                      <span className="font-mono text-xs text-[#1E293B] font-medium truncate">Codeforces</span>
                    </div>
                    <span className="material-symbols-outlined text-[#059669] text-xs shrink-0">check</span>
                  </div>
                </div>
              </div>

              {/* Authentication Button Module */}
              <div className="flex flex-col gap-3 pt-1">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="w-full h-12 px-6 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.99] transition-all duration-150 relative overflow-hidden shadow-sm cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 text-white">
                      <svg className="w-5 h-5 text-white shrink-0 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      <span>Continue with GitHub</span>
                    </span>
                  </button>
                </SignInButton>

                {/* Read-Only Security Guarantee */}
                <div className="flex items-center gap-2 px-1 py-1">
                  <span className="material-symbols-outlined text-[#64748B] text-base shrink-0">verified_user</span>
                  <p className="text-xs text-[#64748B] leading-tight">
                    Read-only access. DevAtlas never asks for repo write permissions.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#E2E8F0] flex justify-center">
                <span className="font-mono text-xs text-[#64748B]">Built for developers</span>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
