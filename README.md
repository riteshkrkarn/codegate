# CodeGate

**Multi-agent PR review that balances security, compliance, and shipping velocity.**

CodeGate is a multi-agent code review system that catches compliance, security, and cost risks before code merges. Specialized guardian agents negotiate with a feasibility agent; a moderator reconciles the debate into one clear PR verdict — approve, block, or needs human review.

> **Hackathon:** [Qwen Hackathon](https://github.com/riteshkrkarn/codegate) · **Track:** Agent Society (Multi-Agent Collaboration)

---

## The problem

Human reviewers miss risky patterns under time pressure:

- Hardcoded secrets and credentials
- Real customer/PII data reused in tests
- Expensive LLM/API calls left in dev/test code

Most review tools cover style, bugs, and common vulns. They rarely cover **compliance** or **cost risk**. Those gaps cause breaches, fines, and drained API budgets.

## The solution

CodeGate reviews PRs like an industry-grade board — with two pillars most tools ignore:

| Pillar | What it guards |
| --- | --- |
| **Data Guardian** | Secrets, PII leaks, company compliance policy |
| **Cost Guardian** | Expensive model usage, unmocked paid APIs, unbounded billing loops |

Agents don’t only run checks in parallel. They **negotiate**:

1. Guardian agents flag risk with severity + reasoning  
2. Ship / Feasibility agent argues against over-blocking when delivery urgency is high  
3. Moderator reconciles conflict into a single verdict  

That mirrors how real engineering orgs already balance security vs velocity.

---

## Core features

### PR ingestion
- GitHub PR via webhook or manual URL
- Demo fallback: mock PRs with planted issues for a reliable 3-minute walkthrough

### Multi-agent review
**Data Guardian**
- Secrets / Credentials Agent  
- PII Agent  
- Compliance Policy Agent  

**Cost Guardian**
- Model Usage Agent  
- API Call Hygiene Agent  
- Budget Guard Agent  

**Standard review baseline**
- Security, Code Quality, Architecture, Performance, Test Coverage  

**Coordination**
- Ship / Feasibility Agent  
- Moderator Agent → `Approve` / `Block` / `Needs Human Review`

### Negotiation transcript
Full debate timeline is stored and shown — the primary demo moment.

### Company policy config
JSON/YAML for sensitive patterns, restricted APIs, license blocklists, expensive models, and budget thresholds.

### Dashboard (planned)
- Reviewed PRs + verdicts  
- Per-agent findings + negotiation timeline  
- Policy editor  
- Human-in-the-loop for `Needs Human Review`

### Enforcement
Runs at PR / push time (optionally as a pre-commit hook), before code reaches CI or production.

---

## Architecture (high level)

```text
PR (GitHub webhook / URL / mock)
        │
        ▼
   Diff ingestion
        │
        ├─► Data Guardian agents  ─┐
        ├─► Cost Guardian agents  ─┼─► findings + severity + reasoning
        └─► Standard review agents─┘
                        │
                        ▼
              Ship / Feasibility Agent
                        │
                        ▼
                 Moderator Agent
                        │
                        ▼
         Verdict + negotiation transcript
         (PR comment + dashboard)
```

**Qwen / MCP fit**
- Agents exposed as MCP tools/skills for Qwen tool calling  
- Parallel checks via Qwen-Agent function calling  
- Model tiering: fast/cheap models for pattern matches; stronger models for moderator judgment  
- Alibaba Cloud MCP cap (~10 servers/call) → group related agents under shared MCP servers  

---

## Tech stack

| Layer | Status | Stack |
| --- | --- | --- |
| **Frontend** | In progress | Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm |
| **Backend** | Scaffold | Multi-agent orchestration, GitHub/MCP integration (planned) |
| **Models** | Planned | Qwen family (Turbo / Plus / Max) with deliberate cost tiering |

Current UI: black/white landing experience with a live **Sentinel Boardroom** simulation of the agent negotiation.

---

## Repository structure

```text
codegate/
├── frontend/                 # Next.js app
│   └── app/
│       ├── layout.tsx
│       ├── globals.css
│       └── (landing)/        # Landing page (route group → `/`)
│           ├── page.tsx
│           └── _data/
│               └── simulation-steps.ts
├── backend/                  # API / agent orchestration (scaffold)
├── PRODUCT.md                # Product context & brand register
├── DESIGN.md                 # Design system notes
├── prd.md                    # Product requirements
├── base_idea.md              # Original concept & judging fit
└── README.md                 # You are here
```

---

## Getting started

### Prerequisites
- Node.js 20+  
- [pnpm](https://pnpm.io/)  

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

### Backend

The backend folder is a scaffold. Agent orchestration and GitHub/MCP wiring land here next. See `backend/README.md`.

---

## Demo narrative (3 minutes)

1. Open the landing page Sentinel Boardroom playback  
2. Watch Security → Cost → Feasibility → Moderator negotiate on a planted PR  
3. Show final verdict: passed with remediations (secrets redacted, cost loop fixed)  
4. Call out configurable policy + mock-PR fallback for judging reliability  

---

## Goals & non-goals

**Goals**
- Catch sensitive data and cost-risk patterns before merge  
- Demonstrate genuine multi-agent negotiation (not task-splitting theater)  
- Measurable gain vs a single-agent reviewer baseline  
- Configurable per company  
- Clear 3-minute demo  

**Non-goals (current scope)**
- Not runtime/production spend monitoring  
- Not catching issues in code that never gets committed  
- Not a full replacement for human review — a safety net / assistant  

---

## Success metrics

- Detection rate on planted mock-PR issues vs single-agent baseline  
- False-positive reduction from negotiation (Ship Agent override of minor flags)  
- Time-to-verdict per PR  

---

## Status

| Area | State |
| --- | --- |
| Concept / PRD | Done |
| Landing page (frontend) | Done (B&W theme, agent simulation) |
| Backend / agents | Scaffold / next up |
| GitHub webhook + MCP | Planned |
| Dashboard | Planned |
| Alibaba Cloud deploy | Planned |

---

## Documentation

| Doc | Purpose |
| --- | --- |
| [`base_idea.md`](./base_idea.md) | Problem, pillars, Qwen fit, judging criteria |
| [`prd.md`](./prd.md) | Full product requirements |
| [`PRODUCT.md`](./PRODUCT.md) | Users, purpose, brand principles |
| [`DESIGN.md`](./DESIGN.md) | Design system direction |

---

## Contributing

This project is under active hackathon development. PRs that improve agent negotiation clarity, mock datasets, or dashboard UX are especially welcome.

1. Fork the repo  
2. Create a feature branch  
3. Open a PR with a short description of the change  

---

## License

License to be confirmed for hackathon submission (OSS license required in GitHub About). Until then, all rights reserved by the authors.

---

## Acknowledgments

Built for the **Qwen / Alibaba Cloud Agent Society** track — multi-agent collaboration with MCP-native tooling and deliberate model cost governance.
