# Product

## Register

brand

## Users
- **Hackathon Judges:** Reviewing the project within a tight window; they need to grasp the multi-agent negotiation flow in a 3-minute demo video.
- **Engineering Teams:** Developers and tech leads looking for robust PR reviews without adding friction to their shipping pipeline.
- **Security & Compliance Officers:** Professionals requiring strict guardrails on secrets and PII (Personal Identifiable Information) in source code.
- **Engineering Managers / FinOps:** Leaders looking to optimize and govern expensive LLM API usage in developer environments.

## Product Purpose
CodeGate is a multi-agent code review system designed to catch compliance, security, and cost risks before code is merged. Instead of simple pattern matching, CodeGate features specialized guardian agents that negotiate with a feasibility agent to balance safety and velocity. The final moderator agent reconciles these viewpoints into a clear, unified PR verdict.

## Brand Personality
- **Dynamic, Technical, and High-Energy:** High-impact, responsive, developer-centric layout that leverages terminal-like controls and live interaction.
- **Vigilant but Constructive:** Visually conveys security and cost safety without feeling like an administrative blocker.
- **High-contrast Cyber-Security Aesthetic:** Immersive dark mode with vibrant agent-specific accent glows (Amber/Red for Security, Neon Green for Cost, Gold for Feasibility) representing the active debate states.

## Anti-references
- **SaaS-Cream / Warm-Neutral Templates:** No warm beige/cream backgrounds, soft pastel cards, or generic flat rounded-corner panels.
- **Corporate Blue / Safe Enterprise SaaS:** Avoid generic, uninspiring navy-and-grey layouts that lack visual identity or energy.
- **Chaotic Cyberpunk:** No unreadable glitch effects, flickering animations, or decorative neon elements that impair accessibility.

## Design Principles
- **Visible Negotiation:** The core of the product is multi-agent collaboration. The UI must visualize this dialogue as a rich, chronological debate timeline rather than a static summary list.
- **Vigilance with Velocity:** Design layouts to contrast guardian warnings against shipping feasibility, showing the tension between security/cost policy and release urgency.
- **Tactile Developer Material:** Lean into structural UI borders, sharp geometry, technical indicators, and clear typography that reads as a high-fidelity dev tool.

## Accessibility & Inclusion
- **High Contrast:** Ensure all body text and status indicators exceed WCAG AA contrast ratios (minimum 4.5:1 against the near-black background).
- **Multi-modal Status Indicators:** Never rely solely on color to convey state (e.g. Red/Green). Pair color changes with distinct iconography, status badges, and clear text.
- **Reduced Motion Support:** Apply smooth transitions with a clean fallback for users with `prefers-reduced-motion: reduce`.
