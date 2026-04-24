/* Shared sidebar + topbar renderer for Attend chapters.
   Call AttendShell.mount({ chapter: "§3.2", title: "Why √dₖ", progress: 40 })  */
window.AttendShell = (() => {
  const CHAPTERS = [
    { id: "§1", href: "ch1-dot-product.html",  title: "A vector, a dot product" },
    { id: "§2", href: "ch2-softmax.html",      title: "From similarity to attention" },
    { id: "§3", href: "ch3-scale.html",        title: "Why we scale by √dₖ" },
    { id: "§4", href: "index.html",            title: "Splitting Q, K, V" },
    { id: "§5", href: "ch4-multihead.html",    title: "Per-head attention" },
    { id: "§6", href: "ch5-positional.html",   title: "Positional encodings" },
    { id: "§7", href: "ch6-transformer.html",  title: "The full Transformer block" },
  ];

  const renderSidebar = (activeId) => {
    const items = CHAPTERS.map(c => {
      const active = c.id === activeId ? " active" : "";
      return `<a class="${active}" href="${c.href}"><span class="n">${c.id}</span><span>${c.title}</span></a>`;
    }).join("");
    return `
      <a class="brand" href="../../index.html">
        <img src="../../assets/brand/logomark.svg" alt=""> Attend
      </a>
      <div class="toc">${items}</div>
    `;
  };

  const renderTopbar = ({ chapter, title, progress }) => `
    <span class="chap">${chapter}<span class="sep">·</span><span class="section">${title}</span></span>
    <span class="right">${progress}% through the book</span>
  `;

  const renderFooterNav = (activeId) => {
    const idx = CHAPTERS.findIndex(c => c.id === activeId);
    const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
    const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
    return `
      ${prev ? `<a class="fn" href="${prev.href}"><span class="eb">← ${prev.id}</span><span class="tt">${prev.title}</span></a>` : `<span></span>`}
      ${next ? `<a class="fn next" href="${next.href}"><span class="eb">${next.id} →</span><span class="tt">${next.title}</span></a>` : `<span></span>`}
    `;
  };

  const mount = ({ chapter, section, progress, activeId }) => {
    document.getElementById("sidebar").innerHTML = renderSidebar(activeId);
    document.getElementById("topbar").innerHTML = renderTopbar({ chapter, title: section, progress });
    const fn = document.getElementById("footer-nav");
    if (fn) fn.innerHTML = renderFooterNav(activeId);
  };

  // Tiny linear-algebra helpers so chapters don't each re-inline AttMath.
  const zeros = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
  const randn = () => {
    // Box–Muller
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const softmax = (xs, T = 1) => {
    const sc = xs.map(x => x / T);
    const m = Math.max(...sc);
    const ex = sc.map(x => Math.exp(x - m));
    const s = ex.reduce((a, b) => a + b, 0);
    return ex.map(x => x / s);
  };
  const fmt = (n, d = 2) => { const s = n.toFixed(d); return s === "-0.00" ? "0.00" : s; };
  const heatVar = (w) => `var(--heat-${Math.max(0, Math.min(5, Math.floor(w * 6)))})`;

  return { mount, CHAPTERS, zeros, randn, dot, softmax, fmt, heatVar };
})();
