// Shared reader chrome components.
// Stateless, plain React — no routing, no store.

const { useState } = React;

/* ------------------------------------------------------------------ Sidebar */
function Sidebar() {
  const chapters = [
    { id: "§1", href: "ch1-dot-product.html", title: "A vector, a dot product" },
    { id: "§2", href: "ch2-softmax.html",     title: "From similarity to attention" },
    { id: "§3", href: "ch3-scale.html",       title: "Why we scale by √dₖ" },
    { id: "§4", href: "index.html",           title: "Splitting Q, K, V", active: true },
    { id: "§5", href: "ch4-multihead.html",   title: "Per-head attention" },
    { id: "§6", href: "ch5-positional.html",  title: "Positional encodings" },
    { id: "§7", href: "ch6-transformer.html", title: "The full Transformer block" },
  ];
  return (
    <aside className="sidebar">
      <a className="brand" href="../../index.html">
        <img src="../../assets/brand/logomark.svg" alt="" width="24" height="24" />
        {" "}Attend
      </a>
      <div className="toc">
        {chapters.map(c => (
          <a key={c.id} className={c.active ? "active" : ""} href={c.href}>
            <span className="n">{c.id}</span>
            <span>{c.title}</span>
          </a>
        ))}
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
