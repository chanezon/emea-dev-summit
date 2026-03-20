const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG = path.join(__dirname, "images");

// ── Color palette: Deep Tech Blue ──
const C = {
  bg:      "0F1B2D",
  bgAlt:   "162337",
  accent:  "00A4EF",
  accent2: "50E6FF",
  accent3: "F25022",
  white:   "FFFFFF",
  light:   "D6E4F0",
  muted:   "8CA3BB",
  card:    "1A2D47",
  text:    "E8EEF4",
  quote:   "FFD700",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Patrick Chanezon";
pres.title = "The Transformation of the Developer Role with AI Agents";

// Helper: section divider slide
function addSectionSlide(title) {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 2.2, w: 10, h: 0.06, fill: { color: C.accent } });
  s.addText(title, {
    x: 0.8, y: 1.0, w: 8.4, h: 1.2,
    fontSize: 36, fontFace: "Calibri", color: C.white, bold: true, align: "left", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 2.26, w: 10, h: 0.03, fill: { color: C.accent2 } });
  return s;
}

// Helper: source footer
function addSource(s, label, url, y) {
  y = y || 5.15;
  s.addText([
    { text: "Source: ", options: { color: C.muted, fontSize: 10 } },
    { text: label, options: { color: C.accent, fontSize: 10, hyperlink: { url } } }
  ], { x: 0.8, y, w: 8.4, h: 0.3, margin: 0 });
}

// ═══════════════════════════════════════════════
// SLIDE 1: Title
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.addImage({ path: path.join(IMG, "title-slide.png"), x: 0, y: 0, w: 10, h: 5.625 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "000000", transparency: 45 } });
  s.addText("The Transformation of the\nDeveloper Role with AI Agents", {
    x: 0.6, y: 0.6, w: 8.8, h: 2.4,
    fontSize: 38, fontFace: "Calibri", color: C.white, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.1
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.1, w: 3, h: 0.04, fill: { color: C.accent } });
  s.addText("Patrick Chanezon", {
    x: 0.6, y: 3.3, w: 6, h: 0.5,
    fontSize: 22, fontFace: "Calibri", color: C.accent2, bold: true, margin: 0
  });
  s.addText("VP Developer Relations, Microsoft", {
    x: 0.6, y: 3.8, w: 6, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: C.light, margin: 0
  });
  s.addText("EMEA Dev Summit 2026", {
    x: 0.6, y: 4.6, w: 6, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.muted, margin: 0
  });
}

// ═══════════════════════════════════════════════
// SLIDE 2: Speaker
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.addImage({ path: path.join(IMG, "chanezon-1-slider.png"), x: 0, y: 0, w: 10, h: 5.625, sizing: { type: "cover", w: 10, h: 5.625 } });
}

// ═══════════════════════════════════════════════
// SLIDE 3: Agenda
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Agenda", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.8,
    fontSize: 36, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 2, h: 0.04, fill: { color: C.accent } });

  const items = [
    { num: "01", title: "The Developer Role Is Changing Now" },
    { num: "02", title: "Developers Become Managers of AI Agents" },
    { num: "03", title: "Impact on Early Career Developers" },
    { num: "04", title: "The AI Fatigue Effect" },
    { num: "05", title: "A Golden Age of Programming" },
  ];
  items.forEach((item, i) => {
    const yBase = 1.6 + i * 0.72;
    s.addText(item.num, {
      x: 0.8, y: yBase, w: 0.7, h: 0.5,
      fontSize: 22, fontFace: "Calibri", color: C.accent, bold: true, margin: 0
    });
    s.addText(item.title, {
      x: 1.6, y: yBase, w: 7, h: 0.5,
      fontSize: 20, fontFace: "Calibri", color: C.text, margin: 0
    });
    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, { x: 1.6, y: yBase + 0.58, w: 7, h: 0, line: { color: "2A3F5C", width: 0.5 } });
    }
  });
}

// ═══════════════════════════════════════════════
// SLIDE 4: Teaching an old dog new tricks
// Dog image is 800x824 (ratio ~0.97, nearly square)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Teaching an old dog new tricks", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 34, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  // Image is nearly square (0.97:1) — use height-constrained sizing
  const dogH = 3.8;
  const dogW = dogH * 0.97;
  const dogX = (10 - dogW) / 2;
  s.addImage({ path: path.join(IMG, "linkedin-dog.jpg"), x: dogX, y: 1.4, w: dogW, h: dogH });
}

