// Types for the simulation steps
export interface AgentLog {
  agent: "Security" | "Cost" | "Feasibility" | "Moderator" | "System";
  message: string;
  timestamp: string;
  type: "error" | "warning" | "info" | "success" | "system";
}

export interface SimulationStep {
  title: string;
  diffCode: string;
  logs: AgentLog[];
  activeAgent: "Security" | "Cost" | "Feasibility" | "Moderator" | "None";
  verdict?: "Blocked" | "Remediated" | "Passed" | "None";
}

// Agent debate steps configuration
export const simulationSteps: SimulationStep[] = [
  {
    title: "1. Scanning pull request files",
    activeAgent: "None",
    diffCode: `// src/services/ai-summarizer.ts
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  // SCANNING LINE 4...
  const apiKey = "sk-proj-7F8g9H1j2K3l4m5n6o7pQ8r9s0tU1vW2xY";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    // Calling API inside client loop
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: items[i].patch }]
    });
    results.push(completion.choices[0].message.content);
  }
  return results;
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
    ],
  },
  {
    title: "2. Security Agent identifies compliance risk",
    activeAgent: "Security",
    diffCode: `// src/services/ai-summarizer.ts
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  // ⚠️ CRITICAL COMPLIANCE THREAT
  const apiKey = "sk-proj-7F8g9H1j2K3l4m5n6o7pQ8r9s0tU1vW2xY";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: items[i].patch }]
    });
    results.push(completion.choices[0].message.content);
  }
  return results;
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
      { agent: "Security", message: "⚠️ CRITICAL: Exposed raw API key credentials in line 6. Potential credentials leak.", timestamp: "02:14:12", type: "error" },
      { agent: "Security", message: "🛡️ Policy Violation: SecretScanner Rule 104 (Hardcoded Secrets). Recommendation: BLOCK.", timestamp: "02:14:12", type: "error" },
    ],
  },
  {
    title: "3. Cost Agent flags billing leak risk",
    activeAgent: "Cost",
    diffCode: `// src/services/ai-summarizer.ts
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  const apiKey = "sk-proj-7F8g9H1j2K3l4m5n6o7pQ8r9s0tU1vW2xY";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  // 💸 UNBOUNDED LOOP BILLING THREAT
  for (let i = 0; i < items.length; i++) {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: items[i].patch }]
    });
    results.push(completion.choices[0].message.content);
  }
  return results;
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
      { agent: "Security", message: "⚠️ CRITICAL: Exposed raw API key credentials in line 6. Potential credentials leak.", timestamp: "02:14:12", type: "error" },
      { agent: "Security", message: "🛡️ Policy Violation: SecretScanner Rule 104 (Hardcoded Secrets). Recommendation: BLOCK.", timestamp: "02:14:12", type: "error" },
      { agent: "Cost", message: "⚠️ WARNING: Unbounded OpenAI API call inside client loop (line 12). Max PR size could trigger $1,200/mo spike.", timestamp: "02:14:13", type: "warning" },
      { agent: "Cost", message: "💡 Suggestion: Batch prompts or run caching interceptors. Recommendation: BLOCK.", timestamp: "02:14:13", type: "warning" },
    ],
  },
  {
    title: "4. Feasibility Agent assesses shipping urgency",
    activeAgent: "Feasibility",
    diffCode: `// src/services/ai-summarizer.ts
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  const apiKey = "sk-proj-7F8g9H1j2K3l4m5n6o7pQ8r9s0tU1vW2xY";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: items[i].patch }]
    });
    results.push(completion.choices[0].message.content);
  }
  return results;
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
      { agent: "Security", message: "⚠️ CRITICAL: Exposed raw API key credentials in line 6. Potential credentials leak.", timestamp: "02:14:12", type: "error" },
      { agent: "Security", message: "🛡️ Policy Violation: SecretScanner Rule 104 (Hardcoded Secrets). Recommendation: BLOCK.", timestamp: "02:14:12", type: "error" },
      { agent: "Cost", message: "⚠️ WARNING: Unbounded OpenAI API call inside client loop (line 12). Max PR size could trigger $1,200/mo spike.", timestamp: "02:14:13", type: "warning" },
      { agent: "Cost", message: "💡 Suggestion: Batch prompts or run caching interceptors. Recommendation: BLOCK.", timestamp: "02:14:13", type: "warning" },
      { agent: "Feasibility", message: "⚡ INFO: High delivery urgency. PR resolves issue #942 ('Auto-Summary Hotfix') needed for customer demo.", timestamp: "02:14:14", type: "info" },
      { agent: "Feasibility", message: "⚡ Shipping impact: Delaying this PR pushes deployment past demo window. Requesting remediation rather than block.", timestamp: "02:14:14", type: "info" },
    ],
  },
  {
    title: "5. Moderator Agent negotiates and auto-remediates",
    activeAgent: "Moderator",
    diffCode: `// src/services/ai-summarizer.ts (AUTO-REMEDIATED BY CODEGATE)
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  // Injected: Config loader replacing raw secret
  const apiKey = process.env.OPENAI_API_KEY || "";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  // Remediated: Dynamic batching and caching decorator injected
  const patches = items.map((f: any) => f.patch);
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini", // Auto-switched to gpt-4o-mini to optimize cost by 90%
    messages: [{ role: "user", content: "Summarize: " + patches.join("\\n") }]
  });
  return [completion.choices[0].message.content];
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
      { agent: "Security", message: "⚠️ CRITICAL: Exposed raw API key credentials in line 6. Potential credentials leak.", timestamp: "02:14:12", type: "error" },
      { agent: "Security", message: "🛡️ Policy Violation: SecretScanner Rule 104 (Hardcoded Secrets). Recommendation: BLOCK.", timestamp: "02:14:12", type: "error" },
      { agent: "Cost", message: "⚠️ WARNING: Unbounded OpenAI API call inside client loop (line 12). Max PR size could trigger $1,200/mo spike.", timestamp: "02:14:13", type: "warning" },
      { agent: "Cost", message: "💡 Suggestion: Batch prompts or run caching interceptors. Recommendation: BLOCK.", timestamp: "02:14:13", type: "warning" },
      { agent: "Feasibility", message: "⚡ INFO: High delivery urgency. PR resolves issue #942 ('Auto-Summary Hotfix') needed for customer demo.", timestamp: "02:14:14", type: "info" },
      { agent: "Feasibility", message: "⚡ Shipping impact: Delaying this PR pushes deployment past demo window. Requesting remediation rather than block.", timestamp: "02:14:14", type: "info" },
      { agent: "Moderator", message: "⚖️ RECONCILING VIEWS: Balance safety policies with delivery speed constraints...", timestamp: "02:14:15", type: "success" },
      { agent: "Moderator", message: "🛡️ Security: Redacting exposed API key. Moving value to project secrets environment.", timestamp: "02:14:15", type: "success" },
      { agent: "Moderator", message: "💸 Cost: Re-writing client loop to batch payloads and switching model target to gpt-4o-mini. Reduced costs by 94%.", timestamp: "02:14:15", type: "success" },
    ],
  },
  {
    title: "6. Final verdict published",
    activeAgent: "None",
    diffCode: `// src/services/ai-summarizer.ts (PASSED RULES)
import { OpenAI } from "openai";

export async function summarizePR(prData: any) {
  const apiKey = process.env.OPENAI_API_KEY || "";
  const client = new OpenAI({ apiKey });

  const items = prData.files;
  const results = [];
  
  const patches = items.map((f: any) => f.patch);
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Summarize: " + patches.join("\\n") }]
  });
  return [completion.choices[0].message.content];
}`,
    logs: [
      { agent: "System", message: "Git hook triggered: PR #412 'Integrate AI Auto-Summarizer'", timestamp: "02:14:10", type: "system" },
      { agent: "System", message: "Analyzing changes in 1 file (src/services/ai-summarizer.ts)...", timestamp: "02:14:11", type: "system" },
      { agent: "Security", message: "⚠️ CRITICAL: Exposed raw API key credentials in line 6. Potential credentials leak.", timestamp: "02:14:12", type: "error" },
      { agent: "Security", message: "🛡️ Policy Violation: SecretScanner Rule 104 (Hardcoded Secrets). Recommendation: BLOCK.", timestamp: "02:14:12", type: "error" },
      { agent: "Cost", message: "⚠️ WARNING: Unbounded OpenAI API call inside client loop (line 12). Max PR size could trigger $1,200/mo spike.", timestamp: "02:14:13", type: "warning" },
      { agent: "Cost", message: "💡 Suggestion: Batch prompts or run caching interceptors. Recommendation: BLOCK.", timestamp: "02:14:13", type: "warning" },
      { agent: "Feasibility", message: "⚡ INFO: High delivery urgency. PR resolves issue #942 ('Auto-Summary Hotfix') needed for customer demo.", timestamp: "02:14:14", type: "info" },
      { agent: "Feasibility", message: "⚡ Shipping impact: Delaying this PR pushes deployment past demo window. Requesting remediation rather than block.", timestamp: "02:14:14", type: "info" },
      { agent: "Moderator", message: "⚖️ RECONCILING VIEWS: Balance safety policies with delivery speed constraints...", timestamp: "02:14:15", type: "success" },
      { agent: "Moderator", message: "🛡️ Security: Redacting exposed API key. Moving value to project secrets environment.", timestamp: "02:14:15", type: "success" },
      { agent: "Moderator", message: "💸 Cost: Re-writing client loop to batch payloads and switching model target to gpt-4o-mini. Reduced costs by 94%.", timestamp: "02:14:15", type: "success" },
      { agent: "System", message: "✅ CodeGate Verdict: PASSED WITH REMEDIATIONS. Shipping pull request #412.", timestamp: "02:14:16", type: "success" },
    ],
    verdict: "Remediated",
  },
];
