# DEVATLAS — Unified Developer Profile Platform

> **Tagline:** "One verified profile. Real GitHub, LeetCode & Codeforces data."

DevAtlas is a unified developer profile platform engineered for college students and software engineering candidates. It combines verified activity metrics from **GitHub**, **LeetCode**, and **Codeforces** into a single, trustworthy developer profile for internships, campus placements, open-source opportunities, and GSoC (Google Summer of Code).

---

## 1. Project Overview

Modern technical hiring often requires candidates to showcase their skills across disparate platforms—open-source contributions on GitHub, algorithmic problem solving on LeetCode, and competitive programming ratings on Codeforces. DevAtlas solves this fragmenting problem by aggregating verified telemetry into one standardized **DevScore** and unified developer footprint.

### Key Product Principles:
- **Zero Fake Statistics Guarantee**: DevAtlas NEVER fabricates developer stats. Brand-new accounts start with actual zero values (`0/100` DevScore, `0` commits, `0` LeetCode problems, `0` Codeforces rating).
- **Read-Only Trust Model**: DevAtlas requests read-only OAuth permissions and never requests repository write access.
- **Laptop & Desktop Web Optimized**: Precision high-density layout designed for 1366×768, 1440×900, and 1536×864 desktop viewports.

---

## 2. Main Features & Screens

The platform consists of 5 core screens matching the exported Google Stitch UI/UX design specifications:

1. **Login Page (`Login.tsx`)**:
   - Primary "Continue with GitHub" OAuth authentication button.
   - Read-only permission notice ("Read-only access. DevAtlas never asks for repo write permissions.").
   - Unified data sources indicator (GitHub, LeetCode, Codeforces).

2. **Onboarding Page (`Onboarding.tsx`)**:
   - Step 1 of 1 first-time setup flow after GitHub authentication.
   - Allows linking LeetCode username and Codeforces handle.
   - Displays verified GitHub identity status chip.

3. **Dashboard (`Dashboard.tsx`)**:
   - Primary developer workbench.
   - SVG Circular DevScore progress meter (`0 / 100` baseline).
   - Reusable `PlatformCard` grid (GitHub, LeetCode, Codeforces).
   - Developer Insight card with clean empty state ("Insights will appear once your coding activity is available.").
   - Skill Overview progress bars (Problem Solving, Algorithms, Data Structures, Open Source).
   - Data refresh and auto-sync status bar.

4. **Settings Page (`Settings.tsx`)**:
   - View connected GitHub account.
   - Add/update LeetCode username and Codeforces handle.
   - Public Profile toggle (defaults strictly to **PRIVATE**).

5. **Public Profile Route (`PublicProfile.tsx`)**:
   - Public profile view accessible at `/u/:username`.
   - **Strict Read-Only Enforcement**: Completely omits edit buttons, settings triggers, or account controls.
   - Displays verified developer statistics for recruiters and mentors.

---

## 3. Technology Stack

- **Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Custom Light Mode theme matching Stitch tokens)
- **Design System Tokens**:
  - Background: `#F8FAFC`
  - Cards & Containers: `#FFFFFF`
  - Primary Text: `#0F172A`
  - Secondary Text: `#475569`
  - Muted Text: `#64748B`
  - Borders: `#E2E8F0`
  - Primary Accent: `#2563EB`
  - Success Indicator: `#10B981`
  - Error Indicator: `#EF4444`
- **Typography**: Inter (UI copy) & JetBrains Mono (technical copy & monospaced labels)
- **Icons**: Lucide React & Google Material Symbols Outlined

---

## 4. Project Structure

```
DEVATLAS/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Top navigation header with screen routing
│   │   ├── DevScoreCard.tsx       # SVG circular DevScore meter & breakdown bars
│   │   ├── PlatformCard.tsx       # Reusable card for GitHub, LeetCode & Codeforces
│   │   ├── DeveloperInsight.tsx   # Telemetry insight container & empty state
│   │   ├── SkillOverview.tsx      # Skill category progress indicators
│   │   └── SyncBar.tsx            # Data refresh controls & sync timestamp
│   │
│   ├── pages/
│   │   ├── Login.tsx              # Screen 1: GitHub OAuth Login
│   │   ├── Onboarding.tsx         # Screen 2: Handle linking setup
│   │   ├── Dashboard.tsx          # Screen 3: Main developer workbench
│   │   ├── Settings.tsx           # Screen 4: Handle management & privacy toggle
│   │   └── PublicProfile.tsx      # Screen 5: Read-only public profile (/u/username)
│   │
│   ├── services/
│   │   ├── github.ts              # GitHub REST API service abstraction
│   │   ├── leetcode.ts            # LeetCode GraphQL API service abstraction
│   │   └── codeforces.ts          # Codeforces REST API service abstraction
│   │
│   ├── types/
│   │   └── index.ts               # Central TypeScript data interfaces
│   │
│   ├── utils/
│   │   └── devScore.ts            # DevScore calculation algorithm & zero helpers
│   │
│   ├── App.tsx                    # Main state container & view switcher
│   ├── main.tsx                   # React root entry point
│   └── index.css                  # Tailwind directives & technical grid pattern
│
├── index.html                     # HTML root with Inter & JetBrains Mono fonts
├── package.json                   # Project dependencies & scripts
├── tailwind.config.js             # DevAtlas color palette & typography config
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite dev server configuration
```

---

## 5. How to Run the Project

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps to Launch:
1. Open terminal in the project directory:
   ```bash
   cd c:/DEVATLAS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

---

## 6. How DevScore Works Conceptually

DevScore is calculated as a weighted integer index from `0` to `100`:

$$\text{DevScore} = \text{GitHub Score (40\%)} + \text{LeetCode Score (35\%)} + \text{Codeforces Score (25\%)}$$

1. **GitHub Telemetry (Weight: 40%)**:
   - Commits (up to 25 pts)
   - Verified Public Repositories (up to 10 pts)
   - Language Diversity Index (up to 5 pts)

2. **LeetCode Problem Index (Weight: 35%)**:
   - Weighted problem breakdown: Easy (0.05 pts), Medium (0.15 pts), Hard (0.35 pts).

3. **Codeforces Elo Rating (Weight: 25%)**:
   - Ratio of active contest rating scaled against 2000 Elo benchmark.

> **Zero Safety**: If a platform is not connected or has zero activity, its contribution is exactly 0 points.

---

## 7. Future API Integration Roadmap

When backend API endpoints are configured, the service modules in `src/services/` will interface directly with public APIs:
- **GitHub**: `GET https://api.github.com/users/{username}/events`
- **LeetCode**: `POST https://leetcode.com/graphql` (matchedUser submission stats)
- **Codeforces**: `GET https://codeforces.com/api/user.info?handles={handle}`

---

## 8. College Project Evaluation Notes

This codebase features detailed inline documentation throughout all components, types, services, and pages. Every major function and state transition includes explanatory comments detailing why specific states exist, how data flows between components, and how zero-value policies are strictly enforced.
