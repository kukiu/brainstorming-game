import { useState, useEffect, useRef, useMemo } from "react";

const DEV_QUOTES = [
  "If there is no struggle, there is no progress.",
  "Don't stop until you're proud.",
  "Coding is fun.",
  "First, solve the problem. Then, write the code.",
  "Talk is cheap. Show me the code.",
  "Make it work, make it right, make it fast.",
  "Any fool can write code a computer can understand.",
  "Simplicity is the soul of efficiency.",
  "Code is like humor. When you explain it, it's bad.",
  "Fix the cause, not the symptom.",
  "Think twice, code once.",
  "Good code is its own best documentation.",
  "Programs must be written for people to read.",
  "Debugging is twice as hard as writing the code.",
  "The best error message is the one that never shows up.",
  "Clean code always looks like it was written by someone who cares.",
  "It works on my machine.",
  "// TODO: fix this later",
  "git commit -m 'final final FINAL v3'",
  "Have you tried turning it off and on again?",
];


const allQuestions = {
  easy: [
    { items: ["Bug", "Error", "Crash", "Coffee"], answer: "Coffee", hint: "3 are problems, 1 is a solution ☕" },
    { items: ["HTML", "CSS", "Python", "JavaScript"], answer: "Python", hint: "3 are front-end web languages, 1 is not" },
    { items: ["Array", "Stack", "Keyboard", "Queue"], answer: "Keyboard", hint: "3 are data structures, 1 is hardware" },
    { items: ["Linux", "Android", "Windows", "macOS"], answer: "Android", hint: "3 are desktop OS, 1 is mobile-first" },
    { items: ["React", "Vue", "Angular", "Django"], answer: "Django", hint: "3 are JS frameworks, 1 is Python" },
    { items: ["Redis", "Figma", "MongoDB", "MySQL"], answer: "Figma", hint: "3 are databases, 1 is a design tool" },
    { items: ["RAM", "CPU", "GPU", "API"], answer: "API", hint: "3 are hardware components, 1 is software" },
    { items: ["Python", "Java", "C++", "HTML"], answer: "HTML", hint: "3 are programming languages, 1 is markup" },
    { items: ["Chrome", "Firefox", "Safari", "Slack"], answer: "Slack", hint: "3 are web browsers, 1 is a messaging app" },
    { items: ["VS Code", "Postman", "Sublime", "Vim"], answer: "Postman", hint: "3 are code editors, 1 is an API testing tool" },
    { items: ["Keyboard", "Mouse", "Monitor", "Python"], answer: "Python", hint: "3 are physical peripherals, 1 is a programming language" },
    { items: ["Email", "Slack", "GitHub", "Teams"], answer: "GitHub", hint: "3 are messaging/communication tools, 1 is code hosting" },
    { items: ["JPEG", "PNG", "GIF", "PDF"], answer: "PDF", hint: "3 are image formats, 1 is a document format" },
    { items: ["Internet Explorer", "Opera", "Brave", "Excel"], answer: "Excel", hint: "3 are web browsers, 1 is a spreadsheet app" },
    { items: ["localhost", "127.0.0.1", "::1", "192.168.1.1"], answer: "192.168.1.1", hint: "3 refer to loopback/local host, 1 is a router IP" },
    { items: ["Frontend", "Backend", "Database", "Keyboard"], answer: "Keyboard", hint: "3 are software architecture layers, 1 is hardware" },
    { items: ["JSON", "JPEG", "XML", "YAML"], answer: "JPEG", hint: "3 are data serialization formats, 1 is an image format" },
    { items: ["404", "500", "200", "RGB"], answer: "RGB", hint: "3 are HTTP status codes, 1 is a color model" },
    { items: ["MacBook", "ThinkPad", "Raspberry Pi", "Android"], answer: "Android", hint: "3 are physical computers/boards, 1 is a mobile OS" },
    { items: ["Zoom", "Meet", "Teams", "Vim"], answer: "Vim", hint: "3 are video conferencing tools, 1 is a text editor" },
  ],
  medium: [
    { items: ["Git", "GitHub", "Jira", "GitLab" ], answer: "Jira", hint: "3 are version control tools, 1 is project management" },
    { items: ["npm", "yarn", "pip", "pnpm"], answer: "pip", hint: "3 are JavaScript package managers, 1 is Python" },
    { items: ["POST", "FETCH", "GET", "DELETE"], answer: "FETCH", hint: "3 are HTTP methods, 1 is a JS browser API" },
    { items: ["TCP", "UDP", "HTTP", "OOP"], answer: "OOP", hint: "3 are network protocols, 1 is a programming paradigm" },
    { items: ["Ansible", "Docker", "Kubernetes", "Podman"], answer: "Ansible", hint: "3 are containerization tools, 1 is config management" },
    { items: ["useState", "useMemo", "useEffect", "useRef"], answer: "useMemo", hint: "3 manage state/lifecycle, 1 is for performance optimization" },
    { items: ["CORS", "REST", "XSS", "CSRF"], answer: "REST", hint: "3 are security vulnerabilities, 1 is an architectural style" },
    { items: ["Webpack", "Vite", "Babel", "ESLint"], answer: "ESLint", hint: "3 are bundlers/transpilers, 1 is a linter" },
    { items: ["AWS", "GCP", "Ubuntu", "Azure"], answer: "Ubuntu", hint: "3 are cloud providers, 1 is a Linux distro" },
    { items: ["Sass", "Less", "Tailwind", "Bootstrap"], answer: "Bootstrap", hint: "3 are CSS preprocessors/utilities, 1 is a UI component library" },
    { items: ["IPv4", "IPv6", "DNS", "SSH"], answer: "SSH", hint: "3 are network addressing protocols, 1 is a secure shell protocol" },
    { items: ["Jest", "Mocha", "Cypress", "Webpack"], answer: "Webpack", hint: "3 are testing frameworks, 1 is a module bundler" },
    { items: ["Nginx", "Apache", "Redis", "Caddy"], answer: "Redis", hint: "3 are web servers, 1 is an in-memory data store" },
    { items: ["Figma", "Sketch", "Adobe XD", "Storybook"], answer: "Storybook", hint: "3 are UI design tools, 1 is a component documentation tool" },
    { items: ["Heroku", "Lambda", "EC2", "S3"], answer: "Heroku", hint: "3 are AWS services, 1 is a separate cloud platform" },
    { items: ["SSH", "FTP", "JWT", "SMTP"], answer: "JWT", hint: "3 are network transfer protocols, 1 is an auth token format" },
    { items: ["Prettier", "Babel", "ESLint", "Husky"], answer: "Babel", hint: "3 are code quality/git tools, 1 is a JS transpiler" },
    { items: ["Scrum", "Kanban", "Waterfall", "Docker"], answer: "Docker", hint: "3 are project management methodologies, 1 is a container tool" },
    { items: ["TypeScript", "CoffeeScript", "Elm", "Sass"], answer: "Sass", hint: "3 compile to JavaScript, 1 compiles to CSS" },
    { items: ["Next.js", "Express", "Nuxt.js", "Gatsby"], answer: "Express", hint: "3 are SSR/static site frameworks, 1 is a bare Node.js server" },
  ],
  hard: [
    { items: ["O(1)", "O(log n)", "O(n)", "O(n!)"], answer: "O(n!)", hint: "3 are polynomial complexities, 1 is factorial (worst case)" },
    { items: ["Mutex", "Semaphore", "Deadlock", "Monitor"], answer: "Deadlock", hint: "3 are synchronization tools, 1 is a failure state" },
    { items: ["gRPC", "WebSocket", "GraphQL", "REST"], answer: "WebSocket", hint: "3 are request-response APIs, 1 is persistent bidirectional" },
    { items: ["B-Tree", "AVL Tree", "Red-Black Tree", "Linked List"], answer: "Linked List", hint: "3 are self-balancing trees, 1 is a linear structure" },
    { items: ["ACID", "BASE", "ORM", "CAP"], answer: "ORM", hint: "3 are database consistency/theory models, 1 is a dev tool" },
    { items: ["Pub/Sub", "Event Bus", "Observer", "Singleton"], answer: "Singleton", hint: "3 are event-driven patterns, 1 is a creational pattern" },
    { items: ["JWT", "OAuth", "SAML", "SHA-256"], answer: "SHA-256", hint: "3 are auth/identity protocols, 1 is a hashing algorithm" },
    { items: ["Terraform", "Pulumi", "CloudFormation", "Prometheus"], answer: "Prometheus", hint: "3 are IaC tools, 1 is a monitoring system" },
    { items: ["Cache", "Heap", "Stack", "Registers"], answer: "Cache", hint: "3 are core memory areas in a program, 1 is hardware-level optimization" },
    { items: [ "CRUD", "SOLID", "DRY", "KISS"], answer: "CRUD", hint: "3 are design principles, 1 is a set of data operations" },
    { items: ["Paxos", "Raft", "Zab", "Saga"], answer: "Saga", hint: "3 are consensus algorithms, 1 is a distributed transaction pattern" },
    { items: ["Memoization", "Sharding", "Tabulation", "Backtracking"], answer: "Sharding", hint: "3 are dynamic programming techniques, 1 is a DB scaling strategy" },
    { items: ["AES", "RSA", "ECC", "TLS"], answer: "TLS", hint: "3 are encryption algorithms, 1 is a security protocol" },
    { items: ["Currying", "Memoization", "Closure", "Sharding"], answer: "Sharding", hint: "3 are functional programming concepts, 1 is a DB concept" },
    { items: ["Bloom Filter", "LRU Cache", "Trie", "Dockerfile"], answer: "Dockerfile", hint: "3 are CS data structures/algorithms, 1 is a container config file" },
    { items: ["Eventual Consistency", "Idempotency", "Strong Consistency", "Linearizability"], answer: "Idempotency", hint: "3 are consistency models, 1 is an operation property" },
    { items: ["Epoll", "Kqueue", "Select", "Mutex"], answer: "Mutex", hint: "3 are I/O multiplexing syscalls, 1 is a locking mechanism" },
    { items: ["NP-Hard", "NP-Complete", "P", "YAGNI"], answer: "YAGNI", hint: "3 are computational complexity classes, 1 is a dev principle" },
    { items: ["Gossip Protocol", "Two-Phase Commit", "Quorum", "Facade"], answer: "Facade", hint: "3 are distributed systems concepts, 1 is a design pattern" },
    { items: ["Write-Ahead Log", "Copy-on-Write", "MVCC", "IIFE"], answer: "IIFE", hint: "3 are database durability strategies, 1 is a JS function pattern" },
  ],
};

