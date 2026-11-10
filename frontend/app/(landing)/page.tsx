"use client";

import { useState, useEffect, useRef } from "react";
import { simulationSteps } from "./_data/simulation-steps";

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const playbackSpeed = 3000; // ms per step
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Keep transcript scrolling isolated to the terminal pane.
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Playback loop controller
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setActiveStep((prevStep) => (prevStep + 1) % simulationSteps.length);
      }, playbackSpeed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, activeStep]);

  // Scroll terminal logs on update without moving the page viewport.
  useEffect(() => {
    const logContainer = logContainerRef.current;
    if (!logContainer) return;

    logContainer.scrollTo({
      top: logContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [activeStep]);

  const handleStepSelect = (index: number) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg text-ink selection:bg-secondary-custom/25 selection:text-ink antialiased font-sans">
      
      {/* Background Grid Lines Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.06)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="relative w-full border-b border-border-custom bg-bg/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-secondary-custom rounded-sm"></span>
            <span className="font-mono text-lg font-bold tracking-tight text-secondary-custom uppercase">
              CodeGate
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-custom">
            <a href="#boardroom" className="hover:text-secondary-custom transition-colors">{"// AGENTS"}</a>
            <a href="#integrations" className="hover:text-secondary-custom transition-colors">{"// INTEGRATIONS"}</a>
            <a href="#telemetry" className="hover:text-secondary-custom transition-colors">{"// TELEMETRY"}</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#connect"
              className="px-4 py-2 text-xs font-mono font-semibold tracking-wider text-primary-custom bg-secondary-custom hover:bg-ink transition-all duration-300 rounded-sm"
            >
              CONNECT REPO
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Visual Pitch */}
        <div className="lg:col-span-5 flex flex-col justify-center sm:text-left text-center">
          <div className="inline-flex self-center sm:self-start items-center gap-2 px-3 py-1 mb-6 border border-secondary-custom/25 bg-secondary-custom/5 text-secondary-custom font-mono text-xs tracking-widest uppercase rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-custom animate-ping"></span>
            Sentinel Review Active
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans leading-[1.05] tracking-tight text-secondary-custom text-wrap-balance mb-6">
            Vigilant code review at <span className="underline decoration-secondary-custom/40 underline-offset-4">millisecond</span> speed.
          </h1>

          <p className="text-base sm:text-lg text-muted-custom leading-relaxed mb-8 max-w-xl font-sans text-wrap-pretty">
            CodeGate runs specialized autonomous agents that analyze PR security, billing leaks, and shipping urgency in real-time. We resolve policy conflicts automatically so you ship safely without blocking release velocity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
            <a
              href="#connect"
              className="flex items-center justify-center h-12 px-8 font-mono text-sm font-semibold tracking-wider text-primary-custom bg-secondary-custom hover:bg-ink transition-all duration-300 w-full sm:w-auto rounded-sm"
            >
              Deploy CodeGate
            </a>
            <a
              href="#boardroom"
              className="flex items-center justify-center h-12 px-8 border border-border-custom bg-surface/30 hover:bg-surface/60 hover:border-secondary-custom/50 transition-all font-mono text-sm text-muted-custom hover:text-secondary-custom w-full sm:w-auto rounded-sm"
            >
              See Agents
            </a>
          </div>
        </div>

        {/* Right Column: Sentinel Boardroom Terminal Mockup */}
        <div className="lg:col-span-7 flex flex-col">
          
          {/* Terminal Shell Container */}
          <div className="relative w-full border border-border-custom bg-surface rounded-sm overflow-hidden flex flex-col h-[520px] shadow-2xl">
            <div className="scan-line pointer-events-none" />

            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom bg-bg/50 font-mono text-xs text-muted-custom">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-border-custom"></span>
                <span>sentinel-boardroom --playback --active</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-secondary-custom animate-pulse" : "bg-border-custom"}`} />
                  <span>{isPlaying ? "SIMULATING" : "PAUSED"}</span>
                </div>
                <span>Step {activeStep + 1} of {simulationSteps.length}</span>
              </div>
            </div>

            {/* Main Terminal Screen Split Layout */}
            <div className="grid flex-1 grid-cols-1 md:grid-cols-12 min-h-0">
              
              {/* Left Column: Code Diff Window */}
              <div className="md:col-span-7 border-r border-border-custom bg-bg/25 flex flex-col p-4 font-mono text-[11px] overflow-y-auto custom-scrollbar leading-normal">
                <div className="text-muted-custom mb-2 border-b border-border-custom/50 pb-1 flex justify-between items-center text-[10px]">
                  <span>CODE DIFF</span>
                  <span className="text-secondary-custom text-[9px] uppercase font-bold">ai-summarizer.ts</span>
                </div>
                <pre className="text-ink/90 whitespace-pre overflow-x-auto custom-scrollbar selection:bg-secondary-custom/25 select-text">
                  <code>{simulationSteps[activeStep].diffCode}</code>
                </pre>
              </div>

              {/* Right Column: Live Agent Negotiation Logs */}
              <div className="md:col-span-5 flex flex-col bg-bg/10 p-4 min-h-0">
                <div className="text-muted-custom mb-2 border-b border-border-custom/50 pb-1 text-[10px] font-mono tracking-wider flex justify-between items-center">
                  <span>RESOLVING THREADS</span>
                  <span className="animate-pulse">●</span>
                </div>
                
                {/* Scrollable Transcript logs */}
                <div
                  ref={logContainerRef}
                  className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-3 leading-relaxed pr-1 select-text"
                >
                  {simulationSteps[activeStep].logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-sm border bg-surface/40 transition-all duration-300 ${
                        log.agent === "Security"
                          ? "border-secondary-custom/50 text-ink bg-secondary-custom/8"
                          : log.agent === "Cost"
                          ? "border-secondary-custom/35 text-ink/90 bg-secondary-custom/5"
                          : log.agent === "Feasibility"
                          ? "border-border-custom text-muted-custom bg-surface/60"
                          : log.agent === "Moderator"
                          ? "border-secondary-custom/70 text-ink bg-secondary-custom/10"
                          : "border-border-custom/50 text-muted-custom"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 opacity-70 text-[9px] font-bold uppercase tracking-wider">
                        <span>{log.agent}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p>{log.message}</p>
                    </div>
                  ))}
                </div>

                {/* Live Agent active indicators */}
                <div className="mt-4 border-t border-border-custom pt-3 grid grid-cols-4 gap-1 font-mono text-[9px] text-center">
                  <div
                    className={`py-1 border rounded-sm transition-all duration-300 ${
                      simulationSteps[activeStep].activeAgent === "Security"
                        ? "bg-secondary-custom text-primary-custom border-secondary-custom glow-active"
                        : "bg-surface/30 border-border-custom/50 text-muted-custom"
                    }`}
                  >
                    SEC
                  </div>
                  <div
                    className={`py-1 border rounded-sm transition-all duration-300 ${
                      simulationSteps[activeStep].activeAgent === "Cost"
                        ? "bg-secondary-custom text-primary-custom border-secondary-custom glow-active"
                        : "bg-surface/30 border-border-custom/50 text-muted-custom"
                    }`}
                  >
                    COST
                  </div>
                  <div
                    className={`py-1 border rounded-sm transition-all duration-300 ${
                      simulationSteps[activeStep].activeAgent === "Feasibility"
                        ? "bg-secondary-custom text-primary-custom border-secondary-custom glow-active"
                        : "bg-surface/30 border-border-custom/50 text-muted-custom"
                    }`}
                  >
                    SHIP
                  </div>
                  <div
                    className={`py-1 border rounded-sm transition-all duration-300 ${
                      simulationSteps[activeStep].activeAgent === "Moderator"
                        ? "bg-secondary-custom text-primary-custom border-secondary-custom glow-active"
                        : "bg-surface/30 border-border-custom/50 text-muted-custom"
                    }`}
                  >
                    MOD
                  </div>
                </div>
              </div>
            </div>

            {/* Playback Controls Footer */}
            <div className="border-t border-border-custom bg-bg/50 px-4 py-3 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1 border border-border-custom hover:border-secondary-custom text-secondary-custom hover:bg-secondary-custom hover:text-primary-custom bg-surface/50 active:scale-95 transition-all rounded-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>
                <button
                  onClick={() => setActiveStep(0)}
                  className="px-3 py-1 border border-border-custom hover:border-secondary-custom text-muted-custom hover:text-secondary-custom bg-surface/50 active:scale-95 transition-all rounded-sm cursor-pointer"
                >
                  RESTART
                </button>
              </div>

              {/* Steps timeline dots */}
              <div className="flex items-center gap-2">
                {simulationSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStepSelect(idx)}
                    className={`w-2.5 h-2.5 rounded-sm transition-all cursor-pointer ${
                      idx === activeStep
                        ? "bg-secondary-custom scale-125"
                        : "bg-border-custom/80 hover:bg-muted-custom"
                    }`}
                    title={step.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Marquee Section */}
      <section id="integrations" className="relative border-y border-border-custom bg-surface/10 py-10 overflow-hidden z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-bg to-transparent z-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-custom text-center md:text-left">
            {"// FITS SEAMLESSLY INTO YOUR TOOLCHAIN"}
          </h2>
        </div>

        <div className="w-full flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 font-mono text-sm text-secondary-custom tracking-wider font-bold">
            <span>[ GITHUB ACTIONS ]</span>
            <span>[ GITLAB CI ]</span>
            <span>[ LOCAL GIT HOOK ]</span>
            <span>[ AZURE PIPELINES ]</span>
            <span>[ BITBUCKET PIPELINES ]</span>
            <span>[ JETBRAINS AGENT ]</span>
            <span>[ VS CODE EXTENSION ]</span>
            <span>[ NEOCLI HOOK ]</span>
            {/* Repeated for loop */}
            <span>[ GITHUB ACTIONS ]</span>
            <span>[ GITLAB CI ]</span>
            <span>[ LOCAL GIT HOOK ]</span>
            <span>[ AZURE PIPELINES ]</span>
            <span>[ BITBUCKET PIPELINES ]</span>
            <span>[ JETBRAINS AGENT ]</span>
            <span>[ VS CODE EXTENSION ]</span>
            <span>[ NEOCLI HOOK ]</span>
          </div>
        </div>
      </section>

      {/* Features Grid Section: "The Boardroom Agents" */}
      <section id="boardroom" className="relative max-w-7xl mx-auto px-6 py-24 z-10">
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-secondary-custom/25 bg-secondary-custom/5 text-secondary-custom font-mono text-xs tracking-widest uppercase rounded-sm">
            Governance Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-secondary-custom tracking-tight mb-4">
            Specialized Agents. Clear Decisions.
          </h2>
          <p className="text-sm sm:text-base text-muted-custom leading-relaxed">
            Instead of generalist models making compromises, CodeGate runs isolated, domain-expert agents that compete and align.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Security Agent Panel */}
          <div className="group border border-border-custom bg-surface p-8 relative flex flex-col justify-between h-[300px] hover:border-secondary-custom/60 hover:glow-active transition-all duration-300 rounded-sm">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-secondary-custom font-bold uppercase tracking-wider">{"// AGENT-01"}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-custom"></span>
              </div>
              <h3 className="font-sans text-lg font-bold text-secondary-custom mb-3">Security Guard</h3>
              <p className="text-xs text-muted-custom leading-relaxed">
                Scans patches for exposed credentials, SQL injection, PII leak paths, and supply-chain vulnerabilities. Refuses code with active vulnerabilities.
              </p>
            </div>
            <div className="font-mono text-[9px] text-muted-custom mt-4 pt-4 border-t border-border-custom/50 flex justify-between">
              <span>SCAN_ENGINE: v4.2.1</span>
              <span className="text-secondary-custom">ACTIVE SECURE</span>
            </div>
          </div>

          {/* Cost Agent Panel */}
          <div className="group border border-border-custom bg-surface p-8 relative flex flex-col justify-between h-[300px] hover:border-secondary-custom/60 hover:glow-active transition-all duration-300 rounded-sm">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-secondary-custom font-bold uppercase tracking-wider">{"// AGENT-02"}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-custom"></span>
              </div>
              <h3 className="font-sans text-lg font-bold text-secondary-custom mb-3">Cost Guard</h3>
              <p className="text-xs text-muted-custom leading-relaxed">
                Estimates model billing and infrastructure impacts. Prevents unbounded loop API calls, recommends cached queries, and switches expensive models to lightweight equivalents.
              </p>
            </div>
            <div className="font-mono text-[9px] text-muted-custom mt-4 pt-4 border-t border-border-custom/50 flex justify-between">
              <span>ESTIMATOR: Llama3-Fin</span>
              <span className="text-secondary-custom">ACTIVE BUDGET</span>
            </div>
          </div>

          {/* Feasibility Agent Panel */}
          <div className="group border border-border-custom bg-surface p-8 relative flex flex-col justify-between h-[300px] hover:border-secondary-custom/60 hover:glow-active transition-all duration-300 rounded-sm">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-secondary-custom font-bold uppercase tracking-wider">{"// AGENT-03"}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-custom"></span>
              </div>
              <h3 className="font-sans text-lg font-bold text-secondary-custom mb-3">Ship Agent</h3>
              <p className="text-xs text-muted-custom leading-relaxed">
                Represents delivery urgency. Analyzes release branches, task priorities, and demo timelines. Champions code changes to bypass blocks through safe auto-remediations.
              </p>
            </div>
            <div className="font-mono text-[9px] text-muted-custom mt-4 pt-4 border-t border-border-custom/50 flex justify-between">
              <span>URGENCY_INDEX: 9.2/10</span>
              <span className="text-secondary-custom">ACTIVE VELOCITY</span>
            </div>
          </div>

        </div>
      </section>

      {/* Telemetry and Debate Detail Screen */}
      <section id="telemetry" className="relative max-w-7xl mx-auto px-6 py-12 z-10 border-t border-border-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 border border-border-custom bg-surface p-8 rounded-sm">
            <h3 className="font-mono text-xs text-secondary-custom font-bold uppercase tracking-widest mb-6">
              {"// POLICY_DECISION_MATRIX.json"}
            </h3>
            
            <div className="space-y-6 font-mono text-xs text-muted-custom select-text">
              <div className="pb-4 border-b border-border-custom/50">
                <div className="flex justify-between text-secondary-custom font-semibold mb-2">
                  <span>1. Secret Scanner Policy</span>
                  <span className="text-ink">STRICT BLOCK</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Raw API keys or client-side cloud credentials will trigger immediate redaction helper injections. If auto-remediation fails, the PR is locked.
                </p>
              </div>

              <div className="pb-4 border-b border-border-custom/50">
                <div className="flex justify-between text-secondary-custom font-semibold mb-2">
                  <span>2. Cloud Spend Optimization</span>
                  <span className="text-ink">ALERT & SWITCH</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Identified LLM loops or unoptimized endpoints are replaced by batched API utilities. Models automatically degrade to cheaper, equivalent latency options (e.g. gpt-4o → mini).
                </p>
              </div>

              <div>
                <div className="flex justify-between text-secondary-custom font-semibold mb-2">
                  <span>3. Release Velocity Bypass</span>
                  <span className="text-ink">REMEDIATION FIRST</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  If the Ship Agent signals high release urgency, the system forces auto-patch generators rather than simple rejection, keeping the pipeline moving.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl font-extrabold font-sans text-secondary-custom tracking-tight mb-6">
              Automated patches, not roadblock notifications.
            </h2>
            <p className="text-base text-muted-custom leading-relaxed mb-6 font-sans">
              Traditional code guardrails simply output red checks on pull requests, frustrating developer teams. CodeGate doesn&apos;t just block; it writes the correction.
            </p>
            <p className="text-sm text-muted-custom leading-relaxed mb-8">
              By using our Moderator agent to negotiate, CodeGate injects environment variable definitions, rate-limit wraps, and security middleware patches directly into the branch review stack.
            </p>
            <div className="flex justify-center lg:justify-start">
              <span className="text-xs font-mono text-secondary-custom tracking-wider border-b border-secondary-custom/30 pb-1">
                LEARN MORE ABOUT AGENT NEGOTIATION RULES &rarr;
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Connect Repository Section (CTA) */}
      <section id="connect" className="relative border-t border-border-custom bg-surface/30 z-10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center">
          <h2 className="text-4xl font-extrabold font-sans text-secondary-custom tracking-tight mb-4">
            Protect your codebase. Secure your budget.
          </h2>
          <p className="text-base text-muted-custom leading-relaxed max-w-xl mb-8">
            Deploy CodeGate to your GitHub or GitLab org in under two minutes. Run it locally via git hook during development, or as an automated moderator inside your CI pipeline.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
            <button
              onClick={() => alert("GitHub integration OAuth authorization mockup triggered.")}
              className="flex items-center justify-center gap-3 h-12 px-8 font-mono text-sm font-semibold tracking-wider text-primary-custom bg-secondary-custom hover:bg-ink transition-all duration-300 w-full rounded-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              CONNECT WITH GITHUB
            </button>
          </div>

          <div className="mt-6 text-xs font-mono text-muted-custom">
            <span>Free for open source. No credit card required.</span>
          </div>
        </div>
      </section>

      {/* Technical Manual Footer */}
      <footer className="relative border-t border-border-custom bg-bg py-12 mt-auto z-10 text-xs font-mono text-muted-custom">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-secondary-custom rounded-sm"></span>
            <span className="font-bold tracking-wider uppercase text-secondary-custom">CODEGATE</span>
            <span>&copy; 2026. ALL INTEGRITY DECLARED.</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#boardroom" className="hover:text-secondary-custom transition-colors">SPEC_DOCS</a>
            <a href="#integrations" className="hover:text-secondary-custom transition-colors">CI_SCHEMAS</a>
            <a href="https://github.com" className="hover:text-secondary-custom transition-colors">REPOSITORY</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