// ═══════════════════════════════════════════════
// SLIDE 5: Karpathy — Developer Role Changing
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("With AI Coding Agents getting better,\nthe role of Developer is changing now", {
    x: 0.8, y: 0.3, w: 8.4, h: 1.0,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  s.addImage({ path: path.join(IMG, "karpathy-profile.png"), x: 0.8, y: 1.5, w: 0.8, h: 0.8, rounding: true });
  s.addText([
    { text: "Andrej Karpathy ", options: { bold: true, color: C.white, fontSize: 14 } },
    { text: "@karpathy", options: { color: C.muted, fontSize: 12 } }
  ], { x: 1.8, y: 1.6, w: 4, h: 0.6, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.5, w: 8.4, h: 2.8, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.5, w: 0.06, h: 2.8, fill: { color: C.accent } });
  s.addText([
    { text: "TL;DR  ", options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: "\"LLM agent capabilities (Claude & Codex especially) have crossed some kind of threshold of coherence around December 2025 and caused a phase shift in software engineering. The intelligence part suddenly feels quite a bit ahead of all the rest of it — integrations, the necessity for new organizational workflows, processes, diffusion more generally. 2026 is going to be a high energy year as the industry metabolizes the new capability.\"", options: { color: C.text, fontSize: 13, italic: true } }
  ], { x: 1.1, y: 2.6, w: 7.9, h: 2.6, valign: "top", margin: 0 });

  addSource(s, "x.com/karpathy/status/2015883857489522876", "https://x.com/karpathy/status/2015883857489522876");
}

// ═══════════════════════════════════════════════
// SLIDE 6: Rate of progress accelerating
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Agent's rate of progress is accelerating", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 32, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addImage({ path: path.join(IMG, "star-wars-acceleration.jpg"), x: 1.5, y: 1.3, w: 7, h: 3.94, sizing: { type: "contain", w: 7, h: 3.94 } });
}

// ═══════════════════════════════════════════════
// SECTION: Developers become managers of AI Agents
// ═══════════════════════════════════════════════
addSectionSlide("Developers become\nmanagers of AI Agents");

// ═══════════════════════════════════════════════
// SLIDE: AI Coding Agent Adoption
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Coding Agent Adoption Is Mainstream", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  // Image on right
  s.addImage({ path: path.join(IMG, "chanezon-agent-talk.jpg"), x: 5.5, y: 1.2, w: 4.0, h: 2.25, sizing: { type: "contain", w: 4.0, h: 2.25 } });

  // Big stats on left
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 4.3, h: 1.0, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 0.06, h: 1.0, fill: { color: C.accent } });
  s.addText([
    { text: "64.8%", options: { bold: true, color: C.accent2, fontSize: 36 } },
    { text: " of developers use AI coding agents weekly", options: { color: C.text, fontSize: 14 } }
  ], { x: 1.1, y: 1.25, w: 3.8, h: 0.9, valign: "middle", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.4, w: 4.3, h: 1.0, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.4, w: 0.06, h: 1.0, fill: { color: C.accent3 } });
  s.addText([
    { text: "90%", options: { bold: true, color: C.accent3, fontSize: 36 } },
    { text: " adoption rate per DORA & DX reports", options: { color: C.text, fontSize: 14 } }
  ], { x: 1.1, y: 2.45, w: 3.8, h: 0.9, valign: "middle", margin: 0 });

  // Form factors
  s.addText("Form Factors", { x: 0.8, y: 3.7, w: 8.4, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.accent2, bold: true, margin: 0 });
  const formFactors = [
    { label: "Editor Agent Mode", example: "GitHub Copilot, Cursor, Kiro" },
    { label: "CLI Agents", example: "Copilot CLI, Claude Code, Gemini CLI" },
    { label: "Cloud Sandbox Agents", example: "GitHub Copilot Agent, Codex Web" },
  ];
  formFactors.forEach((f, i) => {
    const xx = 0.8 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, { x: xx, y: 4.15, w: 2.9, h: 0.85, fill: { color: C.card } });
    s.addShape(pres.shapes.RECTANGLE, { x: xx, y: 4.15, w: 0.05, h: 0.85, fill: { color: C.accent } });
    s.addText(f.label, { x: xx + 0.2, y: 4.18, w: 2.5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
    s.addText(f.example, { x: xx + 0.2, y: 4.52, w: 2.5, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.muted, margin: 0 });
  });

  addSource(s, "StackOverflow 2025 Survey / DORA / DX Reports", "https://survey.stackoverflow.co/2025/ai/");
}

// ═══════════════════════════════════════════════
// SLIDE: The Frontier Firm (image only — no redundant text)
// frontier_firm_phases.png is 500x185 (ratio 2.70, very wide)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("The Frontier Firm: Journey to Human-led, Agent Operated", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 26, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  // Wide image centered — full width
  s.addImage({ path: path.join(IMG, "frontier_firm_phases.png"), x: 0.5, y: 1.2, w: 9.0, h: 3.33, sizing: { type: "contain", w: 9.0, h: 3.33 } });

  s.addText("\"Every employee becomes an agent boss — someone who builds, delegates to, and manages agents to amplify their impact.\"", {
    x: 0.8, y: 4.4, w: 8.4, h: 0.5,
    fontSize: 15, fontFace: "Calibri", color: C.quote, italic: true, margin: 0
  });
  addSource(s, "Microsoft Work Trend Index 2025", "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born");
}

