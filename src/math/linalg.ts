/**
 * src/math/linalg.ts
 * Pure linear-algebra primitives. No side-effects, no globals.
 * Every function is fully typed and tested in linalg.test.ts.
 */
import type { Vec, Matrix } from './types'

// ─── Construction ────────────────────────────────────────────────────────────

/** Create an r×c matrix filled with zeros. */
export const zeros = (r: number, c: number): Matrix =>
  Array.from({ length: r }, () => Array<number>(c).fill(0))

/** Create an n-vector filled with zeros. */
export const zerosVec = (n: number): Vec => Array<number>(n).fill(0)

// ─── Matrix operations ───────────────────────────────────────────────────────

/** Matrix multiply A [r×n] by B [n×c] → [r×c]. */
export const matmul = (A: Matrix, B: Matrix): Matrix => {
  const r = A.length
  const n = A[0].length
  const c = B[0].length
  if (n !== B.length) throw new Error(`matmul: A cols (${n}) ≠ B rows (${B.length})`)
  const out = zeros(r, c)
  for (let i = 0; i < r; i++)
    for (let k = 0; k < n; k++)
      for (let j = 0; j < c; j++)
        out[i][j] += A[i][k] * B[k][j]
  return out
}

/** Transpose matrix A [r×c] → [c×r]. */
export const transpose = (A: Matrix): Matrix => {
  const r = A.length
  const c = A[0].length
  const out = zeros(c, r)
  for (let i = 0; i < r; i++)
    for (let j = 0; j < c; j++)
      out[j][i] = A[i][j]
  return out
}

/** Multiply every element of A by scalar s. */
export const scaleMatrix = (A: Matrix, s: number): Matrix =>
  A.map(row => row.map(x => x * s))

/** Element-wise add two same-shape matrices. */
export const addMatrix = (A: Matrix, B: Matrix): Matrix => {
  if (A.length !== B.length || A[0].length !== B[0].length)
    throw new Error('addMatrix: shape mismatch')
  return A.map((row, i) => row.map((x, j) => x + B[i][j]))
}

// ─── Vector operations ───────────────────────────────────────────────────────

/** Dot product of two same-length vectors. */
export const dot = (a: Vec, b: Vec): number => {
  if (a.length !== b.length) throw new Error(`dot: length mismatch (${a.length} vs ${b.length})`)
  return a.reduce((sum, x, i) => sum + x * b[i], 0)
}

/** Euclidean norm of a vector. */
export const norm = (v: Vec): number => Math.sqrt(dot(v, v))

/** Cosine similarity of two vectors. */
export const cosineSim = (a: Vec, b: Vec): number => dot(a, b) / (norm(a) * norm(b))

// ─── Format helpers ──────────────────────────────────────────────────────────

/** Format a number to d decimal places (strips -0.00). */
export const fmt = (n: number, d = 2): string => {
  const s = n.toFixed(d)
  return s === '-0.00' ? '0.00' : s
}

/** Map weight w ∈ [0,1] to a CSS heat variable (--heat-0 … --heat-5). */
export const heatVar = (w: number): string =>
  `var(--heat-${Math.max(0, Math.min(5, Math.floor(w * 6)))})`
