// Shared reader chrome components.
// Stateless, plain React — no routing, no store.

const { useState } = React;

/* ------------------------------------------------------------------ Sidebar */
function Sidebar({ current = "4.3" }) {
  const chapters = [
    { n: "1", title: "A vector, a dot product", subs: [] },
    { n: "2", title: "From similarity to attention", subs: [
      { n: "2.1", title: "The scoring function", done: true },
      { n: "2.2", title: "Softmax, and why", done: true },
    ]},
    { n: "3", title: "Scaled dot-product attention", subs: [
      { n: "3.1", title: "Q, K, V — three roles", done: true },
      { n: "3.2", title: "Why we scale by √dₖ",    done: true },
      { n: "3.3", title: "A worked example",       done: true },
    ]},
    { n: "4", title: "Multi-head attention", active: true, subs: [
      { n: "4.1", title: "Intuition",              done: true },
      { n: "4.2", title: "Shapes and splits",      done: true },
      { n: "4.3", title: "Splitting Q, K, V",      now:  true },
      { n: "4.4", title: "Per-head attention" },
      { n: "4.5", title: "Recombining heads" },
      { n: "4.6", title: "Exercises" },
    ]},
    { n: "5", title: "Positional encodings", subs: [] },
    { n: "6", title: "The full Transformer block", subs: [] },
  ];
  return (
    <aside className="sidebar">
      <a className="brand" href="#">
        <img src="../../assets/brand/logomark.svg" alt="" width="24" height="24" />
        <span>Attend</span>
      </a>
      <div className="sidebar__progress">
        <div className="sidebar__progress-meta">
          <span>Your progress</span><span>38%</span>
        </div>
        <div className="track"><i style={{ width: "38%" }} /></div>
      </div>
      <nav className="toc">
        {chapters.map(c => (
          <div key={c.n} className={"toc__chap" + (c.active ? " is-active" : "")}>
            <div className="toc__head">
              <span className="toc__n">{c.n}</span>
              <span className="toc__title">{c.title}</span>
            </div>
            {c.subs.length > 0 && c.active && (
              <ul className="toc__subs">
                {c.subs.map(s => (
                  <li key={s.n} className={s.now ? "is-now" : s.done ? "is-done" : ""}>
                    <span className="toc__n">{s.n}</span>
                    <span>{s.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
      <div className="sidebar__foot">
        <kbd>j</kbd> next · <kbd>k</kbd> prev · <kbd>/</kbd> search
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------- TopBar */
function TopBar({ chapter, section, progress }) {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <span className="topbar__chap">{chapter}</span>
        <span className="topbar__sep">·</span>
        <span className="topbar__section">{section}</span>
      </div>
      <div className="topbar__right">
        <div className="topbar__track"><i style={{ width: `${progress}%` }} /></div>
        <span className="topbar__pct">{progress}%</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Callout */
function Callout({ kind = "info", title, children }) {
  return (
    <aside className={"callout callout--" + kind}>
      {title && <div className="callout__title">{title}</div>}
      <div className="callout__body">{children}</div>
    </aside>
  );
}

/* --------------------------------------------------------------- Figure */
function Figure({ n, caption, children }) {
  return (
    <figure className="figure">
      <div className="figure__canvas">{children}</div>
      <figcaption>
        <span className="figure__n">Fig. {n}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/* --------------------------------------------------------- Scratchpad cell */
function Scratchpad({ code, output, running = false, onRun }) {
  const [isRunning, setRunning] = useState(false);
  const [shownOutput, setShown] = useState(output);
  function run() {
    setRunning(true);
    setShown(null);
    setTimeout(() => { setShown(output); setRunning(false); onRun && onRun(); }, 450);
  }
  return (
    <div className="scratch">
      <div className="scratch__bar">
        <div className="scratch__title">
          <span className="scratch__dot" /> scratchpad
        </div>
        <button className="scratch__run" onClick={run} disabled={isRunning}>
          {isRunning ? "running…" : "▸ run"}
        </button>
      </div>
      <pre className="scratch__code" dangerouslySetInnerHTML={{ __html: code }} />
      {shownOutput && (
        <div className="scratch__out">
          <span className="scratch__arrow">→</span>
          <span dangerouslySetInnerHTML={{ __html: shownOutput }} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- MathBlock */
function MathBlock({ eqn, children }) {
  return (
    <div className="mathblock">
      <div className="mathblock__body">{children}</div>
      {eqn && <div className="mathblock__n">Eq. {eqn}</div>}
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, Callout, Figure, Scratchpad, MathBlock });