// ═══════════════════════════════════════════════
// SLIDE: The Cybernetic Teammate — Role Shift
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("From IC to Agent Boss: The Role Shift", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  // Left: Before
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 4.0, h: 3.4, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 0.06, h: 3.4, fill: { color: C.muted } });
  s.addText([
    { text: "Before: Individual Contributor", options: { bold: true, color: C.muted, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "• Write all code yourself", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Collaborate with human teammates", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Deep focus on one problem at a time", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Skills: syntax, algorithms, debugging", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "\"The Cybernetic Teammate\" (Dell'Acqua et al.) shows AI can elevate individual performance to levels comparable to traditional teams.", options: { color: C.light, fontSize: 12, italic: true } },
  ], { x: 1.1, y: 1.3, w: 3.5, h: 3.2, valign: "top", margin: 0 });

  // Right: After
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.2, h: 3.4, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 0.06, h: 3.4, fill: { color: C.accent2 } });
  s.addText([
    { text: "After: Manager of AI Agents", options: { bold: true, color: C.accent2, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "• Delegate coding to agents", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Orchestrate human + agent teams", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Manage multiple parallel workstreams", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "• Skills: context engineering, evaluation, architecture, specification", options: { color: C.text, fontSize: 14, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "AI adoption requires rethinking team structures and organizational design.", options: { color: C.light, fontSize: 12, italic: true } },
  ], { x: 5.5, y: 1.3, w: 3.7, h: 3.2, valign: "top", margin: 0 });

  addSource(s, "Dell'Acqua et al. — The Cybernetic Teammate (SSRN)", "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5188231");
}

// ═══════════════════════════════════════════════
// SLIDE: What Got You Here Won't Get You There
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("What Got You Here Won't Get You There", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  s.addImage({ path: path.join(IMG, "what_got_you_here_cover.jpg"), x: 7.0, y: 1.2, w: 2.2, h: 3.44, sizing: { type: "contain", w: 2.2, h: 3.44 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 5.8, h: 3.8, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 0.06, h: 3.8, fill: { color: C.accent3 } });

  s.addText([
    { text: "The mental shift is similar to becoming a manager", options: { bold: true, color: C.accent2, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Great technical skills helped you become a developer, but the skillset you need to thrive as a manager of AI agents is different.", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "You need to learn new skills, delegate and evaluate as opposed to doing everything by yourself.", options: { color: C.quote, fontSize: 14, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "Kent Beck's \"Software G Forces\" (Usenix 2011) showed how practices evolve when deployment cycles shrink. We're at a similar inflection point — the role of Developer as AI Agent boss requires changes across the whole software development lifecycle.", options: { color: C.light, fontSize: 12 } },
  ], { x: 1.1, y: 1.3, w: 5.3, h: 3.6, valign: "top", margin: 0 });

  addSource(s, "Marshall Goldsmith — What Got You Here Won't Get You There", "https://www.amazon.com/What-Got-Here-Wont-There/dp/1846681375/");
}

// ═══════════════════════════════════════════════
// SLIDE: New Skills for Developers
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("New Skills for the Developer as Agent Boss", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  const skills = [
    { title: "Context Engineering", desc: "Create shared context for agent teams — AGENTS.md, custom instructions, ruler", color: C.accent },
    { title: "Specification-Driven Dev", desc: "Raise the abstraction level — write specs, let agents write code", color: C.accent2 },
    { title: "Composing Agent Teams", desc: "Persona-based approach: architect, implementer, reviewer agents with different models & prompts", color: C.accent3 },
    { title: "Quality Frameworks", desc: "Test, review, and evaluate AI-generated code at scale — you're accountable even if you can't read every line", color: C.accent },
    { title: "Cost Management", desc: "Assess agent usage, make tradeoffs — how many agents, for what tasks, at what cost", color: C.accent2 },
    { title: "Operations & SRE Agents", desc: "Explainable root-cause analysis, incident orchestration with human-in-the-loop guardrails", color: C.accent3 },
  ];

  skills.forEach((sk, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const xBase = 0.8 + col * 4.5;
    const yBase = 1.2 + row * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x: xBase, y: yBase, w: 4.1, h: 1.15, fill: { color: C.card } });
    s.addShape(pres.shapes.RECTANGLE, { x: xBase, y: yBase, w: 0.06, h: 1.15, fill: { color: sk.color } });
    s.addText(sk.title, { x: xBase + 0.25, y: yBase + 0.08, w: 3.6, h: 0.35, fontSize: 15, fontFace: "Calibri", color: sk.color, bold: true, margin: 0 });
    s.addText(sk.desc, { x: xBase + 0.25, y: yBase + 0.45, w: 3.6, h: 0.65, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });
  });

  addSource(s, "blog.chanezon.com — DevRel Evolution with AI Agents", "https://blog.chanezon.com/2025/11/07/devrel-evolution-with-ai-agents.html");
}

// ═══════════════════════════════════════════════
// SLIDE: Specification-Driven Development
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Specification-Driven Development", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Raise the level of abstraction — focus human work at the spec level, let agents write the code", {
    x: 0.8, y: 0.9, w: 8.4, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.muted, italic: true, margin: 0
  });

  // Left: concept
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.5, w: 4.0, h: 3.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.5, w: 0.06, h: 3.2, fill: { color: C.accent2 } });
  s.addText([
    { text: "The Idea", options: { bold: true, color: C.accent2, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "\"Specs write once, run everywhere\"", options: { italic: true, color: C.quote, fontSize: 14, breakLine: true } },
    { text: "— Sean Grove, OpenAI", options: { color: C.muted, fontSize: 11, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "• Write detailed specifications", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Agents generate implementation", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Humans review & iterate at spec level", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Specs become the durable artifact", options: { color: C.text, fontSize: 13 } },
  ], { x: 1.1, y: 1.6, w: 3.5, h: 3.0, valign: "top", margin: 0 });

  // Right: resources
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.2, h: 3.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 0.06, h: 3.2, fill: { color: C.accent } });
  s.addText([
    { text: "Key Resources", options: { bold: true, color: C.accent, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "GitHub Spec Kit", options: { bold: true, color: C.white, fontSize: 13, breakLine: true } },
    { text: "Den Delimarsky (Microsoft)", options: { color: C.muted, fontSize: 11, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "8 talks at Devoxx 2025", options: { bold: true, color: C.white, fontSize: 13, breakLine: true } },
    { text: "Patrick Debois' talk recommended", options: { color: C.muted, fontSize: 11, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Persona-Based Approach", options: { bold: true, color: C.white, fontSize: 13, breakLine: true } },
    { text: "Nicholas Zakas — compose a team of specialized agents (PM, architect, implementer, reviewer)", options: { color: C.muted, fontSize: 11 } },
  ], { x: 5.5, y: 1.6, w: 3.7, h: 3.0, valign: "top", margin: 0 });

  addSource(s, "den.dev — GitHub Spec Kit / humanwhocodes.com — Persona-Based Approach", "https://den.dev/blog/github-spec-kit/");
}

// ═══════════════════════════════════════════════
// SECTION: Impact on Early Career Developers
// ═══════════════════════════════════════════════
addSectionSlide("Impact on Early\nCareer Developers");

// ═══════════════════════════════════════════════
// SLIDE: Canaries in the Coal Mine
// canaries-stanford-chart.png is 650x650 (square)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Canaries in the Coal Mine?", {
    x: 0.8, y: 0.2, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Brynjolfsson, Chandar & Chen — Stanford Digital Economy Lab", {
    x: 0.8, y: 0.8, w: 8.4, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: C.muted, margin: 0
  });

  // Chart on right (square image)
  const chartH = 3.0;
  s.addImage({ path: path.join(IMG, "canaries-stanford-chart.png"), x: 5.5, y: 1.3, w: chartH, h: chartH, sizing: { type: "contain", w: chartH, h: chartH } });

  // Key findings on left
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 4.3, h: 3.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 0.06, h: 3.2, fill: { color: C.accent3 } });
  s.addText([
    { text: "Key Findings", options: { bold: true, color: C.accent2, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Early-career workers (22–25) in most AI-exposed occupations:", options: { color: C.text, fontSize: 12, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "16%", options: { bold: true, color: C.accent3, fontSize: 28 } },
    { text: " relative decline\nin employment", options: { color: C.text, fontSize: 12, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "20%", options: { bold: true, color: C.accent3, fontSize: 28 } },
    { text: " from peak for\nsoftware developers", options: { color: C.text, fontSize: 12, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Adjustments occur primarily through employment rather than compensation.", options: { color: C.light, fontSize: 11, italic: true } },
  ], { x: 1.1, y: 1.4, w: 3.8, h: 3.0, valign: "top", margin: 0 });

  addSource(s, "digitaleconomy.stanford.edu — Canaries in the Coal Mine?", "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/");
}

// ═══════════════════════════════════════════════
// SLIDE: Preceptorship Programs
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Preceptorship: A Path for Junior Developers", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Scott Hanselman & Mark Russinovich — Communications of the ACM", {
    x: 0.8, y: 0.9, w: 8.4, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: C.muted, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.5, w: 4.0, h: 3.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.5, w: 0.06, h: 3.2, fill: { color: C.accent3 } });
  s.addText([
    { text: "The Problem", options: { bold: true, color: C.accent3, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "AI disproportionately affects junior developers who rely on entry-level coding tasks to build skills and gain experience.", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Without deliberate intervention, AI could eliminate the learning runway that creates senior engineers.", options: { color: C.text, fontSize: 13 } },
  ], { x: 1.1, y: 1.6, w: 3.5, h: 3.0, valign: "top", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.2, h: 3.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 0.06, h: 3.2, fill: { color: C.accent2 } });
  s.addText([
    { text: "The Preceptorship Model", options: { bold: true, color: C.accent2, fontSize: 16, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Structured mentorship inspired by medical residency programs:", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "• Pair junior devs with senior mentors", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Focus on judgment, architecture & systems thinking", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Use AI as learning accelerator, not replacement", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "• Build skills AI cannot replicate", options: { color: C.text, fontSize: 13 } },
  ], { x: 5.5, y: 1.6, w: 3.7, h: 3.0, valign: "top", margin: 0 });

  addSource(s, "dl.acm.org/doi/abs/10.1145/3779312", "https://dl.acm.org/doi/abs/10.1145/3779312");
}

// ═══════════════════════════════════════════════
// SECTION: AI Fatigue
// ═══════════════════════════════════════════════
addSectionSlide("The AI Fatigue Effect");

// ═══════════════════════════════════════════════
// SLIDE: AI Doesn't Reduce Work — It Intensifies It
// hbr-intensifies.jpg is 1200x675 (16:9)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Doesn't Reduce Work — It Intensifies It", {
    x: 0.8, y: 0.2, w: 8.4, h: 0.6,
    fontSize: 26, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Ranganathan & Ye — Harvard Business Review, Feb 2026", {
    x: 0.8, y: 0.75, w: 8.4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.muted, margin: 0
  });

  // Image top-right
  s.addImage({ path: path.join(IMG, "hbr-intensifies.jpg"), x: 5.8, y: 1.1, w: 3.8, h: 2.14, sizing: { type: "contain", w: 3.8, h: 2.14 } });

  // Quote block left
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 4.7, h: 3.7, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 0.06, h: 3.7, fill: { color: C.accent3 } });
  s.addText([
    { text: "\"AI introduced a new rhythm in which workers managed several active threads at once: manually writing code while AI generated an alternative version, running multiple agents in parallel.\"", options: { color: C.text, fontSize: 13, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "\"The reality was a continual switching of attention, frequent checking of AI outputs, and a growing number of open tasks. This created cognitive load and a sense of always juggling.\"", options: { color: C.light, fontSize: 13, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "— Study of 200 employees, April–December 2025", options: { color: C.muted, fontSize: 11 } }
  ], { x: 1.1, y: 1.2, w: 4.2, h: 3.5, valign: "top", margin: 0 });

  addSource(s, "hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it", "https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it");
}

// ═══════════════════════════════════════════════
// SLIDE: The AI Vampire + Simon Willison
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("The Productivity Paradox: Faster But Exhausted", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  // Left: Steve Yegge
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 4.0, h: 3.6, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 0.06, h: 3.6, fill: { color: C.accent3 } });
  s.addText([
    { text: "Steve Yegge — \"The AI Vampire\"", options: { bold: true, color: C.accent3, fontSize: 14, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "Gas Town: orchestrating swarms of Claude Code agents simultaneously.", options: { color: C.text, fontSize: 13, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "\"There's really too much going on for you to reasonably comprehend. I had a palpable sense of stress watching it. Gas Town was moving too fast for me.\"", options: { color: C.light, fontSize: 12, italic: true } },
  ], { x: 1.1, y: 1.3, w: 3.5, h: 3.4, valign: "top", margin: 0 });

  // Right: Simon Willison
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.2, h: 3.6, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 0.06, h: 3.6, fill: { color: C.accent } });
  s.addText([
    { text: "Simon Willison", options: { bold: true, color: C.accent, fontSize: 14, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "\"The productivity boost these things can provide is exhausting.\"", options: { color: C.text, fontSize: 13, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "\"I can get SO much done, but after just an hour or two my mental energy for the day feels almost entirely depleted.\"", options: { color: C.light, fontSize: 13, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 6 } },
    { text: "\"We've just disrupted decades of existing intuition about sustainable working practices.\"", options: { color: C.quote, fontSize: 12, italic: true } },
  ], { x: 5.5, y: 1.3, w: 3.7, h: 3.4, valign: "top", margin: 0 });

  s.addText([
    { text: "Sources: ", options: { color: C.muted, fontSize: 9 } },
    { text: "steve-yegge.medium.com/the-ai-vampire", options: { color: C.accent, fontSize: 9, hyperlink: { url: "https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163" } } },
    { text: " | ", options: { color: C.muted, fontSize: 9 } },
    { text: "simonwillison.net/2026/Feb/9/ai-intensifies-work", options: { color: C.accent, fontSize: 9, hyperlink: { url: "https://simonwillison.net/2026/Feb/9/ai-intensifies-work/" } } }
  ], { x: 0.8, y: 5.15, w: 8.4, h: 0.3, margin: 0 });
}

// ═══════════════════════════════════════════════
// SLIDE: AI Brain Fry — Diagnosis
// hbr-brainfry.jpg is 1920x1080 (16:9)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("When Using AI Leads to \"Brain Fry\"", {
    x: 0.8, y: 0.2, w: 8.4, h: 0.6,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Bedard, Kropp, Hsu, Karaman, Hawes & Kellerman — HBR, March 2026", {
    x: 0.8, y: 0.75, w: 8.4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.muted, margin: 0
  });

  // Image top-right
  s.addImage({ path: path.join(IMG, "hbr-brainfry.jpg"), x: 5.8, y: 1.1, w: 3.6, h: 2.02, sizing: { type: "contain", w: 3.6, h: 2.02 } });

  // Left: diagnosis
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 4.7, h: 1.3, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 0.06, h: 1.3, fill: { color: C.accent3 } });
  s.addText([
    { text: "Which functions report AI brain fry?", options: { bold: true, color: C.accent2, fontSize: 15, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 4 } },
    { text: "Certain patterns of AI use drive cognitive fatigue. Functions with heavy evaluative AI use report the highest rates.", options: { color: C.text, fontSize: 12 } },
  ], { x: 1.1, y: 1.15, w: 4.2, h: 1.2, valign: "top", margin: 0 });

  // Key stat
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.6, w: 8.6, h: 1.0, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.6, w: 0.06, h: 1.0, fill: { color: C.accent3 } });
  s.addText([
    { text: "39%", options: { bold: true, color: C.accent3, fontSize: 42 } },
    { text: " increase in active intent to leave among top AI users with brain fry", options: { color: C.text, fontSize: 15 } }
  ], { x: 1.2, y: 2.65, w: 7.8, h: 0.9, valign: "middle", margin: 0 });

  // Quote
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.85, w: 8.6, h: 1.15, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.85, w: 0.06, h: 1.15, fill: { color: C.quote } });
  s.addText("\"Among workers who did not report AI brain fry, 25% showed active intent to leave. Among those who did report AI brain fry, that rose to 34%. This represents a 39% increase in active worker intent to leave among top users of AI.\"", {
    x: 1.2, y: 3.9, w: 8.0, h: 1.05,
    fontSize: 12, fontFace: "Calibri", color: C.text, italic: true, valign: "middle", margin: 0
  });

  addSource(s, "hbr.org/2026/03/when-using-ai-leads-to-brain-fry", "https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry");
}

