# DESIGN.md: Jesus Diez (@jdev-king) Engineering Monograph & RFC Studio

## Identity & Purpose
- **Product / Subject**: Personal engineering portfolio and interactive system architecture documentation portal for Jesus Sebastian Diez Plasencia (`@jdev-king`), Tech Lead & Full Stack AI Architect at SINTAD (Lima, Peru).
- **Audience**: CTOs, VPs of Engineering, Staff/Principal Engineers, and technical recruiters evaluating real production systems (SINTAD AI Knowledge Agent v3.1, NexusFlow v1.0 CDC Engine, Unified Analytics Bridge v2.0).
- **Personality & Mood**: Industrial editorial monograph meets interactive engineering RFC specification. Grounded, precise, evidence-driven, and tactile.

## Liveliness Dials
Dial: ENERGY 2 / RHYTHM 3 / MOTION 3

- **ENERGY 2 (Balanced)**: Confident typographic scale, exposed 1px structural hairlines, and a single high-contrast International Signal Orange / Vermilion accent that directs the eye without decorative noise.
- **RHYTHM 3 (Varied, asymmetric compositions)**: Every section on the home page uses a distinct layout tailored to its content:
  1. **Hero (`#hero-section`)**: 7/5 asymmetric editorial split pairing a direct architectural thesis and action bar on the left with a portrait + 3-RFC specification index ledger on the right.
  2. **Scroll-Scrubbed Architecture Pipeline (`#pipeline`)**: Full-bleed sticky viewport stage (`240vh` scroll runway on desktop) where vertical scroll scrubs a live transaction across 4 production stages.
  3. **Architecture RFCs (`#architectures-showcase`)**: Flagship full-width monograph row for `RFC-AI-301` followed by a 2-column split for `RFC-ERP-101` and `RFC-DATA-201` (hierarchy over uniform cards).
  4. **Career Trajectory (`#work`)**: 4/8 sticky-header chronological ledger table with expandable slide-over specification drawer.
  5. **Technical Stack (`#skills`)**: Structured architectural layer matrix with category filters and compositor-driven `scaleX` proficiency bars.
  6. **Open Source Repositories (`#projects`)**: Paginated repository ledger with live GitHub API state handling (loading, error, empty, populated).
  7. **Technical Writing (`#articles`)**: Numbered editorial publication list (`01`, `02`, ...) with live Medium RSS state handling.
- **MOTION 3 (Choreographed scroll-scrubbing & tactile transitions)**: 1:1 scroll-scrubbed packet and chapter rail progression on the main pipeline stage, `cubic-bezier(0.23, 1, 0.32, 1)` interactive feedback, and complete `prefers-reduced-motion: reduce` support.

## Color System (R-29 & R-25 WCAG AA Verified)
Restricted to 2 core neutral surfaces + 1 deliberate accent color per theme. Zero blue-to-purple gradients, zero blurred radial orbs, zero multi-color rainbow stat cards.

### Dark Theme (Default for technical architecture inspection)
- **Canvas Background (`--color-bg`)**: `#0c0c0b` (Warm Carbon)
- **Primary Surface (`--color-surface`)**: `#141413` (Warm Obsidian)
- **Secondary Surface (`--color-surface-2`)**: `#1c1c1a` (Elevated Stone)
- **Primary Text (`--color-text`)**: `#f5f4f0` (17.78:1 on `#0c0c0b`, 16.75:1 on `#141413` - WCAG AAA)
- **Secondary Text (`--color-text-secondary`)**: `#c6c4be` (11.22:1 on `#0c0c0b`, 10.57:1 on `#141413` - WCAG AAA)
- **Muted Text (`--color-muted`)**: `#9e9c95` (7.12:1 on `#0c0c0b`, 6.71:1 on `#141413`, 6.21:1 on `#1c1c1a` - WCAG AA/AAA)
- **Deliberate Accent (`--color-accent`)**: `#fb923c` (International Signal Orange - 8.65:1 on `#0c0c0b`, 8.14:1 on `#141413`; Dark CTA text `#0c0c0b` on `#fb923c` is 8.65:1)
- **Interactive Boundary (`--color-border-strong`)**: `#68655e` (3.17:1 on `#141413` - passes WCAG 1.4.11 Non-Text Contrast >= 3:1)

