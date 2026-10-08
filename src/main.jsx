import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Sparkles, Copy, Check, Wand2, History, ShieldCheck, Zap, ChevronDown } from "lucide-react";
import "./styles.css";

const examples = [
  "Build a landing page for an AI resume builder",
  "Explain this Java code to a beginner",
  "Create a marketing plan for a developer tool",
  "Design a REST API for a task management app"
];

function buildPrompt(input, goal, audience, tone) {
  if (!input.trim()) return "";
  return `You are an expert ${goal === "Code" ? "software engineer" : "AI assistant"}.

TASK
${input.trim()}

CONTEXT
- Audience: ${audience}
- Goal type: ${goal}
- Tone: ${tone}

REQUIREMENTS
1. Clarify assumptions before making critical decisions.
2. Give a structured, practical response.
3. Prefer concrete examples over vague advice.
4. If code is requested, provide production-minded code with brief explanations.
5. Highlight important trade-offs, edge cases, and next steps.

OUTPUT FORMAT
- Start with the direct answer.
- Use clear headings and bullets.
- Keep unnecessary filler to a minimum.
- End with a concise "Next steps" section.`;
}

function App() {
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState("General");
  const [audience, setAudience] = useState("Developer");
  const [tone, setTone] = useState("Clear & concise");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canBuild = input.trim().length > 0;
  const preview = useMemo(
    () => buildPrompt(input, goal, audience, tone),
    [input, goal, audience, tone]
  );

  function enhance() {
    if (!canBuild) return;
    setResult(preview);
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="app-shell">
      <header className="nav">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={17} />
          </div>
          <span>AI Prompt Builder</span>
        </div>

        <div className="nav-pill">
          <span className="dot"></span> MVP Preview
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">
            <Wand2 size={14} /> Build better prompts
          </div>

          <h1>
            Turn rough ideas into
            <br />
            <span>powerful AI prompts.</span>
          </h1>

          <p>
            Describe what you want. AI Prompt Builder structures the task,
            context, requirements, and output so you get more reliable results.
          </p>
        </section>

        <section className="workspace">
          <div className="panel input-panel">
            <div className="panel-head">
              <div>
                <span className="kicker">01 · YOUR IDEA</span>
                <h2>What do you want to build?</h2>
              </div>

              <Zap size={18} className="muted-icon" />
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Build a React dashboard for tracking software engineering interview preparation..."
            />

            <div className="examples">
              <span>Try an example</span>

              <div className="example-list">
                {examples.map((item) => (
                  <button key={item} onClick={() => setInput(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="controls">
              <label>
                <span>Goal</span>

                <div className="select-wrap">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option>General</option>
                    <option>Code</option>
                    <option>Writing</option>
                    <option>Analysis</option>
                    <option>Marketing</option>
                  </select>

                  <ChevronDown size={15} />
                </div>
              </label>

              <label>
                <span>Audience</span>

                <div className="select-wrap">
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  >
                    <option>Developer</option>
                    <option>Student</option>
                    <option>Founder</option>
                    <option>Recruiter</option>
                    <option>General user</option>
                  </select>

                  <ChevronDown size={15} />
                </div>
              </label>

              <label>
                <span>Tone</span>

                <div className="select-wrap">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option>Clear & concise</option>
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Technical</option>
                  </select>

                  <ChevronDown size={15} />
                </div>
              </label>
            </div>

            <button
              className="primary-btn"
              disabled={!canBuild}
              onClick={enhance}
            >
              <Sparkles size={17} /> Build prompt
            </button>
          </div>

          <div className="panel output-panel">
            <div className="panel-head">
              <div>
                <span className="kicker">02 · GENERATED PROMPT</span>
                <h2>Ready to use</h2>
              </div>

              <button
                className="icon-btn"
                onClick={copyResult}
                disabled={!result}
                title="Copy prompt"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>

            {result ? (
              <pre className="result">{result}</pre>
            ) : (
              <div className="empty">
                <div className="empty-icon">
                  <Sparkles size={23} />
                </div>

                <h3>Your optimized prompt will appear here</h3>

                <p>
                  Write an idea on the left and click{" "}
                  <strong>Build prompt</strong>.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="trust-row">
          <div>
            <ShieldCheck size={17} />
            <span>Designed for controllable AI workflows</span>
          </div>

          <div>
            <History size={17} />
            <span>History & saved prompts coming next</span>
          </div>

          <div>
            <Zap size={17} />
            <span>Claude API integration ready</span>
          </div>
        </section>
      </main>

      <footer>AI Prompt Builder · Early-stage product MVP</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