// ═══════════════════════════════════════════════
// SLIDE: AI Brain Fry — Lessons for Leaders
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Brain Fry — Lessons for Leaders", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  const lessons = [
    { title: "Build an AI Practice", desc: "Structure how AI is used to avoid burnout — distinguish genuine productivity gains from unsustainable intensity", color: C.accent },
    { title: "Monitor Cognitive Load", desc: "Track team wellbeing metrics alongside productivity — more output ≠ sustainable performance", color: C.accent2 },
    { title: "Differentiate AI Use Patterns", desc: "Some patterns reduce burnout (automation of drudgery), others increase it (constant evaluative review)", color: C.accent3 },
    { title: "Protect Creative Work", desc: "Ensure developers retain generative tasks — don't turn everyone into a reviewer on an assembly line", color: C.accent },
  ];

  lessons.forEach((l, i) => {
    const yy = 1.2 + i * 1.0;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: yy, w: 8.4, h: 0.85, fill: { color: C.card } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: yy, w: 0.06, h: 0.85, fill: { color: l.color } });
    s.addText(l.title, { x: 1.2, y: yy + 0.05, w: 7.8, h: 0.32, fontSize: 16, fontFace: "Calibri", color: l.color, bold: true, margin: 0 });
    s.addText(l.desc, { x: 1.2, y: yy + 0.4, w: 7.8, h: 0.4, fontSize: 13, fontFace: "Calibri", color: C.text, margin: 0 });
  });

  addSource(s, "hbr.org/2026/03/when-using-ai-leads-to-brain-fry", "https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry");
}

