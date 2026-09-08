---
name: DevAtlas Engineering System
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393f'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  sidebar-width: 15rem
  inspector-width: 20rem
---

## Brand & Style

This design system establishes a high-density, latency-zero aesthetic engineered specifically for developers, technical architects, and infrastructure operators. Inspired by the visual discipline of modern software engineering environments, the interface is uncompromisingly functional, typographic, and structural.

### Personality & Tone
- **Precision Engineering:** Everything is aligned to strict geometric intervals. There is no visual fluff, decorative non-functional art, or gratuitous motion.
- **Instrumental Focus:** The interface retreats into deep obsidian tones, allowing telemetry, code diffs, logs, and state changes to carry absolute prominence.
- **Trustworthy & Robust:** High-contrast neutral text pairings, sharp structural lines, and disciplined tactile feedback convey stability and reliability.

### Style Movement
The style operates at the intersection of **Utilitarian Minimalism** and **Technical Skeuomorphism**:
- Near-black tonal backdrops layered via subtle 1px border demarcations.
- Strict rejection of soft pastel gradients or multi-color ambient washes.
- Micro-interactions characterized by immediate (100–150ms) ease-out transitions and precise, razor-thin borders.

## Colors

The palette operates in strict dark mode, anchored by deep obsidian layered planes, neutral grayscale foregrounds, and targeted high-visibility functional accents.

### Palette Architecture
- **Base Canvas (`#090a0f`):** The foundational backdrop across root viewports and full-screen viewframes.
- **Surface Elevation 1 (`#0d1117`):** Sidebars, canvas wrappers, and inset containers.
- **Surface Elevation 2 (`#161b22`):** Cards, popovers, dropdown menus, code blocks, and standard interactive panels.
- **Border Default (`#27272a`):** The structural line separating layouts with 1px precision.
- **Border Subtle (`#21262d`):** Non-critical dividers and secondary item rows.
- **Border Focus / Hover (`#30363d`):** Elevates interactive bounds on hover or outline state.

### Accents & Indicators
- **Primary Interactive (`#3b82f6`):** Electric blue reserved strictly for selection indicators, active tab bars, targeted focus rings, and primary action affordances.
- **Success / Healthy (`#10b981`):** Emerald tone dedicated to operational checks, passed CI/CD pipelines, and deployed production states.
- **Destructive / Error (`#ef4444`):** Crisp crimson dedicated strictly to pipeline failure, destructive modal triggers, and runtime exceptions.
- **Warning (`#f59e0b`):** Amber tone for pending build tasks, canary rollouts, and rate limits.

### Text Tiers
- **Text Primary (`#f3f4f6`):** Maximum readability for code, headlines, and essential telemetry.
- **Text Secondary (`#9ca3af`):** Standard body copy, column headers, and breadcrumbs.
- **Text Muted (`#6b7280`):** Timestamps, metadata keys, and secondary labels.

## Typography

The typographic hierarchy prioritizes scan-density and monospace clarity. 

- **Inter** handles all interface navigation, body content, and titles with tightened negative tracking at scale to maintain structural density.
- **JetBrains Mono** is utilized strictly for technical microcopy, including commit hashes, terminal outputs, JSON trees, latency counters, and keyboard shortcuts.
- Scale rules dictate a compact rhythm: base UI copy sits comfortably at `13px` (`body-md`), standardizing maximum information density without sacrificing legibility on high-DPI displays.

## Layout & Spacing

The layout is grounded in a compact, modular dashboard workbench paradigm.

### Grid & Structure
- **Workbench Shell:** Fixed collapsible left sidebar (`15rem`), dynamic fluid center workspace, and an optional collapsible contextual inspector drawer (`20rem`).
- **Base Rhythm:** Spacing is rooted in 4px and 8px units. Compact interfaces must prefer `0.5rem` (8px) and `0.75rem` (12px) gaps between related inputs and table rows to maintain maximum spatial efficiency.
- **Responsive Adaptations:**
  - **Desktop (>= 1280px):** Multi-pane split views with real-time stream panes.
  - **Tablet (768px – 1279px):** Inspector drawer defaults to an overlay modal; sidebar collapses to an icon-only strip.
  - **Mobile (< 768px):** Navigation moves behind a single drawer; tables transition to stacked key-value cards; gutters collapse to `1rem`.

