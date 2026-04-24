// The interactive heart of the Attend reader.
// A fully-wired scaled dot-product attention playground.
//
// Imports from attention-math.js are loaded via a <script type="module">
// that exposes helpers on window.AttMath — see index.html.

const { useState, useMemo, useRef, useEffect } = React;

function AttentionPlayground() {
  const M = window.AttMath;
  const [temperature, setTemperature] = useState(1.0);
  const [scaled,      setScaled]      = useState(true);
  const [hoverRow,    setHoverRow]    = useState(null); // query we're inspecting
  const [hoverCol,    setHoverCol]    = useState(null); // key we're inspecting
  const [step,        setStep]        = useState(4);    // 0..4 reveal stages
  const [playing,     setPlaying]     = useState(false);

  const tokens = M.TOKENS;
  const n = tokens.length;

  const { scores, scaledScores, weights, output, dk } = useMemo(
    () => M.computeAttention(M.Q0, M.K0, M.V0, { scaled, temperature }),
    [scaled, temperature]
  );

  // Auto-step animation
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setStep(s => {
        if (s >= 4) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 900);
    return () => clearTimeout(t);
  }, [playing, step]);

  function playAll() {
    setStep(0);
    setPlaying(true);
  }

  /* ------------------------------ renderers */
  const renderMatrix = (M, opts = {}) => {
    const { role = "", highlightRow = null, highlightCol = null,
            weighted = false, heat = false, dim = false, label } = opts;
    return (
      <div className={"matrix" + (role ? " matrix--" + role : "") + (dim ? " is-dim" : "")}>
        {label && <div className="matrix__label">{label}</div>}
        <div className="matrix__grid" style={{ gridTemplateColumns: `repeat(${M[0].length}, 1fr)` }}>
          {M.map((row, i) =>
            row.map((v, j) => {
              const bg = heat ? M[i][j] : null;
              const isHL = highlightRow === i || highlightCol === j;
              return (
                <div
                  key={i + "-" + j}
                  className={"cell" + (isHL ? " is-hl" : "")}
                  style={heat ? { background: window.AttMath.heatVar(bg), color: bg > 0.5 ? "#fff" : "var(--ink)" } : null}
                >
                  {weighted ? (v * 100).toFixed(0) : window.AttMath.fmt(v)}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  /* ------------------------------ attention flow figure */
  // Draw a left column of query tokens, right column of key/value tokens,
  // with an SVG of curves whose opacity = attention weight (for hovered query).
  const flowSvgRef = useRef(null);
  const activeRow = hoverRow ?? 1; // default to "cat"

  return (
    <div className="pg">
      <div className="pg__head">
        <div>
          <div className="pg__eyebrow">Playground · §3.3</div>
          <h3 className="pg__title">Scaled dot-product attention, live</h3>
          <p className="pg__lede">
            Every number below is real. Move the temperature, toggle the √d<sub>k</sub> scale,
            and hover any query row to watch its attention flow.
          </p>
        </div>
        <div className="pg__controls">
          <button className={"ctl" + (playing ? " is-on" : "")} onClick={playAll}>
            {playing ? "⏸ playing…" : "▸ step through"}
          </button>
        </div>
      </div>

      {/* ---- token bar ---- */}
      <div className="pg__tokens">
        {tokens.map((t, i) => (
          <button
            key={i}
            className={"tok" + (activeRow === i ? " is-active" : "")}
            onMouseEnter={() => setHoverRow(i)}
            onMouseLeave={() => setHoverRow(null)}
            onClick={() => setHoverRow(i)}
          >
            <span className="tok__i">{i}</span>
            <span className="tok__t">{t}</span>
          </button>
        ))}
      </div>

      {/* ---- step 1: Q · Kᵀ ---- */}
      <div className={"pg__step" + (step >= 1 ? " is-on" : "")}>
        <div className="pg__step-head">
          <span className="pg__step-n">1</span>
          <span className="pg__step-title"><em className="tok-q">Q</em> · <em className="tok-k">K</em><sup>T</sup>  →  raw scores</span>
          <span className="pg__step-shape">[{n} × {dk}] · [{dk} × {n}] = [{n} × {n}]</span>
        </div>
        <div className="pg__matrices">
          {renderMatrix(M.Q0, { role: "q", label: "Q", highlightRow: activeRow })}
          <span className="pg__op">·</span>
          {renderMatrix(M.T(M.K0), { role: "k", label: "Kᵀ", highlightCol: hoverCol })}
          <span className="pg__op">=</span>
          {renderMatrix(scores, { label: "scores", highlightRow: activeRow })}
        </div>
      </div>

      {/* ---- step 2: scale ---- */}
      <div className={"pg__step" + (step >= 2 ? " is-on" : "")}>
        <div className="pg__step-head">
          <span className="pg__step-n">2</span>
          <span className="pg__step-title">
            scale by 1/√d<sub>k</sub> = 1/√{dk} ≈ {(1/Math.sqrt(dk)).toFixed(3)}
          </span>
          <label className="pg__toggle">
            <input type="checkbox" checked={scaled} onChange={e => setScaled(e.target.checked)} />
            <span>apply √d<sub>k</sub> scaling</span>
          </label>
        </div>
        <div className="pg__matrices pg__matrices--one">
          {renderMatrix(scaledScores, { label: scaled ? "scaled scores" : "unscaled scores", highlightRow: activeRow, dim: !scaled })}
        </div>
        {!scaled && (
          <div className="pg__note">
            <strong>Unscaled:</strong> notice the values grow with d<sub>k</sub>.
            Large logits push softmax into a one-hot spike, killing the gradient.
          </div>
        )}
      </div>

      {/* ---- step 3: softmax with temperature ---- */}
      <div className={"pg__step" + (step >= 3 ? " is-on" : "")}>
        <div className="pg__step-head">
          <span className="pg__step-n">3</span>
          <span className="pg__step-title">softmax row-wise, with temperature T</span>
          <div className="pg__slider">
            <span className="pg__slider-label">T</span>
            <input
              type="range" min="0.1" max="3" step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
            />
            <span className="pg__slider-val">{temperature.toFixed(2)}</span>
          </div>
        </div>
        <div className="pg__matrices pg__matrices--one">
          {renderMatrix(weights, { label: "attention weights", heat: true, highlightRow: activeRow })}
        </div>
        <div className="pg__heatlegend">
          <span>T → 0 · sharp</span>
          <div className="pg__heatbar">
            {[0,1,2,3,4,5].map(i => <i key={i} style={{ background: `var(--heat-${i})` }} />)}
          </div>
          <span>T → ∞ · uniform</span>
        </div>
      </div>

      {/* ---- step 4: weighted sum over V ---- */}
      <div className={"pg__step" + (step >= 4 ? " is-on" : "")}>
        <div className="pg__step-head">
          <span className="pg__step-n">4</span>
          <span className="pg__step-title">weights · <em className="tok-v">V</em>  →  output</span>
          <span className="pg__step-shape">[{n} × {n}] · [{n} × {dk}] = [{n} × {dk}]</span>
        </div>
        <div className="pg__matrices">
          {renderMatrix(weights, { label: "weights", heat: true, highlightRow: activeRow })}
          <span className="pg__op">·</span>
          {renderMatrix(M.V0, { role: "v", label: "V" })}
          <span className="pg__op">=</span>
          {renderMatrix(output, { label: "output", highlightRow: activeRow })}
        </div>
      </div>

      {/* ---- attention flow figure ---- */}
      <div className="pg__flow">
        <div className="pg__flow-head">
          <span className="eyebrow">Attention flow · query "{tokens[activeRow]}"</span>
          <span className="pg__flow-hint">hover any token above to change the query</span>
        </div>
        <div className="pg__flow-stage">
          <div className="pg__flow-col">
            {tokens.map((t, i) => (
              <div key={i} className={"flow-node flow-node--q" + (i === activeRow ? " is-active" : " is-dim")}>
                <span className="flow-node__i">{i}</span>{t}
              </div>
            ))}
          </div>
          <svg className="pg__flow-svg" viewBox="0 0 200 240" preserveAspectRatio="none">
            {tokens.map((_, j) => {
              const w = weights[activeRow][j];
              const y1 = 20 + activeRow * 36 + 12;
              const y2 = 20 + j         * 36 + 12;
              return (
                <path
                  key={j}
                  d={`M 6 ${y1} C 100 ${y1}, 100 ${y2}, 194 ${y2}`}
                  stroke={window.AttMath.heatVar(w)}
                  strokeWidth={Math.max(0.6, w * 4)}
                  fill="none"
                  opacity={Math.max(0.2, w * 0.9 + 0.15)}
                />
              );
            })}
          </svg>
          <div className="pg__flow-col">
            {tokens.map((t, j) => {
              const w = weights[activeRow][j];
              return (
                <div key={j} className="flow-node flow-node--kv" style={{ background: window.AttMath.heatVar(w) }}>
                  <span className="flow-node__i">{j}</span>{t}
                  <span className="flow-node__w">{w.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- stat strip ---- */}
      <div className="pg__stats">
        <div className="stat">
          <span className="stat__label">row sum (check)</span>
          <span className="stat__v">{weights[activeRow].reduce((a,b) => a+b, 0).toFixed(4)}</span>
        </div>
        <div className="stat">
          <span className="stat__label">max weight</span>
          <span className="stat__v">{Math.max(...weights[activeRow]).toFixed(3)}</span>
        </div>
        <div className="stat">
          <span className="stat__label">entropy</span>
          <span className="stat__v">
            {(-weights[activeRow].reduce((a,p) => a + (p > 0 ? p*Math.log(p) : 0), 0)).toFixed(3)}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">d<sub>k</sub></span>
          <span className="stat__v">{dk}</span>
        </div>
      </div>
    </div>
  );
}

window.AttentionPlayground = AttentionPlayground;
