# CodeGate

**Track:** Agent Society (Multi-Agent Collaboration)
**Hackathon:** Qwen Hackathon

## Problem

Human code reviewers miss risky patterns under time pressure and review fatigue:
secrets left in code, real customer data used in tests, expensive API calls left in
dev/test code. These mistakes cause real damage (breaches, fines, budget drain) and
are hard to catch consistently by hand. Standard code review tools also don't cover
this scope, they check style, bugs, and vulnerabilities, not compliance or cost risk.

## Core Idea

A multi-agent code review board that reviews PRs like an industry-grade reviewer,
with two extra pillars most tools ignore: **sensitive data leaks** and **cost/resource
risk**. Agents don't just run checks in parallel, they negotiate: guardian agents flag
risk, a feasibility agent pushes back on over-blocking, and a moderator reconciles
the disagreement into one final verdict.

Not framed as "catching junior engineers", framed as a safety net for any PR, since
senior engineers touching infra/prod are just as likely to introduce these issues.

## Two Main Pillars (the differentiator)

### 1. Data Guardian
- **Secrets/Credentials Agent** — hardcoded API keys, tokens, DB passwords, private keys, connection strings
- **PII Agent** — real customer data in tests/fixtures (common QA shortcut to reproduce bugs), PII in logs, PII sent to external APIs/LLMs unredacted
- **Compliance Policy Agent** — company-specific rules (data residency, license restrictions, restricted API/data usage), driven by a configurable policy file

### 2. Cost Guardian
- **Model Usage Agent** — hardcoded expensive model calls in test/dev code, no env-based model switching, no cheap fallback in dev/test
- **API Call Hygiene Agent** — real (unmocked) API calls in tests, missing retry/backoff, no rate limiting
- **Budget Guard Agent** — missing token/cost caps, unbounded loops or retries around paid calls

**Known limitation (stated openly):** catches cost/risk patterns baked into committed
code, not ad-hoc local scripts that never get pushed. Natural extension: pair with a
runtime API proxy/budget cap later.

## Standard Code Review (industry-grade baseline)

- **Security Agent** — vuln patterns, injection, auth bypass, unsafe deserialization, insecure dependencies
- **Code Quality Agent** — readability, complexity, code smells, best practices
- **Architecture/Design Agent** — design pattern misuse, tight coupling, scalability concerns
- **Performance Agent** — inefficient queries, N+1 problems, unnecessary loops/re-renders, memory leaks
- **Test Coverage Agent** — missing tests, weak assertions, untested edge cases

## Coordination Layer

- **Ship/Feasibility Agent** — represents shipping pressure, argues severity vs velocity, pushes back on over-blocking
- **Moderator Agent** — reconciles all agent findings, negotiates conflicts, issues final verdict (approve / block / needs-human), escalates to human when consensus fails

## Enforcement Point

- Runs at PR/push time (and optionally as a pre-commit hook), before code reaches CI or production.

## Why Multi-Agent (not a single smart agent)

Real conflicting incentives, not just task-splitting:
- Guardian agents want to block risk.
- Ship agent wants to ship fast.
- Moderator must reconcile, mirroring how real engineering orgs already work (security
  vs velocity is a real, constant tension in any company).

## Qwen Ecosystem Fit

- Each guardian/reviewer agent built as an MCP-exposed tool/skill, callable by a Qwen model, direct fit for MCP-native tool calling.
- Qwen-Agent supports parallel function calls, fits agents running checks concurrently.
- Model tiering used deliberately: cheap/fast models (e.g. Qwen-Turbo) for pattern-matching agents (secrets, PII regex-like checks), stronger models (Qwen-Max/Plus) for nuanced judgment (Moderator reconciling conflicts). This doubles as a real demonstration of the project's own cost-governance philosophy.
- GitHub PR/diff access wired in as an MCP tool/skill.
- Note: Alibaba Cloud's MCP support caps at 10 MCP servers per call, so some sub-agents should share a server (e.g. all Data Guardian agents under one MCP server exposing multiple tools) rather than 1 agent = 1 server.

## Judging Criteria Fit

- **Technical Depth (30%):** custom policy-based scanning skills, MCP integrations, multi-agent negotiation protocol, tiered model usage for cost optimization.
- **Innovation & Architecture (30%):** genuine conflict resolution (not parallel task-splitting), modular agent roles, measurable efficiency gain vs single-agent review.
- **Problem Value & Impact (25%):** real, costly, common problem (compliance violations, API cost overruns), productizable/open-sourceable as an internal dev tool.
- **Presentation (15%):** agent debate on a PR is visually demoable, clear architecture doc potential.

## Status

Base idea finalized. Next: architecture design (agent graph, tools/skills, tech stack, negotiation protocol).