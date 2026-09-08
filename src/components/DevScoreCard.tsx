/**
 * DEVSCORE CARD COMPONENT
 * -----------------------------------------------------------------------------
 * File: src/components/DevScoreCard.tsx
 * Purpose: Renders the primary DevScore hero section with circular SVG progress meter
 *          and individual platform score contribution breakdown bars.
 * 
 * Zero-Data Compliance:
 * Displays `0 / 100` and "Waiting for data" badge when telemetry has not been connected or synced.
 */

import React from 'react';
import { UserProfile } from '../types';

interface DevScoreCardProps {
  user: UserProfile;
}

export const DevScoreCard: React.FC<DevScoreCardProps> = ({ user }) => {
  const score = user.devScore;
  const circumference = 314.16; // 2 * Math.PI * 50
  const dashOffset = circumference - (score / 100) * circumference;

  // Calculate platform count connected
  const syncedCount = [user.githubState, user.leetcodeState, user.codeforcesState]
    .filter(s => s === 'connected').length;

  return (
    <section className="rounded-xl bg-white border border-[#E2E8F0] p-6 shadow-xs relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: DevScore SVG Gauge */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Active Progress Track */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                stroke="#2563EB"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            
            {/* Center Numerical Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-[#0F172A] tracking-tight leading-none">
                {score}
              </span>
              <span className="text-xs font-mono font-medium text-[#64748B] mt-1">
                / 100
              </span>
            </div>
          </div>

          {/* Title & Status Badge */}
          <div className="space-y-2.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#64748B] uppercase">
                DEVSCORE
              </span>
              {score > 0 ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Verified Profile
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Waiting for data
                </span>
              )}
            </div>
            
            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              {score > 0
                ? "Your verified score based on GitHub, LeetCode, and Codeforces telemetry."
                : "Your verified developer score will appear after your coding data is synced."}
            </p>
          </div>

        </div>

        {/* Vertical Separator Divider (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 h-24 w-px bg-slate-200 mx-auto"></div>

        {/* Right Column: Score Breakdown Weight Bars */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#0F172A]">Score Breakdown</span>
            <span className="text-xs font-mono text-[#64748B]">{syncedCount} of 3 Synced</span>
          </div>

          <div className="space-y-3">
            
            {/* GitHub Telemetry Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#0F172A]">GitHub Telemetry</span>
                <span className="font-mono text-[#64748B]">
                  {user.githubState === 'connected' ? 'Calculated' : '0'} (Weight: 40%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 transition-all duration-500" 
                  style={{ width: user.githubState === 'connected' ? '50%' : '0%' }}
                ></div>
              </div>
            </div>

            {/* LeetCode Problem Index Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#0F172A]">LeetCode Problem Index</span>
                <span className="font-mono text-[#64748B]">
                  {user.leetcodeState === 'connected' ? 'Calculated' : '0'} (Weight: 35%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 transition-all duration-500" 
                  style={{ width: user.leetcodeState === 'connected' ? '40%' : '0%' }}
                ></div>
              </div>
            </div>

            {/* Codeforces Elo Ratio Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#0F172A]">Codeforces Elo Ratio</span>
                <span className="font-mono text-[#64748B]">
                  {user.codeforcesState === 'connected' ? 'Calculated' : '0'} (Weight: 25%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 transition-all duration-500" 
                  style={{ width: user.codeforcesState === 'connected' ? '30%' : '0%' }}
                ></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
