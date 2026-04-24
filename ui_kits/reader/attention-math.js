// Plain-JS matrix ops for the attention playground.
// All functions are pure; inputs are nested arrays (row-major).

export function zeros(r, c) {
  return Array.from({ length: r }, () => Array(c).fill(0));
}

export function matmul(A, B) {
  const r = A.length, n = A[0].length, c = B[0].length;
  const out = zeros(r, c);
  for (let i = 0; i < r; i++)
    for (let k = 0; k < n; k++)
      for (let j = 0; j < c; j++)
        out[i][j] += A[i][k] * B[k][j];
  return out;
}

// Transpose
export function T(A) {
  const r = A.length, c = A[0].length;
  const out = zeros(c, r);
  for (let i = 0; i < r; i++)
    for (let j = 0; j < c; j++)
      out[j][i] = A[i][j];
  return out;
}

// Scale by a scalar
export function scale(A, s) {
  return A.map(row => row.map(x => x * s));
}

// Row-wise softmax with temperature T. Numerically stable.
export function softmaxRows(A, temperature = 1) {
  return A.map(row => {
    const scaled = row.map(x => x / temperature);
    const m = Math.max(...scaled);
    const exps = scaled.map(x => Math.exp(x - m));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
  });
}

// Format a number to 2 decimals, padded
export function fmt(n, d = 2) {
  const s = n.toFixed(d);
  return s === "-0.00" ? "0.00" : s;
}

// Pick heat-N variable from a [0,1] weight
export function heatVar(w) {
  const i = Math.max(0, Math.min(5, Math.floor(w * 6)));
  return `var(--heat-${i})`;
}

// Clamped lerp for UI
export const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

// Default 6-token toy example. Tokens chosen so the attention pattern
// is interpretable: "the cat sat on the mat" — we expect "cat" and "mat"
// to attend to each other, articles to be diffuse.
export const TOKENS = ["the", "cat", "sat", "on", "the", "mat"];

// Hand-tuned Q, K, V matrices (d_model = 4) — small enough to render
// every cell, large enough to produce a non-trivial attention pattern.
// These are DETERMINISTIC so the reader can verify the math by hand.
export const Q0 = [
  [ 0.9,  0.1,  0.2, -0.1],  // the
  [ 0.2,  1.0,  0.3,  0.1],  // cat
  [ 0.1,  0.4,  0.8,  0.2],  // sat
  [ 0.3,  0.0,  0.2,  0.7],  // on
  [ 0.9,  0.1,  0.2, -0.1],  // the
  [ 0.2,  0.9,  0.1,  0.4],  // mat
];

export const K0 = [
  [ 0.8,  0.2,  0.1,  0.0],  // the
  [ 0.1,  0.9,  0.2,  0.2],  // cat
  [ 0.2,  0.3,  0.9,  0.1],  // sat
  [ 0.2,  0.1,  0.1,  0.8],  // on
  [ 0.8,  0.2,  0.1,  0.0],  // the
  [ 0.1,  0.8,  0.2,  0.3],  // mat
];

export const V0 = [
  [ 0.3, -0.1,  0.2,  0.1],
  [ 0.1,  0.8, -0.1,  0.3],
  [ 0.5,  0.2,  0.4, -0.1],
  [-0.2,  0.1,  0.3,  0.5],
  [ 0.3, -0.1,  0.2,  0.1],
  [ 0.2,  0.7, -0.2,  0.4],
];

// Compute the full pipeline. Returns every intermediate.
export function computeAttention(Q, K, V, { scaled = true, temperature = 1 } = {}) {
  const dk = Q[0].length;
  const Kt = T(K);
  const scores = matmul(Q, Kt);                 // [n, n]
  const scaledScores = scaled ? scale(scores, 1 / Math.sqrt(dk)) : scores;
  const weights = softmaxRows(scaledScores, temperature);
  const output  = matmul(weights, V);
  return { Kt, scores, scaledScores, weights, output, dk };
}
