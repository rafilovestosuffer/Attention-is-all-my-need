/**
 * src/math/attention.ts
 * Scaled dot-product attention and multi-head attention.
 * Implements Vaswani et al. (2017) §3.2.1.
 *
 * Attention(Q, K, V) = softmax(Q·Kᵀ / √dₖ) · V
 */
import { matmul, transpose, scaleMatrix } from './linalg'
import { softmaxRows } from './probability'
import type { Matrix, HeadOutput, MultiHeadOutput, AttentionOptions } from './types'

// ─── Toy fixtures (Vaswani-style 6-token sentence: "the cat sat on the mat") ──

/** Six toy query vectors, shape [6, 4]. d_model = 4, one head. */
export const TOY_Q: Matrix = [
  [0.9,  0.1,  0.2, -0.1],
  [0.2,  1.0,  0.3,  0.1],
  [0.1,  0.4,  0.8,  0.2],
  [0.3,  0.0,  0.2,  0.7],
  [0.9,  0.1,  0.2, -0.1],
  [0.2,  0.9,  0.1,  0.4],
]

/** Six toy key vectors, shape [6, 4]. */
export const TOY_K: Matrix = [
  [0.8,  0.2,  0.1,  0.0],
  [0.1,  0.9,  0.2,  0.2],
  [0.2,  0.3,  0.9,  0.1],
  [0.2,  0.1,  0.1,  0.8],
  [0.8,  0.2,  0.1,  0.0],
  [0.1,  0.8,  0.2,  0.3],
]

/** Six toy value vectors, shape [6, 4]. */
export const TOY_V: Matrix = [
  [ 0.3, -0.1,  0.2,  0.1],
  [ 0.1,  0.8, -0.1,  0.3],
  [ 0.5,  0.2,  0.4, -0.1],
  [-0.2,  0.1,  0.3,  0.5],
  [ 0.3, -0.1,  0.2,  0.1],
  [ 0.2,  0.7, -0.2,  0.4],
]

export const TOY_TOKENS = ['the', 'cat', 'sat', 'on', 'the', 'mat'] as const

// ─── Core algorithm ──────────────────────────────────────────────────────────

/**
 * Scaled dot-product attention.
 * Vaswani et al. (2017) §3.2.1, Eq. (1):
 *   Attention(Q, K, V) = softmax(Q·Kᵀ / √dₖ) · V
 *
 * @param Q Shape [n, dₖ]
 * @param K Shape [n, dₖ]
 * @param V Shape [n, dᵥ]  (usually dᵥ = dₖ)
 */
export const scaledDotProductAttention = (
  Q: Matrix,
  K: Matrix,
  V: Matrix,
  { scaled = true, temperature = 1 }: AttentionOptions = {}
): HeadOutput => {
  const dk = Q[0].length
  const Kt = transpose(K)                                        // [dₖ, n]
  const scores = matmul(Q, Kt)                                   // [n, n]  raw
  const scaledScores = scaled
    ? scaleMatrix(scores, 1 / Math.sqrt(dk))                     // [n, n]  ÷√dₖ
    : scores
  const weights = softmaxRows(scaledScores, temperature)         // [n, n]  row-softmax
  const output  = matmul(weights, V)                             // [n, dᵥ]

  return { scores, scaledScores, weights, output, dk }
}

// ─── Multi-head attention ─────────────────────────────────────────────────────

/**
 * Multi-head attention (simplified: no learned W_Q/K/V projections —
 * those are application-layer concerns). Splits the feature dimension
 * into h equal slices and attends independently on each.
 *
 * Vaswani et al. (2017) §3.2.2, h = 8, dₖ = dᵥ = d_model/h = 64.
 *
 * @param Q Shape [n, d_model]
 * @param K Shape [n, d_model]
 * @param V Shape [n, d_model]
 * @param h Number of heads (must divide d_model evenly)
 */
export const multiHeadAttention = (
  Q: Matrix,
  K: Matrix,
  V: Matrix,
  h: number,
  opts: AttentionOptions = {}
): MultiHeadOutput => {
  const n = Q.length
  const dModel = Q[0].length
  if (dModel % h !== 0)
    throw new Error(`multiHeadAttention: d_model (${dModel}) must be divisible by h (${h})`)
  const dk = dModel / h

  const heads: HeadOutput[] = []
  for (let i = 0; i < h; i++) {
    const Qi = Q.map(row => row.slice(i * dk, (i + 1) * dk))
    const Ki = K.map(row => row.slice(i * dk, (i + 1) * dk))
    const Vi = V.map(row => row.slice(i * dk, (i + 1) * dk))
    heads.push(scaledDotProductAttention(Qi, Ki, Vi, opts))
  }

  // Concatenate head outputs along feature axis
  const concat: Matrix = Array.from({ length: n }, (_, row) =>
    heads.flatMap(head => head.output[row])
  )

  return { heads, concat }
}
