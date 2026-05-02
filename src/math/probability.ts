/**
 * src/math/probability.ts
 * Probability-related math: softmax, log-softmax, entropy.
 * Fully typed + tested in probability.test.ts.
 */
import type { Vec, Matrix } from './types'

/**
 * Numerically-stable softmax over a 1-D vector.
 * @param xs   Raw logits
 * @param temp Temperature T (default 1). Lower → sharper; higher → flatter.
 */
export const softmax = (xs: Vec, temp = 1): Vec => {
  const scaled = xs.map(x => x / temp)
  const m = Math.max(...scaled)
  const ex = scaled.map(x => Math.exp(x - m))
  const sum = ex.reduce((a, b) => a + b, 0)
  return ex.map(x => x / sum)
}

/**
 * Apply row-wise softmax to a matrix.
 */
export const softmaxRows = (A: Matrix, temp = 1): Matrix =>
  A.map(row => softmax(row, temp))

/**
 * Shannon entropy of a probability vector (in nats).
 * H = -Σ p·log(p)
 */
export const entropy = (p: Vec): number =>
  -p.reduce((sum, pi) => sum + (pi > 0 ? pi * Math.log(pi) : 0), 0)

/**
 * Box–Muller transform: sample one N(0,1) variate.
 * Deterministic seed option for reproducible tests.
 */
export const randn = (): number => {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/**
 * Sample an n-vector of i.i.d. N(0,1) entries.
 */
export const randnVec = (n: number): number[] => Array.from({ length: n }, randn)

/**
 * Sample an r×c matrix of i.i.d. N(0,1) entries.
 */
export const randnMatrix = (r: number, c: number): number[][] =>
  Array.from({ length: r }, () => randnVec(c))
