/**
 * src/math/positional.ts
 * Sinusoidal positional encodings.
 * Implements Vaswani et al. (2017) §3.5, Eq. (2)–(3):
 *
 *   PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
 *   PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
 */
import type { Matrix } from './types'

/**
 * Compute one entry of the positional encoding.
 * @param pos  Token position (0-indexed)
 * @param dim  Feature dimension index (0-indexed)
 * @param dModel  Total feature dimension
 */
export const peEntry = (pos: number, dim: number, dModel: number): number => {
  const freq = 1 / Math.pow(10000, (2 * Math.floor(dim / 2)) / dModel)
  return dim % 2 === 0 ? Math.sin(pos * freq) : Math.cos(pos * freq)
}

/**
 * Compute the full sinusoidal PE matrix.
 * @param seqLen  Sequence length (number of positions)
 * @param dModel  Feature dimension
 * @returns Shape [seqLen, dModel]
 */
export const positionalEncoding = (seqLen: number, dModel: number): Matrix =>
  Array.from({ length: seqLen }, (_, pos) =>
    Array.from({ length: dModel }, (_, dim) => peEntry(pos, dim, dModel))
  )
