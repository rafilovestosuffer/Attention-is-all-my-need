/**
 * src/math/types.ts
 * Core type aliases used throughout the Attend math module.
 */

/** A 1-D vector of real numbers. */
export type Vec = number[]

/** A 2-D matrix of real numbers, row-major: Matrix[row][col]. */
export type Matrix = number[][]

/** A single attention head's output. */
export interface HeadOutput {
  /** Raw QKᵀ scores, shape [n, n] */
  scores: Matrix
  /** Scaled scores (÷ √dₖ when `scaled: true`), shape [n, n] */
  scaledScores: Matrix
  /** Softmax-normalised attention weights, shape [n, n] */
  weights: Matrix
  /** Weighted sum of values, shape [n, dₖ] */
  output: Matrix
  /** Dimension of each head's key/query space */
  dk: number
}

/** Full multi-head attention output. */
export interface MultiHeadOutput {
  /** Per-head results, length h */
  heads: HeadOutput[]
  /** Concatenated head outputs, shape [n, h·dₖ] = [n, d_model] */
  concat: Matrix
}

/** Options for scaled dot-product attention. */
export interface AttentionOptions {
  /** Whether to divide by √dₖ (default: true). */
  scaled?: boolean
  /** Softmax temperature (default: 1). Higher → flatter distribution. */
  temperature?: number
}
