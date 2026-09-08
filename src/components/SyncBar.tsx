/**
 * SYNC BAR COMPONENT
 * -----------------------------------------------------------------------------
 * File: src/components/SyncBar.tsx
 * Purpose: Bottom status bar displaying auto-sync schedule and manual refresh trigger.
 */

import React from 'react';

interface SyncBarProps {
  lastSyncedAt: string | null;
  onRefresh: () => void;
  isSyncing: boolean;
}

export const SyncBar: React.FC<SyncBarProps> = ({ lastSyncedAt, onRefresh, isSyncing }) => {
  return (
    <section className="rounded-xl bg-white border border-[#E2E8F0] px-4 py-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
        <span>Your data is refreshed automatically every 24 hours.</span>
      </div>

      <div className="flex items-center gap-3 font-mono text-[11px]">
        <span>
          Last synced: {lastSyncedAt ? lastSyncedAt : 'Never'}
        </span>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isSyncing}
          className="text-[#2563EB] hover:text-[#1D4ED8] font-medium font-sans text-xs underline disabled:opacity-50"
        >
          {isSyncing ? 'Refreshing…' : 'Refresh Data'}
        </button>
      </div>
    </section>
  );
};