// ═══════════════════════════════════════════════
// SLIDE: AI Fatigue Is Real — Diagnosis
// siddhant-reviewer.png is 1536x1024 (1.5:1)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Fatigue Is Real — The Diagnosis", {
    x: 0.8, y: 0.2, w: 5.4, h: 0.6,
    fontSize: 26, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addText("Siddhant Khare", {
    x: 0.8, y: 0.75, w: 5.4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.muted, margin: 0
  });

  // Image top-right
  s.addImage({ path: path.join(IMG, "siddhant-reviewer.png"), x: 6.0, y: 0.2, w: 3.6, h: 2.4, sizing: { type: "contain", w: 3.6, h: 2.4 } });

  // Left column
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.15, w: 4.8, h: 1.6, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.15, w: 0.06, h: 1.6, fill: { color: C.accent3 } });
  s.addText([
    { text: "The Jevons Paradox", options: { bold: true, color: C.accent3, fontSize: 15, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 4 } },
    { text: "\"When each task takes less time, you don't do fewer tasks. You do more tasks.\"", options: { italic: true, color: C.quote, fontSize: 12, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 4 } },
    { text: "\"AI reduces the cost of production but increases the cost of coordination, review, and decision-making. Those costs fall entirely on the human.\"", options: { italic: true, color: C.text, fontSize: 11 } },
  ], { x: 1.1, y: 1.2, w: 4.3, h: 1.5, valign: "top", margin: 0 });

  // Right column
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.95, w: 4.8, h: 1.05, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.95, w: 0.06, h: 1.05, fill: { color: C.accent } });
  s.addText([
    { text: "From Creator to Reviewer", options: { bold: true, color: C.accent, fontSize: 15, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 4 } },
    { text: "\"I became a reviewer. A judge. A quality inspector on an assembly line that never stops.\"", options: { italic: true, color: C.text, fontSize: 11 } },
  ], { x: 1.1, y: 3.0, w: 4.3, h: 0.95, valign: "top", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 2.8, w: 3.6, h: 1.2, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 2.8, w: 0.06, h: 1.2, fill: { color: C.accent2 } });
  s.addText([
    { text: "The Nondeterminism Problem", options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 4 } },
    { text: "\"You are collaborating with a probabilistic system, and your brain is wired for deterministic ones.\"", options: { italic: true, color: C.text, fontSize: 11 } },
  ], { x: 6.25, y: 2.85, w: 3.1, h: 1.1, valign: "top", margin: 0 });

  // Bottom quote
  s.addText([
    { text: "Creating is energizing. Reviewing is draining.", options: { bold: true, color: C.accent3, fontSize: 18 } },
    { text: "  — The prompt spiral is the AI equivalent of yak shaving.", options: { color: C.muted, fontSize: 12, italic: true } }
  ], { x: 0.8, y: 4.3, w: 8.4, h: 0.6, margin: 0 });

  addSource(s, "siddhantkhare.com/writing/ai-fatigue-is-real", "https://siddhantkhare.com/writing/ai-fatigue-is-real");
}

