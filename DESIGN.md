<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: CodeGate

## 1. Overview

**Creative North Star: "The Sentinel Boardroom"**

The CodeGate design system is built to present the dynamic, tense negotiation between AI agents resolving PR compliance and costs. It features an immersive dark dev aesthetic inspired by technical terminal manuals and high-performance developer tooling. Instead of generic, rounded SaaS layouts, this system uses sharp geometry, structural borders, and purposeful neon accent glows to direct focus to the agent debate timeline.

Key characteristics:
- High-energy technical dark mode
- Asymmetric layout with terminal-inspired borders and grid lines
- Orchestrated step-by-step motion flow for the agent negotiation timeline
- High-contrast visual accents representing distinct agent status and arguments

This system rejects:
- Standard corporate landing page design (soft blue gradients, rounded generic cards, stock illustrations).
- SaaS-cream / warm-neutral templates (warm beige, soft pastel backgrounds).
- Chaotic cyberpunk overlays that impact text legibility.

## 2. Colors

The color strategy is committed: a deep dark base represents the workspace, highlighted by vibrant agent status glows mapping to the debate dynamics.

### Primary
- **Amber Honey Seed** (`[to be resolved during implementation]`): The primary brand identifier (seed-149 hue). Used for primary labels, highlight lines, and active agent focus.

### Accent
- **Security Red/Amber** (`[to be resolved during implementation]`): Indicates risks, warnings, and blocked states.
- **Cost Green** (`[to be resolved during implementation]`): Indicates healthy cost hygiene, approved states, or cost optimization badges.
- **Feasibility Gold** (`[to be resolved during implementation]`): Represents shipping urgency and the Ship Agent's arguments.

### Neutral
- **Deep Void Background** (`[to be resolved during implementation]`): The deep, near-black surface.
- **Technical Ink** (`[to be resolved during implementation]`): Ultra-high contrast light text.
- **Muted Structural Border** (`[to be resolved during implementation]`): Low-contrast border color for partitioning grids and sections.

**The Glow-to-Signal Rule.** Accent colors are used as localized glows or sharp border indicators rather than large solid fills. The rarity of saturated color signals danger, cost, or feasibility focus.

## 3. Typography

**Display Font:** `[font pairing to be chosen at implementation]`
**Body Font:** `[font pairing to be chosen at implementation]`
**Label/Mono Font:** `[font pairing to be chosen at implementation]`

**Character:** High-contrast pairing of a bold geometric display sans-serif for display headings and structured monospaced text for labels, data metrics, and agent dialogue.

### Hierarchy
- **Display** (Bold, `[size to be resolved]`, `[line-height to be resolved]`): Main headers and hero labels.
- **Headline** (Semi-bold, `[size to be resolved]`, `[line-height to be resolved]`): Section headers.
- **Title** (Medium, `[size to be resolved]`, `[line-height to be resolved]`): Agent name headers and message highlights.
- **Body** (Regular, `[size to be resolved]`, `[line-height to be resolved]`): Agent reasoning transcripts and PR content (max line length 65–75ch).
- **Label** (Medium/Semi-bold Monospace, `[size to be resolved]`, uppercase with letter-spacing): Technical data, system statuses, timestamp indicators.

## 4. Elevation

The system is layered. It uses structured grid overlays and subtle depth elevations (leveraging neon borders and drop glows rather than soft grey shadows) to visually lift the active agent cards in the negotiation timeline during playback.

**The Active Focus Rule.** Only the active speaking agent card in the timeline is elevated with a subtle color-matched glow. All other cards remain flat and semi-muted to direct the viewer's eye.

## 5. Components

`[No components exist yet. Standard primitives for buttons, timeline nodes, and configuration input fields will be documented once code is implemented.]`

## 6. Do's and Don'ts

### Do:
- **Do** use strict high-contrast light text against near-black backgrounds (minimum 4.5:1 ratio).
- **Do** align the entrance animations of the timeline elements to a clear chronological sequence (choreographed motion).
- **Do** use clear iconography and text labels alongside color coding (Amber/Red/Green) to denote statuses.
- **Do** pair large bold headings with monospace technical accents to reinforce the developer feel.

### Don't:
- **Don't** use standard corporate landing page style (soft blue gradients, rounded cards, vector illustrations).
- **Don't** use warm beige/cream/sand backgrounds.
- **Don't** add side-stripe borders as card accents.
- **Don't** use gradient text combinations.
- **Don't** apply motion or scale transforms directly to images on hover.