## Elevation & Depth

This system avoids heavy, atmospheric drop shadows and glowing neon effects. Elevation is expressed through explicit tonal stacking and crisp 1px borders.

### Surface Tiers
1. **Base Floor (`#090a0f`):** Structural gutters and outer workspace background.
2. **Surface Container (`#0d1117`):** Primary canvas backgrounds framed by `1px solid #27272a`.
3. **Elevated Elements (`#161b22`):** Cards, dropdown items, tooltips, and floating command palettes.

### Edge Illumination & Outlines
- Floating dialogs and popovers combine a 1px border (`#30363d`) with a subtle, tight boundary shadow: `0 8px 24px rgba(0, 0, 0, 0.65)`.
- Buttons and inputs feature an internal top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.05)`) paired with a dark bottom edge, delivering tactile separation without visual noise.

## Shapes

The design system uses deliberate, modest corner radii to maintain an architectural, technical feel across all components.

- **Base Radius (0.25rem / 4px):** Form inputs, buttons, chips, status tags, and inline code tokens.
- **Medium Radius (0.5rem / 8px):** Cards, modal windows, code editors, and dropdown panels.
- **Large Radius (0.75rem / 12px):** Root screen panels and top-level workbench frames.
- Pills and circles are reserved exclusively for avatars and numerical badge counters.

## Components

### Buttons
- **Primary:** Bright neutral white background (`#f3f4f6`) with near-black text (`#090a0f`), 500 weight, subtle top inset highlight, and crisp 1px border (`#e5e7eb`). Hover drops luminance slightly (`#e5e7eb`).
- **Secondary:** Dark surface (`#161b22`), subtle border (`#27272a`), muted foreground (`#f3f4f6`). Hover shifts border to `#30363d` and background to `#21262d`.
- **Ghost:** Transparent background, visible borders only on focus, text colored `#9ca3af` shifting to `#f3f4f6` on hover.
- **Destructive:** Dark background (`#161b22`), red border (`#ef4444` at 40%), text `#ef4444`.

### Chips & Badges
- Strict height of `20px` or `24px`.
- Composed of a faint background tint (8% opacity of state color), 1px matched border, and `JetBrains Mono` label at `11px`.
- Success status chips feature a 6px solid emerald dot adjacent to the label.

### Lists & Data Grids
- Tabular data renders in high-density tables with `36px` default row height.
- Rows feature a 1px bottom border (`#21262d`) with zero vertical borders.
- Hover states trigger an instantaneous row background change to `#161b22`.
- Numeric values and keys use tabular figures (`font-variant-numeric: tabular-nums`) and monospaced typography.

### Checkboxes & Radio Buttons
- 14px × 14px squares with a `2px` corner radius.
- Inactive state: `#161b22` fill with 1px `#30363d` border.
- Active state: `#3b82f6` solid fill with white checkmark icon; no ambient glow.

### Input Fields
- Heights set to `32px` (compact) and `36px` (standard).
- Background `#0d1117`, border 1px solid `#27272a`, text `#f3f4f6`.
- Focus state triggers an electric-blue border (`#3b82f6`) with an inset/outset ring of `0 0 0 1px #3b82f6`.

### Cards & Panels
- Background `#0d1117` or `#161b22` bounded by `1px solid #27272a`.
- Card headers feature an explicit 1px bottom divider line separating actions from content.

### Command Palette (KBar)
- Fixed width of `640px`, centered in the top third of viewport.
- Surface `#161b22`, border `1px solid #30363d`, shadow `0 16px 36px rgba(0,0,0,0.8)`.
- Input field contains a monospaced prefix indicator (`> `) and inline keyboard shortcut tags (`Cmd+K`, `Esc`).