// ═══════════════════════════════════════════════
// SLIDE: AI Fatigue Is Real — Best Practices
// siddhant-stop.png is 1536x1024 (1.5:1)
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("Surviving AI Fatigue — Best Practices", {
    x: 0.8, y: 0.2, w: 5.4, h: 0.6,
    fontSize: 26, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  // Image top-right
  s.addImage({ path: path.join(IMG, "siddhant-stop.png"), x: 6.2, y: 0.1, w: 3.4, h: 2.27, sizing: { type: "contain", w: 3.4, h: 2.27 } });

  const practices = [
    { title: "The 3-Attempt Rule", desc: "\"If the AI doesn't get me to 70% usable in three prompts, I write it myself.\"", color: C.accent3 },
    { title: "Time-box AI Sessions", desc: "Set a timer. 30 min with AI. When it goes off, ship what you have or write it yourself.", color: C.accent },
    { title: "Separate Thinking & AI Time", desc: "Morning for thinking. Afternoon for AI-assisted execution. Your brain needs both.", color: C.accent2 },
    { title: "Build on the Layer That Doesn't Churn", desc: "\"Staying informed and staying reactive are different things.\"", color: C.accent3 },
    { title: "Curate Your Signal", desc: "\"The ratio of signal to anxiety matters. If a feed makes you feel behind, it's not serving you.\"", color: C.accent },
    { title: "Set Your Own Pace", desc: "\"I am not a machine and I don't need to keep pace with one.\"", color: C.accent2 },
  ];

  practices.forEach((p, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const xBase = 0.8 + col * 4.5;
    const yBase = (col === 0 ? 1.0 : 2.5) + row * 1.0;
    s.addShape(pres.shapes.RECTANGLE, { x: xBase, y: yBase, w: 4.1, h: 0.85, fill: { color: C.card } });
    s.addShape(pres.shapes.RECTANGLE, { x: xBase, y: yBase, w: 0.06, h: 0.85, fill: { color: p.color } });
    s.addText(p.title, { x: xBase + 0.25, y: yBase + 0.05, w: 3.6, h: 0.3, fontSize: 13, fontFace: "Calibri", color: p.color, bold: true, margin: 0 });
    s.addText(p.desc, { x: xBase + 0.25, y: yBase + 0.35, w: 3.6, h: 0.45, fontSize: 10, fontFace: "Calibri", color: C.text, italic: true, margin: 0 });
  });

  addSource(s, "siddhantkhare.com/writing/ai-fatigue-is-real", "https://siddhantkhare.com/writing/ai-fatigue-is-real");
}

// ═══════════════════════════════════════════════
// SLIDE: Conclusion — Golden Age
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("AI Coding Agents create a\ngolden age of programming", {
    x: 0.8, y: 0.3, w: 8.4, h: 1.2,
    fontSize: 34, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });

  s.addImage({ path: path.join(IMG, "Literate_Programming_book_cover.jpg"), x: 0.8, y: 1.8, w: 2.2, h: 3.3, sizing: { type: "contain", w: 2.2, h: 3.3 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.8, w: 6.0, h: 3.3, fill: { color: C.card } });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.8, w: 0.06, h: 3.3, fill: { color: C.quote } });
  s.addText([
    { text: "\"Let us change our traditional attitude to the construction of programs: Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do.\"", options: { color: C.text, fontSize: 16, italic: true, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 12 } },
    { text: "— Donald Knuth", options: { color: C.quote, fontSize: 18, bold: true, breakLine: true } },
    { text: "   Literate Programming, 1984", options: { color: C.muted, fontSize: 13 } }
  ], { x: 3.8, y: 2.0, w: 5.5, h: 2.8, valign: "middle", margin: 0 });
}

