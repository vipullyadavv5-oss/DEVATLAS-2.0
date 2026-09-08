/**
 * TOP NAVIGATION BAR COMPONENT
 * -----------------------------------------------------------------------------
 * File: src/components/Navbar.tsx
 * Purpose: Provides top-level branding, active tab navigation, public profile access link,
 *          and authenticated user identity display.
 */

import React from 'react';
import { ActiveScreen, UserProfile } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ activeScreen, onNavigate, user }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E2E8F0] h-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        
        {/* Brand Mark & Primary Navigation */}
        <div className="flex items-center gap-6 sm:gap-8">
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-[#0F172A] tracking-tight">DevAtlas</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                activeScreen === 'dashboard'
                  ? 'text-[#2563EB] after:content-[""] after:absolute after:bottom-[-9px] after:left-3 after:right-3 after:h-[2px] after:bg-[#2563EB] after:rounded-full font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                activeScreen === 'settings'
                  ? 'text-[#2563EB] after:content-[""] after:absolute after:bottom-[-9px] after:left-3 after:right-3 after:h-[2px] after:bg-[#2563EB] after:rounded-full font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Right Actions & User Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Public Profile View Trigger */}
          <button
            type="button"
            onClick={() => onNavigate('public_profile')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-[#0F172A] px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 transition-colors shadow-xs"
            title="Preview public profile route /u/alexdev"
          >
            <span>View Public Profile</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          {/* Active Authenticated Developer Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0F172A] text-xs font-semibold">
              AD
            </div>
            <span className="font-mono text-xs font-medium text-[#0F172A] hidden sm:inline">
              @{user.githubUsername}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
