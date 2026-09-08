/**
 * REUSABLE PLATFORM CARD COMPONENT
 * -----------------------------------------------------------------------------
 * File: src/components/PlatformCard.tsx
 * Purpose: Unified component rendering developer data for GitHub, LeetCode, or Codeforces.
 * 
 * Handled States:
 * - Not connected / Not synced (Displays zero metrics as per strict product rule)
 * - Syncing / Loading (Displays spinning icon)
 * - Connected (Displays verified metrics)
 * - Error (Displays standard red alert banner with retry trigger)
 */

import React from 'react';
import { ConnectionState, GitHubStats, LeetCodeStats, CodeforcesStats } from '../types';

export type PlatformType = 'github' | 'leetcode' | 'codeforces';

interface PlatformCardProps {
  type: PlatformType;
  state: ConnectionState;
  handle?: string | null;
  githubStats?: GitHubStats;
  leetcodeStats?: LeetCodeStats;
  codeforcesStats?: CodeforcesStats;
  onSync: () => void;
  onConnect: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  type,
  state,
  handle,
  githubStats,
  leetcodeStats,
  codeforcesStats,
  onSync,
  onConnect
}) => {
  // Render Platform Badge Indicator
  const renderBadge = () => {
    switch (state) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Connected
          </span>
        );
      case 'loading':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Syncing…
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Failed
          </span>
        );
      case 'not_synced':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Not synced
          </span>
        );
      case 'not_connected':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-500 border border-slate-200">
            Not connected
          </span>
        );
    }
  };

  // Render Card Content Body based on Platform Type
  const renderContent = () => {
    if (state === 'error') {
      return (
        <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-rose-800 font-medium">
            <span>Unable to retrieve data</span>
            <button 
              onClick={onSync} 
              className="text-rose-700 underline font-semibold hover:text-rose-900"
            >
              Retry
            </button>
          </div>
          <p className="text-[#64748B] text-[11px]">
            API gateway timeout or rate limit exceeded. Click retry to re-attempt sync.
          </p>
        </div>
      );
    }

    if (type === 'github') {
      const repos = githubStats?.repositories ?? 0;
      const commits = githubStats?.commits ?? 0;
      const langs = githubStats?.languagesCount ?? 0;

      return (
        <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Repositories</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{repos}</span>
          </div>
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Commits</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{commits}</span>
          </div>
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Languages</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{langs}</span>
          </div>
        </div>
      );
    }

    if (type === 'leetcode') {
      const total = leetcodeStats?.totalSolved ?? 0;
      const easy = leetcodeStats?.easySolved ?? 0;
      const med = leetcodeStats?.mediumSolved ?? 0;
      const hard = leetcodeStats?.hardSolved ?? 0;

      return (
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
            <span className="text-xs text-[#64748B]">Problems Solved</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{total}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="space-y-0.5">
              <span className="block text-[10px] text-emerald-600 font-medium">Easy</span>
              <span className="font-mono text-xs font-semibold text-[#0F172A]">{easy}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] text-amber-600 font-medium">Med</span>
              <span className="font-mono text-xs font-semibold text-[#0F172A]">{med}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] text-rose-600 font-medium">Hard</span>
              <span className="font-mono text-xs font-semibold text-[#0F172A]">{hard}</span>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'codeforces') {
      const rating = codeforcesStats?.rating ?? 0;
      const rank = codeforcesStats?.rank ?? '—';
      const contests = codeforcesStats?.contestsCount ?? 0;

      return (
        <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Rating</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{rating}</span>
          </div>
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Rank</span>
            <span className="font-mono text-base font-semibold text-slate-400">{rank}</span>
          </div>
          <div className="space-y-0.5">
            <span className="block text-xs text-[#64748B]">Contests</span>
            <span className="font-mono text-base font-bold text-[#0F172A]">{contests}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // Header Title & Icon config
  const getHeaderMeta = () => {
    switch (type) {
      case 'github':
        return {
          title: 'GitHub',
          subtitle: handle ? `@${handle}` : 'Primary Identity',
          iconBg: 'bg-[#0F172A] text-white',
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          ),
          description: 'Sync your GitHub activity to start building your verified profile.'
        };
      case 'leetcode':
        return {
          title: 'LeetCode',
          subtitle: handle ? `@${handle}` : 'Algorithms & DSA',
          iconBg: 'bg-amber-50 border border-amber-200 text-amber-600',
          icon: <span className="material-symbols-outlined text-[18px]">code</span>,
          description: handle ? `Connected to @${handle}` : 'Add your LeetCode username to include your coding activity.'
        };
      case 'codeforces':
        return {
          title: 'Codeforces',
          subtitle: handle ? `@${handle}` : 'Competitive Elo',
          iconBg: 'bg-sky-50 border border-sky-200 text-sky-600',
          icon: <span className="material-symbols-outlined text-[18px]">bar_chart</span>,
          description: handle ? `Connected to @${handle}` : 'Add your Codeforces handle to include your contest data.'
        };
    }
  };

  const meta = getHeaderMeta();

  return (
    <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
      <div className="space-y-4">
        
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 ${meta.iconBg}`}>
              {meta.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">{meta.title}</h3>
              <span className="text-[11px] font-mono text-[#64748B]">{meta.subtitle}</span>
            </div>
          </div>
          {renderBadge()}
        </div>

        {/* Dynamic Metric Grid */}
        {renderContent()}

        {/* Subtitle / Explanation */}
        <p className="text-xs text-[#64748B] leading-relaxed">
          {meta.description}
        </p>

      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-slate-100">
        {state === 'not_connected' ? (
          <button
            type="button"
            onClick={onConnect}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 active:bg-slate-100 text-[#0F172A] text-sm font-medium transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add {meta.title}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onSync}
            disabled={state === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#0F172A] hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 text-white text-sm font-medium transition-colors shadow-xs"
          >
            <span className={`material-symbols-outlined text-[16px] ${state === 'loading' ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{state === 'loading' ? `Syncing ${meta.title}…` : `Sync ${meta.title} Data`}</span>
          </button>
        )}
      </div>

    </div>
  );
};