### Light Theme (Full parity via header toggle)
- **Canvas Background (`--color-bg`)**: `#f6f5f0` (Editorial Warm Paper)
- **Primary Surface (`--color-surface`)**: `#ffffff` (Pure Sheet)
- **Secondary Surface (`--color-surface-2`)**: `#eceae3` (Warm Stone Inset)
- **Primary Text (`--color-text`)**: `#141413` (16.89:1 on `#f6f5f0`, 18.43:1 on `#ffffff` - WCAG AAA)
- **Secondary Text (`--color-text-secondary`)**: `#3d3b37` (10.24:1 on `#f6f5f0`, 11.18:1 on `#ffffff` - WCAG AAA)
- **Muted Text (`--color-muted`)**: `#524f49` (7.64:1 on `#f6f5f0`, 8.34:1 on `#ffffff`, 6.78:1 on `#eceae3` - WCAG AAA)
- **Deliberate Accent (`--color-accent`)**: `#b53808` (International Vermilion - 5.44:1 on `#f6f5f0`, 5.94:1 on `#ffffff`; White CTA text `#ffffff` on `#b53808` is 5.94:1)
- **Interactive Boundary (`--color-border-strong`)**: `#737069` (4.53:1 on `#f6f5f0`, 4.60:1 on `#ffffff` - passes WCAG 1.4.11 Non-Text Contrast >= 3:1)

## Typography (R-06)
- **Headings (`Space Grotesk`)**: Chosen for geometric clarity in technical headlines, section indices, and quantitative benchmarks.
- **Body Prose (`Inter`)**: Chosen for comfortable long-form reading across dense RFC architecture specifications and tables.
- **Technical Metadata (`Fira Code`, `tabular-nums`)**: Restricted strictly to RFC codes (`RFC-AI-301`), version numbers, latency/cost figures, and file paths. Never used for large headings.

## Identity Motif
- **RFC Specification Ledger**: Exposed `1px solid` structural borders, tabular monospace reference codes (`RFC-AI-301`, `RFC-ERP-101`, `RFC-DATA-201`), and embedded interactive Archify HTML topology diagrams.

## One-Line Reasons for Major Visual Decisions (R-31)
- **Color**: Warm carbon/paper neutrals paired with a single International Signal Orange/Vermilion accent eliminate AI-default blue-purple gradients while maintaining >5.4:1 WCAG AA contrast in both themes.
- **Layout**: Asymmetric section compositions (7/5 hero split, sticky scroll-scrubbed stage, flagship+2 RFC hierarchy, 4/8 career ledger, numbered article rows) reflect the distinct nature of each content type.
- **Typography**: Space Grotesk headlines, Inter prose, and tabular Fira Code metadata separate narrative arguments from quantitative engineering telemetry.
- **Spacing**: Responsive fluid spacing (`3.5rem` mobile to `6.5rem` desktop between major sections) creates structural breathing room between dense technical specifications.
- **Cards & Surfaces**: Flat 1px-bordered surfaces sit on the ground plane, while elevation shadows are reserved exclusively for the floating work drawer and the interactive Archify studio frame (R-12).
- **Diagrams & Visuals**: Real interactive Archify HTML diagrams (`public/architectures/*.html`) and an authentic portrait (`fetchpriority="high"`) replace decorative illustrations and fake terminal windows.
- **Directional Cue (`→`)**: Used exclusively on primary RFC case-study links to signify entering a deep-dive specification document, omitted from all general buttons and utility controls (R-08).