// ═══════════════════════════════════════════════
// SLIDE: References
// ═══════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("References", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: "Calibri", color: C.white, bold: true, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.0, w: 2, h: 0.04, fill: { color: C.accent } });

  const refs = [
    { label: "Karpathy: AI Coding Notes", url: "https://x.com/karpathy/status/2015883857489522876" },
    { label: "Chanezon: DevRel Evolution with AI Agents", url: "https://blog.chanezon.com/2025/11/07/devrel-evolution-with-ai-agents.html" },
    { label: "Microsoft: The Frontier Firm (Work Trend Index)", url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born" },
    { label: "Dell'Acqua et al: The Cybernetic Teammate", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5188231" },
    { label: "Goldsmith: What Got You Here Won't Get You There", url: "https://www.amazon.com/What-Got-Here-Wont-There/dp/1846681375/" },
    { label: "Delimarsky: GitHub Spec Kit", url: "https://den.dev/blog/github-spec-kit/" },
    { label: "Zakas: Persona-Based AI-Assisted Dev", url: "https://humanwhocodes.com/blog/2025/06/persona-based-approach-ai-assisted-programming/" },
    { label: "Brynjolfsson et al: Canaries in the Coal Mine?", url: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/" },
    { label: "Hanselman & Russinovich: Preceptorship (ACM)", url: "https://dl.acm.org/doi/abs/10.1145/3779312" },
    { label: "HBR: AI Doesn't Reduce Work — It Intensifies It", url: "https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it" },
    { label: "Yegge: The AI Vampire", url: "https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163" },
    { label: "Willison: AI Intensifies Work", url: "https://simonwillison.net/2026/Feb/9/ai-intensifies-work/" },
    { label: "HBR: When Using AI Leads to Brain Fry", url: "https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry" },
    { label: "Khare: AI Fatigue Is Real", url: "https://siddhantkhare.com/writing/ai-fatigue-is-real" },
    { label: "Knuth: Literate Programming", url: "https://www-cs-faculty.stanford.edu/~knuth/lp.html" },
  ];

  refs.forEach((r, i) => {
    const col = i < 8 ? 0 : 1;
    const row = i < 8 ? i : i - 8;
    const xBase = 0.8 + col * 4.5;
    const yBase = 1.25 + row * 0.53;
    s.addText([
      { text: r.label, options: { color: C.accent, fontSize: 11, hyperlink: { url: r.url } } }
    ], { x: xBase, y: yBase, w: 4.2, h: 0.45, margin: 0, valign: "top" });
  });
}

// ═══════════════════════════════════════════════
// WRITE FILE
// ═══════════════════════════════════════════════
pres.writeFile({ fileName: path.join(__dirname, "presentation.pptx") })
  .then(() => console.log("✅ presentation.pptx saved (" + pres.slides.length + " slides)"))
  .catch(err => console.error("❌ Error:", err));
