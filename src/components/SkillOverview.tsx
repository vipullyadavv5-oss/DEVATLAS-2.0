/**
 * SKILL OVERVIEW COMPONENT
 * -----------------------------------------------------------------------------
 * File: src/components/SkillOverview.tsx
 * Purpose: Renders skill metric progress bars across 4 categories (Problem Solving,
 *          Algorithms, Data Structures, Open Source).
 * 
 * Zero Value Rule:
 * Brand-new users default to 0% for all skill categories.
 */

import React from 'react';
import { UserProfile } from '../types';

interface SkillOverviewProps {
  user: UserProfile;
}

export const SkillOverview: React.FC<SkillOverviewProps> = ({ user }) => {
  const { skills } = user;

  const skillItems = [
    { label: 'Problem Solving', val: skills.problemSolving },
    { label: 'Algorithms', val: skills.algorithms },
    { label: 'Data Structures', val: skills.dataStructures },
    { label: 'Open Source', val: skills.openSource },
  ];

  return (
    <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 flex flex-col justify-between shadow-xs">
      <div className="space-y-3.5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-[#0F172A]">Skill Overview</h3>
          <span className="text-xs font-mono text-[#64748B]">4 Categories</span>
        </div>

        {/* Skill Progress Bars List */}
        <div className="space-y-2.5">
          {skillItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#475569] font-medium">{item.label}</span>
                <span className="font-mono text-[#64748B]">{item.val}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 transition-all duration-500" 
                  style={{ width: `${item.val}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Educational Note */}
      <p className="text-xs text-[#64748B] pt-3 mt-2 border-t border-slate-100">
        Skills are calculated from your verified coding activity.
      </p>
    </div>
  );
};