const DIFFICULTY_CONFIG = {
  easy:   { label: "Easy",   color: "#27c93f", time: 20, icon: "🟢" },
  medium: { label: "Medium", color: "#ffbd2e", time: 15, icon: "🟡" },
  hard:   { label: "Hard",   color: "#ff5f56", time: 10, icon: "🔴" },
};

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const quotesRef = useRef([]);

  const selectedQuotes = useMemo(() => shuffle(DEV_QUOTES).slice(0, 8), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    quotesRef.current = selectedQuotes.map((text, i) => ({
      text,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0,
      targetOpacity: Math.random() * 0.25 + 0.45,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.2,
      fadeDir: 1,
      fadeSpeed: Math.random() * 0.005 + 0.004,
      fontSize: Math.random() * 4 + 13,
    }));

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.7);
      grad.addColorStop(0, "#0d1b2a");
      grad.addColorStop(0.5, "#0a0a0f");
      grad.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const grad2 = ctx.createRadialGradient(W * 0.8, H * 0.2, 0, W * 0.8, H * 0.2, W * 0.5);
      grad2.addColorStop(0, "rgba(26,13,46,0.6)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.beginPath();
      const t = Date.now() * 0.0003;
      ctx.moveTo(0, H * 0.45 + Math.sin(t) * 30);
      for (let x = 0; x <= W; x += 10) {
        const y = H * 0.45 + Math.sin(t + x * 0.005) * 40 + Math.sin(t * 1.3 + x * 0.003) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H * 0.7 + Math.sin(t * 0.8) * 30);
      for (let x = W; x >= 0; x -= 10) {
        const y = H * 0.65 + Math.sin(t * 0.9 + x * 0.004) * 35 + Math.sin(t * 1.1 + x * 0.006) * 15;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.025)";
      ctx.fill();
      ctx.restore();

      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const glowR = p.r * (1 + Math.sin(p.pulse) * 0.3);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 4);
        grd.addColorStop(0, `rgba(200,220,255,${p.opacity})`);
        grd.addColorStop(0.4, `rgba(180,200,255,${p.opacity * 0.4})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      ctx.save();
      quotesRef.current.forEach(q => {
        q.opacity += q.fadeDir * q.fadeSpeed;
        if (q.opacity >= q.targetOpacity) { q.opacity = q.targetOpacity; q.fadeDir = -1; }
        if (q.opacity <= 0) {
          q.opacity = 0; q.fadeDir = 1;
          q.x = Math.random() * W;
          q.y = Math.random() * H;
          q.targetOpacity = Math.random() * 0.25 + 0.45;
        }
        q.x += q.vx; q.y += q.vy;
        if (q.x < -300) q.x = W + 100;
        if (q.x > W + 300) q.x = -100;
        if (q.y < -50) q.y = H + 20;
        if (q.y > H + 50) q.y = -20;
        ctx.font = `${q.fontSize}px 'JetBrains Mono', monospace`;
        ctx.shadowColor = `rgba(150,200,255,${q.opacity * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(210,230,255,${q.opacity})`;
        ctx.fillText(q.text, q.x, q.y);
        ctx.shadowBlur = 0;
      });
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [selectedQuotes]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

export default function OddOneOut() {
  const [screen, setScreen] = useState("menu");
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  console.log(totalTime)

  const cfg = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;
  const q = questions[current];

  useEffect(() => {
    if (screen !== "game" || selected || timedOut || !difficulty) return;
    if (timeLeft <= 0) {
      setTimedOut(true); setShake(true);
      setHistory(h => [...h, { correct: false, timedOut: true }]);
      setTimeout(() => setShake(false), 500); return;
    }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, screen, selected, timedOut, difficulty]);

  function startGame(diff) {
    setDifficulty(diff); setQuestions(shuffle(allQuestions[diff]));
    setCurrent(0); setSelected(null); setScore(0); setHistory([]);
    setTimedOut(false); setShowHint(false); setTotalTime(0);
    setTimeLeft(DIFFICULTY_CONFIG[diff].time); setScreen("game");
  }

  function handleSelect(item) {
    if (selected || timedOut) return;
    setTotalTime(t => t + (cfg.time - timeLeft));
    setSelected(item);
    const correct = item === q.answer;
    if (correct) { setScore(s => s + 1); setPulse(true); setTimeout(() => setPulse(false), 600); }
    else { setShake(true); setTimeout(() => setShake(false), 500); }
    setHistory(h => [...h, { correct, timedOut: false }]);
  }

  function next() {
    setShowHint(false); setSelected(null); setTimedOut(false); setTimeLeft(cfg.time);
    if (current + 1 >= questions.length) setScreen("result");
    else setCurrent(c => c + 1);
  }

  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const timerPercent = cfg ? (timeLeft / cfg.time) * 100 : 100;
  const timerColor = timerPercent > 50 ? "#27c93f" : timerPercent > 25 ? "#ffbd2e" : "#ff5f56";

  return (
    <div style={s.root}>
      <style>{fonts + keyframes}</style>
      <AnimatedBackground />

      <div style={s.page}>
        {screen === "menu" && (
          <div style={s.card}>
            <div style={s.terminalBar}>
              <span style={dot("#ff5f56")} /><span style={dot("#ffbd2e")} /><span style={dot("#27c93f")} />
            </div>
            <div style={s.menuBody}>
              <div style={s.menuTitle}>ODD ONE OUT</div>
              <div style={s.menuSub}>A brainstorming game for developers</div>
              <div style={s.menuDesc}>Pick the item that doesn't belong with the others. Choose your difficulty:</div>
              <div style={s.diffGrid}>
                {Object.entries(DIFFICULTY_CONFIG).map(([key, val]) => (
                  <button key={key} style={{ ...s.diffBtn, borderColor: val.color }} onClick={() => startGame(key)}>
                    <span style={s.diffIcon}>{val.icon}</span>
                    <span style={{ ...s.diffLabel, color: val.color }}>{val.label}</span>
                    <span style={s.diffMeta}>⏱ {val.time}s per question</span>
                    <span style={s.diffMeta}>20 questions</span>
                  </button>
                ))}
              </div>
              <div style={s.menuTip}>💡 Hints available on Easy & Medium. Hard mode — you're on your own!</div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div style={s.card}>
            <div style={s.terminalBar}>
              <span style={dot("#ff5f56")} /><span style={dot("#ffbd2e")} /><span style={dot("#27c93f")} />
              <span style={s.terminalTitle}>result.log — [{cfg.label}]</span>
            </div>
            <div style={s.finishBody}>
              <div style={{ ...s.badge, background: cfg.color + "22", border: `1px solid ${cfg.color}`, color: cfg.color }}>
                {cfg.icon} {cfg.label} Mode
              </div>
              <div style={{ ...s.scoreCircle, borderColor: cfg.color, background: cfg.color + "15", boxShadow: `0 0 30px ${cfg.color}33` }}>
                <span style={{ ...s.scoreNum, color: cfg.color }}>{score}</span>
                <span style={s.scoreOf}>/ {questions.length}</span>
              </div>
              <div style={s.percentBar}>
                <div style={{ ...s.percentFill, width: `${percent}%`, background: percent >= 70 ? "#27c93f" : percent >= 40 ? "#ffbd2e" : "#ff5f56" }} />
              </div>
              <p style={s.resultMsg}>
                {percent === 100 ? "🏆 Perfect score! You're a dev genius." :
                 percent >= 70 ? "🎉 Great job! Sharp developer brain." :
                 percent >= 40 ? "👍 Not bad! Keep practicing." :
                 "💡 Keep going — every attempt makes you sharper!"}
              </p>
              <div style={s.statRow}>
                <div style={s.statBox}><span style={s.statVal}>{score}</span><span style={s.statKey}>Correct</span></div>
                <div style={s.statBox}><span style={s.statVal}>{questions.length - score}</span><span style={s.statKey}>Wrong</span></div>
                <div style={s.statBox}><span style={s.statVal}>{percent}%</span><span style={s.statKey}>Accuracy</span></div>
              </div>
              <div style={s.historyRow}>
                {history.map((h, i) => (
                  <span key={i} style={{ ...s.historyDot, background: h.correct ? "#27c93f" : h.timedOut ? "#888" : "#ff5f56" }}
                    title={h.timedOut ? `Q${i+1}: Timed out` : `Q${i+1}: ${h.correct ? "Correct" : "Wrong"}`} />
                ))}
              </div>
              <div style={s.btnRow}>
                <button style={{ ...s.btn, background: `linear-gradient(135deg, ${cfg.color}, #00d4ff)` }} onClick={() => startGame(difficulty)}>↺ Retry</button>
                <button style={{ ...s.btn, background: "#1c1c28", color: "#aaa", border: "1px solid #333" }} onClick={() => setScreen("menu")}>⬅ Menu</button>
              </div>
            </div>
          </div>
        )}

        {screen === "game" && q && (
          <div style={{ ...s.card, animation: shake ? "shake 0.4s ease" : pulse ? "boop 0.4s ease" : "none" }}>
            <div style={s.terminalBar}>
              <span style={dot("#ff5f56")} /><span style={dot("#ffbd2e")} /><span style={dot("#27c93f")} />
              {/* <span style={s.terminalTitle}>odd-one-out.exe — [{cfg.label}]</span> */}
            </div>
            <div style={s.header}>
              <div style={{ ...s.badge, background: cfg.color + "22", border: `1px solid ${cfg.color}55`, color: cfg.color }}>{cfg.icon} {cfg.label}</div>
              <div style={s.scoreTag}>Score: <b style={{ color: "#27c93f" }}>{score}</b></div>
            </div>
            <div style={s.progressWrap}>
              <div style={{ ...s.progressFill, width: `${(current / questions.length) * 100}%` }} />
            </div>
            <div style={s.qMeta}>
              <span style={s.qCount}>Q {current + 1}/{questions.length}</span>
              <div style={s.timerWrap}>
                <div style={{ ...s.timerFill, width: `${timerPercent}%`, background: timerColor, transition: timedOut || selected ? "none" : "width 1s linear, background 0.3s" }} />
                <span style={{ ...s.timerText, color: timerColor }}>{timedOut ? "⏰" : `${timeLeft}s`}</span>
              </div>
            </div>
            <div style={s.question}>Which one does <span style={s.highlight}>NOT</span> belong?</div>
            <div style={s.options}>
              {q.items.map((item) => {
                const isCorrect = item === q.answer, isSelected = item === selected;
                const revealed = selected || timedOut;
                let bg = "#1a1a2e", border = "1px solid #2a2a3a", color = "#e0e0e0";
                if (revealed) {
                  if (isCorrect) { bg = "#0d2b0d"; border = "1px solid #27c93f"; color = "#27c93f"; }
                  else if (isSelected) { bg = "#2b0d0d"; border = "1px solid #ff5f56"; color = "#ff5f56"; }
                  else { color = "#444"; }
                }
                return (
                  <button key={item} onClick={() => handleSelect(item)}
                    style={{ ...s.option, background: bg, border, color, cursor: revealed ? "default" : "pointer" }}>
                    <span style={s.optionIcon}>{revealed && isCorrect ? "✓" : revealed && isSelected ? "✗" : "›"}</span>
                    {item}
                  </button>
                );
              })}
            </div>
            <div style={s.bottomRow}>
              {!selected && !timedOut && difficulty !== "hard" && (
                <button style={s.hintBtn} onClick={() => setShowHint(h => !h)}>{showHint ? "Hide hint" : "💡 Hint"}</button>
              )}
              {showHint && !selected && !timedOut && <div style={s.hint}>{q.hint}</div>}
              {timedOut && !selected && (
                <div style={{ ...s.hint, color: "#ff5f56", animation: "fadeIn 0.3s ease" }}>
                  ⏰ Time's up! The answer was <b>{q.answer}</b>. {q.hint}
                </div>
              )}
              {selected && (
                <div style={{ ...s.hint, color: selected === q.answer ? "#27c93f" : "#ff5f56", animation: "fadeIn 0.3s ease" }}>
                  {selected === q.answer ? `✓ Correct! ${q.hint}` : `✗ Nope. The answer was ${q.answer}. ${q.hint}`}
                </div>
              )}
            </div>
            {(selected || timedOut) && (
              <button style={{ ...s.btn, margin: "0 24px 24px", animation: "fadeIn 0.3s ease", background: `linear-gradient(135deg, ${cfg.color}, #00d4ff)` }} onClick={next}>
                {current + 1 >= questions.length ? "See Results →" : "Next →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const dot = (color) => ({ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: color });
const fonts = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Mono:wght@400;700&display=swap');`;
const keyframes = `
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 60%{transform:translateX(8px)} }
  @keyframes boop  { 0%{transform:scale(1)} 50%{transform:scale(1.02)} 100%{transform:scale(1)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
`;

const s = {
  root: { position: "relative", minHeight: "100vh" },
  page: {
    position: "relative", zIndex: 1, minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace", padding: "1rem",
  },
  card: {
    background: "rgba(17,17,24,0.82)", backdropFilter: "blur(18px)",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)",
    width: "100%", maxWidth: "500px", overflow: "hidden",
    boxShadow: "0 0 40px rgba(39,201,63,0.06), 0 20px 60px rgba(0,0,0,0.7)",
  },
  terminalBar: { background: "rgba(28,28,40,0.9)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  terminalTitle: { marginLeft: "8px", fontSize: "11px", color: "#555", fontFamily: "'JetBrains Mono', monospace" },
  menuBody: { padding: "28px 24px", display: "flex", flexDirection: "column", gap: "14px" },
  menuTitle: { fontSize: "24px", fontWeight: "700", color: "#e0e0e0", fontFamily: "'Space Mono', monospace", letterSpacing: "2px" },
  menuSub: { fontSize: "11px", color: "#27c93f", letterSpacing: "2px" },
  menuDesc: { fontSize: "12px", color: "#666", lineHeight: "1.6" },
  diffGrid: { display: "flex", flexDirection: "column", gap: "10px" },
  diffBtn: { background: "rgba(26,26,46,0.8)", border: "1px solid", borderRadius: "10px", padding: "14px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "12px", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s" },
  diffIcon: { fontSize: "18px" },
  diffLabel: { fontSize: "14px", fontWeight: "700", flex: 1 },
  diffMeta: { fontSize: "10px", color: "#555" },
  menuTip: { fontSize: "11px", color: "#444", lineHeight: "1.6", borderTop: "1px dashed #222", paddingTop: "12px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px 8px" },
  badge: { fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", letterSpacing: "1px" },
  scoreTag: { fontSize: "12px", color: "#888", background: "rgba(26,26,46,0.8)", padding: "4px 10px", borderRadius: "20px", border: "1px solid #2a2a3a" },
  progressWrap: { height: "3px", background: "#1c1c28", margin: "4px 24px 0", borderRadius: "2px", overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #27c93f, #00d4ff)", borderRadius: "2px", transition: "width 0.4s ease" },
  qMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 24px 0" },
  qCount: { fontSize: "10px", color: "#444", letterSpacing: "1px" },
  timerWrap: { position: "relative", width: "100px", height: "16px", background: "#1c1c28", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center" },
  timerFill: { position: "absolute", left: 0, top: 0, height: "100%", borderRadius: "8px" },
  timerText: { position: "relative", zIndex: 1, fontSize: "9px", fontWeight: "700", width: "100%", textAlign: "center", letterSpacing: "1px" },
  question: { fontSize: "18px", fontWeight: "700", color: "#e0e0e0", padding: "18px 24px 14px", fontFamily: "'Space Mono', monospace", lineHeight: "1.4" },
  highlight: { color: "#ff5f56", textDecoration: "underline", textDecorationStyle: "wavy" },
  options: { display: "flex", flexDirection: "column", gap: "10px", padding: "0 24px" },
  option: { padding: "13px 18px", borderRadius: "8px", fontSize: "14px", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", textAlign: "left", display: "flex", alignItems: "center", gap: "10px", transition: "all 0.2s ease", letterSpacing: "0.5px" },
  optionIcon: { fontSize: "12px", color: "#444", width: "14px" },
  bottomRow: { padding: "14px 24px 6px", display: "flex", flexDirection: "column", gap: "10px" },
  hintBtn: { background: "none", border: "1px dashed #333", color: "#ffbd2e", fontSize: "12px", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", alignSelf: "flex-start" },
  hint: { fontSize: "12px", color: "#888", background: "rgba(26,26,46,0.9)", border: "1px solid #2a2a3a", borderRadius: "6px", padding: "10px 14px", lineHeight: "1.5" },
  btn: { padding: "14px", border: "none", borderRadius: "8px", color: "#0a0a0f", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "14px", cursor: "pointer", letterSpacing: "1px" },
  finishBody: { padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  scoreCircle: { width: "100px", height: "100px", borderRadius: "50%", border: "3px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  scoreNum: { fontSize: "32px", fontWeight: "700", fontFamily: "'Space Mono', monospace" },
  scoreOf: { fontSize: "12px", color: "#555" },
  percentBar: { width: "100%", height: "6px", background: "#1c1c28", borderRadius: "3px", overflow: "hidden" },
  percentFill: { height: "100%", borderRadius: "3px", transition: "width 0.8s ease" },
  resultMsg: { color: "#aaa", fontSize: "13px", textAlign: "center", lineHeight: "1.6", margin: 0 },
  statRow: { display: "flex", gap: "10px", width: "100%" },
  statBox: { flex: 1, background: "rgba(26,26,46,0.8)", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" },
  statVal: { fontSize: "20px", fontWeight: "700", color: "#e0e0e0", fontFamily: "'Space Mono', monospace" },
  statKey: { fontSize: "9px", color: "#555", letterSpacing: "1px" },
  historyRow: { display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" },
  historyDot: { width: "10px", height: "10px", borderRadius: "50%" },
  btnRow: { display: "flex", gap: "10px", width: "100%" },
};