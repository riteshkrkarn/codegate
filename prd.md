# CodeGate — Product Requirements Document

## 1. Problem Statement
Human code reviewers, regardless of seniority, miss risky patterns under time pressure:
hardcoded secrets, real customer data reused in tests, expensive API calls left in
dev/test code. Standard review tools check style/bugs/vulnerabilities but ignore
compliance and cost risk entirely. These gaps cause real damage: data breaches,
compliance fines, and drained API budgets.

## 2. Solution
CodeGate is a multi-agent code review system that reviews PRs like an industry-grade
reviewer, with two additional pillars: sensitive data governance and cost/resource
governance. Instead of parallel independent checks, agents negotiate: guardian agents
flag risk, a feasibility agent argues against over-blocking, and a moderator agent
reconciles the disagreement into one final verdict, mirroring how real engineering
orgs already balance security and velocity.

## 3. Goals
- Catch sensitive data and cost-risk patterns before they merge, not just style/bugs
- Demonstrate genuine multi-agent negotiation (not task-splitting theater)
- Show a measurable efficiency/accuracy gain vs a single-agent reviewer baseline
- Be configurable per company (sensitive data patterns, cost thresholds)
- Be demoable clearly within a 3-minute video

## 4. Non-Goals (for this hackathon scope)
- Not a runtime/production monitoring tool (no live API budget enforcement)
- Not catching issues in code that's never committed/pushed (stated limitation)
- Not a full replacement for human review, positioned as a safety net/assistant

## 5. Users
- Engineering teams wanting stronger PR review coverage
- Companies needing compliance guardrails on code (fintech, healthcare, or any
  company handling customer PII)
- Teams with growing API costs from AI/LLM usage in dev/test environments

## 6. Core Features

### 6.1 PR Ingestion
- Accepts a GitHub PR (via webhook or manual URL input)
- Fallback: pre-built mock PR examples with planted issues, for reliable demo

### 6.2 Multi-Agent Review
- **Data Guardian pillar**: Secrets Agent, PII Agent, Compliance Policy Agent
- **Cost Guardian pillar**: Model Usage Agent, API Call Hygiene Agent, Budget Guard Agent
- **Standard review pillar**: Security, Code Quality, Architecture, Performance, Test Coverage agents
- All agents run their checks against the PR diff, each returns findings + severity + reasoning

### 6.3 Negotiation & Verdict
- Ship/Feasibility Agent reviews all flagged findings, argues severity vs shipping urgency
- Moderator Agent reconciles all input into one of: **Approve / Block / Needs Human Review**
- Full negotiation transcript stored and shown (this is the key demo moment)

### 6.4 Company Policy Configuration
- Simple config (JSON/YAML) defining: sensitive field names/patterns, restricted APIs,
  license blocklist, expensive model names, budget thresholds
- Compliance Policy Agent and Cost Guardian agents read from this config

### 6.5 Dashboard (Next.js)
- List of reviewed PRs with verdicts
- Detail view: per-agent findings + full negotiation transcript (visualized as a debate/timeline)
- Policy config editor

### 6.6 Human-in-the-loop
- "Needs Human Review" verdicts surface flagged items for manual approval in the dashboard

## 7. Success Metrics (for judging + demo)
- Detection rate on planted issues in mock PR dataset (secrets, PII, cost patterns) vs
  a single-agent baseline reviewing the same PRs
- False-positive reduction from negotiation (Ship Agent overriding minor flags) vs raw
  guardian agent output alone
- Time-to-verdict per PR

## 8. User Flow
1. PR submitted (webhook or manual/mock)
2. Backend fetches diff via GitHub MCP tool (or loads mock data)
3. All 10 specialist agents run checks in parallel (grouped under MCP servers)
4. Findings passed to Ship/Feasibility Agent and Moderator Agent
5. Negotiation occurs (multi-turn reasoning between agents), transcript logged
6. Final verdict posted back as PR comment (if live GitHub) and shown on dashboard
7. If "Needs Human Review", flagged for manual decision in dashboard

## 9. Submission Requirements Checklist (Qwen Cloud Hackathon)
- [ ] Public GitHub repo with OSS license visible in About section
- [ ] Proof of Alibaba Cloud deployment (recording + code file reference)
- [ ] Architecture diagram
- [ ] ~3 minute demo video (YouTube/Vimeo/Facebook, public)
- [ ] Text description of features/functionality
- [ ] Track identified: Agent Society
- [ ] Optional: blog post about the build journey

## 10. Risks
- Live GitHub API dependency during judging → mitigated with mock PR fallback
- MCP server cap (10 per call on Alibaba Cloud) → mitigated by grouping agents under
  fewer MCP servers with multiple tools each
- Multi-agent negotiation complexity → scope core negotiation logic early, treat
  visualization/polish as later-stage work

## 11. Timeline Assumption
- Deadline: July 21, 2026
- Sufficient time available (per team), no fixed sprint constraint